(() => {
  'use strict';
  document.getElementById('year').textContent = new Date().getFullYear();
  const progress = document.getElementById('progress');
  window.addEventListener('scroll', () => { const max = document.documentElement.scrollHeight - innerHeight; progress.style.width = (max > 0 ? scrollY / max * 100 : 0) + '%'; }, {passive:true});
  const menu = document.getElementById('menuToggle'); const nav = document.querySelector('.desktop-nav');
  menu.addEventListener('click', () => { const open = nav.classList.toggle('open'); menu.setAttribute('aria-expanded',String(open)); menu.textContent = open ? '✕' : '☰'; });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='☰'; }));
  const cursor = document.getElementById('cursor'); let cx=0,cy=0,tx=0,ty=0;
  if(matchMedia('(pointer:fine)').matches && !matchMedia('(prefers-reduced-motion:reduce)').matches){
    document.addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY;cursor.style.opacity='1';},{passive:true});
    const move=()=>{cx+=(tx-cx)*.2;cy+=(ty-cy)*.2;cursor.style.left=cx+'px';cursor.style.top=cy+'px';requestAnimationFrame(move)};move();
    document.querySelectorAll('a,button,.project-card').forEach(el=>{el.addEventListener('mouseenter',()=>cursor.classList.add('active'));el.addEventListener('mouseleave',()=>cursor.classList.remove('active'));});
  }
  document.querySelectorAll('.project-card').forEach(card=>{
    const open=()=>{document.getElementById('dialogTitle').textContent=card.dataset.project;document.getElementById('dialogDescription').textContent=card.dataset.detail;document.getElementById('projectDialog').showModal();};
    card.addEventListener('click',open);card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open();}});
    card.addEventListener('pointermove',e=>{if(matchMedia('(pointer:coarse)').matches)return;const r=card.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5;const y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(800px) rotateY(${x*7}deg) rotateX(${-y*7}deg) translateY(-4px)`;});
    card.addEventListener('pointerleave',()=>card.style.transform='');
  });
  document.getElementById('dialogClose').addEventListener('click',()=>document.getElementById('projectDialog').close());
  document.getElementById('projectDialog').addEventListener('click',e=>{if(e.target.tagName==='DIALOG')e.target.close();});
  const canvas=document.getElementById('particleCanvas'),stage=document.getElementById('heroStage'),shell=document.getElementById('portraitShell'),status=document.getElementById('assemblyStatus');const ctx=canvas.getContext('2d');
  let particles=[],start=0,raf=0,stageW=0,stageH=0,playing=false;
  function resize(){const r=stage.getBoundingClientRect();stageW=r.width;stageH=r.height;const d=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(stageW*d);canvas.height=Math.round(stageH*d);ctx.setTransform(d,0,0,d,0,0);}
  function launch(){cancelAnimationFrame(raf);resize();shell.classList.remove('revealed');status.textContent='INITIALIZING';particles=[];const n=Math.min(480,Math.round(stageW*.7));for(let i=0;i<n;i++){const a=Math.random()*Math.PI*2;const rad=Math.sqrt(Math.random());const targetX=stageW*(.5+(Math.random()-.5)*.46);const targetY=stageH*(.17+Math.random()*.52);particles.push({x:stageW/2+Math.cos(a)*Math.random()*180,y:stageH*.82+Math.sin(a)*Math.random()*22,tx:targetX,ty:targetY,size:2+Math.random()*4,phase:Math.random()*Math.PI*2,color:Math.random()>.43?'#0a9fff':'#66ffab'});}start=performance.now();playing=true;raf=requestAnimationFrame(frame);}
  function frame(now){const t=(now-start)/1000;ctx.clearRect(0,0,stageW,stageH);const assemble=Math.min(1,Math.max(0,(t-.2)/2.8));const dissolve=Math.min(1,Math.max(0,(t-3.1)/1.1));if(t>1.1)status.textContent='ASSEMBLING '+Math.min(100,Math.floor(assemble*100))+'%';if(t>3.2){shell.classList.add('revealed');status.textContent='CHARACTER ONLINE';}
    particles.forEach(p=>{const ease=1-Math.pow(1-assemble,3);const x=p.x+(p.tx-p.x)*ease+Math.sin(t*3+p.phase)*8*(1-dissolve);const y=p.y+(p.ty-p.y)*ease+Math.cos(t*2+p.phase)*7*(1-dissolve);ctx.globalAlpha=(.6+.4*Math.sin(t*4+p.phase))*(1-dissolve);ctx.fillStyle=p.color;ctx.shadowBlur=12;ctx.shadowColor=p.color;ctx.fillRect(x,y,p.size,p.size);});ctx.globalAlpha=1;ctx.shadowBlur=0;
    if(t<5.2){raf=requestAnimationFrame(frame);}else{playing=false;ctx.clearRect(0,0,stageW,stageH);}}
  const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
  if(reduced){shell.classList.add('revealed');status.textContent='CHARACTER ONLINE';}else{const observer=new IntersectionObserver(entries=>{if(entries[0].isIntersecting){launch();observer.disconnect();}},{threshold:.15});observer.observe(stage);}
  document.getElementById('replayBtn').addEventListener('click',launch);
  window.addEventListener('resize',()=>{if(!playing)resize();},{passive:true});
})();
