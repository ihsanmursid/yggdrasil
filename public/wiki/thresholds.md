# Thresholds

Cambridge grade-boundary thresholds. Two types, two admin routes, DRAFT then ACTIVE.

See also:

- [cambridge.md](cambridge.md)
- [cambridge-pum.md](cambridge-pum.md)
- [prelims.md](prelims.md)
- [sve.md](sve.md)
- [open-questions.md](open-questions.md)

From [Threshold_Feature_Documentation.md](../docs/Threshold_Feature_Documentation.md) and the threshold section that lived on [cambridge.md](cambridge.md). Five-table model: [cambridge.md](cambridge.md). PUM after a letter is chosen: [cambridge-pum.md](cambridge-pum.md).

## Types

| Type | Admin route | Subject filter | Component filter |
| --- | --- | --- | --- |
| IGCSE_ALEVEL | /threshold | IGCSE + ALEVEL | All master SVE components |
| AS_PRELIM | /threshold-as-prelim | ALEVEL only | isAlsoAsLevel true only |

Page titles: Threshold IGCSE/A Level vs Threshold AS Prelim. Files: `bbs/client/src/views/threshold/Threshold.jsx`, `ThresholdAsPrelim.jsx`.

## Status

Threshold status: DRAFT or ACTIVE. Creating a draft removes previous drafts for the same subject and type, writes threshold configs, and calculates initial `avgValue`. Activating a draft archives the previous active row for that subject and type (soft-delete previous active, then promote).

Modules: threshold, threshold-config, syllabus, syllabus-component, grade-schema, master-sve-component, student-cambridge-grade.

## Entity fields (threshold)

From that feature note:

| Column | Type | Description |
| --- | --- | --- |
| id | int | Primary key |
| subjectId | int | FK to Subject |
| effectiveFrom | int | Start year of validity |
| effectiveTo | int | End year of validity |
| statusType | enum | DRAFT or ACTIVE |
| thresholdType | enum | IGCSE_ALEVEL or AS_PRELIM |
| avgValue | jsonb | Calculated average grades, e.g. `{a*: 90, a: 85, b: 75, ...}` |

ThresholdConfig links a threshold to syllabus years (`thresholdId`, `syllabusId`, `year`).

## Weighted average used for avgValue

From [Threshold_Feature_Documentation.md](../docs/Threshold_Feature_Documentation.md) `syncAvgGradeYear()` / `handleCalculateSyllabusComponentGrade`:

1. Extract `Weight` and `TotalMarks` for each grid row.
2. For each grade tier (a*, a, b, c, d, e): `weighted_value = (grade_value / total_marks) * weight`.
3. Sum across components.
4. Divide by the number of syllabi in the threshold.

Grading itself reads the ACTIVE `avg_value`, not the per-paper a*, a, b cells. Flag: [cambridge.md](cambridge.md), [open-questions.md](open-questions.md).

## API (threshold)

| Method | Path | Action |
| --- | --- | --- |
| GET | /v1/threshold/subject/:subjectId | Get by subject (query: thresholdType) |
| POST | /v1/threshold | Create draft |
| POST | /v1/threshold/active | Activate draft |
| PATCH | /v1/threshold/:id | Update |
| DELETE | /v1/threshold/:id | Soft-delete |

Related syllabus and master-sve-component endpoints are listed in the feature note. Do not invent extra math here.

Portals: admin owns `/threshold` and `/threshold-as-prelim`. Teacher does not configure thresholds. Student does not.

[Wiki home](README.md)
