import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { cp, mkdir } from 'shelljs';
import { distPath, ExperimentMeta, experimentsPath, getExperiments } from './common';

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
