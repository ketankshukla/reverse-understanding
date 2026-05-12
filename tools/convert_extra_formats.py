"""
Generate PDF + EPUB + Reveal.js slide exports of both courses, alongside the existing DOCX output.

Usage:
    python tools/convert_extra_formats.py               # generate all 3 formats for both courses
    python tools/convert_extra_formats.py --formats pdf
    python tools/convert_extra_formats.py --formats epub slides
    python tools/convert_extra_formats.py --course ai
    python tools/convert_extra_formats.py --clean       # wipe per-format output dirs first

Outputs:
    pdf-courses/<course>/...lesson.pdf   (per-lesson PDFs)
    pdf-courses/<course>.pdf             (combined PDF per course)
    epub-courses/<course>.epub           (one EPUB per course)
    slides-courses/<course>/<chapter>.html  (one Reveal.js deck per chapter)

PDF uses xelatex (MiKTeX on Windows) with Roboto if available, else the default font.
EPUB uses Pandoc's built-in EPUB writer.
Slides use Pandoc's Reveal.js writer with the white theme.
"""

from __future__ import annotations

import argparse
import shutil
import subprocess
import sys
import time
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
PDF_ROOT = REPO_ROOT / "pdf-courses"
EPUB_ROOT = REPO_ROOT / "epub-courses"
SLIDES_ROOT = REPO_ROOT / "slides-courses"

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

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------


def derive_title(md_path: Path) -> str:
    try:
        for raw in md_path.open("r", encoding="utf-8"):
            line = raw.strip()
            if line.startswith("#"):
                return line.lstrip("#").strip()
    except OSError:
        pass
    return md_path.stem.replace("-", " ").title()


def out_path_for(src_root: Path, dst_root: Path, md_path: Path, extension: str) -> Path:
    rel = md_path.relative_to(src_root)
    parts = list(rel.parts)
    stem = Path(parts[-1]).stem
    parts[-1] = ("00-README" if stem.upper() == "README" else stem) + f".{extension}"
    return dst_root.joinpath(*parts)


def collect_markdown_files(src_root: Path) -> list[Path]:
    return sorted(src_root.rglob("*.md"))


def collect_chapters(src_root: Path) -> list[tuple[str, list[Path]]]:
    """Return (chapter_name, files) tuples, sorted. Top-level files form a 'frontmatter' chapter."""
    chapters: dict[str, list[Path]] = {}
    top: list[Path] = []
    for md in collect_markdown_files(src_root):
        rel = md.relative_to(src_root)
        if len(rel.parts) == 1:
            top.append(md)
        else:
            chapters.setdefault(rel.parts[0], []).append(md)
    out: list[tuple[str, list[Path]]] = []
    if top:
        out.append(("frontmatter", top))
    for name in sorted(chapters):
        # within a chapter, put README first then numbered lessons
        files = chapters[name]
        files.sort(key=lambda p: (p.stem.upper() != "README", p.name))
        out.append((name, files))
    return out


def run(cmd: list[str]) -> None:
    subprocess.run(cmd, check=True, cwd=str(REPO_ROOT))


# ---------------------------------------------------------------------------
# PDF (xelatex via Pandoc)
# ---------------------------------------------------------------------------


PDF_VARIABLES = [
    "-V", "geometry:margin=1in",
    "-V", "fontsize=12pt",
    "-V", "linestretch=1.25",
    "-V", "colorlinks=true",
    "-V", "linkcolor=NavyBlue",
    "-V", "urlcolor=NavyBlue",
    "-V", "toccolor=NavyBlue",
    # Roboto is installed on this machine; Consolas is the safe Windows mono.
    # If you have Roboto Mono installed too, change monofont below.
    "-V", "mainfont=Roboto",
    "-V", "monofont=Consolas",
    "-V", "sansfont=Roboto",
    "-V", "papersize=letter",
]


def pdf_cmd(inputs: list[Path], output: Path, title: str | None = None, toc: bool = False) -> list[str]:
    cmd = ["pandoc", *map(str, inputs), "-o", str(output),
           "-f", PANDOC_FROM, "--pdf-engine=xelatex",
           "--syntax-highlighting=tango", "--standalone", "--wrap=preserve"]
    cmd.extend(PDF_VARIABLES)
    if title:
        cmd.extend(["--metadata", f"title:{title}"])
    if toc:
        cmd.extend(["--toc", "--toc-depth=3"])
    return cmd


def build_pdfs(course_key: str) -> tuple[int, int]:
    course = COURSES[course_key]
    src_root: Path = course["src"]
    dst_root = PDF_ROOT / course["dst_name"]
    dst_root.mkdir(parents=True, exist_ok=True)

    md_files = collect_markdown_files(src_root)
    ok = 0
    failed = 0
    print(f"  per-lesson PDFs ({len(md_files)}) ...")
    for idx, md_path in enumerate(md_files, start=1):
        out = out_path_for(src_root, dst_root, md_path, "pdf")
        out.parent.mkdir(parents=True, exist_ok=True)
        try:
            run(pdf_cmd([md_path], out, title=derive_title(md_path)))
            ok += 1
        except subprocess.CalledProcessError as exc:
            failed += 1
            print(f"      ! pdf failed for {md_path.relative_to(REPO_ROOT)} (exit {exc.returncode})")

    # combined
    combined_out = PDF_ROOT / f"{course['dst_name']}.pdf"
    print(f"  combined PDF -> {combined_out.relative_to(REPO_ROOT)}")
    try:
        run(pdf_cmd(md_files, combined_out, title=course["label"], toc=True))
        ok += 1
    except subprocess.CalledProcessError as exc:
        failed += 1
        print(f"      ! combined pdf failed (exit {exc.returncode})")
    return ok, failed


# ---------------------------------------------------------------------------
# EPUB
# ---------------------------------------------------------------------------


def build_epub(course_key: str) -> tuple[int, int]:
    course = COURSES[course_key]
    src_root: Path = course["src"]
    EPUB_ROOT.mkdir(parents=True, exist_ok=True)
    out = EPUB_ROOT / f"{course['dst_name']}.epub"

    md_files = collect_markdown_files(src_root)
    print(f"  combined EPUB -> {out.relative_to(REPO_ROOT)}")
    cmd = [
        "pandoc", *map(str, md_files), "-o", str(out),
        "-f", PANDOC_FROM, "-t", "epub3",
        "--syntax-highlighting=tango", "--toc", "--toc-depth=2",
        "--metadata", f"title:{course['label']}",
        "--metadata", "lang:en-US",
        "--metadata", "creator:Ketan Shukla",
    ]
    try:
        run(cmd)
        return 1, 0
    except subprocess.CalledProcessError as exc:
        print(f"      ! epub failed (exit {exc.returncode})")
        return 0, 1


# ---------------------------------------------------------------------------
# Reveal.js slides (one deck per chapter)
# ---------------------------------------------------------------------------


def build_slides(course_key: str) -> tuple[int, int]:
    course = COURSES[course_key]
    src_root: Path = course["src"]
    dst_root = SLIDES_ROOT / course["dst_name"]
    dst_root.mkdir(parents=True, exist_ok=True)

    ok = 0
    failed = 0
    for chapter_name, files in collect_chapters(src_root):
        out = dst_root / f"{chapter_name}.html"
        cmd = [
            "pandoc", *map(str, files), "-o", str(out),
            "-f", PANDOC_FROM, "-t", "revealjs",
            "--standalone", "--slide-level=2",
            "-V", "theme=white",
            "-V", "transition=fade",
            "-V", "controls=true",
            "-V", "progress=true",
            "--syntax-highlighting=tango",
            "--metadata", f"title:{chapter_name.replace('-', ' ').title()}",
        ]
        print(f"  slides -> {out.relative_to(REPO_ROOT)}")
        try:
            run(cmd)
            ok += 1
        except subprocess.CalledProcessError as exc:
            failed += 1
            print(f"      ! slides failed for {chapter_name} (exit {exc.returncode})")
    return ok, failed


# ---------------------------------------------------------------------------
# Readme writers
# ---------------------------------------------------------------------------


def write_pdf_readme(per_course_counts: dict[str, int]) -> None:
    body = ["# PDF Courses\n",
            "Auto-generated PDF exports of both courses. Built with Pandoc and the xelatex engine.\n",
            "## Layout\n"]
    for course_key, count in per_course_counts.items():
        course = COURSES[course_key]
        body.append(
            f"- `{course['dst_name']}/` -- {count} per-lesson PDFs\n"
            f"- `{course['dst_name']}.pdf` -- combined single-volume PDF with TOC\n"
        )
    body.append(
        "\n## Styling\n\n"
        "- 1-inch margins, 12pt body, 1.25 line spacing\n"
        "- Roboto / Roboto Mono if installed, else the xelatex default (Latin Modern)\n"
        "- Navy blue hyperlinks and TOC entries\n"
        "- US Letter page size (change with `-V papersize=a4` in the script if you need A4)\n\n"
        "## Regenerate\n\n"
        "```pwsh\n"
        "python tools\\convert_extra_formats.py --formats pdf --clean\n"
        "```\n"
    )
    PDF_ROOT.mkdir(parents=True, exist_ok=True)
    (PDF_ROOT / "README.md").write_text("".join(body), encoding="utf-8")


def write_epub_readme() -> None:
    body = (
        "# EPUB Courses\n\n"
        "Auto-generated EPUB3 exports for e-readers (Kindle, Kobo, Apple Books, Boox).\n\n"
        "## Files\n\n"
    )
    for course_key in COURSES:
        course = COURSES[course_key]
        body += f"- `{course['dst_name']}.epub`\n"
    body += (
        "\n## How to read\n\n"
        "**Kindle:** email the `.epub` to your Send-to-Kindle address, or open with the free Kindle Previewer.\n\n"
        "**Apple Books / Kobo:** double-click the file.\n\n"
        "**Calibre:** add to library; convert if your device prefers mobi/azw3.\n\n"
        "## Regenerate\n\n"
        "```pwsh\n"
        "python tools\\convert_extra_formats.py --formats epub --clean\n"
        "```\n"
    )
    EPUB_ROOT.mkdir(parents=True, exist_ok=True)
    (EPUB_ROOT / "README.md").write_text(body, encoding="utf-8")


def write_slides_readme(per_course_counts: dict[str, int]) -> None:
    body = ["# Reveal.js Slide Decks\n",
            "Auto-generated HTML slide decks (one per chapter), using Pandoc's Reveal.js writer.\n",
            "## Layout\n"]
    for course_key, count in per_course_counts.items():
        course = COURSES[course_key]
        body.append(f"- `{course['dst_name']}/` -- {count} HTML decks (one per chapter)\n")
    body.append(
        "\n## How to view\n\n"
        "Open any `.html` file directly in your browser. Reveal.js loads from a CDN; no install required.\n\n"
        "Keyboard shortcuts:\n"
        "- Arrow keys / Space -- next/previous slide\n"
        "- `S` -- speaker view\n"
        "- `F` -- fullscreen\n"
        "- `?` -- show all shortcuts\n\n"
        "## Regenerate\n\n"
        "```pwsh\n"
        "python tools\\convert_extra_formats.py --formats slides --clean\n"
        "```\n"
    )
    SLIDES_ROOT.mkdir(parents=True, exist_ok=True)
    (SLIDES_ROOT / "README.md").write_text("".join(body), encoding="utf-8")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------


def main(argv: list[str]) -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--formats", nargs="+", choices=("pdf", "epub", "slides"), default=("pdf", "epub", "slides"))
    parser.add_argument("--course", choices=("ai", "react", "both"), default="both")
    parser.add_argument("--clean", action="store_true")
    args = parser.parse_args(argv)

    if args.clean:
        for fmt, root in (("pdf", PDF_ROOT), ("epub", EPUB_ROOT), ("slides", SLIDES_ROOT)):
            if fmt in args.formats and root.exists():
                shutil.rmtree(root)

    targets = ("ai", "react") if args.course == "both" else (args.course,)
    started = time.time()

    pdf_counts: dict[str, int] = {}
    slides_counts: dict[str, int] = {}
    total_ok = 0
    total_failed = 0

    for key in targets:
        course = COURSES[key]
        print(f"\n=== {course['label']} ===")
        if "pdf" in args.formats:
            ok, failed = build_pdfs(key)
            pdf_counts[key] = ok - 1 if ok else 0  # subtract the combined file
            total_ok += ok; total_failed += failed
        if "epub" in args.formats:
            ok, failed = build_epub(key)
            total_ok += ok; total_failed += failed
        if "slides" in args.formats:
            ok, failed = build_slides(key)
            slides_counts[key] = ok
            total_ok += ok; total_failed += failed

    if "pdf" in args.formats:
        write_pdf_readme(pdf_counts)
    if "epub" in args.formats:
        write_epub_readme()
    if "slides" in args.formats:
        write_slides_readme(slides_counts)

    elapsed = time.time() - started
    print(f"\nDone in {elapsed:.1f}s -- {total_ok} succeeded, {total_failed} failed.")
    return 0 if total_failed == 0 else 1


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
