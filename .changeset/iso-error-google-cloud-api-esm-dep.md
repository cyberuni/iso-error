---
'iso-error-google-cloud-api': major
---

Make `iso-error-google-cloud-api` ESM only, matching `google-cloud-api@9`, which it re-exports.
The `cjs/` build and the `require` export condition are removed, and `main` and `types` now point at `esm/`.

Migration: the package needs Node `^20.19.0 || >=22.12.0`.
On those versions `require('iso-error-google-cloud-api')` keeps working, because Node loads ES modules through `require()` without a flag.
On older Node, use `import` or upgrade Node.
