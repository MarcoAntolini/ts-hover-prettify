# ts-hover-prettify

Flatten intersected TypeScript types in **hover tooltips** by wrapping them in `Prettify<T>`.

Without `Prettify`, hovering an intersection often shows `{ a: string } & { b: number } & …`. With `Prettify`, the same hover tends to show a single object: `{ a: string; b: number; … }`. This uses the well-known mapped-type pattern ([Total TypeScript — Prettify](https://www.totaltypescript.com/concepts/the-prettify-helper)); it affects type display only and has no runtime cost.

## Install

| Approach | When to use it | Setup |
|----------|----------------|--------|
| **[VS Code / Cursor extension](packages/vscode-extension)** | Editor-only, no npm dependency | Install or load the extension — `Prettify` is injected for you |
| **[npm package](packages/ts-hover-prettify)** | `tsc`, CI, other editors, explicit control | `npm add -D ts-hover-prettify` + a one-line global types file |

You only need one approach per project. Do not mix the extension’s auto-generated `.vscode/ts-hover-prettify.d.ts` with a manual npm setup unless you know they stay in sync.

### Extension (zero-config)

1. Install **TS Hover Prettify** (`marcoantolini.ts-hover-prettify-vscode`) from a `.vsix` or, after release, from the Marketplace / Open VSX.
2. Open a TypeScript workspace and wrap types with `Prettify<…>`.
3. Hover the alias. Run **TypeScript: Restart TS Server** if hovers do not update after install.

On first use the extension may create `.vscode/ts-hover-prettify.d.ts` and append that path to `tsconfig.json` `include` or `files` when those arrays already exist. Projects without `include`/`files` still receive `Prettify` via the TypeScript server plugin.

Details: [packages/vscode-extension/README.md](packages/vscode-extension/README.md).

### npm package

```bash
npm add -D ts-hover-prettify
```

Add `prettify.d.ts` (name is up to you) at the project root or anywhere included by `tsconfig.json`:

```typescript
import "ts-hover-prettify/global";
```

Or import the type where needed:

```typescript
import type { Prettify } from "ts-hover-prettify";
```

Ensure the declaration file is part of your TypeScript project (`include`, `files`, or `types`).

Published package: [npm — ts-hover-prettify](https://www.npmjs.com/package/ts-hover-prettify) (current version **1.1.0**).

Details: [packages/ts-hover-prettify/README.md](packages/ts-hover-prettify/README.md).

## Example

**Before** — intersection shown as chained `&` types in the hover:

```typescript
type Intersected = { a: string } & { b: number } & { c: boolean };
// Hover: { a: string; } & { b: number; } & { c: boolean; }
```

**After** — wrap with `Prettify` where you want a readable hover:

```typescript
type Intersected = Prettify<
  { a: string } & { b: number } & { c: boolean }
>;
// Hover: { a: string; b: number; c: boolean; }
```

Runnable demos:

- Extension only: [examples/intersected-types](examples/intersected-types)
- npm + `tsc`: [examples/intersected-types-npm](examples/intersected-types-npm)

## What this does and does not do

**Does**

- Improve hover (and related quick info) for types you explicitly wrap in `Prettify<…>`.
- Work with strict TypeScript projects; the utility type is a few lines of types-only code.

**Does not**

- Change runtime values or emitted JavaScript.
- Rewrite hovers for types you never wrapped (aliases, inferred types, etc. stay as TypeScript prints them).
- Replace dedicated “expand any hover” extensions or VS Code’s experimental expandable hover (`typescript.experimental.expandableHover` with a recent TypeScript workspace version).

## Repository layout

```
packages/
  ts-hover-prettify/      # npm library
  vscode-extension/       # VS Code / Cursor extension (ts-hover-prettify-vscode)
examples/
  intersected-types/      # extension workflow (no committed prettify.d.ts)
  intersected-types-npm/  # npm workflow + pnpm verify:example-npm
```

## Development

Requirements: Node.js 16+, [pnpm](https://pnpm.io/) 8.

```bash
pnpm install
pnpm build          # library + extension
pnpm lint
pnpm verify:example-extension   # extension example + tsc
pnpm verify:example-npm          # npm example + tsc
pnpm package:extension           # VSIX → packages/vscode-extension/build/
```

Local extension debugging: open `packages/vscode-extension`, press **F5**, then open `examples/intersected-types` in the Extension Development Host.

## Release

| Artifact | Mechanism |
|----------|-----------|
| **npm** (`ts-hover-prettify`) | [Changesets](https://github.com/changesets/changesets) on `main` / `master` — [`.github/workflows/publish.yml`](.github/workflows/publish.yml) |
| **Extension** (`ts-hover-prettify-vscode`) | Git tag `vscode-v*` or manual workflow — [`.github/workflows/publish-extension.yml`](.github/workflows/publish-extension.yml) |

Changelog: [CHANGELOG.md](CHANGELOG.md).

## License

[MIT](LICENSE) — Copyright 2023 Marco Antolini.
