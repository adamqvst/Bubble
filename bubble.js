import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
renderer.setClearColor(0xffffff, 0.0);
var container = document.getElementById("canvas");
container.appendChild(renderer.domElement);

window.addEventListener("resize", onWindowResize);


class DirLight {
    constructor(direction, ambient, diffuse, specular) {
        this.direction = direction;
        this.ambient = ambient;
        this.diffuse = diffuse;
        this.specular = specular;
    }
}

class Bubble {
    constructor(position) {
        this.position = position;
    }
}

const sun_light = new DirLight(
    new THREE.Vector3(0.0, 0.0, 1.0), // Direction
    new THREE.Vector3(0.7, 0.7, 1.0), // Ambient
    new THREE.Vector3(1.0, 0.7, 1.0), // Diffuse
    new THREE.Vector3(1.0, 1.0, 1.0) // Specular
);


import bubble_fragment_shader from './glsl/bubble.frag'
import bubble_vertex_shader from './glsl/bubble.vert'

const bubble_material = new THREE.ShaderMaterial({

    uniforms: {
        time: { value: 1.0 },
        resolution: { value: new THREE.Vector2() }
    },
    fragmentShader: bubble_fragment_shader,
    vertexShader: bubble_vertex_shader
});


const geometry = new THREE.BoxGeometry(1, 1, 1);
const cube = new THREE.Mesh(geometry, bubble_material);
scene.add(cube);

camera.position.z = 5;

function animate() {

	cube.rotation.x += 0.002;
	cube.rotation.y += 0.002;

	renderer.render(scene, camera);
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}