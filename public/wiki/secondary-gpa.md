# Secondary GPA

Admin GPA grading scale and subject unit. FYA math stays on the secondary gradebook page.

See also:

- [secondary-gradebook.md](secondary-gradebook.md)
- [gradebooks.md](gradebooks.md)
- [report-types.md](report-types.md)
- [prelims.md](prelims.md)

## Admin

| Route | Notes |
| --- | --- |
| /secondary-gpa-gs | Grading scale list |
| /secondary-gpa-gs/new | New scale |
| /secondary-gpa-gs/:id | Edit scale |
| /secondary-gpa-su | Subject unit list |
| /secondary-gpa-su/:masterLevelId/:subjectId | Versions for one level and subject |

Modules: secondary-gpa-grading-scale, secondary-gpa-subject-unit.

Files: `bbs/client/src/views/secondaryGpaGradingScales/`, `bbs/client/src/views/secondaryGpaSubjectUnits/`.

## Form defaults on the scale page

`SecondaryGpaGradingScaleForm.jsx` ships this DEFAULTS array (letterGrade, percentageBreakpoint, gpValue). These are form defaults in that file, not a second FYA formula.

| letterGrade | percentageBreakpoint | gpValue |
| --- | --- | --- |
| A | 100 | 4.0 |
| A- | 89 | 3.75 |
| B+ | 79 | 3.5 |
| B | 75 | 3.25 |
| B- | 72 | 3.0 |
| C+ | 69 | 2.75 |
| C | 65 | 2.5 |
| C- | 62 | 2.25 |
| D+ | 59 | 2.0 |
| D | 55 | 1.75 |
| D- | 52 | 1.5 |
| E+ | 49 | 1.25 |
| E | 45 | 1.0 |

## GPA report roll-up

`ReportTypeEnum.GPA` HTML is `createSecondaryStudentGpaReport` in `secondary-gpa-report.helper.ts`. Template `secondary-student-gpa-report.hbs`. Type dispatch: [report-types.md](report-types.md). Do not copy FYA percents onto this page. FYA math: [secondary-gradebook.md](secondary-gradebook.md).

- History: `student.classYears.slice(0, 4)`.
- Per year: `gpaNumerator` / `gpaDenominator` into that year's `gpa`.
- Cumulative: `cumulativeGpa / classYearInfo.length` stored as `weightedCumulativeGpa`.
- Cambridge subject (`cambridgeProgramme !== NONE`): `asPredictedPum` when `term == 2`, else `predictedPum`. Term vs level: [prelims.md](prelims.md) Q11.
- Non-Cambridge academic: `examType == SA` and `term == 2` on the last class year when `term == 2`, else `examType == FYA`.
- `academicRankClassSize` is encoded as `` `1/${classYear.students.length}` `` with comment `:p`. Encoded quirk, not policy.

GPA report does not read `ReportSetting`. It uses `GpaGradingScale` and `GpaSubjectUnit`.

[Wiki home](README.md)
