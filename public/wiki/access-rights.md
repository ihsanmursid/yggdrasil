# Access rights

Admin UI for roles. OTP, JWT, and CASL mechanics live on [access.md](access.md).

See also:

- [access.md](access.md)
- [employees.md](employees.md)
- [identity.md](identity.md)
- [rules.md](rules.md)

## Admin routes

Setting nav: `/access-rights`. Name in `routes.js`: User Role Access. Component `AccessRights`. Subject `USER_ROLE`.

This page is the back-office screen that lists and edits roles. It is not the login-page OTP toggle and not the CASL ability definitions. Those: [access.md](access.md).

Employee CRUD is `/employees` under the Employee nav. See [employees.md](employees.md).

## Modules

Modules: user-role. Related on [identity.md](identity.md) and [access.md](access.md): casl, auth, employee-otp.

API: `/v1/userRole` (`POST`, `GET`, `GET :id`, `PUT :id`) and `POST /v1/userRole/user/permissions` (`populateUserPermissions`, body `id` plus `authType`).

Portal: admin. Teacher and student do not own this screen.

[Wiki home](README.md)
