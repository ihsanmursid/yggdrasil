# Discounts

Master discounts, per-student discounts, promos, merchant discount rate, and penalty setting.

See also:

- [products.md](products.md)
- [student-billing.md](student-billing.md)
- [finance.md](finance.md)
- [secondary-discipline.md](secondary-discipline.md)

## Admin routes

| Nav group | Nav | Path |
| --- | --- | --- |
| Finance | Discounts | `/discounts`, `/discounts/add`, `/discounts/:id`, `/discounts/:id/edit` |
| Finance | Student Discounts | `/student-discounts`, `/student-discounts/:studentId`, `/student-discounts/:studentId/edit` |
| Finance | Promo | `/promos`, `/promos/add`, `/promos/:promoId`, `/promos/:promoId/edit` |
| Finance | Merchant Discount Rate | `/merchant-discount-rate`, `/add`, `/:merchantDiscountRateId`, `/:merchantDiscountRateId/edit` |
| Product | Penalty | `/penalty-setting`, `/add`, `/:penaltySettingId`, `/:penaltySettingId/edit` |

Discount list meta additional subjects: `MASTER_DISCOUNT_SETTING`, `DISCOUNTED_PRODUCT`.

Secondary discipline has its own discount-reduction screens. Those are not this page. See [secondary-discipline.md](secondary-discipline.md).

## Modules

Modules: master-discount*, promo, master-penalty-setting, master-merchant-discount-rate.

A name with `*` is a prefix. Related: master-discount, master-discount-setting, discounted-product.

How a discount or promo changes a billing amount is not in the scattered notes. Do not invent fee formulas. See [student-billing.md](student-billing.md).

Portal: admin.

[Wiki home](README.md)
