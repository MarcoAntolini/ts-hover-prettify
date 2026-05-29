# ts-hover-prettify

Make TypeScript hover tooltips more readable by flattening intersected types with the `Prettify` utility type.

## Choose your install

| Option | Best for | Setup |
|--------|----------|--------|
| **[VS Code / Cursor extension](packages/vscode-extension)** | Zero-config in the editor | Install the extension — no `prettify.d.ts` required |
| **[npm package](packages/ts-hover-prettify)** | CI, non-VS Code editors, explicit control | `npm add -D ts-hover-prettify` + `import "ts-hover-prettify/global"` |

## Monorepo

```
packages/
  ts-hover-prettify/     # npm library (published to npm)
  vscode-extension/     # VS Code / Cursor extension
examples/
  intersected-types/       # extension-only test (no prettify.d.ts)
  intersected-types-npm/   # npm package + tsc verification
```

## Development

```bash
pnpm install
pnpm build          # build library + extension
pnpm lint
```

### Extension (local)

1. `pnpm build`
2. Open `packages/vscode-extension` in VS Code/Cursor
3. Press **F5** to launch the Extension Development Host with [`examples/intersected-types`](examples/intersected-types) (extension-only — no `prettify.d.ts`)
4. Optional: `pnpm package:extension` → install `packages/vscode-extension/build/*.vsix`

For npm/`tsc` without the extension: [`examples/intersected-types-npm`](examples/intersected-types-npm) (`pnpm verify:example-npm`)

See [packages/vscode-extension/README.md](packages/vscode-extension/README.md) for details.

### npm package

See [packages/ts-hover-prettify/README.md](packages/ts-hover-prettify/README.md).

## Release

- **npm**: Changesets on `master` / `main` (see `.github/workflows/publish.yml`)
- **Extension**: `.github/workflows/publish-extension.yml` (VS Marketplace + Open VSX, manual or tagged)

## Example

```typescript
type Intersected = Prettify<
  { a: string } & { b: number } & { c: boolean }
>;
// Hover shows: { a: string; b: number; c: boolean; }
```

Full walkthrough in the [package README](packages/ts-hover-prettify/README.md).
