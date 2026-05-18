# AGENTS

## Purpose

`design.svelte` owns the Liberté Svelte design implementation.

- `packages/components` publishes `@liberte/svelte-components`.
- `packages/icons` publishes `@liberte/svelte-icons`.
- `playground` owns browser-facing component inspection.
- `e2e` owns minimal Playwright smoke coverage for the real package boundary.

## Boundaries

- Business web repos compose product screens and call APIs. They should not own CSS atoms or recreate primitive controls.
- Design packages own Svelte atoms, primitives, icons, tokens, themes, component CSS, playgrounds, and browser smoke coverage.
- Keep release mechanics workflow-scoped. Reusable release helpers live under `.github/scripts/` only.
- Package directories own their own `build`, `lint`, `format`, and `typecheck` commands.
- Use exact dependency versions. Do not use caret or tilde ranges.
- Publish to `https://packages.liberte.top/` under the `@liberte` scope.

## Component Contracts

- `DataTable` uses fixed table layout so declared column widths are authoritative. Consumers should provide a `width` for each column unless equal distribution is intentional.
- `DataTableCell` wraps long unbroken content with `overflow-wrap: anywhere` by default. Use the existing `nowrap` prop only for cells that are deliberately single-line.
- Product repos should request missing controls from this package rather than styling raw HTML or recreating atoms locally.

## Commands

- Install: `pnpm install --frozen-lockfile`
- Guard: `pnpm run guard`
- Components build: `pnpm -C packages/components build`
- Icons build: `pnpm -C packages/icons build`
- Playground build: `pnpm -C playground build`
- E2E smoke: `pnpm -C e2e test`

## Release

`release-beta.yml` and `release-stable.yml` are manually dispatched with `package=components|icons`.

- Source manifests keep stable `x.y.z` baseline versions.
- Beta publishes `x.y.z-beta.N` with npm dist-tag `beta`.
- Stable publishes `x.y.z` with npm dist-tag `latest`.
- Version state is read from npm package metadata on `packages.liberte.top`.
- GitHub Releases are intentionally out of scope.
