# Cambridge PUM

Pointer to the PUM interpolation note. This page does not invent band widths.

See also:

- [cambridge.md](cambridge.md)
- [thresholds.md](thresholds.md)
- [prelims.md](prelims.md)

PUM band math lives in [cambridge-pum-formula.md](../docs/cambridge-pum-formula.md). Do not copy those band widths into product code from this catalog, and do not treat the numbers in that note as invented here.

## What the letter sets are

Summarised from that formula note and the paragraph that lived on [cambridge.md](cambridge.md):

- AS Prelim uses A–E plus U.
- IGCSE and A Level use A-star through G plus U.
- Legacy rounds the average first, then interpolates (`grade = Math.round(avg)` then PUM). Nest `calculatePUM` in `student-cambridge-grade.service.ts` follows the same idea.

Letter boundaries that feed the interpolation come from the ACTIVE threshold `avg_value`. Types: [thresholds.md](thresholds.md). Model: [cambridge.md](cambridge.md). How predicted PUM is stored for GPA: [prelims.md](prelims.md).

## Nest path named in that note

- `determineGrade()`: scaled total to letter using threshold boundaries.
- `calculatePUM()`: AS_PRELIM vs IGCSE_ALEVEL band structure as written in [cambridge-pum-formula.md](../docs/cambridge-pum-formula.md).
- A* for IGCSE/A Level is derived as `a + (a - b)` when not stored (that note). Do not restate the per-band multipliers here.

[Wiki home](README.md)
