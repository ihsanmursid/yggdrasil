# Wallets

Wallets, student virtual accounts, security deposits, and master accounts.

See also:

- [invoices.md](invoices.md)
- [students.md](students.md)
- [finance.md](finance.md)
- [student-billing.md](student-billing.md)

## Admin routes

Finance nav:

| Nav | Path |
| --- | --- |
| Master Account | `/master-accounts`, `/add`, `/:masterAccountId`, `/:masterAccountId/edit` |
| Student Virtual Account | `/virtual-accounts`, `/virtual-accounts/:studentId/edit` |
| Wallets | `/wallets` |
| Security Deposits | `/security-deposits`, `/security-deposits/:studentId` |

SPA `/wallets` route meta uses subject `PAYMENT` (plus `APPROVAL_PAYMENT`). Nav and the API use `WALLET`. Flag; do not pick a winner from this page.

There is no `virtual-account` folder under `api_nest/src/modules`. Virtual-account UI is a student-scoped admin screen (`SUBJECT_MODULES.STUDENT_VA`).

## Modules

Modules: wallet*, security-deposit, master-account.

A name with `*` is a prefix, not a complete inventory. Related: wallet, wallet-transaction-history.

API `/v1/wallets`: `POST deposit`, `POST pay`, `POST refund`, `GET`, `GET :id`. Permission subject `WALLET`.

Portal: admin. Teacher and student are not the owners of wallet setup. Student identity: [students.md](students.md).

[Wiki home](README.md)
