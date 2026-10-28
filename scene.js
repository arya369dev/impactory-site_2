import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {makePlatform} from './hud-platform.js';
import {makeParticles} from './particle-system.js';
import {makeCharacterAnimator} from './character-animation.js';
const host=document.getElementById('threeStage'),button=document.getElementById('mode3d');
if(host&&button){
 const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'high-performance'});
 renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.outputColorSpace=THREE.SRGBColorSpace;
 host.appendChild(renderer.domElement);
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(35,1,.1,100);
 camera.position.set(0,1.05,6.8);camera.lookAt(0,.65,0);
 scene.add(new THREE.HemisphereLight(0xffffff,0x63c7d7,2.5));
 const key=new THREE.DirectionalLight(0xffffff,3.2);key.position.set(3,5,5);scene.add(key);
 const rim=new THREE.PointLight(0x05e4e9,45,8);rim.position.set(-2,2,-1);scene.add(rim);
 scene.add(makePlatform());const particles=makeParticles();scene.add(particles.mesh);
 let animator=null,enabled=false,drag=false,previous=0,rotation=0;
 const resize=()=>{const w=host.clientWidth,h=host.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/Math.max(1,h);camera.updateProjectionMatrix()};
 new ResizeObserver(resize).observe(host);resize();
 new GLTFLoader().load('./arya_patole_3d.glb',gltf=>{
  const model=gltf.scene;scene.add(model);model.position.set(0,-.75,0);animator=makeCharacterAnimator(model,particles);
 },undefined,error=>{console.warn('3D model unavailable; original portrait remains visible.',error);button.disabled=true;button.textContent='3D UNAVAILABLE'});
 button.addEventListener('click',()=>{
  enabled=!enabled;host.classList.toggle('active',enabled);button.setAttribute('aria-pressed',String(enabled));button.textContent=enabled?'↩ PHOTO VIEW':'✧ EXPLORE 3D';
  if(enabled)animator?.replay();
 });
 host.addEventListener('pointerdown',e=>{drag=true;previous=e.clientX;host.setPointerCapture(e.pointerId)});
 host.addEventListener('pointerup',()=>drag=false);
 host.addEventListener('pointermove',e=>{if(drag){rotation+=(e.clientX-previous)*.008;previous=e.clientX}});
 function frame(now){requestAnimationFrame(frame);if(!enabled)return;
  if(animator)animator.update(now);
  camera.position.x=Math.sin(rotation)*6.8;camera.position.z=Math.cos(rotation)*6.8;camera.lookAt(0,.65,0);
  renderer.render(scene,camera);
 }requestAnimationFrame(frame);
}
