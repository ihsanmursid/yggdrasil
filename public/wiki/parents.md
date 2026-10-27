# Parents

Parent records in the admin portal. API parent link env exists. There is no parent SPA in this repo.

See also:

- [students.md](students.md)
- [access.md](access.md)
- [identity.md](identity.md)
- [admissions.md](admissions.md)
- [systems.md](systems.md)

## Routes

| Portal | Path | Notes |
| --- | --- | --- |
| Admin | `/parents` | Nav: Parent & Student Account. `SUBJECT_MODULES.PARENT`. Also `/parents/add`, `/parents/:parentId`, `/parents/:parentId/edit`. |
| Teacher | none | |
| Student | none | |

`PARENT_WEB_LINK` is on `api_nest/.env.example`. It is an env name only. No parent SPA in `bbs`. Encoded on [access.md](access.md) and [systems.md](systems.md).

## Modules

Module: parent.

MUST NOT: start `bbs/api` for auth. Auth is `api_nest` `/v1/auth/*` plus refresh as on [systems.md](systems.md).

No encoded math in the scattered notes.

[Wiki home](README.md)
