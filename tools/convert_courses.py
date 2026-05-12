"""
Convert every Markdown lesson in both courses to a beautifully styled .docx.

Usage:
    python tools/convert_courses.py                # convert both courses
    python tools/convert_courses.py --clean        # wipe output dir first
    python tools/convert_courses.py --course ai    # convert only the AI course
    python tools/convert_courses.py --course react # convert only the React course

Layout produced:
    word-documents-courses/
        README.md
        react-snooker-course/
            00-README.docx
            00-SNOOKER_FANTASY_LEAGUE_COURSE.docx
            chapter-01-foundations/
                00-README.docx
                01-the-problem.docx
                ...
        ai-interview-course/
            00-README.docx
            chapter-01-foundations/
                00-README.docx
                01-what-changed.docx
                ...

Pandoc is invoked with our custom reference.docx, which applies Roboto fonts,
the navy/blue color palette, sensible margins, and consistent heading rules.
"""

from __future__ import annotations

import argparse
import shutil
import subprocess
import sys
import time
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
TOOLS_DIR = REPO_ROOT / "tools"
REFERENCE_DOC = TOOLS_DIR / "reference.docx"
OUTPUT_ROOT = REPO_ROOT / "word-documents-courses"

COURSES = {
    "react": {
        "src": REPO_ROOT / "course",
        "dst_name": "react-snooker-course",
        "label": "React + Snooker Fantasy League Course",
    },
    "ai": {
        "src": REPO_ROOT / "ai-interview-course",
        "dst_name": "ai-interview-course",
        "label": "AI-Assisted Development Interview Prep Course",
    },
}

# Pandoc input format: GitHub-flavored markdown with the extras we use.
PANDOC_FROM = (
    "markdown"
    "+pipe_tables"
    "+task_lists"
    "+strikeout"
    "+autolink_bare_uris"
    "+yaml_metadata_block"
    "+backtick_code_blocks"
    "+fenced_code_attributes"
    "+definition_lists"
    "+footnotes"
    "+intraword_underscores"
    "+smart"
)

PANDOC_HIGHLIGHT_STYLE = "tango"


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------


def derive_title(md_path: Path) -> str:
    """Use the first H1 in the file as the document title; fall back to the filename."""
    try:
        with md_path.open("r", encoding="utf-8") as fh:
            for raw in fh:
                line = raw.strip()
                if line.startswith("# "):
                    return line.lstrip("#").strip()
                if line.startswith("#"):
                    # any heading is good as a fallback title
                    return line.lstrip("#").strip()
    except OSError:
        pass
    return md_path.stem.replace("-", " ").replace("_", " ").title()


def out_path_for(src_root: Path, dst_root: Path, md_path: Path) -> Path:
    """Map a markdown path inside src_root to a .docx path inside dst_root.
    Top-level READMEs are renamed to `00-README.docx` so they sort first."""
    rel = md_path.relative_to(src_root)
    parts = list(rel.parts)
    stem = Path(parts[-1]).stem
    if stem.upper() == "README":
        parts[-1] = "00-README.docx"
    else:
        parts[-1] = stem + ".docx"
    return dst_root.joinpath(*parts)


def run_pandoc(md_path: Path, docx_path: Path, title: str) -> None:
    docx_path.parent.mkdir(parents=True, exist_ok=True)
    cmd = [
        "pandoc",
        str(md_path),
        "-o",
        str(docx_path),
        "-f",
        PANDOC_FROM,
        "-t",
        "docx",
        f"--reference-doc={REFERENCE_DOC}",
        f"--syntax-highlighting={PANDOC_HIGHLIGHT_STYLE}",
        "--standalone",
        "--wrap=none",
        f"--metadata=title:{title}",
    ]
    subprocess.run(cmd, check=True, cwd=str(REPO_ROOT))


def collect_markdown_files(src_root: Path) -> list[Path]:
    return sorted(src_root.rglob("*.md"))


def human_size(num_bytes: int) -> str:
    for unit in ("B", "KB", "MB"):
        if num_bytes < 1024 or unit == "MB":
            return f"{num_bytes:.0f} {unit}" if unit == "B" else f"{num_bytes / 1024:.1f} {unit}"
        num_bytes /= 1024
    return f"{num_bytes:.1f} GB"


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------


def convert_course(course_key: str, *, clean: bool) -> tuple[int, int]:
    course = COURSES[course_key]
    src_root: Path = course["src"]
    dst_root = OUTPUT_ROOT / course["dst_name"]

    if not src_root.is_dir():
        print(f"  ! source not found: {src_root}", flush=True)
        return (0, 0)

    if clean and dst_root.exists():
        shutil.rmtree(dst_root)
    dst_root.mkdir(parents=True, exist_ok=True)

    md_files = collect_markdown_files(src_root)
    print(f"\n=== {course['label']} ===", flush=True)
    print(f"  source : {src_root.relative_to(REPO_ROOT)}", flush=True)
    print(f"  target : {dst_root.relative_to(REPO_ROOT)}", flush=True)
    print(f"  files  : {len(md_files)}", flush=True)

    ok = 0
    failed = 0
    for idx, md_path in enumerate(md_files, start=1):
        docx_path = out_path_for(src_root, dst_root, md_path)
        title = derive_title(md_path)
        rel_md = md_path.relative_to(REPO_ROOT)
        rel_dx = docx_path.relative_to(REPO_ROOT)
        print(f"  [{idx:>2}/{len(md_files)}] {rel_md} -> {rel_dx}", flush=True)
        try:
            run_pandoc(md_path, docx_path, title)
            ok += 1
        except subprocess.CalledProcessError as exc:
            failed += 1
            print(f"        ! pandoc failed (exit {exc.returncode})", flush=True)

    return ok, failed


def write_output_readme(total_ok: int, total_failed: int) -> None:
    readme = OUTPUT_ROOT / "README.md"
    OUTPUT_ROOT.mkdir(parents=True, exist_ok=True)
    readme.write_text(
        "# Word Document Courses\n\n"
        "Auto-generated Microsoft Word (.docx) versions of both courses in this repo.\n\n"
        "## Courses\n\n"
        "- `react-snooker-course/` -- the 7-chapter React + Next.js course built around the Snooker Fantasy League app.\n"
        "- `ai-interview-course/` -- the 6-chapter AI-Assisted Development Interview Prep Course.\n\n"
        "## Styling\n\n"
        "Each document is generated with Pandoc and a custom reference.docx that applies:\n\n"
        "- Roboto for body text and headings; Roboto Mono for code blocks (Word will fall back to a near match if Roboto is not installed locally -- install Roboto from https://fonts.google.com/specimen/Roboto for the intended look).\n"
        "- A navy / blue color palette across H1, H2, H3.\n"
        "- 11pt body text with 1.4 line spacing for legibility.\n"
        "- 9pt monospace code blocks on a light gray background.\n"
        "- 1-inch margins on all sides.\n"
        "- Headings that pull together with their following paragraph (no orphan headings).\n"
        "- A subtle rule under every H1.\n\n"
        "## Regenerating\n\n"
        "From the repo root:\n\n"
        "```pwsh\n"
        "python tools\\build_reference_docx.py     # rebuild the styled reference.docx\n"
        "python tools\\convert_courses.py --clean  # rebuild every .docx in this folder\n"
        "```\n\n"
        f"Last build: {total_ok} succeeded, {total_failed} failed.\n",
        encoding="utf-8",
    )


def main(argv: list[str]) -> int:
    parser = argparse.ArgumentParser(description="Convert course markdown to .docx")
    parser.add_argument(
        "--course",
        choices=("ai", "react", "both"),
        default="both",
        help="Which course to convert (default: both)",
    )
    parser.add_argument(
        "--clean",
        action="store_true",
        help="Delete the target course folder before converting",
    )
    args = parser.parse_args(argv)

    if not REFERENCE_DOC.is_file():
        print(
            f"reference.docx not found at {REFERENCE_DOC}.\n"
            "Run: python tools/build_reference_docx.py",
            file=sys.stderr,
        )
        return 2

    OUTPUT_ROOT.mkdir(parents=True, exist_ok=True)

    targets = ("ai", "react") if args.course == "both" else (args.course,)
    started = time.time()
    total_ok = 0
    total_failed = 0
    for key in targets:
        ok, failed = convert_course(key, clean=args.clean)
        total_ok += ok
        total_failed += failed

    elapsed = time.time() - started
    print(
        f"\nDone in {elapsed:.1f}s -- {total_ok} succeeded, {total_failed} failed.",
        flush=True,
    )

    write_output_readme(total_ok, total_failed)
    return 0 if total_failed == 0 else 1


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
