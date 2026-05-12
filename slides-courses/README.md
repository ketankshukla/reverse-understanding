# Reveal.js Slide Decks
Auto-generated HTML slide decks (one per chapter), using Pandoc's Reveal.js writer.
## Layout
- `ai-interview-course/` -- 7 HTML decks (one per chapter)
- `react-snooker-course/` -- 8 HTML decks (one per chapter)

## How to view

Open any `.html` file directly in your browser. Reveal.js loads from a CDN; no install required.

Keyboard shortcuts:
- Arrow keys / Space -- next/previous slide
- `S` -- speaker view
- `F` -- fullscreen
- `?` -- show all shortcuts

## Regenerate

```pwsh
python tools\convert_extra_formats.py --formats slides --clean
```
