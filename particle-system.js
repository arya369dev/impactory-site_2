import * as THREE from 'three';
export function makeParticles(count=520){
 const geometry=new THREE.BoxGeometry(.028,.028,.028);
 const material=new THREE.MeshBasicMaterial({color:0x15e8d4,transparent:true,opacity:.88});
 const mesh=new THREE.InstancedMesh(geometry,material,count);mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
 const starts=[],ends=[];const dummy=new THREE.Object3D();
 for(let i=0;i<count;i++){
  const a=i*2.39996;const r=Math.sqrt((i+.5)/count)*1.45;
  starts.push(new THREE.Vector3(Math.cos(a)*r,-.2+Math.random()*.3,Math.sin(a)*r));
  ends.push(new THREE.Vector3((Math.random()-.5)*1.25,Math.random()*2.5-.35,(Math.random()-.5)*.75));
 }
 function update(progress,time){
  const t=THREE.MathUtils.smoothstep(progress,0,1);
  for(let i=0;i<count;i++){
   dummy.position.copy(starts[i]).lerp(ends[i],t);
   dummy.position.x+=Math.sin(time*2+i)*.028;
   const s=(1-t)*(.65+Math.sin(time*4+i)*.2)+.05;
   dummy.scale.setScalar(Math.max(.001,s));dummy.rotation.set(time+i,time*.7+i,0);dummy.updateMatrix();mesh.setMatrixAt(i,dummy.matrix);
  }mesh.instanceMatrix.needsUpdate=true;
 }
 update(0,0);return {mesh,update};
}
