# Word Document Courses

Auto-generated Microsoft Word (.docx) versions of both courses in this repo.

## Courses

- `react-snooker-course/` -- the 7-chapter React + Next.js course built around the Snooker Fantasy League app.
- `ai-interview-course/` -- the 6-chapter AI-Assisted Development Interview Prep Course.

## Styling

Each document is generated with Pandoc and a custom reference.docx that applies:

- Roboto for body text and headings; Roboto Mono for code blocks (Word will fall back to a near match if Roboto is not installed locally -- install Roboto from https://fonts.google.com/specimen/Roboto for the intended look).
- A navy / blue color palette across H1, H2, H3.
- 11pt body text with 1.4 line spacing for legibility.
- 9pt monospace code blocks on a light gray background.
- 1-inch margins on all sides.
- Headings that pull together with their following paragraph (no orphan headings).
- A subtle rule under every H1.

## Regenerating

From the repo root:

```pwsh
python tools\build_reference_docx.py     # rebuild the styled reference.docx
python tools\convert_courses.py --clean  # rebuild every .docx in this folder
```

Last build: 55 succeeded, 0 failed.
