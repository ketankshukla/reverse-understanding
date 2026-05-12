"""
Build a Pandoc reference.docx with professional Roboto-based styling.

Usage:
    python tools/build_reference_docx.py

Produces:
    tools/reference.docx  (consumed by tools/convert_courses.py)

Strategy:
    1. Ask Pandoc for its default reference.docx (which already contains every
       style Pandoc emits when generating a .docx).
    2. Open it with python-docx and override fonts, sizes, colors, spacing.
    3. Save the modified file back as our reference.docx.

This is more reliable than building a docx from scratch because Pandoc is
fussy about which styles must exist with which exact names.
"""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path

from docx import Document
from docx.enum.style import WD_STYLE_TYPE
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Inches, Pt, RGBColor

# ---------------------------------------------------------------------------
# Design tokens
# ---------------------------------------------------------------------------

BODY_FONT = "Roboto"
MONO_FONT = "Roboto Mono"

# Color palette (deep, professional, high-contrast)
COLOR_PRIMARY = RGBColor(0x1F, 0x3A, 0x5F)    # deep navy   -- title / H1
COLOR_SECONDARY = RGBColor(0x2E, 0x5A, 0x88)  # mid blue    -- H2
COLOR_TERTIARY = RGBColor(0x3D, 0x7A, 0xB8)   # accent blue -- H3
COLOR_QUATERNARY = RGBColor(0x5A, 0x5A, 0x5A) # dark gray   -- H4-6
COLOR_BODY = RGBColor(0x1A, 0x1A, 0x1A)       # near-black  -- body text
COLOR_MUTED = RGBColor(0x55, 0x55, 0x55)      # mid gray    -- subtitle / quote
COLOR_LINK = RGBColor(0x2E, 0x5A, 0x88)       # mid blue    -- hyperlinks

# Font sizes (points) -- larger, glasses-free reading
SIZE_TITLE = 36
SIZE_SUBTITLE = 20
SIZE_H1 = 28
SIZE_H2 = 22
SIZE_H3 = 18
SIZE_H4 = 16
SIZE_H5 = 14
SIZE_H6 = 14
SIZE_BODY = 14
SIZE_CODE = 12
SIZE_QUOTE = 14

REPO_ROOT = Path(__file__).resolve().parent.parent
TOOLS_DIR = REPO_ROOT / "tools"
DEFAULT_REF_PATH = TOOLS_DIR / "_pandoc-default-reference.docx"
OUTPUT_REF_PATH = TOOLS_DIR / "reference.docx"


# ---------------------------------------------------------------------------
# python-docx style helpers
# ---------------------------------------------------------------------------


def _set_rfonts(rpr_parent, font_name: str) -> None:
    """Set w:rFonts ascii/hAnsi/eastAsia/cs to the given font on a run-properties parent."""
    rpr = rpr_parent.get_or_add_rPr()
    rfonts = rpr.find(qn("w:rFonts"))
    if rfonts is None:
        rfonts = OxmlElement("w:rFonts")
        rpr.append(rfonts)
    for attr in ("w:ascii", "w:hAnsi", "w:eastAsia", "w:cs"):
        rfonts.set(qn(attr), font_name)


def style_set_font(
    style,
    font_name: str = BODY_FONT,
    *,
    size: int | None = None,
    color: RGBColor | None = None,
    bold: bool | None = None,
    italic: bool | None = None,
) -> None:
    """Apply font attributes to a paragraph or character style."""
    style.font.name = font_name
    _set_rfonts(style.element, font_name)
    if size is not None:
        style.font.size = Pt(size)
    if color is not None:
        style.font.color.rgb = color
    if bold is not None:
        style.font.bold = bold
    if italic is not None:
        style.font.italic = italic


def set_paragraph_format(style, *, before=None, after=None, line_spacing=None,
                         keep_with_next=None, page_break_before=None):
    pf = style.paragraph_format
    if before is not None:
        pf.space_before = Pt(before)
    if after is not None:
        pf.space_after = Pt(after)
    if line_spacing is not None:
        pf.line_spacing = line_spacing
    if keep_with_next is not None:
        pf.keep_with_next = keep_with_next
    if page_break_before is not None:
        pf.page_break_before = page_break_before


def style_add_bottom_border(style, color_hex: str = "DDDDDD", size: str = "6") -> None:
    """Add a thin bottom border (used for H1 to give a 'rule under heading' feel)."""
    rpr = style.element.get_or_add_pPr()
    pbdr = rpr.find(qn("w:pBdr"))
    if pbdr is None:
        pbdr = OxmlElement("w:pBdr")
        rpr.append(pbdr)
    bottom = pbdr.find(qn("w:bottom"))
    if bottom is None:
        bottom = OxmlElement("w:bottom")
        pbdr.append(bottom)
    bottom.set(qn("w:val"), "single")
    bottom.set(qn("w:sz"), size)
    bottom.set(qn("w:space"), "4")
    bottom.set(qn("w:color"), color_hex)


def style_add_shading(style, fill_hex: str) -> None:
    """Add background shading to a paragraph style (used for code blocks)."""
    ppr = style.element.get_or_add_pPr()
    shd = ppr.find(qn("w:shd"))
    if shd is None:
        shd = OxmlElement("w:shd")
        ppr.append(shd)
    shd.set(qn("w:val"), "clear")
    shd.set(qn("w:color"), "auto")
    shd.set(qn("w:fill"), fill_hex)


def get_or_add_style(doc: Document, name: str, style_type: int):
    """Return an existing style by name or add a new one."""
    try:
        return doc.styles[name]
    except KeyError:
        return doc.styles.add_style(name, style_type)


# ---------------------------------------------------------------------------
# Pandoc default-reference extraction
# ---------------------------------------------------------------------------


def extract_default_reference(target: Path) -> None:
    """Ask Pandoc for its built-in reference.docx and save it to `target`."""
    target.parent.mkdir(parents=True, exist_ok=True)
    proc = subprocess.run(
        ["pandoc", "--print-default-data-file", "reference.docx"],
        capture_output=True,
        check=True,
    )
    target.write_bytes(proc.stdout)


# ---------------------------------------------------------------------------
# Main: open default reference, override styles, save
# ---------------------------------------------------------------------------


def customize(doc: Document) -> None:
    # ---- Page geometry --------------------------------------------------
    for section in doc.sections:
        section.top_margin = Inches(1.0)
        section.bottom_margin = Inches(1.0)
        section.left_margin = Inches(1.0)
        section.right_margin = Inches(1.0)

    # ---- Normal / body --------------------------------------------------
    normal = doc.styles["Normal"]
    style_set_font(normal, BODY_FONT, size=SIZE_BODY, color=COLOR_BODY)
    set_paragraph_format(normal, after=8, line_spacing=1.4)

    # ---- Title / Subtitle ----------------------------------------------
    if "Title" in [s.name for s in doc.styles]:
        title = doc.styles["Title"]
        style_set_font(title, BODY_FONT, size=SIZE_TITLE, color=COLOR_PRIMARY, bold=True)
        set_paragraph_format(title, after=18, line_spacing=1.15)

    if "Subtitle" in [s.name for s in doc.styles]:
        subtitle = doc.styles["Subtitle"]
        style_set_font(subtitle, BODY_FONT, size=SIZE_SUBTITLE, color=COLOR_MUTED, italic=False)
        set_paragraph_format(subtitle, after=24, line_spacing=1.2)

    # ---- Headings -------------------------------------------------------
    h1 = doc.styles["Heading 1"]
    style_set_font(h1, BODY_FONT, size=SIZE_H1, color=COLOR_PRIMARY, bold=True)
    set_paragraph_format(h1, before=24, after=12, line_spacing=1.15, keep_with_next=True)
    style_add_bottom_border(h1, color_hex="DDE6F0", size="6")

    h2 = doc.styles["Heading 2"]
    style_set_font(h2, BODY_FONT, size=SIZE_H2, color=COLOR_SECONDARY, bold=True)
    set_paragraph_format(h2, before=20, after=8, line_spacing=1.15, keep_with_next=True)

    h3 = doc.styles["Heading 3"]
    style_set_font(h3, BODY_FONT, size=SIZE_H3, color=COLOR_TERTIARY, bold=True)
    set_paragraph_format(h3, before=14, after=6, line_spacing=1.2, keep_with_next=True)

    h4 = doc.styles["Heading 4"]
    style_set_font(h4, BODY_FONT, size=SIZE_H4, color=COLOR_QUATERNARY, bold=True)
    set_paragraph_format(h4, before=10, after=4, line_spacing=1.2, keep_with_next=True)

    if "Heading 5" in [s.name for s in doc.styles]:
        h5 = doc.styles["Heading 5"]
        style_set_font(h5, BODY_FONT, size=SIZE_H5, color=COLOR_QUATERNARY, bold=True, italic=True)
        set_paragraph_format(h5, before=8, after=4, keep_with_next=True)

    if "Heading 6" in [s.name for s in doc.styles]:
        h6 = doc.styles["Heading 6"]
        style_set_font(h6, BODY_FONT, size=SIZE_H6, color=COLOR_QUATERNARY, italic=True)
        set_paragraph_format(h6, before=6, after=4, keep_with_next=True)

    # ---- Block Quote ----------------------------------------------------
    if "Quote" in [s.name for s in doc.styles]:
        quote = doc.styles["Quote"]
        style_set_font(quote, BODY_FONT, size=SIZE_QUOTE, color=COLOR_MUTED, italic=True)
        set_paragraph_format(quote, before=8, after=8, line_spacing=1.4)

    if "Intense Quote" in [s.name for s in doc.styles]:
        iq = doc.styles["Intense Quote"]
        style_set_font(iq, BODY_FONT, size=SIZE_QUOTE, color=COLOR_PRIMARY, italic=True, bold=True)
        set_paragraph_format(iq, before=12, after=12, line_spacing=1.4)

    # ---- Code -----------------------------------------------------------
    # Pandoc uses 'Source Code' for fenced code blocks (paragraph style)
    # and 'Verbatim Char' for inline code (character style).
    sc = get_or_add_style(doc, "Source Code", WD_STYLE_TYPE.PARAGRAPH)
    style_set_font(sc, MONO_FONT, size=SIZE_CODE, color=COLOR_BODY)
    set_paragraph_format(sc, before=4, after=4, line_spacing=1.25)
    style_add_shading(sc, fill_hex="F4F4F4")

    if "Verbatim Char" in [s.name for s in doc.styles]:
        vc = doc.styles["Verbatim Char"]
        style_set_font(vc, MONO_FONT, size=SIZE_CODE + 1, color=COLOR_PRIMARY)

    # ---- Lists ----------------------------------------------------------
    for list_style_name in (
        "List Paragraph",
        "List Bullet",
        "List Bullet 2",
        "List Bullet 3",
        "List Number",
        "List Number 2",
        "List Number 3",
        "Compact",
        "First Paragraph",
        "Body Text",
    ):
        if list_style_name in [s.name for s in doc.styles]:
            ls = doc.styles[list_style_name]
            style_set_font(ls, BODY_FONT, size=SIZE_BODY, color=COLOR_BODY)
            set_paragraph_format(ls, after=4, line_spacing=1.35)

    # ---- Hyperlink ------------------------------------------------------
    if "Hyperlink" in [s.name for s in doc.styles]:
        hl = doc.styles["Hyperlink"]
        style_set_font(hl, BODY_FONT, color=COLOR_LINK)

    # ---- Table styles (light, subtle) ----------------------------------
    if "Table Grid" in [s.name for s in doc.styles]:
        tg = doc.styles["Table Grid"]
        style_set_font(tg, BODY_FONT, size=SIZE_BODY, color=COLOR_BODY)

    # ---- Captions / Footer / Header ------------------------------------
    for misc_name in ("Caption", "Header", "Footer", "TOC Heading"):
        if misc_name in [s.name for s in doc.styles]:
            ms = doc.styles[misc_name]
            style_set_font(ms, BODY_FONT, color=COLOR_MUTED)

    # ---- TOC entries ----------------------------------------------------
    for toc_name in ("TOC 1", "TOC 2", "TOC 3", "TOC 4"):
        if toc_name in [s.name for s in doc.styles]:
            ts = doc.styles[toc_name]
            style_set_font(ts, BODY_FONT, size=SIZE_BODY, color=COLOR_BODY)
            set_paragraph_format(ts, after=4)


def main() -> int:
    print("[1/3] Extracting Pandoc default reference.docx ...", flush=True)
    extract_default_reference(DEFAULT_REF_PATH)

    print(f"[2/3] Customizing styles -> {OUTPUT_REF_PATH.name} ...", flush=True)
    doc = Document(str(DEFAULT_REF_PATH))
    customize(doc)
    doc.save(str(OUTPUT_REF_PATH))

    print(f"[3/3] Wrote {OUTPUT_REF_PATH.relative_to(REPO_ROOT)}", flush=True)
    return 0


if __name__ == "__main__":
    sys.exit(main())
