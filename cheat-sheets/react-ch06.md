# React Course — Chapter 6 Cheat Sheet

## Data Visualization with Recharts

> **The chart is a *view* of the data; the data shape is what you control. Reshape *for* the chart, not the other way around.**

## Key concepts

- **Recharts** — declarative React chart library; built on SVG.
- **The 5 building blocks**: `<ResponsiveContainer>`, `<LineChart>` (or Bar/Pie/etc), `<XAxis>`, `<YAxis>`, `<Tooltip>`.
- **Pivot** — reshape "long" rows into "wide" columns (or vice versa) for charting.
- **Internal chart state** — hover, active dot, tooltip — Recharts manages this; you don't.
- **Categorical vs continuous axes** — wrong axis type is the most common bug.

## The reshape recipe

1. **Start with the chart you want.** Sketch the X and Y axes.
2. **Identify the row shape** that chart needs. Each row = one tick on the X axis.
3. **Write a small pivot function** in `lib/` that transforms domain data → chart rows.
4. **The component is now trivial** — `<LineChart data={rows} />`.

## Patterns / decisions

- **Reshape outside the component.** A `lib/charts.ts` pivot function is testable; an inline `.map` chain isn't.
- **Always use `<ResponsiveContainer>`.** It saves a class of "the chart is invisible" bugs.
- **Format axes explicitly** — `<XAxis tickFormatter={...} />`. Default formatting will surprise you.
- **Pick a small palette** — 3-5 distinct colors. More than that and the user can't tell series apart.

## Senior soundbites

> *"Every charting bug is a data-shape bug in disguise."*

> *"If your chart component has 50 lines of `.map` and `.reduce`, the wrong function is in the wrong file."*

> *"The right chart is the boring chart. Save the radial-progress-with-rainbow-gradient for the personal site."*

## If asked in an interview

> *"How do you approach data visualization?"*

Answer: I separate the *data shape the chart needs* from *the domain data shape* — they're almost never the same. I write a pivot function in `lib/` to bridge them, test that function alone, then drop the result into Recharts. The chart component itself ends up being almost trivially short, which is the point.
