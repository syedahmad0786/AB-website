(() => {
'use strict';
const root = document.querySelector('.wk-lead');
const $ = selector => root.querySelector(selector);
const $$ = selector => Array.from(root.querySelectorAll(selector));
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const tabs = $$('[role=tab]');
const panels = tabs.map(tab => $('#' + tab.getAttribute('aria-controls')));
function pick(index) { tabs.forEach((tab,i) => {const selected = i === index; tab.setAttribute('aria-selected', String(selected)); tab.tabIndex = selected ? 0 : -1; panels[i].hidden = !selected;}); }
const FEED = [
{platform:'Meta',i:'',t:'Form fill',s:'Meta lead ad',st:0,at:'09:14'},
{platform:'',i:'target',t:'Scored A',s:'routed to Sam',st:0,at:'09:14'},
{platform:'',i:'chat',t:'SMS follow-up sent',s:'',st:1,at:'09:15'},
{platform:'',i:'mail',t:'Reply received',s:'qualified',st:2,at:'09:41'},
{platform:'',i:'clock',t:'Call booked',s:'Thu 11:00',st:3,at:'09:43'},
{platform:'HubSpot',i:'',t:'Synced to HubSpot',s:'',st:3,at:'09:43'}
];
const paths={target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/>',chat:'<path d="M4 5h16v12H9l-5 4V5Z"/>',mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'};
function icon(name){return '<svg class="wk-lead-icn" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+paths[name]+'</svg>';}
const feed=$('#wk-lead-feed'), stages=$$('#wk-lead-stages li'), touchpoints=$('#wk-lead-tp');
let timers=[];
function stop(){timers.forEach(clearTimeout);timers=[];}
function renderFeed(n){feed.innerHTML=FEED.slice(0,n).map((f,i)=>'<li class="'+(i===n-1?'wk-lead-now':'')+'">'+(f.platform?'<span class="wk-lead-pill">'+esc(f.platform)+'</span>':icon(f.i))+'<span class="wk-lead-feed-copy">'+esc(f.t)+(f.s?' <span class="wk-lead-s">· '+esc(f.s)+'</span>':'')+'</span><small>'+f.at+'</small></li>').join(''); const stage=n?FEED[n-1].st:0; stages.forEach((el,i)=>{el.className=i===stage?'wk-lead-on':i<stage?'wk-lead-done':'';if(i===stage)el.setAttribute('aria-current','step');else el.removeAttribute('aria-current');});touchpoints.textContent=n+(n===1?' touchpoint':' touchpoints');}
function finalState(){stop();renderFeed(FEED.length);}
function replay(){stop();pick(0);if(reduced.matches){finalState();return;}renderFeed(0);FEED.forEach((_,i)=>timers.push(setTimeout(()=>renderFeed(i+1),250+i*1000)));}
tabs.forEach((tab,index)=>tab.addEventListener('click',()=>{finalState();pick(index);}));
$('[data-wk-lead-replay]').addEventListener('click',replay);
function reset(){finalState();pick(0);}
reduced.addEventListener('change',()=>{if(reduced.matches)finalState();});
window.WorkWalkthrough.onReset(reset);reset();
})();
