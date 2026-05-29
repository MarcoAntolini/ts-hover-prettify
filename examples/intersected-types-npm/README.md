# npm package example

Same intersection demo as [../intersected-types](../intersected-types), but `Prettify` comes from the **[ts-hover-prettify](../../packages/ts-hover-prettify)** devDependency — no VS Code extension required.

| In this folder | Purpose |
|----------------|---------|
| `demo.ts` | Same `Intersected` alias as the extension example |
| `prettify.d.ts` | Loads the global `Prettify` type from the package |
| `package.json` | `ts-hover-prettify` via `workspace:*` (monorepo) |
| `tsconfig.json` | Includes `demo.ts` and `prettify.d.ts` |

The optional `.vscode/ts-hover-prettify.d.ts` entry in `tsconfig.json` is for parity when both workflows are tested in one clone; a real npm-only project only needs `prettify.d.ts`.

## Expected result

Hover behaviour matches the extension example when your editor uses this `tsconfig.json`: `Intersected` should display as one object type, not a chain of `&` intersections.

## Verify with `tsc`

From the repository root (after `pnpm install` and `pnpm build`):

```bash
pnpm verify:example-npm
```

Runs `tsc --noEmit` against this folder. Passing means `Prettify` resolves and `demo.ts` type-checks.

## Use in your own project

```bash
npm add -D ts-hover-prettify
```

Add a declaration file included by your `tsconfig.json`, for example `prettify.d.ts`:

```typescript
import "ts-hover-prettify/global";
```

This repo’s shim uses a path reference instead (works inside the monorepo without publishing):

```typescript
/// <reference path="../../packages/ts-hover-prettify/global.d.ts" />
```

See `prettify.d.ts` in this directory. Published installs should prefer `import "ts-hover-prettify/global"`.

Example `tsconfig.json`:

```json
{
  "include": ["src/**/*", "prettify.d.ts"]
}
```

## Extension workflow

For zero-config editor setup without npm, see [../intersected-types](../intersected-types) and [packages/vscode-extension/README.md](../../packages/vscode-extension/README.md).
