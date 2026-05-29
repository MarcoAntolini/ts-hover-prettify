# Extension-only example

Test [TS Hover Prettify](../../packages/vscode-extension) without the npm package and without a committed `prettify.d.ts`.

| In this folder | Purpose |
|----------------|---------|
| `demo.ts` | Intersection wrapped in `Prettify` — hover to compare flattened vs unwrapped display |
| `tsconfig.json` | Minimal strict config; `include` lists `demo.ts` only until the extension runs |

Types must come from the extension. There is no `prettify.d.ts` here on purpose.

## Expected result

Open `demo.ts` and hover `Intersected`. With the extension active you should see a single object shape, for example:

```typescript
type Intersected = { a: string; b: number; c: boolean; }
```

Without `Prettify` (or without the extension), the same intersection hovers as chained `&` types.

## Run with F5 (Extension Development Host)

From the repository root:

```bash
pnpm install
pnpm build
```

1. Open `packages/vscode-extension` in VS Code or Cursor.
2. Press **F5** (Run Extension).
3. In the new window, **File → Open Folder** → this directory (`examples/intersected-types`).
4. Open `demo.ts`.

On first open the extension should:

- Create `.vscode/ts-hover-prettify.d.ts` with the `Prettify` definition.
- Append `.vscode/ts-hover-prettify.d.ts` to `tsconfig.json` `include` (this example already declares an `include` array).

If `Prettify` is not recognized, run **TypeScript: Restart TS Server**.

## Run with a VSIX

```bash
pnpm package:extension
```

Install `packages/vscode-extension/build/ts-hover-prettify-vscode-*.vsix` via **Extensions: Install from VSIX**, then:

1. Open this folder, or the monorepo root (extension **0.1.4+** discovers nested `tsconfig.json` files).
2. Open `demo.ts` and confirm `Prettify` resolves without adding `prettify.d.ts` yourself.
3. Reload the window if hovers do not update after install.

Use extension **0.1.4+** for monorepo-root workspaces; older VSIX builds may not patch nested configs.

## CI check (no editor)

Simulates the extension’s file writes for `tsc` only:

```bash
pnpm verify:example-extension
```

This runs `scripts/ensure-example-types.mjs` (writes `.vscode/ts-hover-prettify.d.ts` and updates `include`) then `tsc --noEmit`. It does not prove hover UI; use F5 or a VSIX for that.

## npm / `tsc` workflow

For the same demo with the [ts-hover-prettify](../../packages/ts-hover-prettify) package instead of the extension, see [../intersected-types-npm](../intersected-types-npm).
