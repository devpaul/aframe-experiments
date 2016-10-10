declare namespace Aframe {
	export type Coordinate = { x: number, y: number, z: number };

	interface DetailEventHandler<D> {
		(event: Event & { detail: D }): void;
	}

	export interface Entity extends Element {
		components: any;
		isPlaying: boolean;
		object3D: THREE.Object3D;
		object3DMap: { [key: string]: any };
		sceneEl: Scene;

		addState(name: string): void;
		emit(name: string, detail?: any, bubbles?: boolean): void;
		flushToDom(): void;
		getAttribute(attr: string): any;
		getComputedAttribute(attr: string): any;
		getObject3D(type: string): THREE.Object3D;
		getOrCreateObject3D(type: string, construct: any): THREE.Object3D;
		is(stateName: string): boolean;
		pause(): void;
		play(): void;
		setAttribute(attr: string, value: any, componentAttrValue?: any): void;
		setObject3D(type: string, obj: THREE.Object3D | null): void;
		removeAttribute(attr: string): void;
		removeObject3D(type: string): void;
		removeState(stateName: string): void;

		addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
		addEventListener(type: 'child-attached', listener: DetailEventHandler<{ el: Element | Entity }>, useCapture?: boolean): void;
		addEventListener(type: 'componentchanged', listener: DetailEventHandler<{ name: string }>, useCapture?: boolean): void;
		addEventListener(type: 'componentremoved', listener: DetailEventHandler<{
			name: string,
			id: string,
			newData: any,
			oldData: any
		}>, useCapture?: boolean): void;
		addEventListener(name: 'loaded', handler: EventListener, useCapture?: boolean): void;
		addEventListener(name: 'pause', handler: EventListener, useCapture?: boolean): void;
		addEventListener(name: 'play', handler: EventListener, useCapture?: boolean): void;
		addEventListener(name: 'stateadded', handler: DetailEventHandler<{ state: string }>, useCapture?: boolean): void;
		addEventListener(name: 'stateremoved', handler: DetailEventHandler<{ state: string }>, useCapture?: boolean): void;
		addEventListener(name: 'schemachanged', handler: DetailEventHandler<{ componentName: string }>, useCapture?: boolean): void;
	}

	// TODO implement
	export interface System {
	}

	// TODO implement
	export interface Scene {
		hasLoaded: boolean;
		addEventListener(name: 'loaded', handler: EventListener, useCapture?: boolean): void;
	}

	// TODO implement
	export interface ComponentDefinition {
		attrName?: string;
		data?: any;
		dependencies?: string[];
		el?: Entity;
		id?: string;
		multiple?: boolean;
		name?: string;
		schema?: { [key: string]: any };

		init?(): void;
		update?(): void;
		remove?(): void;
		tick?(): void;
		play?(): void;
		pause?(): void;
		updateSchema?(): void;
	}

	// TODO implement
	export interface Component extends ComponentDefinition {
	}

	// TODO implement
	export interface AframeFramework {
		utils: Utils;
		systems: { [key: string]: System };
		registerSystem(name: string, system: System): void;
		registerComponent(name: string, component: ComponentDefinition): void;
	}

	// TODO implement
	export interface Utils {
		coordinates: {
			parse(value: string): Coordinate;
			stringify(coord: Coordinate): string;
		};
	}
}

declare const AFRAME: Aframe.AframeFramework;
