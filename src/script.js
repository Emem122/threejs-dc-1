import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import { PointLightHelper } from "three";

// loading
const textureLoader = new THREE.TextureLoader();

const normalTexture = textureLoader.load("/textures/NormalMap.png");

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.SphereGeometry(0.7, 64, 64, 100);

// Materials

const material = new THREE.MeshStandardMaterial();
material.metalness = 0.7;
material.roughness = 0.2;
material.normalMap = normalTexture;
material.color = new THREE.Color(0x292929);

// Mesh
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

// Light 2
const pointLight2 = new THREE.PointLight(0xff0000, 2);
pointLight2.position.set(-2, 0.8, -0.5);
pointLight2.intensity = 1;
scene.add(pointLight2);

const light2 = gui.addFolder("Light 1");

light2.add(pointLight2.position, "y").min(-3).max(3).step(0.01);
light2.add(pointLight2.position, "x").min(-6).max(6).step(0.01);
light2.add(pointLight2.position, "z").min(-3).max(3).step(0.01);
light2.add(pointLight2, "intensity").min(0).max(10).step(0.01);

const light2Color = {
	color: 0xff0000,
};
light2.addColor(light2Color, "color").onChange(() => {
	pointLight2.color.set(light2Color.color);
});

// const pointLightHelper = new THREE.PointLightHelper(pointLight2, 1);
// scene.add(pointLightHelper);

//Light3
const pointLight3 = new THREE.PointLight(0xe1ff, 2);
pointLight3.position.set(2.3, -3, -1.98);
pointLight3.intensity = 6.8;
scene.add(pointLight3);

const light3 = gui.addFolder("Light 2");

light3.add(pointLight3.position, "y").min(-3).max(3).step(0.01);
light3.add(pointLight3.position, "x").min(-6).max(6).step(0.01);
light3.add(pointLight3.position, "z").min(-3).max(3).step(0.01);
light3.add(pointLight3, "intensity").min(0).max(10).step(0.01);

const light3Color = {
	color: 0xff0000,
};
light3.addColor(light3Color, "color").onChange(() => {
	pointLight3.color.set(light3Color.color);
});

// const pointLightHelper2 = new THREE.PointLightHelper(pointLight3, 1);
// scene.add(pointLightHelper2);

/**
 * Sizes
 */
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

window.addEventListener("resize", () => {
	// Update sizes
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	// Update camera
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	// Update renderer
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
	alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

document.addEventListener("mousemove", onDocumentMouseMove);
let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
	mouseX = event.clientX - windowHalfX;
	mouseY = event.clientY - windowHalfY;
}

const updateSphere = (event) => {
	sphere.position.y = window.scrollY * 0.001;
};

window.addEventListener("scroll", updateSphere);

const clock = new THREE.Clock();

const tick = () => {
	targetX = mouseX * 0.001;
	targetY = mouseY * 0.001;

	const elapsedTime = clock.getElapsedTime();

	// Update objects
	sphere.rotation.y = 0.5 * elapsedTime;

	sphere.rotation.y += 0.5 * (targetX - sphere.rotation.y);
	sphere.rotation.x += 0.05 * (targetY - sphere.rotation.z);
	// sphere.rotation.z += 0.5 * (targetY - sphere.rotation.z);
	sphere.position.z += 0.5 * (targetY - sphere.rotation.z);

	// Update Orbital Controls
	// controls.update()

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();
