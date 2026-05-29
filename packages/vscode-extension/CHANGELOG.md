# ts-hover-prettify-vscode

## 0.1.4

### Patch Changes

- Discover and patch every nested `tsconfig.json` in the workspace (fixes monorepo roots where only `examples/...` had an `include` list).
- Align the tsserver plugin virtual file with `.vscode/ts-hover-prettify.d.ts` (same path as the extension writes).
- Avoid adding a lone `include` to tsconfigs that rely on implicit file discovery (prevents shrinking the project).

## 0.1.2

### Patch Changes

- Inject `Prettify` via an in-project virtual `.ts-hover-prettify-global.d.ts` so VSIX installs work with narrow `tsconfig` `include` lists (e.g. only `demo.ts`).

## 0.1.1

### Patch Changes

- Fix zero-config `Prettify` injection: module-level `getExternalFiles`, `onConfigurationChanged`, and TS server restart on first activation.

## 0.1.0

### Minor Changes

- Initial VS Code / Cursor extension with zero-config `Prettify` global type injection via TypeScript server plugin.
