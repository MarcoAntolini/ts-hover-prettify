# TS Hover Prettify (VS Code / Cursor)

Zero-config extension that injects the `Prettify` utility type into TypeScript projects so hover tooltips on wrapped types are easier to read.

## Install

- **VS Code**: search for **TS Hover Prettify** on the Marketplace (after publish), or install a `.vsix` locally.
- **Cursor**: install from Open VSX (after publish), or install from VSIX.

## Usage

1. Install and enable the extension.
2. Wrap intersected types with `Prettify<...>` in your TypeScript code.
3. Hover over the type alias to see the flattened object shape.

No `npm install` and no `prettify.d.ts` file required.

## Local development

From the **repository root**:

```bash
pnpm install
pnpm build
```

Open `packages/vscode-extension` in VS Code/Cursor, press **F5** (Run Extension), and open [`examples/intersected-types`](../../examples/intersected-types) in the Extension Development Host (that folder has no `prettify.d.ts` — types must come from the extension).

To build a VSIX:

```bash
pnpm package:extension
```

The VSIX is written to `packages/vscode-extension/build/`. Install via **Extensions: Install from VSIX**.

## Requirements

- VS Code `^1.85.0` (or compatible Cursor build)
- TypeScript enabled in the workspace

## Troubleshooting

- Run **TypeScript: Restart TS Server** after installing or updating the extension (also runs automatically on first activation).
- If `Prettify` is not recognized, confirm the extension is enabled and the workspace uses the built-in TypeScript extension.
- Install the VSIX from **VS Code or Cursor** (Extensions → Install from VSIX), not from Visual Studio’s installer.
- Use **v0.1.4+**. Opening the monorepo root is supported; the extension discovers nested `tsconfig.json` files (e.g. `examples/intersected-types`).
- Older VSIX builds may not inject types correctly.

## npm alternative

Prefer a devDependency instead? Use the [ts-hover-prettify](../ts-hover-prettify) package and see [examples/intersected-types-npm](../../examples/intersected-types-npm).
