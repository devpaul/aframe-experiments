import { join } from 'path';
import { existsSync, readdir } from 'fs';

export interface ExperimentMeta {
	description: string;
	name: string;
	path: string;
	isPrivate: boolean;
}

export const rootPath = join(__dirname, '..');
export const experimentsPath = join(rootPath, 'experiments');
export const distPath = join(rootPath, 'dist');

export function getExperiments(): Promise<ExperimentMeta[]> {
	return new Promise((resolve, reject) => {
		readdir(experimentsPath, (err, items: string[]) => {
			if (err) {
				return reject(err);
			}

			resolve(items.reduce((paths, experiment) => {
				const path = join(experimentsPath, experiment, 'package.json');
				if (!existsSync(path)) {
					return paths;
				}

				const packageJson = require(path);

				paths.push({
					description: <string> packageJson.description,
					name: <string> packageJson.name,
					path,
					isPrivate: <boolean> Boolean(packageJson.private)
				});
				return paths;
			}, []));
		});
	});
}
