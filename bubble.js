import * as THREE from 'three';

window.addEventListener("resize", onWindowResize);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const clock = new THREE.Clock();
clock.start();


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
renderer.setClearColor(0xffffff, 0.0);

var container = document.getElementById("canvas");
container.appendChild(renderer.domElement);


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

var sun_light = {
    direction : new THREE.Vector3(1.0, 1.0, 0.0),
    ambient : new THREE.Vector3(0.4, 0.4, 1.0),
    diffuse : new THREE.Vector3(0.6, 0.4, 1.0),
    specular : new THREE.Vector3(0.5, 0.5, 0.5)
}

import bubble_fragment_shader from './glsl/bubble.frag'
import bubble_vertex_shader from './glsl/bubble.vert'

const bubble_material = new THREE.ShaderMaterial({

    uniforms: {

        directional_lights: {
            value: [sun_light]
        }
    },

    fragmentShader: bubble_fragment_shader,
    vertexShader: bubble_vertex_shader,
    
    depthWrite: false,
    transparent: true,
});


const cube_geometry = new THREE.BoxGeometry(1, 1, 1);
const cube_material = new THREE.MeshBasicMaterial({color: 0x95d5b1});
const cube = new THREE.Mesh(cube_geometry, cube_material);
//scene.add(cube);


const bubble_geometry = new THREE.SphereGeometry(1, 128, 64);
const bubble = new THREE.Mesh(bubble_geometry, bubble_material);
scene.add(bubble);

camera.position.z = 4;

function animate() {

    renderer.render(scene, camera);

    cube.position.x = Math.sin(clock.getElapsedTime() * 0.5);
    cube.rotation.y += 0.002;
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}