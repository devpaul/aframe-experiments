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
        AFRAME.registerComponent('bounce', {
            init: function () {
                this.speed = 0.02;
                this.max = 10;
            },
            tick: function () {
                var position = this.el.getAttribute('position');
                position.x += this.speed;
                if (Math.abs(position.x) > this.max) {
                    this.speed = -this.speed;
                }
                this.el.setAttribute('position', position);
            },
        });
    }
    exports.startup = startup;
});
//# sourceMappingURL=../../_debug/bouncing/app.js.map