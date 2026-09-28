---
'google-cloud-api': patch
---

Bump `type-plus` to `8.0.0-beta.12`, still pinned exactly.

`google-cloud-api` carries `type-plus` as a runtime dependency. Its emitted `.d.ts` does not
reference `type-plus`, so consumers see no type change. Its runtime use (`isType` with a
validator, `required`) is unchanged in beta.12.
