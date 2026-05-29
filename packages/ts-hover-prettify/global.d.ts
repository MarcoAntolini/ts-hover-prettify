type Prettify<T> = {
	[K in keyof T]: T[K];
	// eslint-disable-next-line @typescript-eslint/ban-types -- `{}` expands the mapped type for hover display
} & {};
