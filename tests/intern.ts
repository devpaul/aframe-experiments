export var tunnel = 'NullTunnel';
export var tunnelOptions = {
	hostname: 'localhost',
	port: '4444'
};

export var environments = [
	{ browserName: 'chrome' }
];

export var loaderOptions = {
	// Packages that should be registered with the loader in each testing environment
	packages: [
		{ name: 'dojo-shim', location: '_build/libs/dojo-shim' },
		{ name: 'dojo-has', location: '_build/libs/dojo-has' },
		{ name: 'dojo-core', location: '_build/libs/dojo-core' },
		{ name: 'src', location: '_build/src' },
		{ name: 'tests', location: '_build/tests' }
	]
};

export var suites = [ 'tests/unit/all' ];
export var functionalSuites = [ 'tests/functional/all' ];

export var excludeInstrumentation = /(?:node_modules|bower_components|tests)[\/\\]/;
