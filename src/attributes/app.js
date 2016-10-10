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
        if (scene.hasLoaded) {
            update();
        }
        else {
            scene.addEventListener('loaded', update);
        }
        function update() {
            updateProperty('position');
            updateProperty('rotation');
            updateProperty('scale');
        }
        function updateProperty(id) {
            var form = document.getElementById(id);
            var position = sphere.getComputedAttribute(id);
            form.x.value = position.x;
            form.y.value = position.y;
            form.z.value = position.z;
        }
    }
    exports.startup = startup;
});
//# sourceMappingURL=../../_debug/attributes/app.js.map