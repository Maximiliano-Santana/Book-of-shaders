import './style.css';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import gui from 'lil-gui';

import helloWorldVS from '/resources/shaders/helloWorld/vertex.glsl';
import helloWorldFS from '/resources/shaders/helloWorld/fragment.glsl';

//Sizes 
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

//Resize 
window.addEventListener('resize', ()=>{
  //Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  //Update camera 
  camera.aspect = sizes.width/sizes.height;
  camera.updateProjectionMatrix();
  //Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})

//Loaders 


//Scene
const scene = new THREE.Scene();

//Camera 
const camera = new THREE.PerspectiveCamera(50, sizes.width/sizes.height, 0.1, 100);
camera.position.z = 1.2;
//Renderer
const canvas = document.querySelector('.experience');
const renderer = new THREE.WebGLRenderer({canvas: canvas});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//Controls 
const orbitControls = new OrbitControls(camera, canvas);

//Objects
const planeGeometry = new THREE.PlaneGeometry(1, 1, 200, 200);
const planeMaterial = new THREE.ShaderMaterial({
  vertexShader: helloWorldVS,
  fragmentShader: helloWorldFS,
  uniforms: {
    uTime : { value: 0 }
  }
});
const planeMesh = new THREE.Mesh(planeGeometry, new THREE.MeshBasicMaterial());
scene.add(planeMesh);
//Tick 
const clock = new THREE.Clock();

const tick = ()=>{
  //Render
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
}

tick();