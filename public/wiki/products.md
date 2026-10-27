# Products

Admin Product nav: category, template, type, and product list. Catalog setup for fees, not the billing run.

See also:

- [student-billing.md](student-billing.md)
- [discounts.md](discounts.md)
- [finance.md](finance.md)
- [academic-structure.md](academic-structure.md)

## Admin routes

Product nav in `bbs/client/src/containers/_nav.jsx` `finaMenu`:

| Nav | Path |
| --- | --- |
| Category | `/product-category`, `/add`, `/:productCategoryId`, `/:productCategoryId/edit` |
| Template | `/product-template`, `/add`, `/:productTemplateId`, `/:productTemplateId/edit` |
| Type | `/product-type`, `/add`, `/:productTypeId`, `/:productTypeId/edit` |
| List | `/product-list`, `/product-list/add`, `/product-list/add-bulk`, `/product-list/add-catalog` |

Detail and edit of a list row use `/product-List/:productListId` and `/product-List/:productListId/edit` (capital `L` in the path string in `routes.js`).

Penalty (`/penalty-setting`) is also under Product nav. Documented on [discounts.md](discounts.md).

## Modules

Modules: master-product*, product-category, product-category-master-product-type, product-template, product-template-master-product-type, product-*, discounted-product, one-time-product, semestral-price, currency.

A name with `*` is a prefix, not a complete inventory.

API: `/v1/masterProducts` with `POST /bulk` and `POST /catalog` matching add-bulk and add-catalog.

Master product rows carry `academicYearId` (required) and optional `academicYearInId`, plus a numeric `price` and optional `earlyPrice` window. How those numbers become a student fee is not in the scattered notes. Do not invent fee formulas. See [student-billing.md](student-billing.md).

Portal: admin. Teacher and student do not own product setup.

[Wiki home](README.md)
