---
'iso-error': major
'iso-error-web': major
'google-cloud-api': major
---

Pin `type-plus` to `8.0.0-beta.10`, exactly.

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
