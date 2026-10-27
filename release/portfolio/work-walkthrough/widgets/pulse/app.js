(()=>{'use strict';
const root=document.querySelector('#wkPulse');
const $=(s,el=root)=>el.querySelector(s);
const $$=(s,el=root)=>Array.from(el.querySelectorAll(s));
const UC={
    paid:{n:'Paid ads and CRM',
      src:[['logo:meta','Meta Ads'],['logo:googleads','Google Ads'],['logo:googleanalytics','GA4'],['logo:hubspot','HubSpot','or HighLevel'],['logo:stripe','Stripe']],
      wh:[['ad_spend','Daily, by campaign'],['leads','De-duplicated'],['deals','Stage and owner'],['payments','Revenue by invoice']],
      out:'Spend, leads and revenue sit in one view with one definition each. Every number shows its source and when it last refreshed.'},
    agency:{n:'Agency client reporting',
      src:[['logo:meta','Meta Ads'],['logo:googleads','Google Ads'],['logo:googleanalytics','GA4'],['logo:highlevel','HighLevel','or HubSpot'],['logo:googlesheets','Client sheet']],
      wh:[['client_spend','Per client, daily'],['client_leads','Per client'],['bookings','Calls booked'],['report_drafts','Weekly, per client']],
      out:'Every client gets the same agreed view of spend, leads and bookings, and a weekly report is drafted for a person to approve.'},
    revenue:{n:'Revenue and pipeline',
      src:[['logo:hubspot','HubSpot','or HighLevel'],['logo:stripe','Stripe'],['logo:meta','Meta Ads'],['logo:googleads','Google Ads'],['logo:googlesheets','Targets sheet']],
      wh:[['pipeline','Stages and owners'],['won_deals','Against target'],['funnel','Lead to won'],['payments','Revenue received']],
      out:'Won deals against target, pipeline and funnel in one commercial view, with alerts when a sync fails or a metric leaves its range.'},
    custom:{n:'Custom',
      src:[['megaphone','Any ad platform'],['users','Your CRM'],['file','Billing'],['logo:googlesheets','Spreadsheets'],['link','API or webhook']],
      wh:[['your_metrics','Defined with you'],['source_log','Dates and refreshes'],['exceptions','Gaps, duplicates'],['history','Kept for trends']],
      out:'Your own metric dictionary and sources, scoped on the mapping call and built inside your accounts.'}
  };
const OUTS=[['bars','Dashboard','Freshness shown'],['logo:slack','Slack pulse','08:00 each day'],['file','Weekly report','Person approves'],['bell','Alerts','Range breaks']];
const tabs=$$('.tabs [role="tab"]');
const panels=tabs.map(t=>$('#'+t.getAttribute('aria-controls')));
function pick(i){tabs.forEach((t,k)=>{const on=k===i;t.setAttribute('aria-selected',String(on));t.tabIndex=on?0:-1;panels[k].hidden=!on;});}
tabs.forEach((t,i)=>t.addEventListener('click',()=>pick(i)));
const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const srcs=$('#wkPulse-srcs'),wh=$('#wkPulse-wh'),outs=$('#wkPulse-outs'),outTxt=$('#wkPulse-outTxt'),dgt=$('#wkPulse-dgt'),dg=$('#wkPulse-dg'),svg=$('#wkPulse-dgs'),rec=$('#wkPulse-enr'),pill=$('#wkPulse-pill');
let ucKey='paid';
function srcHTML(u){return u.src.map(s=>'<span class="nd src"><span class="tx">'+esc(s[1])+(s[2]?'<small>'+esc(s[2])+'</small>':'')+'</span></span>').join('');}
function whHTML(u){return u.wh.map(w=>'<span class="nd whn"><span class="tx">'+esc(w[0])+'<small>'+esc(w[1])+'</small></span></span>').join('');}
outs.innerHTML=OUTS.map(o=>'<span class="nd outn"><span class="tx">'+esc(o[1])+'<small>'+esc(o[2])+'</small></span></span>').join('');
function draw(){
const W=dg.offsetWidth,H=dg.offsetHeight;if(!W||!H)return;
const b=dg.getBoundingClientRect(),k=b.width/W||1;
function P(el,side){const r=el.getBoundingClientRect(),x=(r.left-b.left)/k,y=(r.top-b.top)/k,w=r.width/k,h=r.height/k;return side==='r'?[x+w,y+h/2]:side==='l'?[x,y+h/2]:side==='b'?[x+w/2,y+h]:[x+w/2,y];}
const sn=$$('.src',srcs),wn=$$('.whn',wh),on=$$('.outn',outs);if(!sn.length||!wn.length)return;
const horiz=rec.getBoundingClientRect().left>sn[0].getBoundingClientRect().right-2,C=[];
if(horiz){sn.forEach((e,i)=>C.push([P(e,'r'),P(rec,'l'),0,i]));wn.forEach((e,i)=>C.push([P(rec,'r'),P(e,'l'),1,i]));wn.forEach((e,i)=>C.push([P(e,'r'),P(on[i],'l'),2,i]));C.push([P(outs,'b'),P(pill,'t'),3,-1]);}
else{C.push([P(srcs,'b'),P(rec,'t'),0,-1],[P(rec,'b'),P(wh,'t'),1,-1],[P(wh,'b'),P(outs,'t'),2,-1],[P(outs,'b'),P(pill,'t'),3,-1]);}
let h='';C.forEach(c=>{const a=c[0],z=c[1];let d;if(horiz&&c[2]!==3){const m=(z[0]-a[0])/2;d='M'+a[0].toFixed(1)+' '+a[1].toFixed(1)+'C'+(a[0]+m).toFixed(1)+' '+a[1].toFixed(1)+' '+(z[0]-m).toFixed(1)+' '+z[1].toFixed(1)+' '+z[0].toFixed(1)+' '+z[1].toFixed(1);}else d='M'+a[0].toFixed(1)+' '+a[1].toFixed(1)+'L'+z[0].toFixed(1)+' '+z[1].toFixed(1);h+='<path class="ln" d="'+d+'"/><circle class="pt" cx="'+a[0].toFixed(1)+'" cy="'+a[1].toFixed(1)+'" r="2.5"/><circle class="pt" cx="'+z[0].toFixed(1)+'" cy="'+z[1].toFixed(1)+'" r="2.5"/>';});svg.setAttribute('viewBox','0 0 '+W+' '+H);svg.innerHTML=h;
}
function applyUC(key,announce=true){const u=UC[key];ucKey=key;srcs.innerHTML=srcHTML(u);wh.innerHTML=whHTML(u);outTxt.textContent=u.out;dgt.textContent='Reporting flow · '+u.n;$$('.uc-row').forEach(b=>b.setAttribute('aria-pressed',String(b.getAttribute('data-uc')===key)));$('#wkPulse-node-list').innerHTML='<li><b>Sources:</b> '+u.src.map(s=>esc(s[1])+(s[2]?' ('+esc(s[2])+')':'')).join('; ')+'</li><li><b>Reconcile &amp; define:</b> Metric definitions; De-duplication; Attribution rules.</li><li><b>Warehouse:</b> '+u.wh.map(w=>esc(w[0])+' — '+esc(w[1])).join('; ')+'</li><li><b>Outputs:</b> '+OUTS.map(o=>esc(o[1])+' — '+esc(o[2])).join('; ')+'</li><li><b>Approval:</b> Weekly report draft → human review → approved before sending.</li>';$('#wkPulse-selection-status').textContent=announce?'Showing '+u.n+' source mapping.':'';draw();}
const cases=$$('.uc-row');cases.forEach((b,i)=>{b.addEventListener('click',()=>applyUC(b.getAttribute('data-uc')));b.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'].includes(e.key))return;const n=e.key==='Home'?0:e.key==='End'?cases.length-1:(i+(['ArrowRight','ArrowDown'].includes(e.key)?1:-1)+cases.length)%cases.length;e.preventDefault();cases[n].focus();cases[n].click();});});
function reset(){pick(0);applyUC('paid',false);$('.node-fallback').open=false;$('.dg-pad').scrollLeft=0;}
window.WorkWalkthrough.onReset(reset);reset();
if(window.ResizeObserver)new ResizeObserver(draw).observe(dg);else window.addEventListener('resize',draw);
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(draw);
})();
