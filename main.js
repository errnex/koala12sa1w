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
