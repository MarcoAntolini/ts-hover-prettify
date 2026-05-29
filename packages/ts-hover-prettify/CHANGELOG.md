# Changelog

## 1.1.1

### Patch Changes

- Update package README and changelog for the pnpm monorepo layout. No API changes; `Prettify` and `import "ts-hover-prettify/global"` unchanged.

All notable changes to **ts-hover-prettify** are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2023-09-25

### Added

- README and MIT LICENSE included in the published tarball.

### Changed

- No API changes; `Prettify` and `import "ts-hover-prettify/global"` unchanged from 1.0.0.

## [1.0.0] - 2023-09-25

### Added

- Initial npm release.
- `Prettify<T>` mapped type exported from the package entry.
- `./global` export: ambient `Prettify` when imported from a project declaration file.
- Dual CJS / ESM build (`dist/index.js`, `dist/index.mjs`) and TypeScript declarations.

[1.1.0]: https://github.com/MarcoAntolini/ts-hover-prettify/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/MarcoAntolini/ts-hover-prettify/releases/tag/v1.0.0
