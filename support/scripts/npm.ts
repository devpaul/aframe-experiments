import {experimentsPath, getProjects, runNpmCommand, typesPath} from './common';

(async function() {
	const command = process.argv.slice(2).join(' ');
	const projects = [... await getProjects(experimentsPath), ... await getProjects(typesPath) ];
	for (let pack of projects) {
		console.log(`running ${ command } in ${ pack.dir }`);
		runNpmCommand(pack.dir, command);
	}
})();
