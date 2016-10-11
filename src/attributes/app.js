(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    function startup() {
        var scene = document.querySelector('a-scene');
        var sphere = document.querySelector('a-sphere');
        var properties = ['position', 'rotation', 'scale'];
        if (scene.hasLoaded) {
            initialize();
        }
        else {
            scene.addEventListener('loaded', initialize);
        }
        function initialize() {
            properties.forEach(function (prop) {
                attachProperty(prop);
                updateProperty(prop);
            });
        }
        function attachProperty(id) {
            var form = document.getElementById(id);
            form.addEventListener('submit', function (event) {
                setProperty(id);
                event.preventDefault();
                event.stopPropagation();
            });
        }
        function setProperty(id) {
            var form = document.getElementById(id);
            var x = form.x.value;
            var y = form.y.value;
            var z = form.z.value;
            sphere.setAttribute(id, {
                x: x,
                y: y,
                z: z
            });
        }
        function updateProperty(id) {
            var form = document.getElementById(id);
            var attr = sphere.getComputedAttribute(id);
            form.x.value = attr.x;
            form.y.value = attr.y;
            form.z.value = attr.z;
        }
    }
    exports.startup = startup;
});
//# sourceMappingURL=../../_debug/attributes/app.js.map