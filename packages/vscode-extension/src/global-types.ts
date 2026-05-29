export const VSCODE_DIR = ".vscode";

export const GLOBAL_TYPES_FILE = "ts-hover-prettify.d.ts";

export const GLOBAL_TYPES_CONTENT = `type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};
`;

export const GLOBAL_TYPES_RELATIVE = `${VSCODE_DIR}/${GLOBAL_TYPES_FILE}`;
