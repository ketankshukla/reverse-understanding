# Flashcards

Anki-importable CSV decks auto-generated from both courses.

## Files

- `react-snooker.csv` -- 358 cards
- `ai-interview.csv` -- 736 cards

## CSV columns

1. `front` -- the prompt shown first
2. `back` -- the answer
3. `tags` -- space-separated tags (e.g. `self-quiz`, `soundbite`, `concept`)
4. `source` -- the original markdown path the card was extracted from

## Importing into Anki

1. File > Import > pick the CSV.
2. Field separator: Comma.
3. Map fields: 1->Front, 2->Back, 3->Tags. Skip field 4 (or map to a custom field for traceability).
4. Allow HTML in fields: yes.

## Importing into Mochi / RemNote

Both support CSV import with similar field mapping.

## Regenerating

```pwsh
python tools\build_flashcards.py
```

Manually edit the CSV after generation to prune, rewrite, or merge cards.
The script can be re-run safely -- it overwrites the CSV.
