type Intersected = Prettify<
	{
		a: string;
	} & {
		b: number;
	} & {
		c: boolean;
	}
>;

const _demo: Intersected = {
	a: "hello",
	b: 42,
	c: true,
};

export type { Intersected };
export { _demo };
