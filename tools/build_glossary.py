"""
Extract a cross-course concept glossary from both courses.

Usage:
    python tools/build_glossary.py

Produces:
    glossary/GLOSSARY.md         (alphabetical index of terms across both courses)
    glossary/GLOSSARY-react.md   (React course only)
    glossary/GLOSSARY-ai.md      (AI course only)
"""

from __future__ import annotations

import re
from collections import defaultdict
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
OUTPUT_DIR = REPO_ROOT / "glossary"

COURSES = {
    "react": (REPO_ROOT / "course", "React + Snooker Fantasy League"),
    "ai": (REPO_ROOT / "ai-interview-course", "AI-Assisted Development Interview Prep"),
}

# Match `**Term**` but NOT `**...sentence with multiple words and punctuation.**`
# Heuristic: 1-5 words, no terminal punctuation other than letters / hyphens / slashes.
TERM_RE = re.compile(r"\*\*([A-Z][A-Za-z0-9][A-Za-z0-9 \-/]{1,40})\*\*")

# Skip words that are usually emphasis, not terms.
STOPWORDS = {
    "Yes",
    "No",
    "Why",
    "What",
    "How",
    "Then",
    "Now",
    "OK",
    "Note",
    "Important",
    "Warning",
    "Done",
    "Mine",
    "Memorize",
    "Drill",
    "Always",
    "Never",
    "First",
    "Second",
    "Third",
    "Fourth",
    "Fifth",
    "Sixth",
}


def normalize_term(term: str) -> str:
    return re.sub(r"\s+", " ", term).strip()


def excerpt_around(line: str, term_raw: str, max_len: int = 160) -> str:
    """Return a short excerpt of the sentence containing the term."""
    cleaned = re.sub(r"\*\*([^*]+)\*\*", r"\1", line)
    cleaned = re.sub(r"`([^`]+)`", r"\1", cleaned)
    cleaned = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", cleaned)
    cleaned = re.sub(r"\s+", " ", cleaned).strip()
    if len(cleaned) <= max_len:
        return cleaned
    idx = cleaned.lower().find(term_raw.lower())
    if idx < 0:
        return cleaned[:max_len].rstrip() + "..."
    start = max(0, idx - 40)
    end = min(len(cleaned), idx + len(term_raw) + (max_len - 40))
    excerpt = cleaned[start:end].strip()
    if start > 0:
        excerpt = "..." + excerpt
    if end < len(cleaned):
        excerpt = excerpt + "..."
    return excerpt


def collect(course_key: str) -> dict[str, list[dict]]:
    src_root, _label = COURSES[course_key]
    terms: dict[str, list[dict]] = defaultdict(list)
    for md_path in sorted(src_root.rglob("*.md")):
        for lineno, line in enumerate(md_path.read_text(encoding="utf-8").splitlines(), start=1):
            for m in TERM_RE.finditer(line):
                raw = normalize_term(m.group(1))
                if raw in STOPWORDS or len(raw) < 3:
                    continue
                # Skip lines that look like prompts (often start with - or are within blockquotes)
                if line.lstrip().startswith(">"):
                    continue
                terms[raw].append({
                    "path": md_path.relative_to(REPO_ROOT).as_posix(),
                    "line": lineno,
                    "excerpt": excerpt_around(line, raw),
                })
    return terms


def write_glossary(out_path: Path, title: str, terms: dict[str, list[dict]],
                   minimum_occurrences: int = 1) -> int:
    out_path.parent.mkdir(parents=True, exist_ok=True)
    sorted_terms = sorted(terms.items(), key=lambda kv: kv[0].lower())
    body = [f"# {title}\n"]
    body.append(f"Auto-generated. {len(sorted_terms)} terms.\n")
    body.append(
        "Each term lists every lesson where it appears as a bolded concept, "
        "with the first ~160 characters of the surrounding sentence for context.\n"
    )
    body.append("\n---\n")
    current_letter = ""
    for term, occurrences in sorted_terms:
        if len(occurrences) < minimum_occurrences:
            continue
        letter = term[0].upper()
        if letter != current_letter:
            current_letter = letter
            body.append(f"\n## {letter}\n")
        body.append(f"\n### {term}\n")
        body.append(f"Appears in {len(occurrences)} lesson(s):\n")
        for occ in occurrences[:6]:  # cap at 6 most informative occurrences per term
            body.append(f"- `{occ['path']}:{occ['line']}` -- {occ['excerpt']}")
        if len(occurrences) > 6:
            body.append(f"- ...and {len(occurrences) - 6} more")
        body.append("")
    out_path.write_text("\n".join(body), encoding="utf-8")
    return len(sorted_terms)


def main() -> int:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    react_terms = collect("react")
    ai_terms = collect("ai")
    combined = defaultdict(list)
    for k, v in react_terms.items():
        combined[k].extend(v)
    for k, v in ai_terms.items():
        combined[k].extend(v)

    r_count = write_glossary(OUTPUT_DIR / "GLOSSARY-react.md", "React Course Glossary", react_terms)
    a_count = write_glossary(OUTPUT_DIR / "GLOSSARY-ai.md", "AI Interview Course Glossary", ai_terms)
    c_count = write_glossary(OUTPUT_DIR / "GLOSSARY.md", "Combined Course Glossary", combined)

    (OUTPUT_DIR / "README.md").write_text(
        "# Glossary\n\n"
        "Auto-generated concept indexes for both courses.\n\n"
        "- `GLOSSARY.md` -- combined across both courses\n"
        "- `GLOSSARY-react.md` -- React Snooker course only\n"
        "- `GLOSSARY-ai.md` -- AI Interview course only\n\n"
        "Every bolded `**Term**` (1-5 words, capitalized, not a stopword) is extracted with the "
        "surrounding sentence and a citation back to the source lesson.\n\n"
        "## Regenerate\n\n"
        "```pwsh\n"
        "python tools\\build_glossary.py\n"
        "```\n",
        encoding="utf-8",
    )

    print(f"  glossary/GLOSSARY-react.md ({r_count} terms)")
    print(f"  glossary/GLOSSARY-ai.md    ({a_count} terms)")
    print(f"  glossary/GLOSSARY.md       ({c_count} terms)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
