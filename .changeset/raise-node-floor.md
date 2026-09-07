---
'iso-error': major
'iso-error-web': major
'google-cloud-api': major
'iso-error-google-cloud-api': major
---

Raise the declared Node engine floor to `>= 20`.

`type-plus` 8 depends on `unpartial@^1.0.7`, which declares `engines: { node: '>= 20' }`.
`iso-error` declared `>= 10`; `iso-error-web`, `google-cloud-api` and
`iso-error-google-cloud-api` declared `>= 8`. `iso-error-google-cloud-api` does not depend
on `type-plus` directly, but it depends on `google-cloud-api`, which does — its own floor
was already stale and is raised here for consistency across the published packages in this
repo.

Narrowing the supported Node range is a breaking change, hence `major` on all four
packages, independent of the `type-plus` pin itself.
