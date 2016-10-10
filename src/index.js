(function () {
    var libsDirectory = './libs';
    require.config({
        baseUrl: '.',
        packages: [
            {
                name: 'src',
                location: './src'
            },
            {
                name: 'aframe',
                location: libsDirectory + "/aframe",
                main: 'aframe.js'
            },
            {
                name: 'dojo-core',
                location: libsDirectory + "/dojo-core"
            },
            {
                name: 'dojo-has',
                location: libsDirectory + "/dojo-has"
            },
            {
                name: 'dojo-shim',
                location: libsDirectory + "/dojo-shim"
            }
        ]
    });
    var dependencies = ['aframe'];
    var appNode = document.querySelector('[run-app]');
    if (appNode) {
        var appMid = appNode.getAttribute('run-app');
        dependencies.unshift(appMid);
    }
    require(dependencies, function (app) {
        app && app.startup && app.startup();
    });
}());
//# sourceMappingURL=../_debug/index.js.map