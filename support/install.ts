import { getExperiments } from './common';
import { cd, exec } from 'shelljs';
import { dirname } from 'path';

getExperiments().then((experiments) => {
	for (let experiment of experiments) {
		const dir = dirname(experiment.path);
		console.log(`installing in ${ dir }`);
		cd(dir);
		const result = exec('npm install');

		if (result.code !== 0) {
			throw new Error(`install exited with a non-zero code: ${ result.code }`);
		}
	}
}).catch((e) => {
	console.log(e);
});
