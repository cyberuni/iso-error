---
'google-cloud-api': patch
---

Drop the runtime dependency on `type-plus`.
The two helpers it used are inlined, so the CJS build no longer requires the ESM-only `type-plus@8`.
