# Changelog

All notable changes to **ts-hover-prettify-vscode** are documented here.

## [0.2.0] - 2026-05-29

### Fixed

- CI: treat "already exists" as a non-fatal skip when publishing to VS Marketplace or Open VSX, so a partial publish can be retried without blocking the other registry.

## [0.1.4] - 2026-05-29

### Fixed

- Discover and patch every nested `tsconfig.json` in the workspace (monorepo roots where only subfolders had an `include` list).
- Align the tsserver plugin virtual file with `.vscode/ts-hover-prettify.d.ts` (same path the extension writes on disk).
- Do not add a standalone `include` array to tsconfigs that rely on implicit file discovery; avoids shrinking the project file set.

## [0.1.2]

### Fixed

- Inject `Prettify` through the TypeScript server plugin (`getExternalFiles`) so VSIX installs work when `tsconfig.json` `include` lists only application files (for example `demo.ts` only).

## [0.1.1]

### Fixed

- Register `getExternalFiles` at plugin module scope so the language service loads the global types file reliably.
- Restart the TypeScript server on first activation when workspace files or `tsconfig.json` were updated.

## [0.1.0]

### Added

- Initial VS Code / Cursor extension.
- TypeScript server plugin (`ts-hover-prettify-plugin`) for zero-config `Prettify` in hovers.
- Workspace activation: write `.vscode/ts-hover-prettify.d.ts` and extend `tsconfig.json` when `include` or `files` is already present.
