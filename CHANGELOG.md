# Changelog

This monorepo ships two artifacts with independent versioning:

| Package | npm / extension ID | Changelog |
|---------|-------------------|-----------|
| `ts-hover-prettify` | [npm](https://www.npmjs.com/package/ts-hover-prettify) | [packages/ts-hover-prettify/CHANGELOG.md](packages/ts-hover-prettify/CHANGELOG.md) |
| `ts-hover-prettify-vscode` | `marcoantolini.ts-hover-prettify-vscode` | [packages/vscode-extension/CHANGELOG.md](packages/vscode-extension/CHANGELOG.md) |

---

## Repository

### 2026 — Monorepo and VS Code extension

The repository was restructured as a pnpm + Turborepo workspace. The original npm package remains in `packages/ts-hover-prettify`. A VS Code / Cursor extension was added in `packages/vscode-extension` to provide the same `Prettify` global type without installing the npm package.

Extension releases are published by tagging `vscode-v*` (see `.github/workflows/publish-extension.yml`). The npm package continues to use Changesets (see `.github/workflows/publish.yml`).

See the package changelog for npm release history.

---

## Quick reference

### `ts-hover-prettify` (npm)

- **1.1.1** — Updated README and changelog for the pnpm monorepo layout; no API changes.
- **1.1.0** — README and LICENSE published with the package.
- **1.0.0** — Initial release: `Prettify` type and `global` entry for declaration projects.

### `ts-hover-prettify-vscode` (extension)

- **0.1.4** — Nested `tsconfig.json` discovery; aligned virtual types path with `.vscode/ts-hover-prettify.d.ts`; avoid breaking implicit tsconfig projects.
- **0.1.2** — Virtual type injection for narrow `include` lists.
- **0.1.1** — Reliable plugin registration and TS server restart on activation.
- **0.1.0** — Initial extension with TypeScript server plugin.

Full notes per version are in the package changelogs linked above.
