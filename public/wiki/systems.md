# Systems

Live and retired BBS LMS pieces, local ports, env names, and how the three SPAs call api_nest.

See also:

- [access.md](access.md)
- [rules.md](rules.md)
- [open-questions.md](open-questions.md)
- [sources.md](sources.md)

Source of truth for local run commands: Ichsan, 2026-09-02.

## Live pieces

Five live pieces. One retired tree. Do not start the retired tree.

| Piece | Path | Role | Local command | Port |
| --- | --- | --- | --- | --- |
| Admin portal | `bbs/client` | Back office | From that dir: npm run serve (vite --port 4000) | 4000 |
| Teacher portal | `bbs/client-teacher` | Teacher, HOD, form class, SVE | From that dir: npm run serve (vite --port 4001) | 4001 |
| Student portal | `bbs/client-student` | Student | From that dir: npm run start | CRA default 3000 |
| Shared UI | `bbs/bbs-client-common` | Components used by teacher and student | From bbs root: yarn build-bcc | none |
| Live API | `api_nest` | NestJS API | From that repo: npm run start:dev | `PORT` default 3008 |

Retired: `bbs/api`. Express app. Unused and not related to the live stack. Do not start it. `bbs` root scripts `start` and `dev-be` still point at this tree. Ignore those scripts.

Build teacher or student only after yarn build-bcc. Those two portals depend on `file:../bbs-client-common/dist`.

Parent: `PARENT_WEB_LINK` exists on `api_nest/.env.example`. There is no parent SPA in `bbs`.

`api_nest/docs/` is empty. `@nestjs/swagger` is a dependency. `main.ts` does not call `SwaggerModule`. Do not document a Swagger UI.

Route counts from source (approximate): admin `bbs/client/src/routes.js` 381 routes; teacher about 78; student 21.

## Local API URL

Portal `.env.sample` files still say `http://localhost:8080`. That is the retired Express port. Point `VITE_APP_API_BASE_URL`, `VITE_API_BASE_URL`, or `REACT_APP_API_BASE_URL` at the `api_nest` `PORT` you started (default 3008).

Env name split on the API: `api_nest/README.md` table says `ENABLE_ORM_LOG`. `api_nest/.env.example` has `ENABLE_ORM_LOGS`. Flag, do not pick a winner from this file. See [open-questions.md](open-questions.md).

`OTP_ENABLED` is used in source (`api_nest/src/services/device-security.service.ts`) and is missing from `.env.example`. Verified 2026-09-30: `OTP_ENABLED` has zero matches in all three portal sources — the login-page toggle and localStorage bypass are gone (see [access.md](access.md)). Other names used in source and missing from `.env.example` (names only): `TEST_MODE`, `S3_ACCESS_KEY`, `S3_SECRET_KEY`, `S3_BUCKET_REGION`, `S3_BUCKET_NAME`, `AUTH_LINK_PASSWORD`, `CRON_PASSWORD`, `PARENT_PASSWORD`, `SES_SENDER_EMAIL`, `SES_SENDER_NAME`. Cite `api_nest/src/configs/env.ts`, `database.service.ts`, `ses.config.ts`.

## How the frontends call the API

All three portals use `src/actions/makeApiRequest.js` (path relative to that portal). The request is:

    fetch(baseUrl + basePath + "v1" + url)

Authorization: Bearer token from `localStorage` key `bbs-web-token`. Refresh: `POST` `.../auth/refresh` using `bbs-web-refresh-token` (`src/global.js`). Request body shape: `{ data: { attributes: payload } }`. Response envelope: `{ data: { attributes } }` or `{ data: [], included: [] }`. 401: refresh, then reload, else `/login`.

Config files:

- Admin: `bbs/client/src/config/api/client.config.js`. `VITE_APP_API_BASE_URL`, `VITE_APP_API_BASE_PATH`.
- Teacher: `bbs/client-teacher/src/config/client.config.js` and `config/api/client.config.js`. `VITE_API_BASE_URL`, `VITE_API_BASE_PATH`.
- Student: `bbs/client-student/src/config/api/client.config.js`. `REACT_APP_API_BASE_URL`, `REACT_APP_API_BASE_PATH`.

Concatenation trap: the code always appends `"v1"`. Teacher `.env.sample` `VITE_API_BASE_PATH=/api/` is correct with that extra `v1`. Admin sample `VITE_APP_API_BASE_PATH=/api/v1` and student sample `REACT_APP_API_BASE_PATH=/api/v1` concatenate to `/api/v1v1`. Admin code fallback path is `"/api/"`. Use a base path that does not already contain `v1`, or change the concatenator. Do not copy the admin or student sample blindly.

Teacher `.env.sample` also still lists unused CRA names `REACT_APP_API_BASE_URL` and `REACT_APP_API_BASE_PATH`.

[Wiki home](README.md)
