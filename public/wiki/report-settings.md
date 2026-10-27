# Report settings

Per-level, per-academic-year JSON used by some report helpers. GPA does not read this entity.

See also:

- [reports.md](reports.md)
- [report-types.md](report-types.md)
- [report-generate.md](report-generate.md)
- [report-print.md](report-print.md)
- [secondary-gpa.md](secondary-gpa.md)
- [lo-settings.md](lo-settings.md)

## Entity

`api_nest/src/modules/report-setting/entities/report-setting.entity.ts`. Controller prefix `reportSettings`.

| Field | Notes |
| --- | --- |
| `masterLevelId` | Indexed. Nullable int. |
| `academicYearId` | Indexed. Nullable int. |
| `isDefault` | `bool`, default `false`. |
| `showUngradedSubject` | `bool`, default `true`. |
| `level` | Legacy `CohortLevelTypeEnum`, nullable. `syncMasterLevels` maps it onto `masterLevel`. |
| `setting` | JSON `ReportSettingType`. |

`setting` keys: `markingTypes` (`numericalGradeDescriptor`, `letterGradeDescriptor`), `semesteralReportFields`, `coverLetters`, `weightedMasterSubjects`, `attendances`.

## Uniqueness and default

Create calls `checkReportSettingAvailability`: one row per `(masterLevelId, academicYearId)`. Duplicate throws `ReportSettingAlreadyExistError`.

`isDefault` is exclusive per `masterLevelId`. Create or update with `isDefault === true` sets any other default for that `masterLevelId` to `false`.

## Routes

| Method | Path | Notes |
| --- | --- | --- |
| POST | `/v1/reportSettings` | Create. ACL `REPORT_SETTING` CREATE. |
| GET | `/v1/reportSettings` | List. ACL READ. |
| GET | `/v1/reportSettings/letter` | Cover letter HTML. ACL READ. Client `getReportLetter`. |
| GET | `/v1/reportSettings/syncMasterLevels` | `@Public()`. Maps legacy `level` to `masterLevel`. |
| GET | `/v1/reportSettings/:id` | One. ACL READ. |
| PUT | `/v1/reportSettings/:id` | Update. ACL UPDATE. |
| PUT | `/v1/reportSettings/copy/:id` | Copy `setting` and `isDefault` onto other `masterLevelIds` for a target academic year. ACL UPDATE. |
| DELETE | `/v1/reportSettings/:id` | ACL DELETE. |

Letter picker: settings for `masterLevelId`, then the row with `isDefault === true` or `academicYear.id` matching the class year. `createReportLetter` reads `setting.coverLetters` for that term.

## Gate: which helpers consume which fields

| Helper | Fields read |
| --- | --- |
| `progress-report.helper.ts` | `showUngradedSubject`, `setting.markingTypes`, `setting.attendances`, `setting.weightedMasterSubjects` |
| `semester-report.helper.ts` | `showUngradedSubject`, `setting.markingTypes.letterGradeDescriptor`, `setting.attendances`, `setting.weightedMasterSubjects`, `setting.semesteralReportFields` |
| `secondary-progress-report.helper.ts` | `showUngradedSubject`, `setting.attendances`, `setting.markingTypes` |
| `secondary-semester-report.helper.ts` | `showUngradedSubject` |
| `lo-report.helper.ts` | `showUngradedSubject`, `setting.attendances` |
| `report-letter.helper.ts` | `setting.coverLetters` |

Not consumed by FTP, SPR, SED, LEAPS, Cambridge, or GPA helpers. GPA uses `GpaGradingScale` and `GpaSubjectUnit`. See [secondary-gpa.md](secondary-gpa.md).

Helpers pick a setting with `isDefault === true` or `academicYear.id` matching the student class year.

[Wiki home](README.md)
