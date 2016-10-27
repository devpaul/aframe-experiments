export * from './intern';

export var proxyPort = 9000;
export var proxyUrl = 'http://localhost:9000/';

export var capabilities = {
	'browserstack.selenium_version': '2.45.0',
	project: '${PROJECT_NAME}',
	name: '${PROJECT_NAME}'
};

// Browsers to run integration testing against. Note that version numbers must be strings if used with Sauce
// OnDemand. Options that will be permutated are browserName, version, platform, and platformVersion; any other
// capabilities options specified for an environment will be copied as-is
export var environments = [
	{ browser: 'IE', browser_version: '11', os: 'WINDOWS', os_version: '8.1' },
	{ browser: 'IE', browser_version: '10', os: 'WINDOWS', os_version: '8' },
	{ browser: 'IE', browser_version: '9', os: 'WINDOWS', os_version: '7' },
	{ browser: 'Firefox', os: 'WINDOWS', os_version: '8.1' },
	{ browser: 'Firefox', os: 'WINDOWS', os_version: 'XP' },
	{ browser: 'Firefox', os: 'OS X' },
	{ browser: 'Chrome', os: 'WINDOWS', os_version: '8.1' },
	{ browser: 'Chrome', os: 'WINDOWS', os_version: 'XP' },
	{ browser: 'Chrome', os: 'OS X' },
	{ browser: 'Safari', browser_version: '8', os: 'OS X' }
];

// Maximum number of simultaneous integration tests that should be executed on the remote WebDriver service
export var maxConcurrency = 2;

// Name of the tunnel class to use for WebDriver tests
export var tunnel = 'BrowserStackTunnel';
