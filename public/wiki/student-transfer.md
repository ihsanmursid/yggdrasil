# Student transfer

Class-year transfer of grades and reports. Not CCA transfer.

See also:

- [cca.md](cca.md)
- [academic-structure.md](academic-structure.md)
- [identity.md](identity.md)
- [open-questions.md](open-questions.md)

From [STUDENT_TRANSFER_FEATURE_DOCUMENTATION.md](../STUDENT_TRANSFER_FEATURE_DOCUMENTATION.md). Admin migrates grades and reports from studentFrom to studentTo in the same academic year. Orchestrated in `class-year.service.ts` inside a transaction. Helpers: `transfer-student-batch.service.ts`, `transfer-student-validation.service.ts`, `transfer-student-logging.service.ts`. DTO: `transfer-student-class-year.dto.ts` (academicYearId, studentFromId, studentToId).

`STRICT_SUBJECT_YEAR_MATCH` default `true`: transfer only subjects that already exist on the target class year. `false` creates missing subject years, default gradebook tables, teacher assignment, banding.

Validation: both students exist and are active; academic year exists; no duplicate migration; campus permission.

Grade copies set transferFrom to the source grade id. Failed individual grade copies are skipped. The transaction still rolls back on hard errors.

Documented request: `POST /api/class-year/transfer-student`. Confirm the live controller path against URI versioning (`/api/v1/...`) before calling it. This is not the CCA transfer. Contrast: [cca.md](cca.md).

[Wiki home](README.md)
