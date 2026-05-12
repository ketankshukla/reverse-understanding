# Tools — Course generation pipeline

Python scripts that turn every `.md` file in both courses
(`course/` and `ai-interview-course/`) into Word docs, PDFs, EPUBs,
Reveal.js slide decks, flashcards, glossary indexes, and MP3 narrations.

## Script index

| Script                     | Output                                                           |
| -------------------------- | ---------------------------------------------------------------- |
| `build_reference_docx.py`  | `tools/reference.docx` (Pandoc style template)                   |
| `convert_courses.py`       | `word-documents-courses/**` (Word docs)                          |
| `convert_extra_formats.py` | `pdf-courses/**`, `epub-courses/**`, `slides-courses/**`         |
| `build_flashcards.py`      | `flashcards/*.csv` + `flashcards/flashcards.json` (1,000+ cards) |
| `build_glossary.py`        | `glossary/GLOSSARY*.md` (cross-course concept index)             |
| `build_audio.py`           | `audio-courses/**/*.mp3` (TTS narration via edge-tts)            |

## One-shot regenerate everything

```pwsh
pip install -r tools\requirements.txt
python tools\build_reference_docx.py
python tools\convert_courses.py --clean
python tools\convert_extra_formats.py --clean
python tools\build_flashcards.py
python tools\build_glossary.py
python tools\build_audio.py
```

The remaining sections cover the Word pipeline in detail.

---

## What this gives you

- Roboto body and headings, Roboto Mono for code.
- Navy → blue → accent-blue heading hierarchy with a subtle rule under H1.
- 11pt body, 1.4 line spacing, 1-inch margins.
- Light gray code blocks at 9pt.
- Identical styling across all 55 lessons.

## Prerequisites

- **Pandoc 3.x** on `PATH`. Verify with `pandoc --version`.
- **Python 3.10+** with `python-docx`.

Install Python deps:

```pwsh
pip install -r tools\requirements.txt
```

Optional but recommended for the intended look — install the Roboto and
Roboto Mono fonts on your machine: <https://fonts.google.com/specimen/Roboto>
and <https://fonts.google.com/specimen/Roboto+Mono>. Word will substitute a
near-match if you skip this, but the layout works either way.

## Usage

From the repo root:

```pwsh
# 1) Build (or rebuild) the styled reference.docx that Pandoc consumes
python tools\build_reference_docx.py

# 2) Convert every markdown file in both courses
python tools\convert_courses.py --clean
```

Selective rebuilds:

```pwsh
python tools\convert_courses.py --course ai      # AI interview course only
python tools\convert_courses.py --course react   # React Snooker course only
```

`--clean` deletes the target course folder before converting; omit it for
incremental rebuilds.

## How it works

`build_reference_docx.py`:

1. Asks Pandoc for its built-in `reference.docx` (so every style Pandoc emits
   is present, with the exact names it expects).
2. Opens that file with `python-docx`, overrides every relevant paragraph and
   character style — fonts, sizes, colors, paragraph spacing, line spacing,
   borders, shading.
3. Writes the result to `tools/reference.docx`.

`convert_courses.py`:

1. Walks `course/` and `ai-interview-course/` for every `.md` file.
2. Derives the document title from the first heading in the file.
3. Calls Pandoc once per file with `--reference-doc=tools/reference.docx`.
4. Mirrors the source folder layout under `word-documents-courses/`.
   `README.md` files become `00-README.docx` so they sort first in Explorer.
5. Writes a top-level `README.md` summarizing the build.

## Output

```
word-documents-courses/
├── README.md
├── react-snooker-course/
│   ├── 00-README.docx
│   ├── 00-SNOOKER_FANTASY_LEAGUE_COURSE.docx
│   └── chapter-XX-…/
│       ├── 00-README.docx
│       └── 0X-…docx
└── ai-interview-course/
    ├── 00-README.docx
    └── chapter-XX-…/
        ├── 00-README.docx
        └── 0X-…docx
```
