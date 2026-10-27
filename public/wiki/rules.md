# Rules

Cross-cutting constraints that apply across modules: live rows, student status, API prefix, JSON:API, TypeORM, frontend stack.

See also:

- [attendance.md](attendance.md)
- [identity.md](identity.md)
- [systems.md](systems.md)
- [awardees.md](awardees.md)

## Soft-delete

Treat `deleted_at IS NULL` as live. TypeORM `deletedAt` and `IsNull()` on the same rule.

MUST: filter live rows with `deleted_at IS NULL` unless a note names an audit or history query.

## Student status

Student counts and attendance: `studentStatus` CURRENT and `activeStatus` ACTIVE only (`StudentStatusTypeEnum.CURRENT`, `StatusTypeEnum.ACTIVE`). SQL in the awardees view uses `student_status = '1'` and `active_status = '1'` for the same idea (SQL string '1'). Do not mix the enum names with the view literals without checking the column type.

MUST NOT: count withdrawn or inactive students in attendance totals, daily-complete checks, or student headcount.

## API prefix and JSON:API

API prefix: `/api` with URI versioning. Paths below are written as `/v1/...`. Combined public path is `/api` plus `/v1` plus resource.

JSON:API interceptor on `api_nest`. Request and response envelopes: [systems.md](systems.md).

## TypeORM

TypeORM, PostgreSQL, `migrationsRun: true`. Migrations live under `api_nest/src/database/migrations/` and run on boot.

## Frontend stack

Frontends: React 18, CoreUI Pro, Redux Toolkit, Router v5. Admin and teacher are Vite 5. Student is Create React App (`react-scripts` 5). Teacher and student depend on `file:../bbs-client-common/dist`.

[Wiki home](README.md)
