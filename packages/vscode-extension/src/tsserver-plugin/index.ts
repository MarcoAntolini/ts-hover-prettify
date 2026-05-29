import * as path from "path";
import type * as Ts from "typescript/lib/tsserverlibrary";

const VSCODE_DIR = ".vscode";
const GLOBAL_TYPES_FILE = "ts-hover-prettify.d.ts";
const GLOBAL_TYPES_CONTENT = `type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};
`;

function init(modules: { typescript: typeof Ts }): {
	create(info: Ts.server.PluginCreateInfo): Ts.LanguageService;
	getExternalFiles(project: Ts.server.Project): string[];
} {
	const ts = modules.typescript;

	function resolveTypesPath(project: Ts.server.Project): string {
		return ts.server.toNormalizedPath(
			path.join(project.getCurrentDirectory(), VSCODE_DIR, GLOBAL_TYPES_FILE),
		);
	}

	function patchHostForGlobalTypes(info: Ts.server.PluginCreateInfo, filePath: string): void {
		const normalizedPath = ts.server.toNormalizedPath(filePath);
		const snapshot = ts.ScriptSnapshot.fromString(GLOBAL_TYPES_CONTENT);
		const host = info.languageServiceHost;

		const previousGetScriptSnapshot = host.getScriptSnapshot.bind(host);
		host.getScriptSnapshot = (fileName) => {
			if (ts.server.toNormalizedPath(fileName) === normalizedPath) {
				return snapshot;
			}
			return previousGetScriptSnapshot(fileName);
		};

		const previousReadFile = host.readFile?.bind(host);
		if (previousReadFile) {
			host.readFile = (fileName, encoding) => {
				if (ts.server.toNormalizedPath(fileName) === normalizedPath) {
					return GLOBAL_TYPES_CONTENT;
				}
				return previousReadFile(fileName, encoding);
			};
		}
	}

	function loadGlobalTypesFile(project: Ts.server.Project, filePath: string): void {
		const normalizedPath = ts.server.toNormalizedPath(filePath);

		if (project.containsFile(normalizedPath)) {
			return;
		}

		const scriptInfo = project.projectService.getOrCreateScriptInfoForNormalizedPath(
			normalizedPath,
			true,
			GLOBAL_TYPES_CONTENT,
		);

		if (!scriptInfo) {
			return;
		}

		if (!project.projectService.openFiles.has(scriptInfo.path)) {
			project.projectService.openFiles.set(scriptInfo.path, undefined);
		}

		const projectWithRoot = project as Ts.server.Project & { projectRootPath?: unknown };
		if (projectWithRoot.projectRootPath) {
			project.addRoot(scriptInfo);
		}
	}

	function attachToProject(info: Ts.server.PluginCreateInfo): void {
		const filePath = resolveTypesPath(info.project);
		patchHostForGlobalTypes(info, filePath);
		loadGlobalTypesFile(info.project, filePath);
	}

	function create(info: Ts.server.PluginCreateInfo): Ts.LanguageService {
		attachToProject(info);
		return info.languageService;
	}

	function getExternalFiles(project: Ts.server.Project): string[] {
		const filePath = resolveTypesPath(project);
		loadGlobalTypesFile(project, filePath);
		return [filePath];
	}

	return { create, getExternalFiles };
}

export = init;
