export function startup() {
	var scene: AFrame.Scene = <any> document.querySelector('a-scene');
	var sphere: AFrame.Entity = <any> document.querySelector('a-sphere');

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

	function updateProperty(id: string) {
		var form: any = document.getElementById(id);
		var position: any = sphere.getComputedAttribute(id);
		form.x.value = position.x;
		form.y.value = position.y;
		form.z.value = position.z;
	}
}
