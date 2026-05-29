# Extension-only example

Use this folder to test **TS Hover Prettify** without npm or a committed `prettify.d.ts`.

There is intentionally **no** type shim in this directory. Types must come from the extension.

## Test with F5

1. From the repo root: `pnpm install && pnpm build`
2. Open `packages/vscode-extension` in VS Code/Cursor
3. Press **F5** (Run Extension)
4. In the Extension Development Host, open **this folder** (`examples/intersected-types`)
5. Open `demo.ts` — the extension should create `.vscode/ts-hover-prettify.d.ts` and update `tsconfig.json` `include`
6. Hover over `Intersected` to see the flattened type

## Test with VSIX

1. `pnpm package:extension` → install `packages/vscode-extension/build/ts-hover-prettify-vscode-0.1.3+.vsix` in Cursor/VS Code
2. **File → Open Folder** → select `examples/intersected-types` or the monorepo root (v0.1.4+ patches nested tsconfigs)
3. Reload the window if needed
4. Confirm `Prettify` resolves in `demo.ts` without adding `prettify.d.ts` yourself

## npm / `tsc` without the extension

See [../intersected-types-npm](../intersected-types-npm).
