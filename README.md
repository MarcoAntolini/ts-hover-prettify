# ts-hover-prettify

This tool helps you make more readable and prettier hover tooltips for your Typescript code.

## Usage

First, you need to install the package:

```bash
npm add -D ts-hover-prettify
```

And then you have to add a file `prettify.d.ts` to your project with the following content:

```typescript
import 'ts-hover-prettify';
```

That's it! Now you can use it inside your project.

## Example

Let's say you have a type like this:

```typescript
type Intersected = {
  a: string;
} & {
  b: number;
} & {
  c: boolean;
};
```

Hovering over `Intersected` would show you the following tooltip:

```typescript
/**
 * { a: string; } & { b: number; } & { c: boolean; }
 */
```

But wrapping it inside of `Prettify` you can make it more readable:

```typescript
type Intersected = Prettify<
  {
    a: string;
  } & {
    b: number;
  } & {
    c: boolean;
  }
>;

/**
 * {
 *   a: string;
 *   b: number;
 *   c: boolean;
 * }
 */
```
