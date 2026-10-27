# Student billing

Per-student billings and the product billing report. Created from Finance nav or from an admission.

See also:

- [invoices.md](invoices.md)
- [products.md](products.md)
- [discounts.md](discounts.md)
- [student-admission.md](student-admission.md)

## Admin routes

Finance nav:

| Nav | Path |
| --- | --- |
| Student Billings | `/student-billings`, `/student-billings/add`, `/student-billings/:studentId`, `/student-billings/:studentId/add` |
| Billing Report | `/billing-report-product`, `/billing-report-product/:masterProductId` |

Admission also opens billing: `/admissions/:studentAdmissionId/addBilling` (`BillingForm`, subject `BILLING`). See [student-admission.md](student-admission.md).

## Modules

Modules: billing, student-billing, billing-report.

API: `/v1/billings` (`POST`, `POST /bulk`, `GET checkOverdues`, `GET checkPromos`, snapshots, student histories) and `/student-billing` (CRUD; controller path is unversioned in the decorator).

A billing row points at a master product or a one-time product, optional discounted product and promo, a student, and optional `studentBillingId` / `invoiceId`. Encoded enums only (not fee math):

| Enum | Values |
| --- | --- |
| `BillingStatusType` | OPEN 1, UNPAID, PAID, OVERDUE, REFUNDED, VOID |
| `BillingPriceType` | ONE_TIME 1, SEMESTRAL, YEARLY, then backend-only ONE_YEAR_PRICE, ONE_SEMESTER_PRICE, ONE_TERM_PRICE, then TERM |

The entity stores many price columns (initial, early, discount, promo, final). `calculateFinalPrice` on the entity is commented out. Do not treat that comment, or any reconstructed combination of those columns, as current product math. The detailed fee math is not in the scattered notes. Do not invent fee formulas.

Portal: admin. Teacher and student are not the owners of this write path.

[Wiki home](README.md)
