import TWEEN from "@tweenjs/tween.js";
import React, { useEffect, useRef } from "react";
import { Unsubscribe } from "redux";
import { Object3D, PerspectiveCamera, Scene, Vector3 } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {
	CSS3DObject,
	CSS3DRenderer,
} from "three/examples/jsm/renderers/CSS3DRenderer.js";
import { backgroundItemTable } from "../../assets/background/background-items";
import { BackgroundShape } from "../../enums/background-shape";
import { RootState, store } from "../../state";
import { AnimatedBackgroundTargets } from "../../types/components/AnimatedBackground";
import "./AnimatedBackground.scss";

const AnimatedBackground: React.FunctionComponent = (): JSX.Element => {
	const mainDiv: React.MutableRefObject<HTMLDivElement | null> = useRef(null);

	useEffect(() => {
		const container: HTMLDivElement | null = mainDiv.current;

		let scene: Scene;
		let camera: PerspectiveCamera;
		let renderer: CSS3DRenderer;
		let controls: OrbitControls;
		let unsubscribe: Unsubscribe;

		const objects: CSS3DObject[] = [];
		const targets: AnimatedBackgroundTargets = {
			[BackgroundShape.SPHERE]: [],
			[BackgroundShape.HELIX]: [],
			[BackgroundShape.GRID]: [],
		};

		function init(): void {
			scene = new Scene();
			camera = new PerspectiveCamera(
				60,
				window.innerWidth / window.innerHeight,
				1,
				1000,
			);
			camera.position.z = 2000;

			for (let i = 0; i < backgroundItemTable.length; i += 1) {
				const element = document.createElement("div");
				element.className = "background-card";
				element.style.backgroundColor =
					"rgba(65,105,225," + (Math.random() * 0.5 + 0.25) + ")";

				const lang = document.createElement("div");
				lang.className = "lang";
				lang.textContent = backgroundItemTable[i][0];
				element.appendChild(lang);

				const pre = document.createElement("pre");
				const code = document.createElement("code");
				pre.className = "code";
				code.textContent = backgroundItemTable[i][1];
				pre.appendChild(code);
				element.appendChild(pre);

				const objectCSS = new CSS3DObject(element);
				objectCSS.position.x = Math.random() * 4000 - 2000;
				objectCSS.position.y = Math.random() * 4000 - 2000;
				objectCSS.position.z = Math.random() * 4000 - 2000;
				scene.add(objectCSS);

				objects.push(objectCSS);
			}

			// sphere

			const vector = new Vector3();

			for (let i = 0, l = objects.length; i < l; i++) {
				const phi = Math.acos(-1 + (2 * i) / l);
				const theta = Math.sqrt(l * Math.PI) * phi;

				const object = new Object3D();

				object.position.setFromSphericalCoords(800, phi, theta);

				vector.copy(object.position).multiplyScalar(2);

				object.lookAt(vector);

				targets[BackgroundShape.SPHERE].push(object);
			}

			// helix

			for (let i = 0, l = objects.length; i < l; i++) {
				const theta = i * 0.35 + Math.PI;
				const y = -(i * 12) + 300;

				const object = new Object3D();

				object.position.setFromCylindricalCoords(900, theta, y);

				vector.x = object.position.x * 2;
				vector.y = object.position.y;
				vector.z = object.position.z * 2;

				object.lookAt(vector);

				targets[BackgroundShape.HELIX].push(object);
			}

			// grid

			for (let i = 0; i < objects.length; i++) {
				const object = new Object3D();

				object.position.x = (i % 5) * 400 - 800;
				object.position.y = -(Math.floor(i / 5) % 5) * 400 + 800;
				object.position.z = Math.floor(i / 25) * 1000;

				targets[BackgroundShape.GRID].push(object);
			}

			renderer = new CSS3DRenderer();
			renderer.setSize(window.innerWidth, window.innerHeight);

			if (container !== null) {
				container.appendChild(renderer.domElement);
			}

			window.addEventListener("resize", onWindowResize, false);

			controls = new OrbitControls(camera, renderer.domElement);
			controls.minDistance = 500;
			controls.maxDistance = 6000;
			controls.enablePan = false;
			controls.addEventListener("change", render);

			transform(targets[store.getState().settings.backgroundShape], 2000);
			controls.autoRotate =
				store.getState().settings.backgroundAutoRotate;

			let currentShape = BackgroundShape.SPHERE;
			unsubscribe = store.subscribe((): void => {
				const state: RootState = store.getState();
				console.log("test");

				if (state.settings.backgroundShape !== currentShape) {
					currentShape = state.settings.backgroundShape;
					transform(targets[currentShape], 2000);
				}

				controls.autoRotate = state.settings.backgroundAutoRotate;
			});

			animate();
		}

		function transform(targets: CSS3DObject[], duration: number): void {
			TWEEN.removeAll();

			for (let i = 0; i < objects.length; i++) {
				const object = objects[i];
				const target = targets[i];

				new TWEEN.Tween(object.position)
					.to(
						{
							x: target.position.x,
							y: target.position.y,
							z: target.position.z,
						},
						Math.random() * duration + duration,
					)
					.easing(TWEEN.Easing.Exponential.InOut)
					.start();

				new TWEEN.Tween(object.rotation)
					.to(
						{
							x: target.rotation.x,
							y: target.rotation.y,
							z: target.rotation.z,
						},
						Math.random() * duration + duration,
					)
					.easing(TWEEN.Easing.Exponential.InOut)
					.start();
			}

			new TWEEN.Tween(this)
				.to({}, duration * 2)
				.onUpdate(render)
				.start();
		}

		function onWindowResize(): void {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();

			renderer.setSize(window.innerWidth, window.innerHeight);

			render();
		}

		function animate(): void {
			requestAnimationFrame(animate);

			TWEEN.update();

			controls.update();
		}

		function render(): void {
			renderer.render(scene, camera);
		}

		init();

		return unsubscribe;
	}, [store]);

	return (
		<>
			<div
				className="background-div"
				ref={mainDiv}
			></div>
		</>
	);
};

export { AnimatedBackground };
