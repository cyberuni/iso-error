---
'google-cloud-api': major
---

Make `google-cloud-api` ESM only, following `type-plus@8`.
The `cjs/` build and the `require` export condition are removed, and `main` now points at `esm/index.js`.

Migration: the package needs Node `^20.19.0 || >=22.12.0`.
On those versions `require('google-cloud-api')` keeps working, because Node loads ES modules through `require()` without a flag.
On older Node, use `import` or upgrade Node.
