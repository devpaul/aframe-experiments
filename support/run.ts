import {experimentsPath, getProjects, packageHasScriptFilter, runPackageScript, typesPath} from './common';

(async function() {
	const script = process.argv[2];
	const projects = [... await getProjects(typesPath), ... await getProjects(experimentsPath)].filter(packageHasScriptFilter(script));
	for (let pack of projects) {
		console.log(`running ${ script } on ${ pack.dir }`);
		runPackageScript(pack, script);
	}
})();
