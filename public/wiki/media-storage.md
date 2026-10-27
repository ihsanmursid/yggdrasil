# Media storage

Admin media library. File module is the shared upload helper, not the File Sharing nav.

See also:

- [file-sharing.md](file-sharing.md)
- [other-modules.md](other-modules.md)
- [systems.md](systems.md)
- [document-templates.md](document-templates.md)

## Admin routes

Top-level `finaMenu` item (not under File Sharing): `/media-storage`, `/media-storage/:mediaId`. Subject `MEDIA_STORAGE`.

File Sharing nav (`/file-sharing/academic-department-files`, `/file-sharing/subject-files`) is a different product surface. See [file-sharing.md](file-sharing.md).

## Modules

Modules: media-storage, file.

API: `/v1/mediaStorage`. S3 env names used in source and missing from `.env.example`: `S3_ACCESS_KEY`, `S3_SECRET_KEY`, `S3_BUCKET_REGION`, `S3_BUCKET_NAME`. Names only. See [systems.md](systems.md).

Portal: admin. Teacher File Sharing is the academic-department and subject-file nav, not this media-storage screen.

[Wiki home](README.md)
