# Access

CASL roles, JWT auth, OTP switches. The login-page 2FA bypass toggle is gone from all three portals.

See also:

- [systems.md](systems.md)
- [identity.md](identity.md)
- [open-questions.md](open-questions.md)
- [rules.md](rules.md)

## Roles

Roles from CASL: Super Admin, Admin, Teacher, Teacher HOD, Student, Parent. Files: `bbs/client/src/config/rbac`, `api_nest/src/modules/casl`.

Permissions are action plus subject. Actions named in [PROJECT_KNOWLEDGE.md](../PROJECT_KNOWLEDGE.md): CREATE, READ, UPDATE, DELETE, MANAGE, VIEW. Confirm against `api_nest/src/modules/casl` before treating that list as closed. Permissions can be campus-scoped.

## Auth

Auth is JWT. Passport JWT on `api_nest`. Requests carry `Authorization: Bearer <accessToken>`; `bbs-web-token` is the localStorage key that stores the access token ([systems.md](systems.md)) — it is not a header name.

OTP 2FA exists. Modules and files: `api_nest` `employee-otp`, `api_nest/src/services/device-security.service.ts`, and the OTP verify flow in both login pages (`bbs/client/src/views/pages/login/Login.jsx`, `bbs/client-teacher/src/views/pages/login/Login.jsx`). Device fingerprint still runs when OTP is off.

## OTP switches

OTP is off by default. One switch remains:

| Switch | Where | Default |
| --- | --- | --- |
| `OTP_ENABLED` | API env | off (unset or not `true`) |

Verified 2026-09-30: the login-page toggle and the `localStorage` `OTP_ENABLED` switch are gone. `OTP_ENABLED` has zero matches across all three portal sources (`bbs/client/src`, `bbs/client-teacher/src`, `bbs/client-student/src`); both `Login.jsx` files keep only the OTP verify flow, no bypass toggle. The old 2FA bypass risk ([OTP_TOGGLE_GUIDE.md](../OTP_TOGGLE_GUIDE.md)) is closed at the UI layer.

The API env switch stays authoritative: when `OTP_ENABLED` is not `true`, OTP is off and device fingerprint still runs. `OTP_ENABLED` is used in source and is missing from `.env.example`. See [systems.md](systems.md).

Parent access: API link env only. No parent SPA in this repo.

MUST NOT: start `bbs/api` for auth. Auth is `api_nest` `/v1/auth/*` plus refresh as on [systems.md](systems.md).

[Wiki home](README.md)
