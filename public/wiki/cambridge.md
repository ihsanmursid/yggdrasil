# Cambridge

Cambridge component model: five tables, `Components.val` trap, unused per-paper boundary cells. Thresholds, PUM interpolation, SVE, printing, and prelims live on child pages.

## Children

- [thresholds.md](thresholds.md) — `/threshold`, `/threshold-as-prelim`, DRAFT/ACTIVE, IGCSE_ALEVEL vs AS_PRELIM
- [cambridge-pum.md](cambridge-pum.md) — pointer to the PUM band formula note
- [sve.md](sve.md) - SVE object model and routes
- [sve-lock.md](sve-lock.md) - deadline lock and the missing `/sves/component/lock` nest path
- [sve-timetable.md](sve-timetable.md) - exam date, sessions, cover
- [sve-grade-input.md](sve-grade-input.md) - teacher grade input
- [sve-item-analysis.md](sve-item-analysis.md) - keys and analytics
- [sve-files.md](sve-files.md) - documents, BMT, past paper
- [sve-printing.md](sve-printing.md) - printing-request formulas
- [prelims.md](prelims.md) - PRELIMS_QNA and migration

See also:

- [secondary-gradebook.md](secondary-gradebook.md)
- [open-questions.md](open-questions.md)
- [academic-structure.md](academic-structure.md)
- [sources.md](sources.md)

From [CAMBRIDGE_COMPONENT_MODEL.md](../CAMBRIDGE_COMPONENT_MODEL.md) and [Threshold_Feature_Documentation.md](../docs/Threshold_Feature_Documentation.md). PUM band math: [cambridge-pum.md](cambridge-pum.md) → [cambridge-pum-formula.md](../docs/cambridge-pum-formula.md). Printing counts: [sve-printing.md](sve-printing.md) → [PRINTING_DETAIL_LOGIC.md](../PRINTING_DETAIL_LOGIC.md).

## Five tables

| Table | One row is |
| --- | --- |
| master_sve_components | A paper, per subject. Fields include name, code, subject_id, is_also_as_level |
| syllabus | Syllabus for one year and one qualification type (IGCSE, ASLEVEL, ALEVEL), with an effective range |
| syllabus_component | One cell of that syllabus grid, not one row per paper |
| grade_schema | Which letters exist for a Cambridge programme. Values are 0. Used to filter keys, not to supply marks |
| threshold | Boundary marks per subject and year. avg_value holds letter to number pairs |

`syllabus_component` cells carry `row_index`, `col_index`, `key`, `val`. A grid row is a paper. `type_value`: SchemaValue (0) is the configured grid; AverageValue (1) is an overlay. Grading reads SchemaValue.

`Components.val` is `master_sve_components.id` stored in `numeric(20,2)` with no FK. It is not a paper number. Broken `Components.val` silently creates `Paper {row_index}` with code `paper_{row_index}` on first read (`loadGradableComponents`).

`loadGradableComponents` skips rows with no Total Marks cell. `student_cambridge_grade.syllabus_component_id` stores the Total Marks cell id (NOT NULL). A paper mark cannot be stored if that chain breaks.

## Grading path

    raw_mark -> calculateScaledTotal (weight-normalised) -> determineGrade(round(scaledTotal), boundaries, thresholdType, gradeSchema)

Boundaries come from `threshold.avg_value` on the ACTIVE row, not from the per-paper a*, a, b cells in the grid. Those per-paper cells are a third boundary store and are unused on the gradebook path. Flag that. `grade_schema` only names which letters exist. See [open-questions.md](open-questions.md).

Types, DRAFT/ACTIVE, and admin routes: [thresholds.md](thresholds.md). PUM interpolation: [cambridge-pum.md](cambridge-pum.md). Do not copy those band widths into product code from this catalog.

## Unused per-paper cells

Boundaries exist in three places with different scopes:

| Where | Scope | Used for grading? |
| --- | --- | --- |
| threshold.avg_value | subject + year + threshold type | Yes (ACTIVE row) |
| grade_schema.schema | Cambridge programme | Only to say which letters exist |
| syllabus_component a*, a, b… cells | individual paper | No — at least not on this path |

## Portals

Admin owns threshold, syllabus, SVE config, printing request. Teacher enters Cambridge and SVE grades. Student does not configure thresholds.

Teacher Cambridge gradebooks: `/cambridge-gradebook/igcse`, `/cambridge-gradebook/a-level`, `/cambridge-gradebook/as-level`, `/cambridge-gradebook/:programme/:subjectYearId`. Admin also has `/student-cambridge-actual-grade`.

SVE family: [sve.md](sve.md). Printing: [sve-printing.md](sve-printing.md). Prelims: [prelims.md](prelims.md).

[Wiki home](README.md)
