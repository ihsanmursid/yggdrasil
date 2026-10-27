# Offer admission

Offers of admission, approval, and PDF preview. generate-oa is not a live route.

See also:

- [student-admission.md](student-admission.md)
- [document-verification.md](document-verification.md)
- [document-templates.md](document-templates.md)
- [admissions.md](admissions.md)

## Admin routes

Admission nav item Offer Admission: `/offer-admissions`.

| Path | Name |
| --- | --- |
| `/offer-admissions` | Offer Admissions |
| `/offer-admissions/add/:studentAdmissionId` | Add |
| `/offer-admissions/:studentAdmissionId` | Detail |
| `/offer-admissions/:studentAdmissionId/edit` | Edit |
| `/approval-offer-admissions` | Offer Admissions (approval list) |
| `/approval-offer-admissions/:studentAdmissionId/process` | Process |

`/offer-admissions/generate-oa` is commented out in `routes.js` (`GenerateOfferAdmission`). Do not document it as a live screen.

Meta: `OFFER_OF_ADMISSION`, additional `APPROVAL_OFFER_OF_ADMISSION` on the list and process routes.

## Modules

Modules: offer-admission, admission-agreement.

API: `/v1/offerAdmissions` including `GET /previewPdf`. Templates: [document-templates.md](document-templates.md).

Portal: admin.

[Wiki home](README.md)
