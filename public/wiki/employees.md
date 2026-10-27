# Employees

Staff, positions, and organisations. Live admin nav is the Employee group. Separate teacher and admin list routes are commented.

See also:

- [access.md](access.md)
- [campuses.md](campuses.md)
- [identity.md](identity.md)
- [rules.md](rules.md)
- [systems.md](systems.md)

## Routes

| Portal | Path | Notes |
| --- | --- | --- |
| Admin | `/employees` | Nav: Employee / List. `SUBJECT_MODULES.EMPLOYEE`. Also `/employees/add`, `/employees/:employeeId`, `/employees/:employeeId/edit`. |
| Admin | `/positions` | `SUBJECT_MODULES.POSITION`. Assign: `/positions/assign`, `/positions/:positionId/assign-employee`. |
| Admin | `/organizations` | `SUBJECT_MODULES.ORGANIZATION`. |
| Admin | `/teachers`, `/admins` | Commented in `_nav.jsx` (note: move to Employee) and in `routes.js`. Not live nav. |
| Teacher | none for this CRUD | Teacher consumes the logged-in profile. |
| Student | none | |

## Modules

Modules: employee, employee-device, employee-identity, employee-otp, employee-position, teacher, admin, position, position-scope, organization. A name with `*` in the catalog brief means the employee prefix, not a closed inventory.

OTP and device security: [access.md](access.md). MUST: campus-scope CASL checks on org writes. MUST NOT: start `bbs/api` for auth. Encoded on [identity.md](identity.md).

No encoded math in the scattered notes.

[Wiki home](README.md)
