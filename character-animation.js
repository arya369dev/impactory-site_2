import * as THREE from 'three';
export function makeCharacterAnimator(character,particles){
 let started=performance.now(),duration=4200;
 function replay(){started=performance.now()}
 function update(now){
  const t=Math.min(1,(now-started)/duration),smooth=t*t*(3-2*t);
  character.visible=t>.12;character.scale.setScalar(.0001+smooth*.9999);
  character.position.y=-.75+(1-smooth)*-.8+Math.sin(now*.0017)*.025;
  character.rotation.y=Math.sin(now*.00045)*.16;
  particles.update(Math.min(1,t*1.4),now*.001);
  particles.mesh.material.opacity=Math.max(.05,1-smooth*.88);
 }
 return {replay,update};
}
