# Document verification

Admission document review for a student admission.

See also:

- [student-admission.md](student-admission.md)
- [offer-admission.md](offer-admission.md)
- [admissions.md](admissions.md)
- [identity.md](identity.md)

## Admin routes

Admission nav item Document Verification: `/document-verification` (nav `exact: true`).

| Path | Name | Subject |
| --- | --- | --- |
| `/document-verification` | Document Verification | `ADMISSION_DOCUMENT`, additional `APPROVAL_ADMISSION_DOCUMENT` |
| `/document-verification/:studentAdmissionId` | Verify | same, action UPDATE |

## Modules

Modules: admission-document.

Portal: admin. There is no teacher or student owner for this write path in the SPA routes.

[Wiki home](README.md)
