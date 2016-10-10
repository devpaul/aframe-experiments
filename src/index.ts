(function () {
	const libsDirectory = './libs';

	(<DojoLoader.RootRequire> require).config({
		baseUrl: '.',
		packages: [
			{
				name: 'src',
				location: './src'
			},
			{
				name: 'aframe',
				location: `${ libsDirectory }/aframe`,
				main: 'aframe.js'
			},
			{
				name: 'dojo-core',
				location: `${ libsDirectory }/dojo-core`
			},
			{
				name: 'dojo-has',
				location: `${ libsDirectory }/dojo-has`
			},
			{
				name: 'dojo-shim',
				location: `${ libsDirectory }/dojo-shim`
			}
		]
	});

	const dependencies = [ 'aframe' ];
	const appNode = document.querySelector('[run-app]');
	if (appNode) {
		const appMid = appNode.getAttribute('run-app');
		dependencies.unshift(appMid);
	}

	require(dependencies, function (app) {
		app && app.startup && app.startup();
	});
}());
