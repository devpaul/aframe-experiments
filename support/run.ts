import {experimentsPath, getProjects, runPackageScript, typesPath} from './common';

(async function() {
	const script = process.argv[2];
	const projects = [... await getProjects(typesPath), ... await getProjects(experimentsPath)];
	for (let pack of projects) {
		console.log(`running ${ script } on ${ pack.dir }`);
		runPackageScript(pack, script);
	}
})();
