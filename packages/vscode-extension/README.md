<div align="center">

# TS Hover Prettify

Prettier TypeScript hover tooltips via the `Prettify` utility type — zero npm setup.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](https://github.com/MarcoAntolini/ts-hover-prettify/blob/main/LICENSE)
[![Stars](https://img.shields.io/github/stars/MarcoAntolini/ts-hover-prettify?style=for-the-badge)](https://github.com/MarcoAntolini/ts-hover-prettify/stargazers)

**Extension ID:** `marcoantolini.ts-hover-prettify-vscode` · **Publisher:** marcoantolini

</div>

## What is this?

This extension injects the `Prettify<T>` utility type into TypeScript workspaces so you can wrap intersections and get flatter hover text — without adding `ts-hover-prettify` as an npm dependency.

For `tsc`, CI, or non-VS Code editors, use the [npm package](../ts-hover-prettify) instead.

## Quick Start

### Requirements

- VS Code **1.85.0** or newer (or a Cursor build with compatible VS Code APIs)
- Built-in **TypeScript and JavaScript Language Features** extension enabled for the workspace

### Install

| Source | Steps |
|--------|--------|
| **VSIX (local / CI)** | From repo root: `pnpm package:extension` → install `build/ts-hover-prettify-vscode-*.vsix` via **Extensions: Install from VSIX** |
| **Marketplace / Open VSX** | After publish (workflow tag `vscode-v*` or `publish-extension.yml`); search for **TS Hover Prettify** |

Install the VSIX from VS Code or Cursor, not from the Visual Studio installer.

### Usage

1. Enable the extension for your workspace.
2. Wrap type aliases you want readable hovers for:

```typescript
type Intersected = Prettify<
  { a: string } & { b: number } & { c: boolean }
>;
```

1. Hover `Intersected` in the editor.

No `npm install` and no hand-written `prettify.d.ts` are required.

## What the extension changes in your repo

On activation (and when opening TypeScript files), the extension:

1. Walks the workspace for `tsconfig.json` files (skips `node_modules`, `dist`, etc., max depth 12).
2. Writes or updates `.vscode/ts-hover-prettify.d.ts` with the `Prettify` definition next to each config.
3. Appends `.vscode/ts-hover-prettify.d.ts` to existing `include` or `files` arrays in those configs.
4. If a config has **no** `include` or `files`, it does **not** add a lone `include` (that would shrink the project). The bundled **TypeScript server plugin** still exposes `Prettify` via `getExternalFiles`.

If `tsconfig.json` or the types file changes, the extension runs **TypeScript: Restart TS Server**.

You may commit `.vscode/ts-hover-prettify.d.ts` and tsconfig edits, or gitignore them — both are valid; the extension will recreate them when needed.

## Example workspace

From the repository root:

```bash
pnpm install
pnpm build
```

**F5 debugging:** open this folder (`packages/vscode-extension`), run **Run Extension**, open [examples/intersected-types](../../examples/intersected-types) in the Extension Development Host, then open `demo.ts` and hover `Intersected`.

**VSIX:** package as above, open `examples/intersected-types` or the monorepo root (0.1.4+ discovers nested tsconfigs).

## Troubleshooting

| Symptom | What to try |
|---------|-------------|
| `Prettify` unknown | Confirm the extension is enabled; run **TypeScript: Restart TS Server** |
| No change after install | Reload the window; reopen the folder; use extension **0.1.4+** for monorepo roots |
| Types file missing from project | Check `tsconfig.json` `include` / `files`; for implicit configs, rely on the server plugin (0.1.2+) |
| Wrong editor | Use VS Code / Cursor only |

## Documentation

| Resource | Description |
|----------|-------------|
| [Root README](../../README.md) | Monorepo overview and install options |
| [npm package README](../ts-hover-prettify/README.md) | `tsc` / CI setup with `ts-hover-prettify` |
| [examples/intersected-types](../../examples/intersected-types) | Extension workflow demo |
| [CHANGELOG.md](./CHANGELOG.md) | Extension release notes |

## Local development

```bash
# from repository root
pnpm install
pnpm build
pnpm package:extension   # optional VSIX
```

Open this directory in VS Code/Cursor and press **F5**.

## Contributing

Issues and pull requests are welcome on [GitHub](https://github.com/MarcoAntolini/ts-hover-prettify).

<a href="https://github.com/MarcoAntolini/ts-hover-prettify/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=MarcoAntolini/ts-hover-prettify" />
</a>

## License

[MIT](../../LICENSE) — Copyright 2023 Marco Antolini.
