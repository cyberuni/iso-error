# iso-error-web

## 3.0.0

### Major Changes

- bd1060c: Pin `type-plus` to `8.0.0-beta.10`, exactly.
  
  `iso-error` and `iso-error-web` carried `type-plus` as a devDependency (`^7.6.2`);
  `google-cloud-api` carries it as a runtime dependency (`^7.0.0`). None of the three leak
  `type-plus` types into their emitted `.d.ts` — checked directly against the built
  declarations — so this alone would be a `minor`/`patch` change. It ships as `major`
  because it lands together with the Node floor raise (see the other changeset) in this
  release.
  
  `type-plus` 8 declares `peerDependencies: { typescript: '>= 5.6.0' }`; 5, 6 and 7 declared
  none. All three packages already build against `typescript: ^7.0.2`, which satisfies the
  new peer, so nothing else moves.
  
  The version is pinned rather than caret-ranged. `^8.0.0-beta.10` resolves to
  `>=8.0.0-beta.10 <9.0.0-0`, which admits every later 8.0.0 prerelease as well as `8.0.0`
  and `8.1.0` — and 8 is a prerelease line where breaking changes land between betas
  (beta.10 to beta.11 changed `Equal`'s signature and removed `isType.f`). An exact version
  makes each bump a reviewable PR instead of something a lockfile refresh can do silently.
  Move back to a caret once 8.0.0 is stable.
  
  No source change was needed: this repo's `type-plus` usage (`isType`, `isType.equal`,
  `omit`, `required`, `canAssign`, `AnyConstructor`) is unaffected by the 7 -> 8 breaking
  changes. `pnpm verify` passes across all four packages.
  
  `assertron` moves 11.5.3 -> 11.6.0 and `satisfier` moves 5.4.3 -> 5.4.4 as devDependency
  updates (both were already published on `type-plus` 8 and `tersify` 4). With those and the
  first-party soak exemption in place, the tree resolves a single `type-plus` and a single
  `tersify`:
  
  ```
  pnpm why type-plus -r  ->  Found 1 version of type-plus   (8.0.0-beta.10)
  pnpm why tersify -r    ->  Found 1 version of tersify     (4.0.6)
  ```
  
  This lets `assertron`, `standard-log`, `@unional/fixture` and `mocktomata` drop stale
  transitive `type-plus` copies elsewhere in the dependency graph.
- 5929a0b: Raise the declared Node engine floor to `>= 20`.
  
  `type-plus` 8 depends on `unpartial@^1.0.7`, which declares `engines: { node: '>= 20' }`.
  `iso-error` declared `>= 10`; `iso-error-web`, `google-cloud-api` and
  `iso-error-google-cloud-api` declared `>= 8`. `iso-error-google-cloud-api` does not depend
  on `type-plus` directly, but it depends on `google-cloud-api`, which does — its own floor
  was already stale and is raised here for consistency across the published packages in this
  repo.
  
  Narrowing the supported Node range is a breaking change, hence `major` on all four
  packages, independent of the `type-plus` pin itself.

### Patch Changes

- Updated dependencies [bd1060c]
- Updated dependencies [5929a0b]
  - iso-error@7.0.0

## 2.4.3

### Patch Changes

- 08a63fa: Rebuild with tsdown, and fix the `exports` map.
  
  The four packages are now built by tsdown (rolldown) instead of `tsc`, so the
  emitted JavaScript changes even though every published path, every export name
  and the CommonJS `__esModule` marker stay exactly as they were.
  
  The `exports` map used a `type` condition, which is not a thing — the condition
  Node and TypeScript look for is `types`. Type resolution therefore fell back to
  the top-level `types` field, which pointed at the CommonJS declarations for both
  entry points. `import` now resolves `esm/index.d.ts` and `require` resolves
  `cjs/index.d.ts`.
  
  No API change: the exported names are identical to the previous release, checked
  against the published tarballs for all four packages.

## 2.4.2

### Patch Changes

- d373748: Point package metadata at the `cyberuni/iso-error` repository.
  
  The repository moves out of the personal `unional` namespace so it can publish to
  npm through GitHub OIDC trusted publishing instead of a long-lived `NPM_TOKEN`.
  `repository`, `homepage` and `bugs` now name the new location, so the links npm
  renders on each package page resolve.

## 2.4.1

### Patch Changes

- 42df780: Relax the type of `HttpStatusText` to `Record<number, string>`.
  This allows user to use it by passing in an `number`:

  ```ts

  // `Response['status']: number`
  const response: Response = await fetch(...)

  const status = HttpStatusText[response.status]
  ```

## 2.4.0

### Minor Changes

- 430aa8f: Add HttpStatusText map

## 2.3.4

### Patch Changes

- 9d56e0f: Adjust or add back `main` export.

  Allow older systems which does not support `exports` field to use the module.

- Updated dependencies [9d56e0f]
  - iso-error@6.0.3

## 2.3.3

### Patch Changes

- 33ccdb0: Improve code quality with newer typescript settings.

  Improve `exports` field.

- Updated dependencies [33ccdb0]
  - iso-error@6.0.2

## 2.3.2

### Patch Changes

- Updated dependencies [c4a4701]
  - iso-error@6.0.1

## 2.3.1

### Patch Changes

- 4dc76ff: Fix module name for `HttpError`.
  It should be `iso-error-web/http`

## 2.3.0

### Minor Changes

- cde80f1: Export plugin as named export.

## 2.2.1

### Patch Changes

- Updated dependencies [8f6e39e]
  - iso-error@6.0.0

## 2.2.0

### Minor Changes

- 7725f6c: Add remaining errors

## 2.1.1

### Patch Changes

- Updated dependencies [84fc334]
  - iso-error@5.0.2

## 2.1.0

### Minor Changes

- 40f0213: Add `webPlugin`.
  Using the `webPlugin`,
  We can deserialize the err supporting `instanceOf`

## 2.0.1

### Patch Changes

- Updated dependencies [ca454a5]
  - iso-error@5.0.1

## 2.0.0

### Major Changes

- 2c2798f: `CJS` code upgrade to `ES2015` to support private fields.

### Patch Changes

- Updated dependencies [2c2798f]
- Updated dependencies [74adb0d]
- Updated dependencies [2c2798f]
  - iso-error@5.0.0

## 1.0.15

### Patch Changes

- 936d275: Fix CJS usage by adding cjs/package.json
- Updated dependencies [936d275]
  - iso-error@4.4.1

## 1.0.14

### Patch Changes

- Updated dependencies [19ecd12]
  - iso-error@4.4.0

## 1.0.13

### Patch Changes

- 44efe9d: Loosen workspace deps to `^workspace:*`

## 1.0.12

### Patch Changes

- 12b6beb: re-release for workspace resolution
- Updated dependencies [12b6beb]
  - iso-error@4.3.8

## 1.0.11

### Patch Changes

- 028438d: fix workspace protocol
- Updated dependencies [028438d]
  - iso-error@4.3.7

## 1.0.10

### Patch Changes

- Updated dependencies [f2e1629]
  - iso-error@4.3.6

## 1.0.8

### Patch Changes

- e27a828: Fix `iso-error` versioning

## 1.0.7

### Patch Changes

- Updated dependencies [d55dc6a]
  - iso-error@4.3.5

## 1.0.6

### Patch Changes

- 70d94e7: Add cjs package.json workaround
- Updated dependencies [70d94e7]
  - iso-error@4.3.4

## 1.0.5

### Patch Changes

- Updated dependencies
  - iso-error@4.3.3

## 1.0.4

### Patch Changes

- re-release
- Updated dependencies
  - iso-error@4.3.2

## 1.0.3

### Patch Changes

- 4817de0: add d.ts for cjs
- Updated dependencies [4817de0]
  - iso-error@4.3.1

## 1.0.1

### Patch Changes

- d369043: re-release due to `workspace:*` not replaced.

## 1.0.0

### Major Changes

- 152e54d: Initial release.

  `iso-error-web` provides web specific extensions and tools.
