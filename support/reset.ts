import {experimentsPath, getProjects, typesPath} from './common';
import {join} from 'path';
import {rm} from 'shelljs';
import {existsSync} from 'fs';

(async function() {
	const projects = [... await getProjects(typesPath), ... await getProjects(experimentsPath)];
	for (let pack of projects) {
		const nodeModulesPath = join(pack.dir, 'node_modules');
		if (existsSync(nodeModulesPath)) {
			console.log(`resetting ${ pack.name }`);
			rm('-rf', nodeModulesPath);
		}
	}
})();
