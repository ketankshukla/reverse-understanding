# PDF Courses
Auto-generated PDF exports of both courses. Built with Pandoc and the xelatex engine.
## Layout
- `ai-interview-course/` -- 26 per-lesson PDFs
- `ai-interview-course.pdf` -- combined single-volume PDF with TOC
- `react-snooker-course/` -- 31 per-lesson PDFs
- `react-snooker-course.pdf` -- combined single-volume PDF with TOC

## Styling

- 1-inch margins, 12pt body, 1.25 line spacing
- Roboto / Roboto Mono if installed, else the xelatex default (Latin Modern)
- Navy blue hyperlinks and TOC entries
- US Letter page size (change with `-V papersize=a4` in the script if you need A4)

## Regenerate

```pwsh
python tools\convert_extra_formats.py --formats pdf --clean
```
