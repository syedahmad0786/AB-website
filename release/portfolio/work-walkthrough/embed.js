/* WorkEmbed v1: shared embed + auto-tour runtime (V10 contract section 4). No network, no storage. */
(()=>{'use strict';
if(window.WorkEmbed)return;
const NS='ab-wk',V=1;
const params=new URLSearchParams(location.search);
const TOUR_OFF=params.get('tour')==='0';
const START=Math.max(0,parseInt(params.get('start')||'0',10)||0);
const CTX=params.get('ctx')||'';
const root=document.documentElement;
root.setAttribute('data-embed','');
if(CTX)root.setAttribute('data-embed-ctx',CTX);
const mq=window.matchMedia?window.matchMedia('(prefers-reduced-motion: reduce)'):{matches:false,addEventListener(){}};
const HAS_PARENT=window.parent&&window.parent!==window;
const IDLE_MS=8000,LOOP_WAIT=1200,DIP=240,PRESS=180,TYPE_MS=45;

const S={app:'',steps:[],reset:null,bridge:null,mode:null,
  visible:false,parentSeen:false,paused:false,user:false,idleTimer:0,
  gen:0,running:false,index:START,hovered:null,overlay:null,cursor:null,cx:-40,cy:-40};

function post(type,payload){
  if(!HAS_PARENT)return;
  const msg=Object.assign({ns:NS,v:V,type,app:S.app},payload||{});
  try{window.parent.postMessage(msg,location.origin)}catch(_){/* opaque origin mismatch: ignore */}
}
function reduced(){return !!mq.matches}
function canRun(){return S.mode&&!TOUR_OFF&&!reduced()&&S.visible&&!document.hidden&&!S.paused&&!S.user}
function reason(){if(reduced())return 'reduced';if(S.paused)return 'paused';if(S.user)return 'user';if(!S.visible||document.hidden)return 'hidden';return 'auto'}
function stepLabel(i){const s=S.steps[i];return s?(s.label||s.id||''):''}
function postState(){post('state',{playing:S.running,reason:S.running?'auto':(TOUR_OFF?'paused':reason()),step:S.index,total:S.steps.length,label:stepLabel(S.index)})}

/* ---------- overlay + cursor ---------- */
function ensureOverlay(){
  if(S.overlay)return;
  const ov=document.createElement('div');ov.className='we-overlay';ov.setAttribute('aria-hidden','true');
  ov.innerHTML='<div class="we-cursor"><svg viewBox="0 0 18 18" width="18" height="18" focusable="false"><path d="M2.2 1.6 15.4 9.1 9.3 10.3 6.4 16 2.2 1.6Z"/></svg></div>';
  (document.body||root).appendChild(ov);
  S.overlay=ov;S.cursor=ov.firstChild;
  S.cursor.style.transform='translate(-40px,-40px)';
}
function showCursor(on){if(S.overlay)S.overlay.classList.toggle('is-on',!!on)}
function moveCursor(x,y,ms){
  S.cx=x;S.cy=y;
  S.cursor.style.transitionDuration=(ms|0)+'ms';
  S.cursor.style.transform='translate('+Math.round(x)+'px,'+Math.round(y)+'px)';
}
function ripple(x,y){
  const r=document.createElement('span');r.className='we-ripple';
  r.style.left=Math.round(x)+'px';r.style.top=Math.round(y)+'px';
  S.overlay.appendChild(r);setTimeout(()=>r.remove(),400);
  S.cursor.classList.add('is-press');setTimeout(()=>S.cursor&&S.cursor.classList.remove('is-press'),PRESS);
}
function pulse(el){el.classList.add('we-target');setTimeout(()=>el.classList.remove('we-target'),620)}

/* ---------- helpers ---------- */
function sleep(ms,gen){return new Promise(res=>setTimeout(()=>res(gen===S.gen),ms))}
function find(sel){if(!sel)return null;try{const all=document.querySelectorAll(sel);for(const el of all){const r=el.getBoundingClientRect();if(r.width>0&&r.height>0)return el}return null}catch(_){return null}}
function centre(el){
  try{el.scrollIntoView({block:'nearest',inline:'nearest'})}catch(_){}
  const r=el.getBoundingClientRect();
  return {x:Math.max(4,Math.min(innerWidth-8,r.left+Math.min(r.width/2,Math.max(18,r.width*.3)))),y:Math.max(4,Math.min(innerHeight-8,r.top+r.height/2))};
}
function fire(el,type,Ctor){
  let ev;const init={bubbles:!/enter|leave/.test(type),cancelable:true,view:window};
  try{ev=new (Ctor||MouseEvent)(type,init)}catch(_){ev=document.createEvent('Event');ev.initEvent(type,init.bubbles,true)}
  el.dispatchEvent(ev);
}
function hover(el){
  unhover();
  fire(el,'pointerover',window.PointerEvent);fire(el,'pointerenter',window.PointerEvent);
  fire(el,'mouseover');fire(el,'mouseenter');fire(el,'mousemove');
  S.hovered=el;
}
function unhover(){
  const el=S.hovered;S.hovered=null;if(!el||!el.isConnected)return;
  fire(el,'pointerout',window.PointerEvent);fire(el,'pointerleave',window.PointerEvent);
  fire(el,'mouseout');fire(el,'mouseleave');
}
function setValue(el,v){
  const proto=el instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype;
  const d=Object.getOwnPropertyDescriptor(proto,'value');
  if(d&&d.set)d.set.call(el,v);else el.value=v;
  el.dispatchEvent(new Event('input',{bubbles:true}));
}
async function typeInto(el,text,gen){
  try{el.focus({preventScroll:true})}catch(_){}
  setValue(el,'');
  for(let i=1;i<=text.length;i++){if(!(await sleep(TYPE_MS,gen)))return;setValue(el,text.slice(0,i))}
  el.dispatchEvent(new Event('change',{bubbles:true}));
}
function pressKey(key){
  /* Dispatch on an Element so delegated listeners can call target.closest(); it bubbles to document. */
  const a=document.activeElement;
  const t=a&&a!==document.documentElement&&a.nodeType===1?a:(document.body||document.documentElement);
  const init={key,code:key,bubbles:true,cancelable:true};
  t.dispatchEvent(new KeyboardEvent('keydown',init));
  if(key==='Escape'){
    /* A programmatic Escape does not trigger the native dialog cancel; emulate it so app state closes too. */
    document.querySelectorAll('dialog[open]').forEach(d=>{try{d.dispatchEvent(new Event('cancel',{cancelable:true}))}catch(_){}});
    setTimeout(()=>document.querySelectorAll('dialog[open]').forEach(d=>{try{d.close()}catch(_){}}),60);
  }
}
function closeDialogs(){document.querySelectorAll('dialog[open]').forEach(d=>{try{d.dispatchEvent(new Event('cancel',{cancelable:true}))}catch(_){}try{if(d.open)d.close()}catch(_){}})}
function doReset(){
  unhover();closeDialogs();
  try{if(S.reset)S.reset()}catch(_){}
  try{const a=document.activeElement;if(a&&a!==document.body&&a.blur)a.blur()}catch(_){}
}
async function dipReset(gen){
  root.classList.add('we-dip');
  if(!(await sleep(DIP,gen))){root.classList.remove('we-dip');return false}
  doReset();
  await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
  root.classList.remove('we-dip');
  return sleep(DIP,gen);
}

/* ---------- step runner ---------- */
async function runStep(step,gen){
  const act=step.action||'none';
  const el=step.target?find(step.target):null;
  if(step.target&&!el)return true; /* missing target: skip without throwing */
  if(el){
    const p=centre(el),glide=step.glide==null?700:step.glide;
    moveCursor(p.x,p.y,glide);
    if(!(await sleep(glide+60,gen)))return false;
    if(act!=='none'){ripple(p.x,p.y);pulse(el);if(!(await sleep(PRESS,gen)))return false}
    if(gen!==S.gen)return false;
    try{
      if(act==='click'){unhover();el.click()}
      else if(act==='hover')hover(el);
      else if(act==='type'){await typeInto(el,String(step.text||''),gen);if(gen!==S.gen)return false}
      else if(act==='key')pressKey(step.key||'Escape');
    }catch(_){/* never throw from the tour */}
  }else if(act==='key'){pressKey(step.key||'Escape')}
  return sleep(step.dwell==null?2400:step.dwell,gen);
}
async function loop(gen){
  ensureOverlay();showCursor(true);
  S.running=true;postState();
  while(gen===S.gen){
    if(S.index>=S.steps.length){
      if(!(await sleep(LOOP_WAIT,gen)))break;
      if(!(await dipReset(gen)))break;
      S.index=0;
    }
    postState();
    const ok=await runStep(S.steps[S.index]||{},gen);
    if(!ok||gen!==S.gen)break;
    S.index++;
  }
}
function stop(){
  S.gen++;unhover();
  if(S.running){S.running=false;showCursor(false)}
}
function evaluate(){
  if(!S.mode)return;
  if(S.mode==='bridge'){
    const b=S.bridge||{};
    if(canRun()){if(!S.running){S.running=true;call(b.onPlay)}}
    else if(S.running){S.running=false;call(b.onPause,reason())}
    postState();return;
  }
  if(canRun()){if(!S.running){const g=++S.gen;loop(g)}}
  else{if(S.running){stop()}postState()}
}
function call(fn,arg){try{if(typeof fn==='function')fn(arg)}catch(_){}}

/* ---------- user takeover ---------- */
function onTrusted(e){
  if(!e.isTrusted||!S.mode)return;
  const wasRunning=S.running;
  S.user=true;
  clearTimeout(S.idleTimer);
  S.idleTimer=setTimeout(()=>{
    S.user=false;
    if(S.paused||!S.mode)return;
    if(S.mode==='steps'){doReset();S.index=0}
    evaluate();
  },IDLE_MS);
  if(wasRunning){
    if(S.mode==='steps'){stop();unhover()}
    else{S.running=false;call((S.bridge||{}).onPause,'user')}
    post('state',{playing:false,reason:'user',step:S.index,total:S.steps.length,label:stepLabel(S.index)});
  }
}
['pointerdown','keydown','wheel','touchstart'].forEach(t=>window.addEventListener(t,onTrusted,{capture:true,passive:true}));

/* ---------- parent messages ---------- */
window.addEventListener('message',e=>{
  if(!HAS_PARENT||e.source!==window.parent)return;
  const d=e.data;if(!d||typeof d!=='object'||d.ns!==NS||d.v!==V)return;
  S.parentSeen=true;
  switch(d.type){
    case 'visible':S.visible=true;call((S.bridge||{}).onVisible);evaluate();break;
    case 'hidden':S.visible=false;call((S.bridge||{}).onHidden);evaluate();break;
    case 'play':S.paused=false;S.user=false;clearTimeout(S.idleTimer);evaluate();break;
    case 'pause':S.paused=true;clearTimeout(S.idleTimer);evaluate();post('state',{playing:false,reason:'paused',step:S.index,total:S.steps.length,label:stepLabel(S.index)});break;
    case 'reset':{
      const wasRunning=S.running&&S.mode==='steps';
      if(S.mode==='steps'){stop();doReset();S.index=0}
      else{call((S.bridge||{}).onReset)}
      if(wasRunning||S.mode==='steps')evaluate();
      break}
    default:break;
  }
});

/* ---------- visibility fallback ---------- */
let io=null;
function startIO(){
  if(io||S.parentSeen)return;
  if(!('IntersectionObserver' in window)){S.visible=true;evaluate();return}
  io=new IntersectionObserver(entries=>{
    if(S.parentSeen){io.disconnect();return}
    const en=entries[entries.length-1];S.visible=en.isIntersecting&&en.intersectionRatio>=.35;evaluate();
  },{threshold:[0,.35,.6,1]});
  io.observe(document.body||root);
}
document.addEventListener('visibilitychange',()=>{if(document.hidden)call((S.bridge||{}).onHidden);evaluate()});
if(mq.addEventListener)mq.addEventListener('change',()=>{if(reduced()){stop();showCursor(false)}evaluate()});

/* ---------- legibility floor: below 1024px frames are unscaled, keep app text >= 12px (contract section 6) ---------- */
const FLOOR=12;let ffQueued=false;
function floorFonts(){
  ffQueued=false;
  const narrow=innerWidth<1024;
  if(!narrow){document.querySelectorAll('[data-we-ff]').forEach(el=>{el.style.removeProperty('font-size');el.removeAttribute('data-we-ff')});return}
  const all=document.body?document.body.getElementsByTagName('*'):[];
  for(const el of all){
    if(el.hasAttribute('data-we-ff')||el instanceof SVGElement||el.closest('.we-overlay'))continue;
    let txt=false;for(const c of el.childNodes){if(c.nodeType===3&&c.textContent.trim()){txt=true;break}}
    if(!txt)continue;
    if(parseFloat(getComputedStyle(el).fontSize)<FLOOR){el.style.setProperty('font-size',FLOOR+'px','important');el.setAttribute('data-we-ff','')}
  }
}
function queueFloor(){if(!ffQueued){ffQueued=true;setTimeout(floorFonts,30)}}
function startFloor(){
  queueFloor();
  addEventListener('resize',queueFloor);
  if('MutationObserver' in window&&document.body)new MutationObserver(queueFloor).observe(document.body,{childList:true,subtree:true,characterData:true});
}

function boot(){
  startFloor();
  if(HAS_PARENT)setTimeout(()=>{if(!S.parentSeen)startIO()},1500);
  else startIO();
  post('ready',{playing:false,reason:reduced()?'reduced':(TOUR_OFF?'paused':'hidden'),step:S.index,total:S.steps.length,label:stepLabel(S.index)});
  if(reduced())post('state',{playing:false,reason:'reduced',step:0,total:S.steps.length,label:stepLabel(0)});
  evaluate();
}

window.WorkEmbed=Object.freeze({
  init(opts){
    if(S.mode)return;
    opts=opts||{};
    S.app=String(opts.app||'');S.steps=Array.isArray(opts.steps)?opts.steps:[];S.reset=typeof opts.reset==='function'?opts.reset:null;
    if(S.index>=S.steps.length)S.index=0;
    S.mode='steps';
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else setTimeout(boot,0);
  },
  bridge(handlers){
    if(S.mode)return;
    S.bridge=handlers||{};S.mode='bridge';
    if(typeof S.bridge.app==='string')S.app=S.bridge.app;
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else setTimeout(boot,0);
  },
  post(type,payload){if(type==='ready'||type==='state')post(type,payload)},
  get reducedMotion(){return reduced()},
  get tourEnabled(){return !TOUR_OFF}
});
})();
