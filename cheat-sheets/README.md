# Cheat Sheets

One-page distilled summaries of every chapter in both courses. Use these for last-minute review, interview prep, or to refresh memory months later.

## Layout

```
cheat-sheets/
├── react-ch01.md … react-ch07.md   (7 sheets, ~300-500 words each)
├── ai-ch01.md    … ai-ch06.md      (6 sheets, ~300-500 words each)
└── README.md     (you are here)
```

## Each sheet contains

1. **One-line summary** — the chapter in a sentence.
2. **Key concepts** — bullet list of every name worth memorizing.
3. **Patterns / decisions** — the "do this, not that" of the chapter.
4. **Senior soundbites** — the memorable lines worth quoting.
5. **If asked in an interview** — the one prompt this chapter helps with most.

## How to use

- Read all 13 sheets in 30 minutes the night before an interview.
- Print the AI sheets and tape them above your desk for a week.
- Run them through the Word converter (`tools/convert_courses.py`) if you prefer DOCX/PDF/EPUB.

## Regenerate

These are hand-written. Edit the markdown directly. To re-export as Word documents:

```pwsh
python tools\convert_courses.py
```

(The `tools/convert_courses.py` script walks every `*.md` in the repo.)
