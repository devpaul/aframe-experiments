import {readFileSync, writeFileSync} from 'fs';
import {join} from 'path';
import {cp, mkdir} from 'shelljs';
import {distPath, experimentsPath, getProjects, PackageJsonMetadata} from './common';

function createIndex(experiments: PackageJsonMetadata[]) {
	const indexPath = join(__dirname, './assets/index.html');
	const index = String(readFileSync(indexPath));
	const htmlLinks = experiments.map((experiment) => {
		return `<a href="${ experiment.name }">${ experiment.name }</a>`;
	});
	return index.replace('${experiments}', htmlLinks.join(''));
}

function copyExperiment(experiment: PackageJsonMetadata) {
	const source = join(experiment.dir, 'dist');
	const dest = join(distPath, experiment.name);
	console.log(`Copying ${ experiment.name }`);
	cp('-R', source, dest);
}

(async function() {
	const experiments = (await getProjects(experimentsPath)).filter(pack => pack.json.private !== true);

	mkdir('-p', distPath);
	for (let experiment of experiments) {
		copyExperiment(experiment);
	}
	writeFileSync(join(distPath, 'index.html'), createIndex(experiments));
})();
