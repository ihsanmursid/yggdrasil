# CCA

CCA model, registration statuses and guards, quota Q4 vs section 4, coordinator cap, Q6, and transfer with no quota check.

See also:

- [student-transfer.md](student-transfer.md)
- [open-questions.md](open-questions.md)
- [academic-structure.md](academic-structure.md)
- [identity.md](identity.md)

From [CCA_REMODEL.md](../CCA_REMODEL.md). Model: Cca to CcaYear to CcaRegistration. Modules: cca, cca-year, cca-year-coordinator, cca-registration, cca-registration-rules, cca-registration-window, cca-grade-setting, cca-grade-term-setting, student-cca-grade.

Cca carries sportType (SPORT, NON_SPORT), registrationType (OPEN, TEAM), ccaType (CCA, ECA). CcaYear is one offering per CCA plus campus plus level plus academic year. Level uniqueness is service-enforced, no DB unique. CcaYear holds quota, maleQuota, femaleQuota, masterLevelId, description, images.

## Registration status

| Name | Value |
| --- | --- |
| PENDING | 1 |
| APPROVED | 2 |
| REJECTED | 3 |
| WITHDRAWN | 4 |
| INVITED | 5 |
| CANCELLED | 6 |

## Registration guards

Registration guards on POST /v1/ccaRegistrations, in order: window, max CCAs, duplicate (reactivate WITHDRAWN to PENDING), total quota, gender quota. Failures are 400.

Q4 decision (PM, recorded in that doc): when maleQuota or femaleQuota is set, total quota is ignored and only gender caps apply. Total applies only when no gender cap is set. Applied in create() and assertInviteCapacity(). Section 4 of the same doc still says total and gender caps are independent and both must pass. Flag that contradiction. This catalog follows Q4 because the PM decision section names it as resolved. See [open-questions.md](open-questions.md).

INVITED counts toward quota (OCCUPYING_STATUSES = PENDING + APPROVED + INVITED). TEAM is invite-only. create() rejects self-registration for TEAM. Invite picker is not hard-filtered by campus or level (R2 decision).

## Windows

No window configured: isRegistrationOpen() is true and POST /ccaRegistrations is still accepted. Student UI hides offerings unless isWindowConfigured && isRegistrationOpen. Once any window exists for a campus, registration is closed outside it. An INACTIVE window still counts as configured. Exact (campus, level) window wins over campus-wide. Window overlap and reversed range are rejected in service, not by a DB constraint. create, invite, and accept call assertWindowOpen. Approve, reject, withdraw, decline do not.

## Coordinators

Phase 2 text says max 2, both grade everyone, no per-programme filter. Data-model section and cca-year-coordinator notes say max 3. Flag. Do not pick a winner here. See [open-questions.md](open-questions.md).

## Transfer

POST /v1/ccaRegistrations/transfer. Copies grades to the target, soft-deletes the origin registration and origin grade rows as audit, creates APPROVED on the target with transferredFromCcaYearId, one DB transaction. Transfer does not check target quota. Re-transfer can duplicate grade rows. This is not the class-year student transfer. Contrast: [student-transfer.md](student-transfer.md).

Grade setting resolve: CCA-Year override, then per-CCA this academic year, then CCA default. Teacher file: `bbs/client-teacher/src/views/cca/CCADetail.jsx`.

Q6 still open: per-level max-CCA cap still uses classroom-name parsing in `cca-registration-rules.service.ts`. Needed table is P1-P6, Sec 1-4, JC on master_level. Flag. See [open-questions.md](open-questions.md).

`PageOptionsDto.pageSize` defaults to 5 (`api_nest/src/common/dto/page-options.dto.ts:54`), but `CcaRegistrationController.findAll` reads its query as `@Query() options: any` (controller line 45) without instantiating the DTO, so the default never applies there. Verified 2026-09-30: `GET /ccaRegistrations` with no params returned all matching rows (6 of 6) and a meta with `pageCount: null` — the list is unbounded, not page-5-capped. List views MUST still pass an explicit pageSize to bound the query; do not rely on a server default for this endpoint.

## Admin routes

From `bbs/client/src/routes.js` admin CCA nav:

| Route | Notes |
| --- | --- |
| /cca | Master CCA. Also /cca/add, /cca/:ccaId, /cca/:ccaId/edit |
| /cca-in-year | Offerings. Also /cca-in-year/add, /cca-in-year/:ccaInYearId, /cca-in-year/:ccaInYearId/edit |
| /cca-in-year-assignment | Assignment. Also /cca-in-year-assignment/:ccaInYearId/assign |
| /cca-registration-rules | Rules. Also /cca-registration-rules/add, /cca-registration-rules/:id/edit |
| /cca-registration-windows | Windows. Also /cca-registration-windows/add, /cca-registration-windows/:id/edit |
| /cca-registration-management | Registration management |
| /cca-grade-settings | Grade settings. Also /cca-grade-settings/add, /cca-grade-settings/:ccaGradeSettingId |

## Teacher

| Route | Notes |
| --- | --- |
| /ccaYear | Offerings. Also /ccaYear/:ccaYearId/:academicYearId |
| /ccaRegistrationApprovals | Approvals |
| /ccaYearAssignment | Assignment. Also /ccaYearAssignment/:ccaYearId |

## Student

| Route | Notes |
| --- | --- |
| /ccaYear | Offerings. Also /ccaYear/:ccaYearId |
| /cca-registration | Registration |

Portals: admin (CCA, CCA-in-year, assignment, registration rules/windows/management, grade settings, invite, transfer), teacher (ccaYear, approvals, grading), student (/ccaYear, /cca-registration).

[Wiki home](README.md)
