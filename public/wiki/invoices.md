# Invoices

Invoices, payment list, installment requests, and refund requests.

See also:

- [student-billing.md](student-billing.md)
- [wallets.md](wallets.md)
- [finance.md](finance.md)
- [discounts.md](discounts.md)

## Admin routes

Finance nav:

| Nav | Path |
| --- | --- |
| Invoices | `/invoices`, `/invoices/add`, `/invoices/:invoiceId/create-payment` |
| Payment List | `/payments`, `/payments/:invoiceId/approve-payment/:paymentId` |
| Installment Requests | `/installment-requests`, `/installment-requests/:installmentRequestId` |
| Refund Request | `/refund-requests` |

Payment list meta: subject `PAYMENT`, additional `APPROVAL_PAYMENT`. Refund meta: `REFUND_REQUEST` plus `APPROVAL_REFUND_REQUEST_1`, `APPROVAL_REFUND_REQUEST_2`, `PROCESS_REFUND_REQUEST`.

## Modules

Modules: invoice, payment, installment-request, refund-request.

API: `/v1/invoices` (`POST`, `POST /bulk`, `POST :id/add`, `POST :id/remove`, `POST /resend/:id`, `GET checkOverdues`). `/v1/payments` and `/v2/payments` share the payment controller (`version: ['1', '2']`).

An invoice can attach billings. Create-payment is an invoice-scoped SPA route that writes through the payment module. Wallet pay/refund is a separate path; see [wallets.md](wallets.md).

Portal: admin. Teacher and student are not the owners of invoice or payment approval.

[Wiki home](README.md)
