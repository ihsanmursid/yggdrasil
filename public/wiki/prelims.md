# Prelims

PRELIMS_QNA answers and the migration constraint. Plan file is a plan.

See also:

- [cambridge.md](cambridge.md)
- [thresholds.md](thresholds.md)
- [cambridge-pum.md](cambridge-pum.md)
- [open-questions.md](open-questions.md)

From [PRELIMS_QNA.md](../PRELIMS_QNA.md). Migration plan (not shipped as a contract): [PRELIMS_MIGRATION_PLAN.md](../PRELIMS_MIGRATION_PLAN.md). Model: [cambridge.md](cambridge.md).

## Binding constraint

`student_cambridge_grade.syllabus_component_id` is NOT NULL. A paper mark can only be stored if that subject's syllabus for that year has a grid row for the paper carrying a Total Marks cell. Migration and live entry both need that cell. All 448 existing rows in the plan note point at a Total Marks cell.

Q2 answered option (d): copy Total Marks from a neighbouring year of the same subject where possible, skip the rest, and report exactly what was copied and skipped. Do not invent Weight / Total Marks. Inventing them changes computed grades.

## predicted_pum

Q1 answered option (b): store `predicted_pum` as max(prelim PUM, FYA).

GPA Cambridge branch (`cambridgeProgramme != NONE`) reads `predicted_pum` or `as_predicted_pum` directly, with no extra max and no fallback. Non-Cambridge uses max(FYA, PUM from FYA).

Example recorded in that Q&A: Aaron 2023/2024 Biology FYA 82 vs prelim PUM 80; transcript 82, which is the max.

Roll-up columns from [PRELIMS_MIGRATION_PLAN.md](../PRELIMS_MIGRATION_PLAN.md) (status: plan only):

| Threshold type | ACTUAL | PRELIMINARY / PREDICTED |
| --- | --- | --- |
| IGCSE_ALEVEL (IGCSE, A Level) | grade_mark, final_grade, pum | predicted_grade_mark, predicted_final_grade, predicted_pum |
| AS_PRELIM (AS only) | grade_mark, final_grade, as_pum | predicted_grade_mark, predicted_final_grade, as_predicted_pum |

`grade_type` ∈ PRELIMINARY / PREDICTED / ACTUAL.

## Q11 term vs level

Q11 in [PRELIMS_QNA.md](../PRELIMS_QNA.md): code currently selects by term, not by level.

    subjectFinalMark = term == 2 ? studentGrade.asPredictedPum : studentGrade.predictedPum

Term 2 gets the AS column; every other term gets `predicted_pum`. No master-level test and no fallback when the chosen column is empty.

That file records the answer as: leave as is; the term-based selection is correct; no change made. The catalog still flags the mismatch with the level-based description (Secondary IGCSE vs JC AS/A Level). See [open-questions.md](open-questions.md).

## Academic year

Q3 answered: follow `academic_year_id` as migrated; do not pin to AY22. Effective from/to is no longer used for lookup.

## Source volumes (plan note)

`subjectprelims` 40 rows. `classsubjectprelims` 1,725. `enrollprelims` 22,962. 2,322 distinct students, academic years 20–26. Proposed tag `src_db = 23`. Status on that file: plan only — nothing written to any database yet.

[Wiki home](README.md)
