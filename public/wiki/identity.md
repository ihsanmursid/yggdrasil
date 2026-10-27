# Identity

People, campuses, org units, RBAC, and pick-up. Index of identity pages.

## Children

- [access.md](access.md) — CASL roles, JWT, OTP
- [students.md](students.md) — student records
- [parents.md](parents.md) — parent records, no parent SPA
- [employees.md](employees.md) — staff, positions, organisations
- [campuses.md](campuses.md) — campuses, branches, campus programmes
- [pickup.md](pickup.md) — student pick-up
- [file-sharing.md](file-sharing.md) — academic-department files (also under academic structure)

See also:

- [academic-structure.md](academic-structure.md)
- [student-transfer.md](student-transfer.md)
- [admissions.md](admissions.md)
- [access.md](access.md)

## Modules

Modules: auth, admin, employee, employee-device, employee-identity, employee-otp, employee-position, user-datatable, user-entity-type, user-profile, user-role, casl, organization, campus, campus-gate, branch, division, department, academic-department, academic-department-file, position, position-scope, head-department, teacher, parent, student, student-pick-up, student-pick-up-person, student-pick-up-request, student-pick-up-setting.

Portals: all three SPAs consume identity. Admin owns org CRUD. Teacher and student consume the logged-in profile and campus-scoped lists.

MUST: campus-scope CASL checks on org writes. MUST NOT: start `bbs/api` for auth. Auth is `api_nest` `/v1/auth/*` plus refresh as on [systems.md](systems.md).

Employee OTP and device security: see [access.md](access.md). Pick-up is admin plus related student or parent flows. There is no parent SPA here, so parent pick-up UI is out of this repo.

[Wiki home](README.md)
