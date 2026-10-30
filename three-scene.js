import * as THREE from 'three';
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const LIME=0xd4ff3a;
function ok(){try{const c=document.createElement('canvas');return !!(c.getContext('webgl2')||c.getContext('webgl'))}catch(e){return false}}
if(!ok()){document.querySelectorAll('#hero3d,.mini3d').forEach(c=>c.remove());}else{
const mats={
 lime:new THREE.MeshStandardMaterial({color:LIME,roughness:.35,metalness:.1,flatShading:true}),
 glass:new THREE.MeshPhysicalMaterial({color:0x9fb4ff,roughness:.15,metalness:0,transmission:.6,transparent:true,opacity:.75,thickness:1,flatShading:true}),
 dark:new THREE.MeshStandardMaterial({color:0x3a4050,roughness:.5,metalness:.4,flatShading:true}),
 white:new THREE.MeshStandardMaterial({color:0xeef0f3,roughness:.6,flatShading:true})};
function laptop(){const g=new THREE.Group();const base=new THREE.Mesh(new THREE.BoxGeometry(2,.1,1.4),mats.dark);const scr=new THREE.Mesh(new THREE.BoxGeometry(2,1.3,.06),mats.dark);scr.position.set(0,.65,-.68);scr.rotation.x=-.25;const disp=new THREE.Mesh(new THREE.PlaneGeometry(1.8,1.1),new THREE.MeshBasicMaterial({color:LIME}));disp.position.set(0,0,.035);scr.add(disp);g.add(base,scr);return g}
function book(){const g=new THREE.Group();const c=new THREE.Mesh(new THREE.BoxGeometry(1.3,.25,1.7),mats.lime);const p=new THREE.Mesh(new THREE.BoxGeometry(1.2,.2,1.6),mats.white);p.position.x=.06;g.add(c,p);return g}
function code(){const g=new THREE.Group();const bar=(x,y,r)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(.16,.8,.16),mats.lime);m.position.set(x,y,0);m.rotation.z=r;g.add(m)};bar(-.9,.28,-.7);bar(-.9,-.28,.7);bar(.9,.28,.7);bar(.9,-.28,-.7);bar(0,0,-.35);return g}
function gear(){const g=new THREE.Group();g.add(new THREE.Mesh(new THREE.TorusGeometry(.6,.22,6,18),mats.glass));for(let i=0;i<8;i++){const t=new THREE.Mesh(new THREE.BoxGeometry(.28,.3,.3),mats.glass);const a=i/8*Math.PI*2;t.position.set(Math.cos(a)*.9,Math.sin(a)*.9,0);t.rotation.z=a;g.add(t)}return g}
function pencil(){const g=new THREE.Group();const b=new THREE.Mesh(new THREE.CylinderGeometry(.14,.14,1.8,6),mats.lime);const tip=new THREE.Mesh(new THREE.ConeGeometry(.14,.4,6),mats.white);tip.position.y=-1.1;tip.rotation.x=Math.PI;g.add(b,tip);return g}
const make={laptop,book,code,gear,pencil,ico:()=>new THREE.Mesh(new THREE.IcosahedronGeometry(.6,0),mats.glass)};
function setup(canvas,items,camZ){
 const r=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'low-power'});r.setPixelRatio(Math.min(devicePixelRatio,1.5));
 const s=new THREE.Scene();const cam=new THREE.PerspectiveCamera(40,1,.1,100);cam.position.z=camZ;
 s.add(new THREE.AmbientLight(0xffffff,.7));const d=new THREE.DirectionalLight(0xffffff,1.6);d.position.set(3,4,5);s.add(d);const p=new THREE.PointLight(LIME,8,20);p.position.set(-3,-2,3);s.add(p);
 const objs=items.map(([k,x,y,z,sc])=>{const o=make[k]();o.position.set(x,y,z);o.scale.setScalar(sc);o.userData={x,y,ph:Math.random()*6,sp:.3+Math.random()*.4};o.rotation.set(Math.random(),Math.random(),0);s.add(o);return o});
 const resize=()=>{const w=canvas.clientWidth,h=canvas.clientHeight;if(!w||!h)return;r.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix();
   const mob=w<700;objs.forEach(o=>{o.position.x=o.userData.x*(mob?.55:1)})};
 resize();addEventListener('resize',resize);
 let vis=true;new IntersectionObserver(e=>vis=e[0].isIntersecting).observe(canvas);
 return {r,s,cam,objs,get vis(){return vis}};
}
let mx=0,my=0;addEventListener('pointermove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5});
const scenes=[];
const hc=document.getElementById('hero3d');
if(hc)scenes.push(setup(hc,[['laptop',3.9,1.3,0,1],['code',4.4,-2.3,0,.85],['gear',1.4,3.1,-2,.6],['pencil',2.3,-2.9,-.5,.7],['book',-4.8,-3.4,-2,.7],['ico',5.2,3.2,-2,.5]],10));
document.querySelectorAll('.mini3d').forEach(c=>scenes.push(setup(c,[[c.dataset.shape,0,0,0,1.3]],5)));
const clock=new THREE.Clock();
function frame(){const t=clock.getElapsedTime();const sy=scrollY;
 scenes.forEach(sc=>{if(!sc.vis)return;sc.objs.forEach(o=>{const u=o.userData;
   if(!reduce){o.rotation.x+=.004*u.sp*2;o.rotation.y+=.006*u.sp*2;o.position.y=u.y+Math.sin(t*u.sp+u.ph)*.25-(sc===scenes[0]?sy*.0015:0);}
   o.rotation.z=mx*.6;});
  if(!reduce){sc.cam.position.x+=(mx*1.2-sc.cam.position.x)*.05;sc.cam.position.y+=(-my*.8-sc.cam.position.y)*.05;}sc.cam.lookAt(0,0,0);
  sc.r.render(sc.s,sc.cam)});
 if(!reduce)requestAnimationFrame(frame)}
frame();if(reduce)setTimeout(frame,300);
}
