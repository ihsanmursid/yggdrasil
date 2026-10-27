# Finance

Campus billing, invoices, payments, wallets, deposits, promo and product masters. No invented fee math.

See also:

- [admissions.md](admissions.md)
- [identity.md](identity.md)
- [academic-structure.md](academic-structure.md)
- [sources.md](sources.md)

## Children

- [products.md](products.md) — Product nav: category, template, type, list
- [student-billing.md](student-billing.md) — Student billings and product billing report
- [invoices.md](invoices.md) — Invoices, payments, installment and refund requests
- [wallets.md](wallets.md) — Wallets, virtual accounts, security deposits, master accounts
- [discounts.md](discounts.md) — Discounts, student discounts, promos, MDR, penalty
- [document-templates.md](document-templates.md) — Finance nav document templates

## Modules

Modules: billing, billing-report, student-billing, invoice, payment, wallet, wallet-transaction-history, security-deposit, installment-request, refund-request, promo, master-product, master-product-type, product-category, product-category-master-product-type, product-template, product-template-master-product-type, discounted-product, master-discount, master-discount-setting, master-penalty-setting, master-merchant-discount-rate, currency, family-bank-information, semestral-price, price-modification, one-time-product.

Portal: admin. Teacher and student are not the owners of fee setup.

Admin nav splits this area: Product nav and Finance nav live in `bbs/client/src/containers/_nav.jsx` `finaMenu`. Billing is campus-scoped and academic-year scoped. The detailed fee math is not in the scattered notes. Do not invent fee formulas.

[Wiki home](README.md)
