export function startup() {
	var scene: AFrame.Scene = <any> document.querySelector('a-scene');
	var sphere: AFrame.Entity = <any> document.querySelector('a-sphere');
	const properties = [ 'position', 'rotation', 'scale' ];

	if (scene.hasLoaded) {
		initialize();
	}
	else {
		scene.addEventListener('loaded', initialize);
	}

	function initialize() {
		properties.forEach(function (prop: string) {
			attachProperty(prop);
			updateProperty(prop);
		});
	}

	function attachProperty(id: string): void {
		var form: HTMLElement = document.getElementById(id);
		form.addEventListener('submit', function (event) {
			setProperty(id);
			event.preventDefault();
			event.stopPropagation();
		});
	}

	function setProperty(id: string): void {
		var form: any = document.getElementById(id);
		const x = form.x.value;
		const y = form.y.value;
		const z = form.z.value;
		sphere.setAttribute(id, {
			x: x,
			y: y,
			z: z
		});
	}

	function updateProperty(id: string) {
		var form: any = document.getElementById(id);
		var attr: any = sphere.getComputedAttribute(id);
		form.x.value = attr.x;
		form.y.value = attr.y;
		form.z.value = attr.z;
	}
}
