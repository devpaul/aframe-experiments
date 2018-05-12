import { readdir, readFile, readFileSync, writeFile, writeFileSync } from 'fs';
import { join } from 'path';
import { cp, mkdir } from 'shelljs';

const experimentsPath = join(__dirname, '../experiments');
const distPath = join(__dirname, '../dist');

interface ExperimentMeta {
	description: string;
	name: string;
	path: string;
	isPrivate: boolean;
}

function getExperiments(): Promise<ExperimentMeta[]> {
	return new Promise((resolve, reject) => {
		readdir(experimentsPath, (err, items: string[]) => {
			if (err) {
				return reject(err);
			}

			resolve(items.map((experiment) => {
				const path = join(experimentsPath, experiment, 'package.json');
				const packageJson = require(path);

				return {
					description: <string> packageJson.description,
					name: <string> packageJson.name,
					path,
					isPrivate: <boolean> Boolean(packageJson.private)
				};
			}));
		});
	});
}

function createIndex(experiments: ExperimentMeta[]) {
	const indexPath = join(__dirname, './assets/index.html');
	const index = String(readFileSync(indexPath));
	const htmlLinks = experiments.map((experiment) => {
		if (!experiment.isPrivate) {
			return `<a href="${ experiment.name }">${ experiment.name }</a>`;
		}
		return '';
	});
	return index.replace('${experiments}', htmlLinks.join(''));
}

function copyExperiments(experiments: ExperimentMeta[]) {
	experiments.forEach((experiment) => {
		if (experiment.isPrivate) {
			return;
		}

		const source = join(experimentsPath, experiment.name, 'dist');
		const dest = join(distPath, experiment.name);
		console.log(`Copying ${ experiment.name }`);
		cp('-R', source, dest);
	});
}

mkdir('-p', distPath);

getExperiments().then((experiments) => {
	copyExperiments(experiments);
	writeFileSync(join(distPath, 'index.html'), createIndex(experiments));
});
