/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/ban-types */
type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};
