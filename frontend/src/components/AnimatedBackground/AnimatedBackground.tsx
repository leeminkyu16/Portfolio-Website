import TWEEN from "@tweenjs/tween.js";
import React, { useEffect, useRef } from "react";
import { Unsubscribe } from "redux";
import { Object3D, PerspectiveCamera, Scene, Vector3 } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
	CSS3DObject,
	CSS3DRenderer,
} from "three/examples/jsm/renderers/CSS3DRenderer.js";
import { backgroundItemTable } from "../../assets/background/background-items";
import { BackgroundShape } from "../../enums/background-shape";
import { KYU_EDGES, KYU_STARS } from "../../stars/data/kyu-constellation";
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
		// Default to a no-op so the effect cleanup is always callable, even if
		// init() returns before the store subscription is set up.
		let unsubscribe: Unsubscribe = () => undefined;

		// Track the rAF handle so cleanup can cancel it — otherwise the loop
		// keeps running (and rendering 100+ CSS3D cards) after unmount.
		let rafId = 0;

		// Honour the OS "reduce motion" setting: never auto-rotate, which is
		// what forces a per-frame re-render of every card.
		const reduceMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;

		const objects: CSS3DObject[] = [];
		const targets: AnimatedBackgroundTargets = {
			[BackgroundShape.SPHERE]: [],
			[BackgroundShape.HELIX]: [],
			[BackgroundShape.GRID]: [],
			[BackgroundShape.CONSTELLATION]: [],
		};

		// Cursor "tilt" reaction: ease the whole card scene a few degrees toward
		// the pointer so the cloud feels alive under the mouse. Desktop-only
		// (skip touch, where there is no hover) and disabled under reduce-motion.
		// The continuous idle shimmer/bob lives in CSS (compositor-only); this
		// only wakes the render loop while the tilt is settling.
		const tiltEnabled =
			!reduceMotion &&
			window.matchMedia("(hover: hover) and (pointer: fine)").matches;
		const TILT_MAX = 0.05; // radians (~3°) — subtle
		let tiltTargetX = 0;
		let tiltTargetY = 0;

		function init(): void {
			scene = new Scene();
			camera = new PerspectiveCamera(
				60,
				window.innerWidth / window.innerHeight,
				1,
				1000,
			);
			camera.position.z = 2000;

			// Build one textured face (lang label + code block). Both the front
			// and back of a card get their own face so the card stays visible —
			// and readable, not mirrored — when auto-rotate spins it away from
			// the camera.
			function createFace(
				lang: string,
				code: string,
				bg: string,
			): HTMLDivElement {
				const face = document.createElement("div");
				face.className = "card-face";
				// Deep translucent navy glass so the card reads against the
				// nebula backdrop and the blur/glow do the visual work.
				face.style.backgroundColor = bg;

				const langEl = document.createElement("div");
				langEl.className = "lang";
				langEl.textContent = lang;
				face.appendChild(langEl);

				const pre = document.createElement("pre");
				const codeEl = document.createElement("code");
				pre.className = "code";
				codeEl.textContent = code;
				pre.appendChild(codeEl);
				face.appendChild(pre);

				return face;
			}

			for (let i = 0; i < backgroundItemTable.length; i += 1) {
				const element = document.createElement("div");
				element.className = "background-card";

				// Per-card duration/phase for the idle bob so the cloud breathes
				// out of sync rather than pulsing in unison. Irrational strides
				// spread the values without clumping. The CSS keyframes read
				// these vars; the animation runs entirely on the compositor.
				element.style.setProperty(
					"--bob-dur",
					(6 + ((i * 1.618) % 4)).toFixed(2) + "s",
				);
				element.style.setProperty(
					"--bob-delay",
					(-((i * 0.618) % 9)).toFixed(2) + "s",
				);

				// Same random glass tint on both faces so the card reads as a
				// single solid object from either side.
				const bg = "rgba(20,30,70," + (Math.random() * 0.25 + 0.12) + ")";
				const lang = backgroundItemTable[i][0];
				const code = backgroundItemTable[i][1];

				const front = createFace(lang, code, bg);
				front.classList.add("front");
				element.appendChild(front);

				const back = createFace(lang, code, bg);
				back.classList.add("back");
				element.appendChild(back);

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

			// constellation — the card cloud spells the 奎 mansion (the name 旻奎).
			// Cards are distributed onto the constellation's star nodes and along
			// its connecting edges so the whole figure reads at a glance; the
			// existing TWEEN infra animates the cloud into the shape for free.
			const KYU_SCALE = 780;
			const kyuPoints: Vector3[] = [];
			KYU_STARS.forEach((s) => {
				// KYU coords are y-down (signature space); flip y for three's y-up.
				kyuPoints.push(
					new Vector3(s.x * KYU_SCALE, -s.y * KYU_SCALE, 0),
				);
			});
			KYU_EDGES.forEach(([a, b]) => {
				const A = KYU_STARS[a];
				const B = KYU_STARS[b];
				const segments = 6;
				for (let k = 1; k < segments; k++) {
					const t = k / segments;
					kyuPoints.push(
						new Vector3(
							(A.x + (B.x - A.x) * t) * KYU_SCALE,
							-(A.y + (B.y - A.y) * t) * KYU_SCALE,
							0,
						),
					);
				}
			});

			for (let i = 0; i < objects.length; i++) {
				const object = new Object3D();
				const point = kyuPoints[i % kyuPoints.length];
				// Cards mapped to the same point are fanned into a small cluster
				// so duplicates don't perfectly overlap into one unreadable card.
				const duplicate = Math.floor(i / kyuPoints.length);
				const spread = duplicate * 26;
				object.position.x = point.x + Math.cos(i) * spread;
				object.position.y = point.y + Math.sin(i) * spread;
				object.position.z = ((i * 37) % 7) * 30 - 90;

				targets[BackgroundShape.CONSTELLATION].push(object);
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
			// The card cloud is a full-viewport background *behind* scrollable
			// content, so its canvas must not swallow page scrolling — while
			// still allowing hover and drag-to-rotate. Two adjustments:
			//   1. Disable wheel zoom so the mouse wheel scrolls the page
			//      instead of dollying the camera.
			//   2. OrbitControls forces `touch-action: none`, which blocks all
			//      touch scrolling. Relax it to `pan-y` so a vertical swipe
			//      scrolls the page and a horizontal drag still rotates.
			controls.enableZoom = false;
			renderer.domElement.style.touchAction = "pan-y";
			controls.addEventListener("change", render);

			transform(targets[store.getState().settings.backgroundShape], 2000);
			frameCameraForShape(
				store.getState().settings.backgroundShape,
				2000,
			);
			controls.autoRotate =
				!reduceMotion && store.getState().settings.backgroundAutoRotate;

			// Seed from the store, not a hardcoded default: the initial shape is
			// read from localStorage above, so hardcoding SPHERE here would make
			// the first switch back to the persisted shape a no-op.
			let currentShape = store.getState().settings.backgroundShape;
			unsubscribe = store.subscribe((): void => {
				const state: RootState = store.getState();

				if (state.settings.backgroundShape !== currentShape) {
					currentShape = state.settings.backgroundShape;
					transform(targets[currentShape], 2000);
					frameCameraForShape(currentShape, 2000);
				}

				controls.autoRotate =
					!reduceMotion && state.settings.backgroundAutoRotate;
				// Turning auto-rotate on must restart the loop if it idled out.
				if (controls.autoRotate) {
					ensureAnimating();
				}
			});

			// Pause the whole loop while the tab is hidden — no point burning
			// CPU/GPU rendering an offscreen card cloud.
			document.addEventListener("visibilitychange", onVisibilityChange);

			if (tiltEnabled) {
				window.addEventListener("pointermove", onPointerMove);
			}

			animate();
		}

		function onVisibilityChange(): void {
			if (document.hidden) {
				if (rafId !== 0) {
					cancelAnimationFrame(rafId);
					rafId = 0;
				}
			} else if (rafId === 0) {
				animate();
			}
		}

		function transform(targets: CSS3DObject[], duration: number): void {
			TWEEN.removeAll();

			for (let i = 0; i < objects.length; i++) {
				const object = objects[i];
				const target = targets[i];

				// tween.js v25 no longer auto-registers a tween to the main
				// group — without the `true` flag the tween is orphaned and
				// `TWEEN.update()` never advances it, so the cards never move.
				new TWEEN.Tween(object.position, true)
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

				new TWEEN.Tween(object.rotation, true)
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

			// The tween has no interpolated properties; it only drives `render`
			// over time, so the target is a throwaway object rather than `this`
			// (which is untyped inside this plain function).
			new TWEEN.Tween({}, true)
				.to({}, duration * 2)
				.onUpdate(render)
				.start();

			ensureAnimating();
		}

		// Distance the camera needs to sit at, along its view axis, to frame a
		// shape. The constellation is a flat figure that spans far wider than the
		// sphere/helix/grid, so at the default distance it overflows the viewport
		// and the 奎 pattern can't be read — compute a distance that fits its full
		// width AND height for the current aspect ratio.
		function cameraDistanceForShape(shape: BackgroundShape): number {
			if (shape !== BackgroundShape.CONSTELLATION) {
				return 2000;
			}

			let halfW = 0;
			let halfH = 0;
			for (const object of targets[BackgroundShape.CONSTELLATION]) {
				halfW = Math.max(halfW, Math.abs(object.position.x));
				halfH = Math.max(halfH, Math.abs(object.position.y));
			}
			// Pad by half a card so edge cards aren't clipped at the border.
			halfW += 140;
			halfH += 100;

			const vFov = (camera.fov * Math.PI) / 180;
			const distForHeight = halfH / Math.tan(vFov / 2);
			const hFov = 2 * Math.atan(Math.tan(vFov / 2) * camera.aspect);
			const distForWidth = halfW / Math.tan(hFov / 2);

			// 1.15 leaves a little breathing room around the figure.
			return Math.max(distForHeight, distForWidth) * 1.15;
		}

		// Tween the camera to the framing distance for a shape. The flat
		// constellation is also pulled head-on (+z) so it doesn't land edge-on
		// and vanish; other shapes keep their current view angle and only change
		// distance.
		function frameCameraForShape(
			shape: BackgroundShape,
			duration: number,
		): void {
			const distance = cameraDistanceForShape(shape);

			const direction = new Vector3();
			if (shape === BackgroundShape.CONSTELLATION) {
				direction.set(0, 0, 1);
			} else {
				direction.copy(camera.position).normalize();
				if (direction.lengthSq() === 0) {
					direction.set(0, 0, 1);
				}
			}
			direction.multiplyScalar(distance);

			new TWEEN.Tween(camera.position, true)
				.to({ x: direction.x, y: direction.y, z: direction.z }, duration)
				.easing(TWEEN.Easing.Exponential.InOut)
				.onUpdate(render)
				.start();

			ensureAnimating();
		}

		function onPointerMove(event: PointerEvent): void {
			// Normalise the pointer to [-1, 1] across the viewport, then map to a
			// small yaw (horizontal) / pitch (vertical) so the cloud leans toward
			// the cursor.
			const nx = (event.clientX / window.innerWidth) * 2 - 1;
			const ny = (event.clientY / window.innerHeight) * 2 - 1;
			tiltTargetY = nx * TILT_MAX;
			tiltTargetX = ny * TILT_MAX;
			ensureAnimating();
		}

		function onWindowResize(): void {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();

			renderer.setSize(window.innerWidth, window.innerHeight);

			render();
		}

		// Kick the render loop if it has stopped. Called whenever new motion is
		// introduced (shape change, camera reframe, auto-rotate on, cursor tilt).
		function ensureAnimating(): void {
			if (rafId === 0) {
				animate();
			}
		}

		function animate(): void {
			// Ease the scene toward the cursor tilt target.
			if (tiltEnabled) {
				scene.rotation.x += (tiltTargetX - scene.rotation.x) * 0.05;
				scene.rotation.y += (tiltTargetY - scene.rotation.y) * 0.05;
			}
			const tiltSettling =
				tiltEnabled &&
				(Math.abs(tiltTargetX - scene.rotation.x) > 0.0001 ||
					Math.abs(tiltTargetY - scene.rotation.y) > 0.0001);
			const hasTweens = TWEEN.getAll().length > 0;

			// Idle: nothing is moving, so stop the loop entirely instead of
			// burning a frame every 16ms. User drag still renders via the
			// OrbitControls "change" listener without the loop running; the
			// continuous card shimmer is CSS and needs no JS at all.
			if (!hasTweens && !controls.autoRotate && !tiltSettling) {
				rafId = 0;
				return;
			}

			rafId = requestAnimationFrame(animate);

			TWEEN.update();
			controls.update();

			// Auto-rotate renders via the controls "change" event and tweens via
			// their own onUpdate driver; only the tilt ease needs an explicit
			// render here.
			if (tiltSettling) {
				render();
			}
		}

		function render(): void {
			renderer.render(scene, camera);
		}

		init();

		return () => {
			if (rafId !== 0) {
				cancelAnimationFrame(rafId);
			}
			window.removeEventListener("resize", onWindowResize);
			window.removeEventListener("pointermove", onPointerMove);
			document.removeEventListener(
				"visibilitychange",
				onVisibilityChange,
			);
			controls.dispose();
			unsubscribe();
		};
	}, [store]);

	return (
		<>
			<div className="cosmic-backdrop">
				<div className="cosmic-nebula" />
				<div className="cosmic-stars cosmic-stars--far" />
				<div className="cosmic-stars cosmic-stars--mid" />
				<div className="cosmic-stars cosmic-stars--near" />
				<div className="cosmic-vignette" />
			</div>
			<div
				className="background-div"
				ref={mainDiv}
			></div>
		</>
	);
};

export { AnimatedBackground };
