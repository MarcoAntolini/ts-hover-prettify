import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import * as esbuild from "esbuild";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(__dirname, "..");
const coreGlobalTypes = path.resolve(
	packageRoot,
	"..",
	"ts-hover-prettify",
	"dist",
	"global.d.ts",
);

const distDir = path.join(packageRoot, "dist");
const pluginDir = path.join(distDir, "tsserver-plugin");

async function build() {
	if (!fs.existsSync(coreGlobalTypes)) {
		throw new Error(
			`Missing ${coreGlobalTypes}. Run "pnpm build" at the repo root first (builds ts-hover-prettify).`,
		);
	}

	fs.rmSync(distDir, { recursive: true, force: true });
	fs.mkdirSync(pluginDir, { recursive: true });

	await Promise.all([
		esbuild.build({
			entryPoints: [path.join(packageRoot, "src", "extension.ts")],
			bundle: true,
			platform: "node",
			target: "node18",
			format: "cjs",
			outfile: path.join(distDir, "extension.js"),
			external: ["vscode"],
			sourcemap: true,
		}),
		esbuild.build({
			entryPoints: [path.join(packageRoot, "src", "tsserver-plugin", "index.ts")],
			bundle: false,
			platform: "node",
			target: "node18",
			format: "cjs",
			outfile: path.join(pluginDir, "index.js"),
			sourcemap: true,
		}),
	]);

	fs.copyFileSync(coreGlobalTypes, path.join(distDir, "global.d.ts"));

	fs.writeFileSync(
		path.join(pluginDir, "package.json"),
		`${JSON.stringify({ name: "ts-hover-prettify-plugin", main: "index.js" }, null, 2)}\n`,
	);
}

build().catch((error) => {
	console.error(error);
	process.exit(1);
});
