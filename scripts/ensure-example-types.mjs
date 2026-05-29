/**
 * Applies the same global types + tsconfig include logic as the VS Code extension
 * (for CI / local verification without launching the editor).
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");

const GLOBAL_TYPES_CONTENT = `type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};
`;

const TYPES_FILE = "ts-hover-prettify.d.ts";
const TYPES_RELATIVE = `.vscode/${TYPES_FILE}`;

function ensureProject(tsconfigPath) {
	const projectRoot = path.dirname(tsconfigPath);
	const vscodeDir = path.join(projectRoot, ".vscode");
	const typesPath = path.join(vscodeDir, TYPES_FILE);

	fs.mkdirSync(vscodeDir, { recursive: true });
	fs.writeFileSync(typesPath, GLOBAL_TYPES_CONTENT, "utf8");

	let text = fs.readFileSync(tsconfigPath, "utf8");
	if (text.includes(TYPES_FILE)) {
		return false;
	}

	const entry = `"${TYPES_RELATIVE}"`;
	const includeMatch = /"include"\s*:\s*\[([^\]]*)\]/s.exec(text);
	if (!includeMatch) {
		throw new Error(`Example tsconfig must have an include array: ${tsconfigPath}`);
	}
	const includeList = includeMatch[1]?.trim();
	const nextInclude = includeList ? `${includeList}, ${entry}` : entry;
	text = text.replace(includeMatch[0], `"include": [${nextInclude}]`);

	fs.writeFileSync(tsconfigPath, text, "utf8");
	return true;
}

const exampleTsconfig = path.join(repoRoot, "examples", "intersected-types", "tsconfig.json");
ensureProject(exampleTsconfig);
console.log("Ensured types for", exampleTsconfig);
