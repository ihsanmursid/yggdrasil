# Analytics

Admin analytics screens and teacher SVE item-analysis.

See also:

- [sve.md](sve.md)
- [sve-item-analysis.md](sve-item-analysis.md)
- [other-modules.md](other-modules.md)
- [systems.md](systems.md)
- [access.md](access.md)

## Admin routes

Analytics nav:

| Nav | Path | SPA subject |
| --- | --- | --- |
| Analytic Setting | `/analytic-setting` | `ANALYTIC_SETTING` |
| AB Analytic | `/analytic-ab` | `AB_ANALYTIC` (nav constant `ANALYTIC_AB`) |
| Principal Analytic | `/analytic-principal` | `ANALYTIC_PRINCIPAL` |
| HoD Analytic | `/analytic-hod` | `ANALYTIC_PRINCIPAL` (same as principal on the route meta) |
| Item Analysis Analytics | `/sve-item-analysis-analytics` | `SVE_ITEM_ANALYSIS_ANALYTICS` |

Admin env names only (not values): `VITE_APP_ANALYTIC_BASE_URL`, `VITE_APP_ANALYTIC_SECRET_KEY`. See [systems.md](systems.md).

## Teacher routes

SVE nav, principal or HOD: `/item-analysis-analytics`, `/item-analysis-analytics/:sveExamTypeId`.

## Modules

Modules: analytic.

API: `/v1/analytics` (`POST /bulk`, `GET`). SVE item analysis is a separate SVE module cluster; this page only lists the analytics screens. Encoded rules: [sve-item-analysis.md](sve-item-analysis.md).

Portal: admin for the four analytic views plus SVE item-analysis. Teacher HOD/principal for item-analysis-analytics.

[Wiki home](README.md)
