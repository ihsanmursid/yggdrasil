# Student admission

Applicant records, approval, and add-billing from an admission.

See also:

- [offer-admission.md](offer-admission.md)
- [placement-tests.md](placement-tests.md)
- [student-billing.md](student-billing.md)
- [document-verification.md](document-verification.md)

## Admin routes

Admission nav item Student Admission: `/admissions`.

| Path | Name | Subject |
| --- | --- | --- |
| `/admissions` | Admissions | `STUDENT_ADMISSION` |
| `/admissions/:studentAdmissionId` | Detail | `STUDENT_ADMISSION`, additional `APPROVAL_STUDENT_ADMISSION` |
| `/admissions/:studentAdmissionId/addBilling` | Add Billing | `BILLING` |
| `/admissions/:studentAdmissionId/approval` | Approval Admission | `STUDENT_ADMISSION`, additional `APPROVAL_STUDENT_ADMISSION` |

Commented leftovers in `routes.js`: `/admission`, `/admission/add`, `/admission/:admissionId`. Not live.

## Modules

Modules: student-admission.

Related on this index: leadgen, information-source. See [admissions.md](admissions.md).

API: `/v1/studentAdmissions`.

A student-admission row has `studentId`, `academicYearId`, `branchId`, `masterProgrammeId`, `masterLevelId`, `registrationStatus`, and optional `offerAdmissionId` / `oaStatus`. Encoded `RegistrationStatusTypeEnum` (not a scoring formula): WAITING_REVIEW 1, REVIEWED, REGISTRATION_UNPAID, REGISTRATION_PAID, WITHDRAWN, INFORMATION_COMPLETED, DOCUMENT_COMPLETED, PLACEMENT_TEST, ADMITTED, REJECTED, NOT_ADMITTED, WAITING_LIST.

Add-billing from an admission uses the billing form. Fee math: [student-billing.md](student-billing.md). Do not invent fee formulas.

Portal: admin.

[Wiki home](README.md)
