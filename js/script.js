const qs=(s,c=document)=>c.querySelector(s), qsa=(s,c=document)=>[...c.querySelectorAll(s)];

window.addEventListener('load',()=>setTimeout(()=>qs('.preloader')?.classList.add('done'),450));

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target)}}),{threshold:.13,rootMargin:'0px 0px -40px'});
qsa('.reveal,.service-card,.step').forEach(el=>observer.observe(el));

const counters=qsa('[data-count]');
const counterObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;const el=entry.target,target=Number(el.dataset.count),duration=1400,t0=performance.now();const tick=now=>{const p=Math.min((now-t0)/duration,1),e=1-Math.pow(1-p,4);el.textContent=Math.round(target*e);if(p<1)requestAnimationFrame(tick)};requestAnimationFrame(tick);counterObserver.unobserve(el)}),{threshold:.65});
counters.forEach(c=>counterObserver.observe(c));

const menuBtn=qs('.menu-btn'),menu=qs('.mobile-menu');
menuBtn?.addEventListener('click',()=>{const open=menu.classList.toggle('open');document.body.classList.toggle('menu-open',open);menu.setAttribute('aria-hidden',String(!open));menuBtn.setAttribute('aria-expanded',String(open))});
qsa('a',menu||document).forEach(a=>a.addEventListener('click',()=>{menu?.classList.remove('open');document.body.classList.remove('menu-open');menu?.setAttribute('aria-hidden','true');menuBtn?.setAttribute('aria-expanded','false')}));

let mx=innerWidth/2,my=innerHeight/2,gx=mx,gy=my;const glow=qs('.cursor-glow');
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY});
(function glowLoop(){gx+=(mx-gx)*.09;gy+=(my-gy)*.09;if(glow){glow.style.left=gx+'px';glow.style.top=gy+'px'}requestAnimationFrame(glowLoop)})();

const progress=qs('.progress span'),topbar=qs('.topbar');
function onScroll(){const h=document.documentElement.scrollHeight-innerHeight,p=h>0?scrollY/h:0;if(progress)progress.style.width=(p*100)+'%';topbar?.classList.toggle('scrolled',scrollY>30);qsa('.parallax').forEach(el=>{const speed=Number(el.dataset.speed||.04);el.style.transform=`translate3d(0,${scrollY*speed}px,0) scale(1.03)`})}
addEventListener('scroll',onScroll,{passive:true});onScroll();

if(matchMedia('(pointer:fine)').matches){
 qsa('.magnetic').forEach(el=>{el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect(),x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;el.style.transform=`translate(${x*.12}px,${y*.12}px)`});el.addEventListener('mouseleave',()=>el.style.transform='')});
 qsa('.tilt').forEach(card=>{card.addEventListener('mousemove',e=>{const r=card.getBoundingClientRect(),rx=((e.clientY-r.top)/r.height-.5)*-4,ry=((e.clientX-r.left)/r.width-.5)*5;card.style.transform=`perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-5px)`});card.addEventListener('mouseleave',()=>card.style.transform='')});
}

qs('#waForm')?.addEventListener('submit',e=>{e.preventDefault();const data=new FormData(e.currentTarget);const text=`Здравствуйте! Меня зовут ${data.get('name')}.\nАвтомобиль: ${data.get('car')||'не указан'}\nИнтересует: ${data.get('service')}\nКомментарий: ${data.get('message')||'—'}`;window.open(`https://wa.me/77019452727?text=${encodeURIComponent(text)}`,'_blank')});
qs('#year').textContent=new Date().getFullYear();
