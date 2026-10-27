# Learning outcome settings

Admin learning-outcome routes and `learning-outcome-year` bulk-update rules.

See also:

- [primary-reports.md](primary-reports.md)
- [awardees.md](awardees.md)
- [reports.md](reports.md)

## Admin

| Route | Notes |
| --- | --- |
| /learning-outcomes | List. Also /learning-outcomes/add, /learning-outcomes/:learningOutcomeId |
| /learning-outcome-in-years | In-year list. Also /learning-outcome-in-years/add, /learning-outcome-in-years/:learningOutcomeYearId, /learning-outcome-in-years/:learningOutcomeYearId/edit |
| /learning-outcome-grade-settings | Grade settings. Also /learning-outcome-grade-settings/add, /learning-outcome-grade-settings/:loGradeSettingId |
| /learning-outcome-analyses | Analyses |

Modules: learning-outcome, learning-outcome-year, learning-outcome-analysis, learning-outcome-certificate, learning-indicator, learning-indicator-grade, lo-grade-setting, lo-year-learning-outcome.

Awardees consume indicator grades: [awardees.md](awardees.md). Mark order used there: BEGINNING 1, DEVELOPING 2, COMPETENT 3, PROFICIENT 4.

## Bulk update (`learning-outcome-year`)

From [LOGIC_CHANGES_SUMMARY.md](../LOGIC_CHANGES_SUMMARY.md). These rules moved here from [primary-reports.md](primary-reports.md).

- In-batch duplicate check: load current DB rows for IDs in the batch; `seen` Map of combinations; catch two new items with the same combination, a new item vs an update, and an update vs a new item.
- Merge when a record is moved onto an existing combination (example in that note: record 2695 term 3 changed to term 2, record 2689 already has term 2). Merge learning indicators into the existing row; mark the changing record `__skip = true`. Error only if both records are changing to the same combination.
- Normalize IDs to numbers (`normalizeToNumber` on masterLevelId, campusId, academicYearId, term; learning indicator IDs `parseInt` before `LearningIndicator.find()`).
- Skip `checkDuplicate` when the combination did not change (indicator-only update).
- Reload relations after save (`learningIndicators`, `learningOutcomes`).

MUST: load `learningIndicators` and `learningOutcomes` on GET (`findOne`, `findAll`, `findWithQuery`). MUST NOT: compare string IDs to numeric IDs.

[Wiki home](README.md)
