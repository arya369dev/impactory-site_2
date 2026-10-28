import * as THREE from 'three';
export function makePlatform(){
 const group=new THREE.Group();
 const cyan=new THREE.MeshStandardMaterial({color:0x00cfff,emissive:0x00d7f3,emissiveIntensity:1.8,metalness:.65,roughness:.22});
 const white=new THREE.MeshStandardMaterial({color:0xf2fffb,metalness:.8,roughness:.22});
 const disk=new THREE.Mesh(new THREE.CylinderGeometry(1.1,1.25,.13,64),white);disk.position.y=-.55;group.add(disk);
 for(const [radius,tube,y] of [[1.13,.035,-.46],[.89,.018,-.42],[1.36,.012,-.59]]){
 const ring=new THREE.Mesh(new THREE.TorusGeometry(radius,tube,12,96),cyan);ring.rotation.x=Math.PI/2;ring.position.y=y;group.add(ring);
 }
 const light=new THREE.PointLight(0x20ffdf,8,4);light.position.set(0,-.15,0);group.add(light);
 return group;
}
