import { Component, registerComponent } from 'aframe';

export interface BounceComponent extends Component {
	speed: number;
	max: number;
}

registerComponent('bounce', {
	init() {
		this.speed = 0.02;
		this.max = 10;
	},

	tick(this: BounceComponent) {
		const position = this.el.getAttribute('position');
		position.x += this.speed;
		if (Math.abs(position.x) > this.max) {
			this.speed = -this.speed;
		}
		this.el.setAttribute('position', position);
	},
});
