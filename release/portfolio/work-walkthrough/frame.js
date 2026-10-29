/* V10 case-page app window runtime: mounts sandboxed live product frames, relays visibility, Pause/Play and Restart (ab-wk v1). */
(function(){'use strict';
var NS='ab-wk',V=1,W=1280,H=760;
var mq=window.matchMedia?matchMedia('(prefers-reduced-motion: reduce)'):{matches:false};
var wins=[];
function send(w,type){if(w.iframe&&w.iframe.contentWindow)w.iframe.contentWindow.postMessage({ns:NS,v:V,type:type},'*')}
function sync(w){if(w.iframe)send(w,w.inView&&!document.hidden?'visible':'hidden')}
function fit(w){
  if(!w.iframe)return;var bw=w.body.clientWidth,s=bw>=1024&&bw<W?bw/W:0;
  w.body.classList.toggle('aw-body--scaled',!!s);
  if(s){w.iframe.style.width=W+'px';w.iframe.style.height=H+'px';w.iframe.style.transform='scale('+s+')'}
  else{w.iframe.style.width='100%';w.iframe.style.height='100%';w.iframe.style.transform='none'}
}
function mount(w){
  if(w.iframe)return;
  var holder=document.createElement('div');holder.className='aw-frame is-active';
  var f=document.createElement('iframe');
  f.setAttribute('sandbox','allow-scripts');f.setAttribute('loading','lazy');f.setAttribute('referrerpolicy','no-referrer');
  f.title=w.el.getAttribute('data-title')||'Live interface';
  f.src=w.el.getAttribute('data-src')+'?ctx=case'+(mq.matches?'&tour=0':'');
  f.addEventListener('load',function(){sync(w)});
  holder.appendChild(f);w.body.appendChild(holder);w.iframe=f;fit(w);
}
function setPlaying(w,on){w.playing=!!on;if(!w.toggle)return;w.toggle.setAttribute('data-playing',String(!!on));w.toggle.setAttribute('aria-pressed',String(!on));w.toggle.setAttribute('aria-label',on?'Pause tour':'Play tour')}
function init(el){
  var w={el:el,body:el.querySelector('.aw-body'),iframe:null,inView:false,playing:false};
  w.toggle=el.querySelector('[data-aw-toggle]');w.reset=el.querySelector('[data-aw-reset]');
  var ctl=el.querySelector('[data-aw-controls]');if(ctl&&!mq.matches)ctl.hidden=false;
  if(w.toggle)w.toggle.addEventListener('click',function(){send(w,w.playing?'pause':'play')});
  if(w.reset)w.reset.addEventListener('click',function(){send(w,'reset')});
  if('IntersectionObserver' in window){
    new IntersectionObserver(function(es){if(es[es.length-1].isIntersecting){mount(w)}},{rootMargin:'300px 0px'}).observe(el);
    new IntersectionObserver(function(es){var e=es[es.length-1];w.inView=e.isIntersecting&&e.intersectionRatio>=.35;sync(w)},{threshold:[0,.35,.6,1]}).observe(el);
  }else{mount(w);w.inView=true}
  if('ResizeObserver' in window)new ResizeObserver(function(){fit(w)}).observe(w.body);else window.addEventListener('resize',function(){fit(w)});
  wins.push(w);
}
window.addEventListener('message',function(e){
  var d=e.data;if(!d||typeof d!=='object'||d.ns!==NS||d.v!==V||e.origin!=='null')return;
  for(var i=0;i<wins.length;i++){var w=wins[i];if(w.iframe&&w.iframe.contentWindow===e.source){if(d.type==='ready')sync(w);else if(d.type==='state')setPlaying(w,d.playing);return}}
});
document.addEventListener('visibilitychange',function(){wins.forEach(sync)});
function boot(){Array.prototype.forEach.call(document.querySelectorAll('[data-app-window]'),init)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();