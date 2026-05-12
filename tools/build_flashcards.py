"""
Generate Anki-importable flashcard CSVs for both courses.

Usage:
    python tools/build_flashcards.py

Produces:
    flashcards/react-snooker.csv
    flashcards/ai-interview.csv
    flashcards/README.md

CSV format (Anki-friendly, comma-separated, 4 columns):
    front,back,tags,source

Cards are extracted from:
    - "CHECK YOURSELF" bullets       -> self-quiz cards (front = bullet as question)
    - Blockquotes containing key claims -> soundbite recall cards
    - Heading definitions (### with a one-line answer immediately under) -> concept cards
"""

from __future__ import annotations

import csv
import re
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
OUTPUT_DIR = REPO_ROOT / "flashcards"

COURSES = {
    "react-snooker": REPO_ROOT / "course",
    "ai-interview": REPO_ROOT / "ai-interview-course",
}

# ---------- helpers ----------

WHITESPACE_RUN = re.compile(r"\s+")
HEADING = re.compile(r"^(#{1,6})\s+(.*)$")
INLINE_CODE = re.compile(r"`([^`]+)`")
LINK = re.compile(r"\[([^\]]+)\]\([^)]+\)")
BOLD = re.compile(r"\*\*([^*]+)\*\*")
ITAL = re.compile(r"\*([^*]+)\*|_([^_]+)_")
CITATION = re.compile(r"@[^\s]+")


def normalize(text: str) -> str:
    text = LINK.sub(r"\1", text)
    text = INLINE_CODE.sub(r"\1", text)
    text = BOLD.sub(r"\1", text)
    text = ITAL.sub(lambda m: m.group(1) or m.group(2) or "", text)
    text = CITATION.sub("", text)
    text = WHITESPACE_RUN.sub(" ", text).strip()
    return text


def split_blocks(md: str) -> list[str]:
    blocks: list[str] = []
    buf: list[str] = []
    for line in md.splitlines():
        if line.strip() == "" and buf:
            blocks.append("\n".join(buf))
            buf = []
        else:
            buf.append(line)
    if buf:
        blocks.append("\n".join(buf))
    return blocks


def extract_check_yourself(md: str, source_id: str) -> list[dict]:
    """Bullets under any '## CHECK YOURSELF' (case-insensitive) heading become cards."""
    cards: list[dict] = []
    lines = md.splitlines()
    in_section = False
    for raw in lines:
        line = raw.rstrip()
        h = HEADING.match(line)
        if h:
            title = h.group(2).strip().upper()
            in_section = "CHECK YOURSELF" in title
            continue
        if in_section:
            m = re.match(r"^\s*- \[ \]\s+(.*)$", line) or re.match(r"^\s*- \[ \]\s+(.*)$", line) or re.match(r"^\s*[-*]\s+(.*)$", line)
            if m:
                text = normalize(m.group(1))
                if len(text) > 8:
                    front = text if text.endswith("?") else f"Can you: {text.rstrip('.')}"
                    cards.append({
                        "front": front,
                        "back": "Self-rate 1-5. If <4, re-read the lesson.",
                        "tags": "self-quiz check-yourself",
                        "source": source_id,
                    })
    return cards


def extract_soundbites(md: str, source_id: str) -> list[dict]:
    """Blockquotes that are clearly punchy soundbites (italic-emphasized or single sentence)."""
    cards: list[dict] = []
    blocks = split_blocks(md)
    for blk in blocks:
        lines = [ln.lstrip("> ").rstrip() for ln in blk.splitlines() if ln.lstrip().startswith(">")]
        if not lines:
            continue
        text = " ".join(lines).strip()
        if not text:
            continue
        # ignore very long quotes (not single-sentence soundbites)
        if len(text) > 320:
            continue
        # ignore quotes that look like dialogue prompts ("Q: ..." or "...?")
        if text.startswith('"') and text.endswith('"'):
            quote = text.strip('"').strip()
        elif text.startswith("*") and text.endswith("*"):
            quote = text.strip("*").strip(' "')
        else:
            quote = text
        quote = normalize(quote)
        if len(quote) < 25 or len(quote) > 280:
            continue
        # heuristic: must contain a verb-like pattern (just check it has multiple words)
        if len(quote.split()) < 6:
            continue
        cards.append({
            "front": f"Complete / recall the soundbite from {source_id}: '{quote[:60]}...'",
            "back": quote,
            "tags": "soundbite",
            "source": source_id,
        })
    return cards


def extract_concept_cards(md: str, source_id: str) -> list[dict]:
    """### headings followed by a definitional first paragraph become concept cards."""
    cards: list[dict] = []
    lines = md.splitlines()
    i = 0
    while i < len(lines):
        h = HEADING.match(lines[i])
        if h and len(h.group(1)) == 3:
            heading_text = normalize(h.group(2))
            # collect first non-empty paragraph after the heading
            j = i + 1
            while j < len(lines) and lines[j].strip() == "":
                j += 1
            buf: list[str] = []
            while j < len(lines) and lines[j].strip() != "" and not HEADING.match(lines[j]):
                buf.append(lines[j])
                j += 1
            para = normalize(" ".join(buf))
            if 60 <= len(para) <= 600 and heading_text:
                front = f"In {source_id}: {heading_text.rstrip('.')}?"
                cards.append({
                    "front": front,
                    "back": para,
                    "tags": "concept",
                    "source": source_id,
                })
            i = j
        else:
            i += 1
    return cards


def source_id_for(course_key: str, md_path: Path) -> str:
    rel = md_path.relative_to(COURSES[course_key])
    return f"{course_key}/{rel.as_posix()}"


def build_course_deck(course_key: str) -> tuple[int, Path]:
    src_root = COURSES[course_key]
    out_path = OUTPUT_DIR / f"{course_key}.csv"
    out_path.parent.mkdir(parents=True, exist_ok=True)

    all_cards: list[dict] = []
    for md_path in sorted(src_root.rglob("*.md")):
        md = md_path.read_text(encoding="utf-8")
        sid = source_id_for(course_key, md_path)
        all_cards.extend(extract_check_yourself(md, sid))
        all_cards.extend(extract_soundbites(md, sid))
        all_cards.extend(extract_concept_cards(md, sid))

    with out_path.open("w", encoding="utf-8", newline="") as fh:
        writer = csv.DictWriter(fh, fieldnames=["front", "back", "tags", "source"])
        writer.writeheader()
        for card in all_cards:
            writer.writerow(card)
    return len(all_cards), out_path


def write_readme(counts: dict[str, int]) -> None:
    readme = OUTPUT_DIR / "README.md"
    body = (
        "# Flashcards\n\n"
        "Anki-importable CSV decks auto-generated from both courses.\n\n"
        "## Files\n\n"
    )
    for name, count in counts.items():
        body += f"- `{name}.csv` -- {count} cards\n"
    body += (
        "\n## CSV columns\n\n"
        "1. `front` -- the prompt shown first\n"
        "2. `back` -- the answer\n"
        "3. `tags` -- space-separated tags (e.g. `self-quiz`, `soundbite`, `concept`)\n"
        "4. `source` -- the original markdown path the card was extracted from\n\n"
        "## Importing into Anki\n\n"
        "1. File > Import > pick the CSV.\n"
        "2. Field separator: Comma.\n"
        "3. Map fields: 1->Front, 2->Back, 3->Tags. Skip field 4 (or map to a custom field for traceability).\n"
        "4. Allow HTML in fields: yes.\n\n"
        "## Importing into Mochi / RemNote\n\n"
        "Both support CSV import with similar field mapping.\n\n"
        "## Regenerating\n\n"
        "```pwsh\n"
        "python tools\\build_flashcards.py\n"
        "```\n\n"
        "Manually edit the CSV after generation to prune, rewrite, or merge cards.\n"
        "The script can be re-run safely -- it overwrites the CSV.\n"
    )
    readme.write_text(body, encoding="utf-8")


def main() -> int:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    counts: dict[str, int] = {}
    for key in COURSES:
        count, path = build_course_deck(key)
        counts[key] = count
        print(f"  {path.relative_to(REPO_ROOT)}  ({count} cards)")
    write_readme(counts)
    print(f"  flashcards/README.md  ({sum(counts.values())} cards total)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
