# Admin certificates

Certificate templates and issue screens. Student reads `/my-certificate`.

See also:

- [awardees.md](awardees.md)
- [lo-settings.md](lo-settings.md)
- [certificates.md](certificates.md)
- [medals.md](medals.md)

## Admin routes

Report nav → Certificates. `/certificates` as a bare index route is commented out in `routes.js`.

| Nav | Path |
| --- | --- |
| Certificate Template | `/certificate-templates`, `/add`, `/:masterCertificateTemplateId`, `/:masterCertificateTemplateId/edit` |
| Completion Certificates | `/certificates/completion-certificate` |
| Subject Medals | `/certificates/subject-medal` |
| Learning Outcome Certificate | `/certificates/learning-outcome` |
| General Purpose | `/certificates/general-purpose` |
| Assign Certificate | `/certificates/assign` |
| Custom Certificate | `/certificates/custom` |
| Student List Certificate | `/certificates/student-list` |

Issue screens use subject `CERTIFICATE`. Templates use `MASTER_CERTIFICATE_TEMPLATE`.

Finance document templates (`/document-templates`) are a different module. See [document-templates.md](document-templates.md).

## Student routes

`/my-certificate`.

## Modules

Modules: student-certificates, master-certificate-template, completion-certificate, learning-outcome-certificate.

API: `/v1/studentCertificates` (`POST sync`, `POST custom`, `POST custom/bulk`, `GET`).

Subject medals consumed by the awardees view: [awardees.md](awardees.md). Learning-outcome certificate settings sit with LO configuration: [lo-settings.md](lo-settings.md).

Portal: admin configures and assigns. Student reads `/my-certificate`. Teacher does not own these SPA routes.

[Wiki home](README.md)
