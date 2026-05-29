import * as vscode from "vscode";
import { ensureWorkspaceTypes } from "./workspace-types";

export function activate(context: vscode.ExtensionContext): void {
	void prepareWorkspace();

	context.subscriptions.push(
		vscode.workspace.onDidOpenTextDocument((document) => {
			if (isTypeScriptDocument(document)) {
				void prepareWorkspace();
			}
		}),
	);
}

export function deactivate(): void {}

function isTypeScriptDocument(document: vscode.TextDocument): boolean {
	return document.languageId === "typescript" || document.languageId === "typescriptreact";
}

async function prepareWorkspace(): Promise<void> {
	const folder = vscode.workspace.workspaceFolders?.[0];
	if (!folder) {
		return;
	}

	const tsconfigChanged = await ensureWorkspaceTypes(folder);
	if (!tsconfigChanged) {
		return;
	}

	await vscode.commands.executeCommand("typescript.restartTsServer");
}
