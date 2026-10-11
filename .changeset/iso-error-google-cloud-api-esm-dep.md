---
'iso-error-google-cloud-api': patch
---

Depend on the ESM-only `google-cloud-api@9`.
The CJS build of this package `require()`s it, which works on Node 20.19+ and 22.12+.
