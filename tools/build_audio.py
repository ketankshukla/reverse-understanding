"""Generate MP3 narrations of every lesson markdown file using edge-tts.

edge-tts uses Microsoft Edge's online TTS service (free, no API key) to
synthesize natural-sounding speech. We strip markdown to plain prose so the
narration is listenable: code fences are skipped, links keep only their text,
headings become spoken sentences, etc.

Usage:
    pip install -r tools/requirements.txt
    python tools/build_audio.py                         # narrate everything
    python tools/build_audio.py --course react          # only React course
    python tools/build_audio.py --voice en-GB-RyanNeural --rate +10%
    python tools/build_audio.py --limit 3               # smoke test
    python tools/build_audio.py --force                 # re-render existing MP3s

Outputs live in `audio-courses/<course-slug>/<chapter>/<lesson>.mp3` mirroring
the markdown layout.
"""
from __future__ import annotations

import argparse
import asyncio
import re
import sys
import time
from pathlib import Path

try:
    import edge_tts  # type: ignore
except ImportError:
    sys.stderr.write(
        "edge-tts is not installed. Run: pip install -r tools/requirements.txt\n"
    )
    sys.exit(1)


ROOT = Path(__file__).resolve().parent.parent
OUTPUT_ROOT = ROOT / "audio-courses"

COURSES = {
    "react": {
        "label": "React + Snooker Fantasy League Course",
        "slug": "react-snooker-course",
        "src": ROOT / "course",
        "skip_files": {"SNOOKER_FANTASY_LEAGUE_COURSE.md"},  # too long for TTS
    },
    "ai": {
        "label": "AI-Assisted Development Interview Prep",
        "slug": "ai-interview-course",
        "src": ROOT / "ai-interview-course",
        "skip_files": set(),
    },
}

DEFAULT_VOICE = "en-US-AriaNeural"
DEFAULT_RATE = "+0%"
DEFAULT_PITCH = "+0Hz"
MAX_CONCURRENCY = 4


# ---------------------------------------------------------------------------
# Markdown -> spoken text
# ---------------------------------------------------------------------------

FENCED_CODE_RE = re.compile(r"```.*?```", re.DOTALL)
INLINE_CODE_RE = re.compile(r"`([^`]+)`")
IMAGE_RE = re.compile(r"!\[[^\]]*\]\([^)]*\)")
LINK_RE = re.compile(r"\[([^\]]+)\]\([^)]*\)")
HTML_TAG_RE = re.compile(r"<[^>]+>")
HEADING_RE = re.compile(r"^(#{1,6})\s+(.*)$")
BOLD_RE = re.compile(r"\*\*([^*]+)\*\*")
ITALIC_RE = re.compile(r"(?<!\*)\*([^*]+)\*(?!\*)")
UNDERSCORE_EMPH_RE = re.compile(r"_([^_]+)_")
HORIZONTAL_RULE_RE = re.compile(r"^\s*[-*_]{3,}\s*$")
TABLE_DIVIDER_RE = re.compile(r"^\s*\|?[\s:|\-]+\|?\s*$")
LIST_BULLET_RE = re.compile(r"^\s*(?:[-*+]|\d+\.)\s+")
BLOCKQUOTE_RE = re.compile(r"^\s*>\s?")
MULTI_BLANK_RE = re.compile(r"\n{3,}")

SYMBOL_REPLACEMENTS = {
    "->": " to ",
    "=>": " then ",
    "→": " to ",
    "—": ", ",
    "–": ", ",
    "&": " and ",
    "≈": " about ",
    "≤": " less than or equal to ",
    "≥": " greater than or equal to ",
    "“": '"',
    "”": '"',
    "‘": "'",
    "’": "'",
}


def markdown_to_speech(md: str) -> str:
    """Convert a markdown document into TTS-friendly prose."""
    text = md

    # Drop YAML frontmatter if present.
    if text.startswith("---\n"):
        end = text.find("\n---", 4)
        if end != -1:
            text = text[end + 4 :]

    text = FENCED_CODE_RE.sub("\n\n(Code example shown in the written lesson.)\n\n", text)
    text = IMAGE_RE.sub("", text)
    text = LINK_RE.sub(r"\1", text)
    text = INLINE_CODE_RE.sub(r"\1", text)
    text = HTML_TAG_RE.sub("", text)
    text = BOLD_RE.sub(r"\1", text)
    text = ITALIC_RE.sub(r"\1", text)
    text = UNDERSCORE_EMPH_RE.sub(r"\1", text)

    cleaned_lines: list[str] = []
    for raw_line in text.splitlines():
        line = raw_line.rstrip()
        if HORIZONTAL_RULE_RE.match(line):
            cleaned_lines.append("")
            continue
        if TABLE_DIVIDER_RE.match(line):
            continue
        line = BLOCKQUOTE_RE.sub("", line)
        line = LIST_BULLET_RE.sub("", line)
        heading_match = HEADING_RE.match(line)
        if heading_match:
            heading_text = heading_match.group(2).strip().rstrip(":.")
            cleaned_lines.append("")
            cleaned_lines.append(f"{heading_text}.")
            cleaned_lines.append("")
            continue
        # Drop table pipes but keep the cell content separated by commas.
        if "|" in line and line.strip().startswith("|"):
            cells = [c.strip() for c in line.strip().strip("|").split("|")]
            cells = [c for c in cells if c]
            if cells:
                cleaned_lines.append(", ".join(cells) + ".")
            continue
        cleaned_lines.append(line)

    out = "\n".join(cleaned_lines)
    for src, dst in SYMBOL_REPLACEMENTS.items():
        out = out.replace(src, dst)
    out = MULTI_BLANK_RE.sub("\n\n", out).strip()
    return out


# ---------------------------------------------------------------------------
# Job discovery
# ---------------------------------------------------------------------------

def discover_jobs(course_keys: list[str]) -> list[tuple[str, Path, Path]]:
    """Return list of (course_label, source_md, output_mp3) tuples."""
    jobs: list[tuple[str, Path, Path]] = []
    for key in course_keys:
        cfg = COURSES[key]
        src_root: Path = cfg["src"]
        out_root = OUTPUT_ROOT / cfg["slug"]
        skip = cfg["skip_files"]
        if not src_root.exists():
            continue
        for md_path in sorted(src_root.rglob("*.md")):
            if md_path.name in skip:
                continue
            rel = md_path.relative_to(src_root)
            out_path = (out_root / rel).with_suffix(".mp3")
            jobs.append((cfg["label"], md_path, out_path))
    return jobs


# ---------------------------------------------------------------------------
# Synthesis
# ---------------------------------------------------------------------------

async def synthesize(text: str, voice: str, rate: str, pitch: str, out_path: Path) -> None:
    out_path.parent.mkdir(parents=True, exist_ok=True)
    communicate = edge_tts.Communicate(text=text, voice=voice, rate=rate, pitch=pitch)
    await communicate.save(str(out_path))


async def run_jobs(
    jobs: list[tuple[str, Path, Path]],
    voice: str,
    rate: str,
    pitch: str,
    force: bool,
) -> tuple[int, int, int]:
    sem = asyncio.Semaphore(MAX_CONCURRENCY)
    succeeded = 0
    skipped = 0
    failed = 0
    total = len(jobs)
    counter = {"done": 0}

    async def worker(idx: int, label: str, md_path: Path, out_path: Path) -> None:
        nonlocal succeeded, skipped, failed
        async with sem:
            if out_path.exists() and not force:
                skipped += 1
                counter["done"] += 1
                print(f"  [{counter['done']}/{total}] skip {out_path.relative_to(ROOT)} (exists)")
                return
            try:
                md_text = md_path.read_text(encoding="utf-8")
                speech = markdown_to_speech(md_text)
                if not speech.strip():
                    skipped += 1
                    counter["done"] += 1
                    print(f"  [{counter['done']}/{total}] skip {out_path.relative_to(ROOT)} (empty)")
                    return
                await synthesize(speech, voice, rate, pitch, out_path)
                succeeded += 1
                counter["done"] += 1
                size_kb = out_path.stat().st_size / 1024
                print(
                    f"  [{counter['done']}/{total}] {out_path.relative_to(ROOT)} "
                    f"({size_kb:.0f} KB)"
                )
            except Exception as exc:  # noqa: BLE001
                failed += 1
                counter["done"] += 1
                print(
                    f"  [{counter['done']}/{total}] FAIL {md_path.relative_to(ROOT)}: {exc}",
                    file=sys.stderr,
                )

    tasks = [
        asyncio.create_task(worker(i, label, md, out))
        for i, (label, md, out) in enumerate(jobs)
    ]
    if tasks:
        await asyncio.gather(*tasks)
    return succeeded, skipped, failed


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument(
        "--course",
        choices=["react", "ai", "all"],
        default="all",
        help="Which course to narrate (default: all)",
    )
    p.add_argument("--voice", default=DEFAULT_VOICE, help="edge-tts voice (default: %(default)s)")
    p.add_argument("--rate", default=DEFAULT_RATE, help="Speech rate, e.g. +10%%, -5%% (default: %(default)s)")
    p.add_argument("--pitch", default=DEFAULT_PITCH, help="Pitch, e.g. +5Hz (default: %(default)s)")
    p.add_argument(
        "--limit",
        type=int,
        default=0,
        help="Only generate the first N MP3s (smoke test). 0 = all.",
    )
    p.add_argument(
        "--force",
        action="store_true",
        help="Re-render MP3s even if the output file already exists.",
    )
    return p.parse_args()


def main() -> int:
    args = parse_args()
    OUTPUT_ROOT.mkdir(parents=True, exist_ok=True)

    keys = list(COURSES.keys()) if args.course == "all" else [args.course]
    jobs = discover_jobs(keys)
    if args.limit > 0:
        jobs = jobs[: args.limit]

    if not jobs:
        print("No markdown lessons found.")
        return 0

    print(f"Voice: {args.voice} | rate: {args.rate} | pitch: {args.pitch}")
    print(f"Concurrency: {MAX_CONCURRENCY} | total jobs: {len(jobs)}\n")

    start = time.time()
    succeeded, skipped, failed = asyncio.run(
        run_jobs(jobs, args.voice, args.rate, args.pitch, args.force)
    )
    elapsed = time.time() - start
    print(
        f"\nDone in {elapsed:.1f}s -- "
        f"{succeeded} generated, {skipped} skipped, {failed} failed."
    )
    return 0 if failed == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
