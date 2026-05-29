# ts-hover-prettify

[![npm version](https://img.shields.io/npm/v/ts-hover-prettify)](https://www.npmjs.com/package/ts-hover-prettify)

Provide the `Prettify<T>` utility type so TypeScript hovers show a single object shape instead of a chain of intersections.

This package is for projects where you want the type in source control or need `tsc` / CI without the [VS Code extension](../vscode-extension). The extension injects the same type automatically; pick one approach per repo.

## Install

```bash
npm add -D ts-hover-prettify
# pnpm add -D ts-hover-prettify
# yarn add -D ts-hover-prettify
```

## Setup

### Global `Prettify` (recommended)

Create a declaration file included by your `tsconfig.json`, for example `prettify.d.ts`:

```typescript
import "ts-hover-prettify/global";
```

Add it to `compilerOptions.types`, or to top-level `include` / `files`, for example:

```json
{
  "include": ["src/**/*", "prettify.d.ts"]
}
```

After that, `Prettify` is available everywhere in the project without importing it in each file.

### Named import

```typescript
import type { Prettify } from "ts-hover-prettify";

type Flat = Prettify<{ x: 1 } & { y: 2 }>;
```

## Example

```typescript
type Intersected = { a: string } & { b: number } & { c: boolean };
// Hover: { a: string; } & { b: number; } & { c: boolean; }

type Readable = Prettify<
  { a: string } & { b: number } & { c: boolean }
>;
// Hover: { a: string; b: number; c: boolean; }
```

Working example in this repo: [examples/intersected-types-npm](../../examples/intersected-types-npm). Verify from the repo root:

```bash
pnpm verify:example-npm
```

## API

```typescript
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
```

Implementation matches the common community pattern (also documented as `Compute`, `Expand`, etc.). It only affects how TypeScript prints types in the language service; it is erased at compile time and does not change JavaScript output.

## Behaviour and limits

- Wrap **only the types** where you care about hover readability. Unwrapped aliases keep their default display.
- Works best on object intersections and similar shapes you intentionally pass into `Prettify`. It does not recursively “fix” every nested type in the project.
- Requires TypeScript (peer usage via your project’s `typescript` version). This package ships type definitions only; it does not patch the compiler.

## VS Code / Cursor without npm

Use the [ts-hover-prettify-vscode](../vscode-extension) extension instead of this package if you only need editor hovers and accept workspace injection of `.vscode/ts-hover-prettify.d.ts`.

## License

[MIT](../../LICENSE).
