import * as vscode from "vscode";

export const GLOBAL_TYPES_CONTENT = `type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};
`;

const TYPES_FILE = "ts-hover-prettify.d.ts";
const VSCODE_DIR = ".vscode";
const TYPES_RELATIVE = `${VSCODE_DIR}/${TYPES_FILE}`;
const SKIP_DIR_NAMES = new Set(["node_modules", "dist", "build", ".git", "out"]);

export async function ensureWorkspaceTypes(folder: vscode.WorkspaceFolder): Promise<boolean> {
	const tsconfigUris = await discoverTsconfigUris(folder);
	if (tsconfigUris.length === 0) {
		return false;
	}

	let anyChanged = false;
	for (const tsconfigUri of tsconfigUris) {
		anyChanged = (await ensureProjectTypes(tsconfigUri)) || anyChanged;
	}
	return anyChanged;
}

async function discoverTsconfigUris(folder: vscode.WorkspaceFolder): Promise<vscode.Uri[]> {
	const found: vscode.Uri[] = [];

	async function walk(dir: vscode.Uri, depth: number): Promise<void> {
		if (depth > 12) {
			return;
		}

		let entries: [string, vscode.FileType][];
		try {
			entries = await vscode.workspace.fs.readDirectory(dir);
		} catch {
			return;
		}

		for (const [name, fileType] of entries) {
			if (fileType !== vscode.FileType.Directory) {
				continue;
			}
			if (SKIP_DIR_NAMES.has(name)) {
				continue;
			}
			await walk(vscode.Uri.joinPath(dir, name), depth + 1);
		}

		const tsconfigUri = vscode.Uri.joinPath(dir, "tsconfig.json");
		try {
			await vscode.workspace.fs.stat(tsconfigUri);
			found.push(tsconfigUri);
		} catch {
			// no tsconfig in this directory
		}
	}

	await walk(folder.uri, 0);
	return found;
}

async function ensureProjectTypes(tsconfigUri: vscode.Uri): Promise<boolean> {
	const projectRoot = vscode.Uri.joinPath(tsconfigUri, "..");
	const typesUri = vscode.Uri.joinPath(projectRoot, VSCODE_DIR, TYPES_FILE);
	const vscodeDir = vscode.Uri.joinPath(projectRoot, VSCODE_DIR);

	try {
		await vscode.workspace.fs.createDirectory(vscodeDir);
	} catch {
		// directory may already exist
	}

	let typesWritten = false;
	try {
		const existing = await vscode.workspace.fs.readFile(typesUri);
		if (Buffer.from(existing).toString("utf8") !== GLOBAL_TYPES_CONTENT) {
			await vscode.workspace.fs.writeFile(typesUri, Buffer.from(GLOBAL_TYPES_CONTENT, "utf8"));
			typesWritten = true;
		}
	} catch {
		await vscode.workspace.fs.writeFile(typesUri, Buffer.from(GLOBAL_TYPES_CONTENT, "utf8"));
		typesWritten = true;
	}

	const includeChanged = await ensureTsconfigIncludes(tsconfigUri, TYPES_RELATIVE);
	return typesWritten || includeChanged;
}

async function ensureTsconfigIncludes(tsconfigUri: vscode.Uri, relativeInclude: string): Promise<boolean> {
	const bytes = await vscode.workspace.fs.readFile(tsconfigUri);
	const text = Buffer.from(bytes).toString("utf8");

	if (text.includes(TYPES_FILE)) {
		return false;
	}

	const entry = `"${relativeInclude}"`;

	const includeMatch = /"include"\s*:\s*\[([^\]]*)\]/s.exec(text);
	if (includeMatch) {
		const includeList = includeMatch[1]?.trim();
		const nextInclude = includeList ? `${includeList}, ${entry}` : entry;
		const updated = text.replace(includeMatch[0], `"include": [${nextInclude}]`);
		return applyTsconfigEdit(tsconfigUri, text, updated);
	}

	const filesMatch = /"files"\s*:\s*\[([^\]]*)\]/s.exec(text);
	if (filesMatch) {
		const filesList = filesMatch[1]?.trim();
		const nextFiles = filesList ? `${filesList}, ${entry}` : entry;
		const updated = text.replace(filesMatch[0], `"files": [${nextFiles}]`);
		return applyTsconfigEdit(tsconfigUri, text, updated);
	}

	// No include/files: do not add a lone include (that would shrink the project).
	// The tsserver plugin injects Prettify via getExternalFiles for these projects.
	return false;
}

async function applyTsconfigEdit(
	tsconfigUri: vscode.Uri,
	previousText: string,
	updated: string,
): Promise<boolean> {
	if (updated === previousText) {
		return false;
	}

	const edit = new vscode.WorkspaceEdit();
	edit.replace(tsconfigUri, new vscode.Range(0, 0, Number.MAX_SAFE_INTEGER, 0), updated);
	await vscode.workspace.applyEdit(edit);
	return true;
}
