import {join, sep} from 'path';
import { existsSync, readdir } from 'fs';
import {cd, exec} from 'shelljs';

export interface PackageJson {
	name: string;
	description?: string;
	private?: boolean;
	scripts?: { [ key: string ]: string };
}

export interface PackageJsonMetadata {
	dir: string;
	name: string;
	path: string;
	json: PackageJson;
}

export const rootPath = join(__dirname, '..');
export const experimentsPath = join(rootPath, 'experiments');
export const typesPath = join(rootPath, '@types');
export const distPath = join(rootPath, 'dist');

function getFiles(rootDir: string): Promise<string[]> {
	return new Promise((resolve, reject) => {
		readdir(rootDir, (err, items: string[]) => {
			if (err) {
				return reject(err);
			}
			resolve(items.map(item => join(rootDir, item)));
		});
	});
}

function getPackageJson(dirPath: string): PackageJsonMetadata | undefined {
		const packagePath = join(dirPath, 'package.json');
		if (!existsSync(packagePath)) {
			return;
		}

		const packageJson = require(packagePath);

		return {
			dir: dirPath,
			name: dirPath.slice(dirPath.lastIndexOf(sep)),
			path: packagePath,
			json: packageJson
		};
}

export function packageHasScriptFilter(script: string) {
	return (value: PackageJsonMetadata) => {
		return Boolean(value && value.json && value.json.scripts && value.json.scripts[script]);
	};
}

export function runPackageScript(pack: PackageJsonMetadata, script: string) {
	runNpmCommand(pack.dir, `run ${ script }`);
}

export function runNpmCommand(dir: string, command: string) {
	cd(dir);
	const result = exec(`npm ${ command }`);
	if (result.code !== 0) {
		throw new Error(`install exited with a non-zero code: ${ result.code }`);
	}
}

export async function getProjects(rootDir: string): Promise<PackageJsonMetadata[]> {
	const children = await getFiles(rootDir);
	return children.map(getPackageJson).filter(value => !!value);
}
