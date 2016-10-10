export function startup() {
	AFRAME.registerComponent('bounce', {
		init() {
			this.speed = 0.02;
			this.max = 10;
		},

		tick() {
			var position = this.el.getAttribute('position');
			position.x += this.speed;
			if (Math.abs(position.x) > this.max) {
				this.speed = -this.speed;
			}
			this.el.setAttribute('position', position);
		},
	});
}
