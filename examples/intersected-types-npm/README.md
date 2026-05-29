# npm package example

Same demo as [../intersected-types](../intersected-types), but types come from the **npm package** via `prettify.d.ts` — no extension required.

## Verify with `tsc`

From the repository root (after `pnpm build`):

```bash
pnpm verify:example-npm
```

## Usage in your own project

```bash
npm add -D ts-hover-prettify
```

Add `prettify.d.ts`:

```typescript
import "ts-hover-prettify/global";
```

Or use a reference to the package types, as in this folder’s `prettify.d.ts`.
