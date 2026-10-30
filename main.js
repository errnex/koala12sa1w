document.getElementById('y').textContent=new Date().getFullYear();
if(window.gsap&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
gsap.registerPlugin(ScrollTrigger);
const tl=gsap.timeline({defaults:{ease:'power4.out'}});
tl.from('.hero .tag',{opacity:0,y:20,duration:.6}).from('.big .line>span',{yPercent:110,duration:1,stagger:.12},'-=.3').from('.hero .reveal',{opacity:0,y:30,stagger:.15,duration:.8},'-=.5');
gsap.to('.big',{yPercent:-15,opacity:.3,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
gsap.to('.track',{xPercent:-50,repeat:-1,duration:22,ease:'none'});
gsap.utils.toArray('.split').forEach(el=>gsap.from(el,{y:60,opacity:0,skewY:4,duration:1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 85%'}}));
['.row','.card','.steps li','.ph','details'].forEach(s=>ScrollTrigger.batch(s,{start:'top 90%',onEnter:b=>gsap.from(b,{y:40,opacity:0,stagger:.1,duration:.8,ease:'power3.out'})}));
document.querySelectorAll('.mag').forEach(b=>{b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect();gsap.to(b,{x:(e.clientX-r.left-r.width/2)*.3,y:(e.clientY-r.top-r.height/2)*.3,duration:.3})});b.addEventListener('mouseleave',()=>gsap.to(b,{x:0,y:0,duration:.5,ease:'elastic.out(1,.4)'}))});
gsap.from('.fab',{scale:0,delay:1.4,duration:.6,ease:'back.out(2)'});
}
// showreel sync + doodles + stickers
(()=>{const v=document.getElementById('promo');if(!v)return;
const segs=[[2.5,'kuliah','TUGAS KULIAH'],[3.233,'sekolah','TUGAS SEKOLAH'],[3.967,'website','WEBSITE'],[4.7,'apps','CUSTOM APPS'],[5.433,null,'—']];
const icons=[...document.querySelectorAll('.sr-icon')],now=document.getElementById('svcNow');let cur;
const tick=()=>{const t=v.currentTime;let s=null,l='—';for(const [st,k,lab] of segs){if(t>=st){s=k;l=lab}}
 if(s!==cur){cur=s;icons.forEach(i=>i.classList.toggle('on',i.dataset.svc===s));now.textContent=l;}};
v.addEventListener('timeupdate',tick);
(function raf(){if(!v.paused)tick();requestAnimationFrame(raf)})();
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;if(!window.gsap)return;
document.querySelectorAll('.doodle path').forEach(p=>{const L=p.getTotalLength();if(reduce)return;gsap.set(p,{strokeDasharray:L,strokeDashoffset:L});
 gsap.to(p,{strokeDashoffset:0,duration:1.2,ease:'power2.inOut',scrollTrigger:{trigger:p.closest('svg'),start:'top 88%'}})});
if(reduce)return;
gsap.to('.mq1 .mqt',{xPercent:-50,repeat:-1,duration:26,ease:'none'});
gsap.fromTo('.mq2 .mqt',{xPercent:-50},{xPercent:0,repeat:-1,duration:22,ease:'none'});
const st=gsap.utils.toArray('.sticker,.sr-icon');
st.forEach((s,i)=>{gsap.to(s,{y:'+=10',duration:2+i%3*.5,yoyo:true,repeat:-1,ease:'sine.inOut',delay:i*.2});
 gsap.to(s,{yPercent:-(+s.dataset.depth||8)*3,ease:'none',scrollTrigger:{trigger:'#showreel',start:'top bottom',end:'bottom top',scrub:true}})});
const stage=document.querySelector('.sr-stage');stage.addEventListener('pointermove',e=>{const r=stage.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
 document.querySelectorAll('.sticker').forEach(s=>{const d=+s.dataset.depth||10;gsap.to(s,{x:x*d*2,duration:.6,overwrite:'auto'})})});
})();
