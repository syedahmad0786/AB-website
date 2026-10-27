
/* Member Pulse — unified engine. Five lenses on one member, one shared data set.
   Timeline (swimlane) · Stages (lifecycle) · Experience Map · Pulse Stream (interactions + scoring). */
(function () {
  'use strict';
  var DAY = 86400000, NOW = Date.parse('2000-07-20T12:00:00Z');
  var esc = function (s) { return (s == null ? '' : '' + s).replace(/[&<>"']/g, function (c) { return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]; }); };

  /* ---------- platform identity ---------- */
  var SRC = {
    sourceCommunity:   { name: 'Mighty Networks', short: 'Mighty Networks',   color: '#56b486', logo: 'mighty-official-tile.svg' },
    sourceHub:  { name: 'Member hub',         short: 'Member hub',  color: '#a98cf0' },
    sourceOperations:     { name: 'Ordering tools',  short: 'Ordering tools',     color: '#e0974a' },
    sourceSupport: { name: 'Intercom',        short: 'Intercom', color: '#5b8def', logo: 'intercom-mark.svg' },
    meet:     { name: 'Calendly · Zoom', short: 'Calendly · Zoom', color: '#3fb6bd' },
    sourceBilling:   { name: 'Stripe',          short: 'Stripe',   color: '#c77dd6' },
    close:    { name: 'Close · CRM',     short: 'Close · CRM',    color: '#d9b24a', logo: 'close-mark.svg' },
    onboarding:{name: 'Onboarding',      short: 'Onboarding',color:'#e07a9b' }
  };
  var LOGO_BASE='/work-walkthrough/widgets/member-pulse/logos/';
  function logoImg(s,cls){ return s&&s.logo?'<img class="'+(cls||'src-logo')+'" src="'+LOGO_BASE+s.logo+'" alt="" height="14">':''; }
  function srcMark(k){ var s=SRC[k]; return s&&s.logo?logoImg(s,'lab-logo'):'<span class="lab-dot"></span>'; }
  var LANES = ['sourceCommunity', 'sourceHub', 'sourceOperations', 'sourceSupport', 'meet', 'sourceBilling'];

  /* ---------- 12 signals + two-model scoring ---------- */
  var SIGNALS = [
    { key:'mn_stats',  name:"Mighty Networks Stats", src:'sourceCommunity',   score:5, cw:25, lw:0,  note:"Login and content activity." },
    { key:'community', name:"Community Engagement",  src:'sourceCommunity',   score:0, cw:5,  lw:0,  note:"Posts, comments and reactions." },
    { key:'event',     name:"Event Attendance",      src:'meet',     score:10,  cw:20, lw:10, note:"Attendance record." },
    { key:'ambassador',name:"Active Ambassador",     src:'close',    score:5, cw:5,  lw:10, note:"Advocacy status." },
    { key:'video',     name:"Video Testimonial",     src:'close',    score:0,  cw:0,  lw:0,  note:"Evidence gap.", gap:true },
    { key:'tier',      name:"Membership Tier",       src:'close',    score:10, cw:0,  lw:30, note:"Membership classification." },
    { key:'exampleOrdering',name:"Ordering activity",   src:'sourceOperations',     score:5, cw:20, lw:20, note:"Order activity." },
    { key:'exampleEquipment', name:"Equipment purchasing",src:'sourceOperations',     score:0,  cw:0,  lw:0,  note:"Equipment signal." },
    { key:'nps',       name:"NPS Score",             src:'sourceSupport', score:10, cw:15, lw:10, note:"Survey signal." },
    { key:'msa',       name:"MSA Compliant",         src:'onboarding',score:5,cw:0,  lw:0,  note:"Agreement-status gate.", gate:true },
    { key:'refund',    name:"Refund Received",       src:'sourceBilling',   score:0, cw:0,  lw:0,  note:"Refund-status gate.", gate:true },
    { key:'sourceHub',   name:"Hub membership",  src:'sourceHub',  score:10, cw:10, lw:20, note:"Hub-access status." }
  ];
  function composite(wk) { var n=0,d=0; SIGNALS.forEach(function(s){ if(s[wk]>0){ n+=s.score*s[wk]; d+=s[wk]; } }); return d?Math.round(n/d*10):0; }
  var gated = !(SIGNALS.find(function(s){return s.key==='msa';}).score===10 && SIGNALS.find(function(s){return s.key==='refund';}).score===10);
  var SCORES = { churn: composite('cw'), churnPrev: 50, lead: gated?0:composite('lw'), leadPrev: 0, gated: gated };
  function churnBand(v){ return v>=71?{k:'healthy',t:'Healthy'}:v>=41?{k:'monitor',t:'Monitor'}:{k:'risk',t:'High risk'}; }
  function leadBand(v){ return v>=76?{k:'priority',t:'Priority'}:v>=51?{k:'qualified',t:'Qualified'}:{k:'hold',t:'Hold'}; }

  /* ---------- persona + lifecycle stages (Experience Map + Stages) ---------- */
  var PERSONA = {
    name:"Member 001", initials:"M1", biz:"Member organization", tier:"Learning membership", amb:"Peer contributor",
    quote:"",
    wants:['Find the right onboarding resources','Build a regular learning routine','Get help when a workflow stalls','Share useful lessons with peers'],
    frustrations:['Resources scattered across tools','Unclear next steps after joining','Support context lost between channels']
  };
  var AREAS = [
    { n:'1', cat:'Retention', desc:"Offer a clear next step when participation becomes inconsistent.", tone:'green' },
    { n:'2', cat:'Expansion', desc:"Discuss additional resources only after the member finds value.", tone:'gold' },
    { n:'3', cat:'Advocacy', desc:"Invite voluntary peer sharing.", tone:'gold' }
  ];
  var STAGES = [
    { key:'lead', idx:'01', name:"Lead", goal:"Decide whether the learning community is a good fit.",
      tps:[{src:'sourceCommunity',label:"Community introduction",when:"Jul 01, 2000",snip:"Member explores a welcome discussion."}],
      devices:['mobile','email'],
      feeling:{label:"Curious",tone:'Neutral',color:'#d9b24a',y:60,word:'curious',note:"Exploring whether the community fits a learning goal."},
      chart:{type:"baseline",label:"Starting point",big:'0',unit:'baseline'},
      quote:"" },
    { key:'onboarding', idx:'02', name:"Onboarding", goal:"Complete setup and locate a useful first resource.",
      tps:[{src:'onboarding',label:"Onboarding checklist",when:"Jul 01, 2000",snip:"Member reviews setup steps and the agreement checklist."},
           {src:'sourceHub',label:"Hub access walkthrough",when:"Jul 01, 2000",snip:"Member finds the resource library in the member hub."}],
      devices:['desktop','email'],
      feeling:{label:"Relieved",tone:'Positive',color:'#56b486',y:40,word:'relieved',note:"Setup steps now feel easier to follow."},
      chart:{type:"progress",label:"Setup progress",pct:100,sub:""} },
    { key:'active', idx:'03', name:"Active", now:true, goal:"Build a repeatable learning and participation routine.",
      tps:[{src:'sourceHub',label:"Resource library visit",when:"Jul 01, 2000",snip:"Member revisits a saved learning resource."},
           {src:'sourceHub',label:"Learning check-in",when:"Jul 01, 2000",snip:"Member reviews the next step in a practice routine."},
           {src:'sourceCommunity',label:"Peer discussion",when:"Jul 01, 2000",snip:"Member asks a practical question in the community."}],
      devices:['mobile','desktop','email'],
      feeling:{label:"Confident",tone:'High positive',color:'#56b486',y:18,word:'confident',note:"The member has found a repeatable learning routine."},
      chart:{type:"spark",label:"Participation trend",sub:""},
      quote:"" },
    { key:'atrisk', idx:'04', name:"At-Risk", goal:"Surface blockers before participation drops.", goalMuted:true,
      tps:[], empty:"No records at this stage yet.",
      devices:[],
      feeling:{label:"Steady",tone:'Neutral-positive',color:'#7cae7d',y:48,word:'steady',note:"A possible support checkpoint."},
      chart:{type:"empty",label:"No risk signals",text:"No records at this stage yet."} },
    { key:'advocate', idx:'05', name:"Advocate", goal:"Share a useful lesson with peers, voluntarily.",
      tps:[{src:'close',label:"Peer-sharing invitation",when:"Jul 01, 2000",snip:"CRM record notes an optional invitation to share a lesson."}],
      devices:['mobile','email'],
      feeling:{label:"Proud",tone:'Positive peak',color:'#56b486',y:10,word:'proud',note:"Willing to share a lesson."},
      chart:{type:"ref",label:"Referrals",big:'0',opp:true,sub:""} }
  ];

  /* ---------- interaction events ---------- */
  function ev(d, hh, mm, src, type, title, snippet, signal) {
    var dt = new Date(NOW - d * DAY); dt.setUTCHours(hh, mm, 0, 0);
    return { ts: dt.getTime(), src: src, type: type, title: title, snippet: snippet, signal: signal };
  }
  var EVENTS = [
    ev(0,8,30,'sourceCommunity','login',"Community sign-in","Sign-in to browse learning resources.",'mn_stats'),
    ev(1,18,40,'sourceCommunity','reaction',"Reaction to a peer update","Reaction shows how lightweight participation appears in a lane.",'community'),
    ev(2,10,15,'sourceCommunity','comment',"Reply in a learning discussion","Comment asks a practical follow-up question.",'community'),
    ev(3,9,0,'meet','attended',"Learning session attended","Attendance marker for a scheduled learning session.",'event'),
    ev(6,11,5,'sourceOperations','order',"Resource order recorded","Order record.",'exampleOrdering'),
    ev(6,16,30,'sourceCommunity','post',"Question shared with peers","Post asks how others organize a learning routine.",'community'),
    ev(8,9,4,'sourceCommunity','comment',"Reply in a learning discussion","Comment asks a practical follow-up question.",'community'),
    ev(8,9,18,'sourceSupport','call',"Support conversation logged","Support contact about finding the next resource.",'nps'),
    ev(8,9,41,'sourceCommunity','reaction',"Reaction to a peer update","Reaction shows how lightweight participation appears in a lane.",'mn_stats'),
    ev(8,9,47,'sourceCommunity','video',"Tutorial viewed","Tutorial-view event.",'mn_stats'),
    ev(10,13,0,'meet','booked',"Learning session booked","Booking marker.",'event'),
    ev(12,10,30,'sourceSupport','nps',"Feedback response recorded","Survey response logged from the support channel.",'nps'),
    ev(14,0,5,'sourceBilling','payment',"Membership payment marker","Billing event.",'tier'),
    ev(15,19,20,'sourceCommunity','comment',"Reply in a learning discussion","Comment asks a practical follow-up question.",'community'),
    ev(16,11,45,'sourceCommunity','post',"Question shared with peers","Post asks how others organize a learning routine.",'community'),
    ev(18,15,10,'sourceOperations','equipment',"Equipment inquiry recorded","Equipment-purchasing signal.",'exampleEquipment'),
    ev(20,9,30,'sourceCommunity','event',"Community workshop attended","Attendance marker for a community workshop.",'event'),
    ev(35,14,0,'meet','attended',"Learning session attended","Attendance marker for a scheduled learning session.",'event'),
    ev(55,10,0,'sourceBilling','payment',"Membership payment marker","Billing event.",'tier'),
    ev(70,12,0,'sourceOperations','order',"Resource order recorded","Order record.",'exampleOrdering')
  ];
  for (var dz = 0; dz <= 90; dz++) { var wd = new Date(NOW - dz * DAY).getUTCDay(); if (wd === 0 || wd === 6) continue;
    EVENTS.push(ev(dz,23,50,'sourceHub','revenue','Daily hub metric','Daily activity from the member hub.','sourceHub')); }
  EVENTS.sort(function (a, b) { return a.ts - b.ts; });
  var TYPE_LABEL = { login:'Login', reaction:'Reaction', comment:'Comment', post:'Post', video:'Video watched',
    event:'Event attended', booked:'Meeting booked', attended:'Meeting attended', order:'Order', equipment:'Equipment',
    nps:'NPS response', call:'Support call', message:'Message', payment:'Payment', revenue:'Daily revenue' };

  function relTime(ts){ var m=Math.round((NOW-ts)/60000); if(m<60)return m+'m ago'; var h=Math.round(m/60); if(h<24)return h+'h ago'; return Math.round(h/24)+'d ago'; }
  function absTime(ts){ var dt=new Date(ts); return dt.toLocaleDateString('en-US',{timeZone:'UTC',month:'short',day:'numeric'})+' · '+dt.toLocaleTimeString('en-US',{timeZone:'UTC',hour:'numeric',minute:'2-digit'}); }
  function scoreSeries(days){ var o=[],s=80,e=SCORES.churn; for(var i=0;i<days;i++){ var t=i/(days-1); var b=s+(e-s)*t; var w=Math.sin(i*0.9)*1.6-(i%7===3?2.4:0); o.push(Math.max(0,Math.min(100,Math.round(b+w)))); } if(o.length)o[o.length-1]=e; return o; }

  /* device icon glyphs */
  function devIcon(kind, on, lead){
    var p = { mobile:'<rect x="7" y="2" width="10" height="20" rx="2.4"/><line x1="11" y1="18.5" x2="13" y2="18.5"/>',
              desktop:'<rect x="2.5" y="4" width="19" height="12.5" rx="1.8"/><line x1="9" y1="20.5" x2="15" y2="20.5"/>',
              email:'<rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M3 6.5l9 6 9-6"/>' };
    return '<span class="ic'+(on?' on':'')+(lead?' lead':'')+'" title="'+kind+'"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">'+p[kind]+'</svg></span>';
  }

  /* ============================ SHARED DETAIL CARD ============================ */
  var card, pinned = null;
  function placeCard(elm){ var r=elm.getBoundingClientRect(),w=290,h=card.offsetHeight||150,m=12;
    var left=Math.max(m,Math.min(r.left+r.width/2-w/2,window.innerWidth-w-m));
    var top=r.bottom+10; if(top+h>window.innerHeight-m)top=r.top-h-10; card.style.left=left+'px'; card.style.top=Math.max(m,top)+'px'; }
  function showCard(elm,html,color,pin){ card.style.setProperty('--c',color); card.innerHTML=html;
    var x=card.querySelector('.dc-x'); if(x)x.addEventListener('click',function(e){e.stopPropagation();pinned=null;card.classList.remove('on');});
    var lk=card.querySelector('.dc-link'); if(lk&&(lk.getAttribute('href')==='#'||lk.hasAttribute('data-noop')))lk.addEventListener('click',function(e){e.preventDefault();});
    card.classList.add('on'); placeCard(elm); if(pin)pinned=elm; }
  function hideCard(f){ if(pinned&&!f)return; pinned=null; card.classList.remove('on'); }
  function attach(elm, build){
    elm.addEventListener('mouseenter',function(){ if(!pinned){var b=build();showCard(elm,b.html,b.color,false);} });
    elm.addEventListener('focus',function(){ if(!pinned){var b=build();showCard(elm,b.html,b.color,false);} });
    elm.addEventListener('mouseleave',function(){ if(pinned!==elm)hideCard(false); });
    elm.addEventListener('click',function(e){ e.stopPropagation(); if(pinned===elm){hideCard(true);} else {var b=build();showCard(elm,b.html,b.color,true);} });
  }
  function tpCard(tp){ var s=SRC[tp.src]||{name:tp.src,short:tp.src,color:'#d9b24a'};
    return { color:s.color, html:
      '<div class="dc-head"><span class="dc-dot"></span><span class="dc-kick">'+esc(s.name)+'</span><button class="dc-x" aria-label="Close">×</button></div>'+
      '<div class="dc-title">'+esc(tp.label||tp.title)+'</div>'+
      '<div class="dc-meta">'+esc(tp.when||'')+'</div>'+
      '<p class="dc-snip">'+esc(tp.snip||tp.snippet)+'</p>'+
      ('<span class="dc-link">'+logoImg(s)+esc(s.short)+'</span>') }; }
  function eventCard(e){ var s=SRC[e.src]; var sig=SIGNALS.find(function(x){return x.key===e.signal;});
    return { color:s.color, html:
      '<div class="dc-head"><span class="dc-dot"></span><span class="dc-kick">'+esc(s.name)+' · '+esc(TYPE_LABEL[e.type]||e.type)+'</span><button class="dc-x" aria-label="Close">×</button></div>'+
      '<div class="dc-title">'+esc(e.title)+'</div>'+
      '<div class="dc-meta">'+esc(absTime(e.ts))+' · '+esc(relTime(e.ts))+'</div>'+
      '<p class="dc-snip">'+esc(e.snippet)+'</p>'+
      (sig?'<div class="dc-feeds">Feeds <b>'+esc(sig.name)+'</b> · score '+sig.score+'/10</div>':'')+
      ('<span class="dc-link">'+logoImg(s)+esc(s.short)+'</span>') }; }
  function feelingCard(st){ var f=st.feeling;
    return { color:f.color, html:
      '<div class="dc-head"><span class="dc-dot"></span><span class="dc-kick">Feeling · '+esc(st.name)+'</span><button class="dc-x" aria-label="Close">×</button></div>'+
      '<div class="dc-title serif">'+esc(f.label)+'</div>'+
      '<span class="dc-tone">'+esc(f.tone)+'</span>'+
      '<p class="dc-snip">'+esc(f.note)+'</p>' }; }

  /* ============================ TIMELINE (swimlane) ============================ */
  var DW = { 7:152, 21:64, 30:47, 90:17 }, LANE_H = 52, AXIS_H = 30;
  function dwFor(r){ return DW[r] || Math.max(5, Math.round(1400/r)); }
  function stepFor(r){ return r<=7?1:r<=21?3:r<=30?5:r<=90?10:Math.ceil(r/12); }
  function lifeDays(){ var mn=NOW; (EVENTS||[]).forEach(function(e){ if(e.ts&&e.ts<mn)mn=e.ts; }); return Math.max(7, Math.ceil((NOW-mn)/DAY)+2); }
  function scrollRecent(host){ /* Deliberately manual scrolling only. */ }
  // A window is either a preset (number = last N days, ending today) or a custom {t0,t1}.
  var CUSTOM={t0:null,t1:null,active:false};
  function winOf(range){ if(range&&typeof range==='object'){ var d=Math.max(1,Math.round((range.t1-range.t0)/DAY)); return {t0:range.t0,t1:range.t1,span:Math.max(DAY,range.t1-range.t0),days:d}; } var r=range||21; return {t0:NOW-r*DAY,t1:NOW,span:r*DAY,days:r}; }
  function ymd(ts){ return new Date(ts).toISOString().slice(0,10); }
  function wireRanges(host, render){
    host.querySelectorAll('[data-range]').forEach(function(b){ b.addEventListener('click',function(){ CUSTOM.active=false; render(+b.dataset.range); }); });
    var cs=host.querySelector('[data-cs]'), ce=host.querySelector('[data-ce]'), go=host.querySelector('[data-cgo]');
    if(go) go.addEventListener('click',function(){ var a=cs.value?Date.parse(cs.value+'T00:00:00'):null, z=ce.value?Date.parse(ce.value+'T23:59:59'):NOW; if(a&&z&&z>a){ CUSTOM={t0:a,t1:z,active:true}; render({t0:a,t1:z}); } });
  }
  function renderTimeline(host, range){
    range = range || 21;
    host.innerHTML =
      '<div class="panel-head"><div><h2>Timeline</h2><div class="sub">Every touchpoint in its platform lane, along a time axis. Click a node for detail.</div></div>'+
      rangeButtons(range)+'</div>'+
      '<div class="stream-wrap"><div class="lane-labels" id="tlLabels"></div>'+
      '<div class="stream-canvas"><div class="canvas-inner" id="tlInner"><div class="axis" id="tlAxis"></div><div class="lanes" id="tlLanes"></div></div></div></div>';
    wireRanges(host, function(r){ renderTimeline(host,r); });
    var W=winOf(range), span=W.span, t0=W.t0, t1=W.t1, days=W.days, inner=host.querySelector('#tlInner');
    var contentW=Math.max(host.querySelector('.stream-canvas').clientWidth-4, days*dwFor(days));
    var lanesH=LANES.length*LANE_H; var tx=function(ts){ return ((ts-t0)/span)*contentW; };
    var step = stepFor(days);
    var ax='<svg class="ax-svg" width="'+contentW+'" height="'+AXIS_H+'">';
    for(var dd=days; dd>=0; dd-=step){ var ts=t1-dd*DAY; var x=tx(ts); ax+='<line x1="'+x+'" y1="22" x2="'+x+'" y2="'+AXIS_H+'" class="ax-tick"/><text x="'+(x+4)+'" y="15" class="ax-lab">'+(Math.abs(ts-NOW)<DAY?'Today':new Date(ts).toLocaleDateString('en-US',{timeZone:'UTC',month:'short',day:'numeric'}))+'</text>'; }
    ax+='</svg>';
    var bg='<svg class="lane-bg" width="'+contentW+'" height="'+lanesH+'">';
    LANES.forEach(function(k,i){ var y=i*LANE_H+LANE_H/2; bg+='<line x1="0" y1="'+y+'" x2="'+contentW+'" y2="'+y+'" class="lane-line" style="--c:'+SRC[k].color+'"/>'; });
    for(var g=days; g>=0; g-=step){ var gx=tx(t1-g*DAY); bg+='<line x1="'+gx+'" y1="0" x2="'+gx+'" y2="'+lanesH+'" class="grid-v"/>'; }
    if(NOW>=t0&&NOW<=t1) bg+='<line x1="'+tx(NOW)+'" y1="0" x2="'+tx(NOW)+'" y2="'+lanesH+'" class="now-line"/>';
    var inRange=EVENTS.filter(function(e){ return e.ts>=t0&&e.ts<=t1; });
    LANES.forEach(function(k){ var pts=inRange.filter(function(e){return e.src===k;}).sort(function(a,b){return a.ts-b.ts;});
      if(pts.length>1){ var d='M'; pts.forEach(function(e,i){ var x=tx(e.ts),y=LANES.indexOf(k)*LANE_H+LANE_H/2; d+=(i?' L':'')+x+','+y; }); bg+='<path d="'+d+'" class="lane-trail" style="stroke:'+SRC[k].color+'"/>'; } });
    bg+='</svg>';
    inner.style.width=contentW+'px'; host.querySelector('#tlAxis').innerHTML=ax;
    var lanes=host.querySelector('#tlLanes'); lanes.style.height=lanesH+'px'; lanes.innerHTML=bg;
    inRange.forEach(function(e){ var x=tx(e.ts),y=LANES.indexOf(e.src)*LANE_H+LANE_H/2; var amb=e.type==='revenue'; var big=/order|call|nps|payment|equipment|attended|booked|event/.test(e.type);
      var b=document.createElement('button'); b.className='node'+(amb?' amb':'')+(big?' big':''); b.style.cssText='left:'+x+'px;top:'+y+'px;--c:'+SRC[e.src].color; b.setAttribute('aria-label',e.title);
      attach(b,function(){return eventCard(e);}); lanes.appendChild(b); });
    host.querySelector('#tlLabels').innerHTML='<div class="lab-spacer" style="height:'+AXIS_H+'px"></div>'+
      LANES.map(function(k){ return '<div class="lab" style="height:'+LANE_H+'px;--c:'+SRC[k].color+'">'+srcMark(k)+'<span class="lab-name">'+SRC[k].name+'</span></div>'; }).join('');
    scrollRecent(host);
  }
  function rangeButtons(active){ var L=lifeDays(); var pon=function(r){ return (!CUSTOM.active && r===active); }; var b=[7,21,30,90].map(function(r){ return '<button type="button" data-range="'+r+'"'+(pon(r)?' class="on"':'')+'>'+r+'d</button>'; }); b.push('<button type="button" data-range="'+L+'"'+(pon(L)?' class="on"':'')+'>All</button>');
    var cs=CUSTOM.t0?ymd(CUSTOM.t0):'', ce=CUSTOM.t1?ymd(CUSTOM.t1):ymd(NOW), di='appearance:none;border:1px solid var(--line2);background:var(--panel2);color:var(--ink2);font-family:var(--mono);font-size:10.5px;border-radius:6px;padding:3px 5px';
    var custom='';
    return '<div class="ranges" style="flex-wrap:wrap;gap:4px 3px">'+b.join('')+custom+'</div>'; }

  /* ============================ STAGES (lifecycle) ============================ */
  function renderStages(host){
    host.innerHTML='<div class="panel-head"><div><h2>Stages</h2><div class="sub">Where Member 001 sits in the lifecycle — Lead → Advocate. Current stage marked NOW.</div></div></div>'+
      '<div class="stage-row" id="stageRow"></div>';
    var row=host.querySelector('#stageRow');
    STAGES.forEach(function(st){
      var c=document.createElement('div'); c.className='stage-card'+(st.now?' now':'');
      var tps = st.tps.length ? st.tps.map(function(tp){ var s=SRC[tp.src]; return '<button class="chip" style="--c:'+s.color+'" data-tp=\''+esc(JSON.stringify(tp))+'\'><span class="dot"></span><span class="lab">'+esc(tp.label)+'<span class="src">'+esc(s.name)+'</span></span></button>'; }).join('')
        : '<div class="empty"><span class="ok"><span class="d"></span>Quiet stage</span><p>'+esc(st.empty)+'</p></div>';
      c.innerHTML =
        '<div class="stage-head"><div class="idx">'+st.idx+'</div><div class="sname">'+esc(st.name)+'</div>'+(st.now?'<span class="nowpill">NOW</span>':'')+'</div>'+
        '<div class="goal'+(st.goalMuted?' muted':'')+'">'+esc(st.goal)+'</div>'+
        '<button class="feel" style="--c:'+st.feeling.color+'" data-feel="'+st.key+'"><span class="fdot"></span>'+esc(st.feeling.label)+'<span class="ftone">'+esc(st.feeling.tone)+'</span></button>'+
        '<div class="stage-tps">'+tps+'</div>';
      row.appendChild(c);
    });
    wireChips(row);
    row.querySelectorAll('[data-feel]').forEach(function(b){ var st=STAGES.find(function(s){return s.key===b.dataset.feel;}); attach(b,function(){return feelingCard(st);}); });
  }
  function wireChips(scope){ scope.querySelectorAll('[data-tp]').forEach(function(b){ var tp=JSON.parse(b.dataset.tp); attach(b,function(){return tpCard(tp);}); }); }

  /* ============================ EXPERIENCE MAP ============================ */
  function renderMap(host){
    var p=PERSONA;
    var wants=p.wants.map(function(w){return '<li>'+esc(w)+'</li>';}).join('');
    var frs=p.frustrations.map(function(w){return '<li>'+esc(w)+'</li>';}).join('');
    var areas=AREAS.map(function(a){return '<div class="fcard '+a.tone+'"><div class="fnum">'+a.n+'</div><div><div class="cat">'+esc(a.cat)+'</div><div class="desc">'+esc(a.desc)+'</div></div></div>';}).join('');
    host.innerHTML =
      '<div class="hero">'+
        '<section class="persona"><div class="persona-top"><div class="avatar">'+p.initials+'</div><div>'+
          '<h1 class="pname">'+esc(p.name)+'</h1><div class="pmeta"><span class="biz">'+esc(p.biz)+'</span><span class="sep">·</span><span class="pill platinum">'+esc(p.tier)+'</span><span class="pill amb">'+esc(p.amb)+'</span></div></div></div>'+
          (p.quote?'<div class="quote"><blockquote>'+esc(p.quote)+'</blockquote></div>':'')+
          '<div class="wf"><div><h4>Wants</h4><ul class="wants">'+wants+'</ul></div><div><h4>Frustrations</h4><ul class="fr">'+frs+'</ul></div></div>'+
          '<div class="devices"><span class="dl">Devices</span>'+
            '<span class="dchip primary">'+devIcon('mobile',1,1).replace('class="ic on lead"','')+'Mobile</span>'+
            '<span class="dchip">'+devIcon('desktop',0,0).replace('class="ic"','')+'Desktop</span>'+
            '<span class="dchip">'+devIcon('email',0,0).replace('class="ic"','')+'Email</span></div>'+
        '</section>'+
        '<aside class="focus"><div class="focus-head"><h3>Areas of focus</h3><span class="k">Where to act</span></div><div class="fcards">'+areas+'</div></aside>'+
      '</div>'+
      '<div class="journey"><div class="jhead"><div><h2>Member experience map</h2><div class="jsub">Lead → Advocate</div></div>'+
        '<div class="legend">'+LANES.concat(['close','onboarding']).filter(function(k,i,a){return a.indexOf(k)===i;}).slice(0,5).map(function(k){return '<span class="lg" style="--c:'+SRC[k].color+'"><span class="d"></span>'+SRC[k].short+'</span>';}).join('')+'</div></div>'+
        '<div class="scroll"><div class="jgrid" id="jgrid"></div></div></div>';
    buildMapGrid(host.querySelector('#jgrid'));
  }
  function buildMapGrid(g){
    var rows='';
    // header
    rows+='<div class="cell rail"><span>Journey<br>step</span></div>';
    STAGES.forEach(function(st){ rows+='<div class="cell hcell'+(st.now?' now':'')+'">'+(st.now?'<span class="nowpill">NOW</span>':'')+'<div class="idx">'+st.idx+'</div><div class="step">'+esc(st.name)+'</div></div>'; });
    // goal
    rows+='<div class="cell rail"><span>Customer<br>goal</span></div>';
    STAGES.forEach(function(st){ rows+='<div class="cell'+(st.now?' now':'')+'"><div class="goal'+(st.goalMuted?' muted':'')+'">'+esc(st.goal)+'</div></div>'; });
    // touchpoints
    rows+='<div class="cell rail"><span>Touch-<br>points</span></div>';
    STAGES.forEach(function(st){ var inner = st.tps.length? '<div class="tps">'+st.tps.map(function(tp){var s=SRC[tp.src];return '<button class="chip" style="--c:'+s.color+'" data-tp=\''+esc(JSON.stringify(tp))+'\'><span class="dot"></span><span class="lab">'+esc(tp.label)+'<span class="src">'+esc(s.name)+'</span></span></button>';}).join('')+'</div>'
        : '<div class="empty"><span class="ok"><span class="d"></span>Quiet stage</span><p>'+esc(st.empty)+'</p></div>';
      rows+='<div class="cell'+(st.now?' now':'')+'">'+inner+'</div>'; });
    // device
    rows+='<div class="cell rail"><span>Device /<br>channel</span></div>';
    STAGES.forEach(function(st){ var ds = st.devices.length? ['mobile','desktop','email'].map(function(k){return devIcon(k, st.devices.indexOf(k)>=0, st.devices[0]===k && st.devices.indexOf(k)>=0);}).join('') : '<span class="none">—</span>';
      rows+='<div class="cell'+(st.now?' now':'')+'"><div class="devrow">'+ds+'</div></div>'; });
    // emotion band
    rows+='<div class="cell rail"><span>Thoughts<br>&amp; feelings</span></div>';
    rows+='<div class="emoband" id="emoband"></div>';
    // data
    rows+='<div class="cell rail"><span>Supporting<br>data</span></div>';
    STAGES.forEach(function(st){ rows+='<div class="cell'+(st.now?' now':'')+'"><div class="chart">'+chartHTML(st.chart)+'</div></div>'; });
    g.innerHTML=rows;
    wireChips(g);
    buildEmotion(g.querySelector('#emoband'));
  }
  function chartHTML(c){
    if(c.type==='baseline') return '<div class="clabel">'+c.label+'</div><div class="bignum muted">'+c.big+'<span class="u">'+c.unit+'</span></div><div class="baseline"></div>';
    if(c.type==='progress') return '<div class="clabel">'+c.label+'</div><div class="progress"><i style="width:'+c.pct+'%"></i></div><div class="csub"><b>'+c.pct+'%</b>'+(c.sub?' · '+c.sub:'')+'</div>';
    if(c.type==='spark') return '<div class="clabel">'+c.label+'</div><svg class="spark" viewBox="0 0 100 38" preserveAspectRatio="none"><defs><linearGradient id="sf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="rgba(86,180,134,.34)"/><stop offset="1" stop-color="rgba(86,180,134,0)"/></linearGradient></defs><path d="M2,30 L16,28 L30,31 L44,20 L58,23 L72,13 L86,15 L98,5 L98,38 L2,38 Z" fill="url(#sf)"/><path d="M2,30 L16,28 L30,31 L44,20 L58,23 L72,13 L86,15 L98,5" fill="none" stroke="#56b486" stroke-width="1.6" vector-effect="non-scaling-stroke" stroke-linejoin="round"/><circle cx="98" cy="5" r="2.4" fill="#56b486"/></svg><div class="csub"><b>▲</b> '+c.sub+'</div>';
    if(c.type==='empty') return '<div class="clabel">'+c.label+'</div><div class="empty" style="min-height:auto;padding:14px 12px"><p style="text-align:center">'+c.text+'</p></div>';
    if(c.type==='ref') return '<div class="clabel">'+c.label+'</div><div class="refnum"><div class="bignum">'+c.big+'</div>'+(c.opp?'<span class="opp">Opportunity</span>':'')+'</div><div class="csub">'+c.sub+'</div>';
    return '';
  }
  function buildEmotion(band){
    var pts=STAGES.map(function(st,i){ return { x:100+i*200, y:200*st.feeling.y/100, st:st }; });
    var dpath='M'+pts[0].x+','+pts[0].y; for(var i=1;i<pts.length;i++){ var a=pts[i-1],b=pts[i]; dpath+=' C'+(a.x+70)+','+a.y+' '+(b.x-70)+','+b.y+' '+b.x+','+b.y; }
    var svg='<svg class="line" viewBox="0 0 1000 200" preserveAspectRatio="none" aria-hidden="true"><defs>'+
      '<linearGradient id="emoGrad" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#d9b24a"/><stop offset="0.2" stop-color="#bdb45e"/><stop offset="0.32" stop-color="#56b486"/><stop offset="1" stop-color="#56b486"/></linearGradient></defs>'+
      '<line x1="200" y1="14" x2="200" y2="186" class="emo-guide"/><line x1="400" y1="14" x2="400" y2="186" class="emo-guide now"/><line x1="600" y1="14" x2="600" y2="186" class="emo-guide now"/><line x1="800" y1="14" x2="800" y2="186" class="emo-guide"/>'+
      '<path d="'+dpath+'" fill="none" stroke="url(#emoGrad)" stroke-width="7" stroke-linecap="round" opacity=".2" vector-effect="non-scaling-stroke"/>'+
      '<path id="emoPath" d="'+dpath+'" fill="none" stroke="url(#emoGrad)" stroke-width="2.6" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg>';
    band.innerHTML=svg;
    STAGES.forEach(function(st,i){ var b=document.createElement('button'); b.className='enode'+(st.now?' nownode':''); b.style.cssText='left:'+(10+i*20)+'%;top:'+st.feeling.y+'%;--c:'+st.feeling.color;
      b.setAttribute('aria-label',st.name+': '+st.feeling.tone+' feeling'); b.innerHTML='<span class="nd"></span>'; attach(b,function(){return feelingCard(st);}); band.appendChild(b);
      var l=document.createElement('span'); l.className='elabel'; l.style.cssText='left:'+(10+i*20)+'%;top:'+(st.feeling.y+14)+'%'; l.textContent=st.feeling.word; band.appendChild(l); });
    // quote callouts
    addQuote(band, STAGES[0], 2.5, 6); addQuote(band, STAGES[2], 39, 54);
    var path=band.querySelector('#emoPath');
  }
  function addQuote(band, st, left, top){ if(!st.quote)return; var f=document.createElement('figure'); f.className='qbubble'; f.style.cssText='left:'+left+'%;top:'+top+'%;--c:'+st.feeling.color;
    f.innerHTML='<div class="b">'+esc(st.quote)+'</div>'; band.appendChild(f); }

  /* ============================ PULSE STREAM (interactions + scoring) ============================ */
  var TRACK_H=116;
  function renderStream(host, range){
    range=range||21;
    if(!host.dataset.built){ host.dataset.built='1';
      host.innerHTML='<div class="panel-head"><div><h2>Pulse stream</h2><div class="sub">Every interaction in sequence — the thread shows how Member 001 moves between tools.</div></div><div id="streamRanges"></div></div>'+
        '<div class="stream-wrap"><div class="lane-labels" id="stLabels"></div><div class="stream-canvas"><div class="canvas-inner" id="stInner"><div class="axis" id="stAxis"></div><div class="lanes" id="stLanes"></div><div class="score-track" id="stTrack"></div></div></div></div>'+
        '<div class="sc-block"><div class="panel-head"><div><h2>Health scorecard</h2><div class="sub">The signals and weights behind both scores.</div></div></div>'+
        '<div class="sc-grid"><div class="sc-left"><div class="readout" id="churnRd"></div><div class="readout" id="leadRd"></div>'+
        '<div class="formula">Composite = Σ(signal × weight) ÷ Σweights × 10.<br><span>C = churn weight · L = lead weight · GATE = hard gate.</span></div><div class="coverage" id="coverage"></div></div>'+
        '<div class="sc-right"><div class="signals" id="signals"></div></div></div></div>';
      renderScorecard(host);
    }
    host.querySelector('#streamRanges').innerHTML=rangeButtons(range);
    wireRanges(host, function(r){ renderStream(host,r); });
    var W=winOf(range), span=W.span, t0=W.t0, t1=W.t1, days=W.days, inner=host.querySelector('#stInner');
    var contentW=Math.max(host.querySelector('.stream-canvas').clientWidth-4, days*dwFor(days));
    var lanesH=LANES.length*LANE_H; var tx=function(ts){ return ((ts-t0)/span)*contentW; };
    var step=stepFor(days);
    var ax='<svg class="ax-svg" width="'+contentW+'" height="'+AXIS_H+'">';
    for(var dd=days;dd>=0;dd-=step){ var ts=t1-dd*DAY; var x=tx(ts); ax+='<line x1="'+x+'" y1="22" x2="'+x+'" y2="'+AXIS_H+'" class="ax-tick"/><text x="'+(x+4)+'" y="15" class="ax-lab">'+(Math.abs(ts-NOW)<DAY?'Today':new Date(ts).toLocaleDateString('en-US',{timeZone:'UTC',month:'short',day:'numeric'}))+'</text>'; }
    ax+='</svg>';
    var bg='<svg class="lane-bg" width="'+contentW+'" height="'+lanesH+'">';
    LANES.forEach(function(k,i){ var y=i*LANE_H+LANE_H/2; bg+='<line x1="0" y1="'+y+'" x2="'+contentW+'" y2="'+y+'" class="lane-line" style="--c:'+SRC[k].color+'"/>'; });
    for(var g=days;g>=0;g-=step){ var gx=tx(t1-g*DAY); bg+='<line x1="'+gx+'" y1="0" x2="'+gx+'" y2="'+lanesH+'" class="grid-v"/>'; }
    if(NOW>=t0&&NOW<=t1) bg+='<line x1="'+tx(NOW)+'" y1="0" x2="'+tx(NOW)+'" y2="'+lanesH+'" class="now-line"/>';
    var inRange=EVENTS.filter(function(e){return e.ts>=t0&&e.ts<=t1;});
    var thread=inRange.filter(function(e){return e.type!=='revenue';});
    for(var i=1;i<thread.length;i++){ var a=thread[i-1],b=thread[i]; var x1=tx(a.ts),y1=LANES.indexOf(a.src)*LANE_H+LANE_H/2,x2=tx(b.ts),y2=LANES.indexOf(b.src)*LANE_H+LANE_H/2,mx=(x1+x2)/2;
      bg+='<path d="M'+x1+','+y1+' C'+mx+','+y1+' '+mx+','+y2+' '+x2+','+y2+'" class="thread" style="stroke:'+SRC[b.src].color+'"/>'; }
    bg+='</svg>';
    inner.style.width=contentW+'px'; host.querySelector('#stAxis').innerHTML=ax;
    var lanes=host.querySelector('#stLanes'); lanes.style.height=lanesH+'px'; lanes.innerHTML=bg;
    inRange.forEach(function(e){ var x=tx(e.ts),y=LANES.indexOf(e.src)*LANE_H+LANE_H/2; var amb=e.type==='revenue'; var big=/order|call|nps|payment|equipment|attended|booked|event/.test(e.type);
      var b=document.createElement('button'); b.className='node'+(amb?' amb':'')+(big?' big':''); b.style.cssText='left:'+x+'px;top:'+y+'px;--c:'+SRC[e.src].color; b.setAttribute('aria-label',e.title);
      attach(b,function(ev2){return function(){return eventCard(ev2);};}(e)); lanes.appendChild(b); });
    host.querySelector('#stLabels').innerHTML='<div class="lab-spacer" style="height:'+AXIS_H+'px"></div>'+
      LANES.map(function(k){ return '<div class="lab" style="height:'+LANE_H+'px;--c:'+SRC[k].color+'">'+srcMark(k)+'<span class="lab-name">'+SRC[k].name+'</span></div>'; }).join('')+
      '<div class="lab track-lab" style="height:'+TRACK_H+'px">Daily<br>churn&nbsp;score</div>';
    // score track
    var series=scoreSeries(days), th=TRACK_H, pad=14, sy=function(v){return th-pad-(v/100)*(th-pad*2);};
    var pts=series.map(function(v,i){ return [tx(t1-(series.length-1-i)*DAY), sy(v)]; });
    var tr='<svg class="track-svg" width="'+contentW+'" height="'+th+'">';
    tr+='<rect x="0" y="'+sy(100)+'" width="'+contentW+'" height="'+(sy(71)-sy(100))+'" class="z-healthy"/><rect x="0" y="'+sy(71)+'" width="'+contentW+'" height="'+(sy(41)-sy(71))+'" class="z-monitor"/><rect x="0" y="'+sy(41)+'" width="'+contentW+'" height="'+(sy(0)-sy(41))+'" class="z-risk"/>';
    [100,71,41,0].forEach(function(v){ tr+='<line x1="0" y1="'+sy(v)+'" x2="'+contentW+'" y2="'+sy(v)+'" class="track-grid"/><text x="3" y="'+(sy(v)-3)+'" class="track-axlab">'+v+'</text>'; });
    var area='M'+pts[0][0]+','+th+' '+pts.map(function(p){return 'L'+p[0]+','+p[1];}).join(' ')+' L'+pts[pts.length-1][0]+','+th+' Z';
    tr+='<path d="'+area+'" class="track-area"/><path d="M'+pts.map(function(p){return p[0]+','+p[1];}).join(' L')+'" class="track-line"/>';
    var last=pts[pts.length-1]; tr+='<circle cx="'+last[0]+'" cy="'+last[1]+'" r="4" class="track-dot"/><text x="'+(last[0]-6)+'" y="'+(last[1]-9)+'" text-anchor="end" class="track-now">'+SCORES.churn+'</text></svg>';
    host.querySelector('#stTrack').innerHTML=tr;
    scrollRecent(host);
  }
  // Click a scorecard signal -> drill into the underlying activity from its source.
  function signalCard(sigKey){
    var s=SIGNALS.find(function(x){return x.key===sigKey;}); if(!s) return {color:'#d9b24a',html:''};
    var src=SRC[s.src]||{name:s.src,color:'#d9b24a',short:s.src};
    var evs=EVENTS.filter(function(e){return e.src===s.src;}).sort(function(a,b){return b.ts-a.ts;}).slice(0,10);
    var rows=evs.length?evs.map(function(e){return '<div style="display:flex;justify-content:space-between;gap:8px;padding:5px 0;border-top:1px solid var(--line2)"><span style="font-size:12px;color:var(--ink);overflow:hidden;text-overflow:ellipsis">'+esc(e.title)+'</span><span style="font-size:10.5px;color:var(--ink3);white-space:nowrap;font-family:var(--mono)">'+esc(relTime(e.ts))+'</span></div>';}).join(''):'<div style="font-size:12px;color:var(--ink3);padding:8px 0">No recorded '+esc(src.name)+' activity in the loaded window.</div>';
    return {color:src.color, html:
      '<div class="dc-head"><span class="dc-dot"></span><span class="dc-kick">'+esc(s.name)+' · '+s.score+'/10</span><button class="dc-x" aria-label="Close">×</button></div>'+
      '<div class="dc-meta">'+esc(s.note||src.name)+'</div>'+
      '<div style="margin-top:8px;max-height:230px;overflow-y:auto">'+rows+'</div>' };
  }
  function renderScorecard(host){
    var cb=churnBand(SCORES.churn), lb=leadBand(SCORES.lead);
    host.querySelector('#churnRd').innerHTML=scoreReadout('Churn Risk',SCORES.churn,cb,SCORES.churn-SCORES.churnPrev,false);
    host.querySelector('#leadRd').innerHTML=scoreReadout('Lead Qualification',SCORES.lead,lb,SCORES.lead-SCORES.leadPrev,SCORES.gated);
    host.querySelector('#signals').innerHTML=SIGNALS.map(function(s){
      var color=s.score===10?'var(--ok)':s.score===5?'var(--watch)':'var(--bad)'; var sc=SRC[s.src]?SRC[s.src].color:'var(--ink3)';
      var w=''; if(s.cw)w+='<span class="wt wt-c">C·'+s.cw+'</span>'; if(s.lw)w+='<span class="wt wt-l">L·'+s.lw+'</span>'; if(s.gate)w+='<span class="wt wt-gate">GATE</span>'; if(!s.cw&&!s.lw&&!s.gate)w+='<span class="wt wt-off">—</span>';
      return '<div class="sig'+(s.gap?' gap':'')+'" data-sig="'+esc(s.key)+'" style="cursor:pointer"><span class="sig-src" style="background:'+sc+'"></span><div class="sig-main"><div class="sig-name">'+esc(s.name)+'</div><div class="sig-note">'+esc(s.note)+'</div></div><div class="sig-wts">'+w+'</div><span class="sig-score" style="color:'+color+';border-color:'+color+'">'+s.score+'</span></div>';
    }).join('');
    host.querySelectorAll('#signals .sig[data-sig]').forEach(function(el){ attach(el, function(){ return signalCard(el.getAttribute('data-sig')); }); });
    host.querySelector('#coverage').innerHTML='<span class="cov-dot ok"></span>'+SIGNALS.length+' signals<span class="cov-sep">·</span>'+Object.keys(SRC).length+' sources<span class="cov-sep">·</span><span class="cov-logos">'+['sourceCommunity','sourceSupport','close'].map(function(k){return logoImg(SRC[k]);}).join('')+'</span>';
  }
  function scoreReadout(label,val,band,delta,g){ var arrow=delta>0?'▲':delta<0?'▼':'—', dc=delta>0?'up':delta<0?'down':'flat';
    return '<div class="rd-top"><span class="rd-label">'+label+'</span><span class="rd-band '+band.k+'">'+band.t+'</span></div>'+
      '<div class="rd-val"><span class="rd-num">'+val+'</span><span class="rd-den">/100</span><span class="rd-delta '+dc+'">'+arrow+' '+Math.abs(delta)+'</span></div>'+
      (g?'<div class="rd-gate">⚠ Hard-gated to 0</div>':'<div class="rd-track"><i class="rd-fill '+band.k+'" style="width:'+val+'%"></i></div>'); }

  /* ============================ TABS + THEME + INIT ============================ */
  /* ============================ TENURE (cohort lens) ============================ */
  var TENURE_CACHE=null;
  function tenRangeButtons(active){ var L=9999; return '<div class="ranges" id="tenRanges">'+[30,60,90].map(function(r){ return '<button type="button" data-trange="'+r+'"'+(r===active?' class="on"':'')+'>'+r+'d</button>'; }).join('')+'<button type="button" data-trange="'+L+'"'+(active===L?' class="on"':'')+'>All</button></div>'; }
  // Tenure-aging color ramp: freshest cohort green → seasoned earth tones.
  function cohColor(key){ var m={'0-30':'#2f9e6a','31-60':'#7ba84e','61-90':'#d8a73a','91-180':'#b9803a','180+':'#8a7b66'}; return m[key]||'var(--gold)'; }
  var tenLabel=function(t){ return '<div style="font-family:var(--mono);font-size:10.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--ink3);margin:18px 0 8px">'+t+'</div>'; };
  // Single horizontal stacked bar — instant read on the shape of membership tenure.
  function tenDistBar(buckets, total){
    if(!total) return '';
    var segs=buckets.map(function(b){ var pct=b.count?(b.count/total*100):0; if(pct<=0)return ''; return '<div title="'+esc(b.label)+': '+(b.count||0).toLocaleString()+' ('+pct.toFixed(0)+'%)" style="width:'+pct.toFixed(2)+'%;background:'+cohColor(b.key)+'"></div>'; }).join('');
    var legend=buckets.map(function(b){ var pct=total?Math.round(b.count/total*100):0; return '<span style="display:inline-flex;align-items:center;gap:5px;font-size:11px;color:var(--ink2)"><i style="width:9px;height:9px;border-radius:2px;background:'+cohColor(b.key)+'"></i>'+esc(b.label)+' <b style="font-family:var(--mono)">'+pct+'%</b></span>'; }).join('');
    return '<div style="display:flex;height:16px;border-radius:6px;overflow:hidden;border:1px solid var(--line2)">'+segs+'</div>'+
           '<div style="display:flex;gap:14px;flex-wrap:wrap;margin-top:8px">'+legend+'</div>';
  }
  // Cohort cards: count, share of total, a proportion bar, and the aging color.
  function tenCards(buckets, total){
    var max=1; buckets.forEach(function(b){ if((b.count||0)>max)max=b.count; });
    return buckets.map(function(b){ var pct=total?Math.round(b.count/total*100):0; var col=cohColor(b.key);
      return '<div style="flex:1;min-width:118px;border:1px solid var(--line2);border-radius:10px;padding:11px 13px 12px;background:var(--panel2);position:relative;overflow:hidden">'+
        '<div style="position:absolute;left:0;top:0;bottom:0;width:3px;background:'+col+'"></div>'+
        '<div style="font-size:23px;font-weight:800;color:var(--ink)">'+(b.count||0).toLocaleString()+'</div>'+
        '<div style="font-size:10.5px;color:var(--ink3);font-family:var(--mono);margin-bottom:7px">'+esc(b.label)+' · '+pct+'%</div>'+
        '<div style="height:5px;border-radius:3px;background:var(--line2)"><i style="display:block;height:5px;border-radius:3px;width:'+Math.round((b.count||0)/max*100)+'%;background:'+col+'"></i></div>'+
        '</div>'; }).join('');
  }
  function tenBars(byT, startDay, today){
    var n=today-startDay+1; if(n<1)n=1; if(n>420)n=420;
    var arr=[]; for(var i=0;i<n;i++){ arr.push(byT[startDay+i]||0); }
    var max=1; arr.forEach(function(v){ if(v>max)max=v; });
    var bw=Math.max(2, Math.min(16, Math.round(820/n))), W=Math.max(560, n*bw+24), H=160, base=H-20, top=14;
    var s='<svg width="'+W+'" height="'+H+'" style="max-width:none">';
    [0.5,1].forEach(function(f){ var y=base-(base-top)*f; s+='<line x1="12" y1="'+y.toFixed(1)+'" x2="'+(W-12)+'" y2="'+y.toFixed(1)+'" stroke="var(--line2)" stroke-dasharray="2 3"/>'; });
    for(var j=0;j<n;j++){ var v=arr[j]; if(!v)continue; var h=Math.round((v/max)*(base-top)); var x=12+j*bw; var dt=new Date((startDay+j)*DAY); s+='<rect x="'+x+'" y="'+(base-h)+'" width="'+Math.max(1,bw-1)+'" height="'+h+'" rx="1" fill="var(--gold)"><title>'+v+' joined · '+dt.toLocaleDateString('en-US',{timeZone:'UTC',month:'short',day:'numeric'})+'</title></rect>'; }
    if(n>=7){ var pts=[]; for(var k=0;k<n;k++){ var a=0,cnt=0; for(var w=-3;w<=3;w++){ var ix=k+w; if(ix>=0&&ix<n){a+=arr[ix];cnt++;} } var avg=cnt?a/cnt:0; var px=12+k*bw+(Math.max(1,bw-1))/2; var py=base-(avg/max)*(base-top); pts.push(px.toFixed(1)+','+py.toFixed(1)); } s+='<polyline points="'+pts.join(' ')+'" fill="none" stroke="var(--ok)" stroke-width="1.6" opacity="0.85"/>'; }
    [0,Math.floor(n/2),n-1].forEach(function(i){ if(i<0)return; var dt=new Date((startDay+i)*DAY); var x=12+i*bw; s+='<text x="'+x+'" y="'+(H-5)+'" style="font-family:var(--mono);font-size:9px;fill:var(--ink3)">'+dt.toLocaleDateString('en-US',{timeZone:'UTC',month:'short',day:'numeric'})+'</text>'; });
    s+='</svg>';
    var leg=n>=7?'<div style="display:flex;gap:14px;align-items:center;margin-top:6px;font-size:10.5px;color:var(--ink3)"><span style="display:inline-flex;align-items:center;gap:5px"><i style="width:10px;height:10px;border-radius:2px;background:var(--gold)"></i>daily joins</span><span style="display:inline-flex;align-items:center;gap:5px"><i style="width:14px;height:2px;background:var(--ok)"></i>7-day avg</span></div>':'';
    return '<div style="overflow-x:auto;border:1px solid var(--line2);border-radius:10px;padding:8px;background:var(--panel2)">'+s+'</div>'+leg;
  }
  function tenHeat(byT, startDay, today){
    var sd=new Date(startDay*DAY); var dow=sd.getUTCDay(); var gridStart=startDay-dow;
    var weeks=Math.ceil((today-gridStart+1)/7); if(weeks<1)weeks=1; if(weeks>64)weeks=64;
    var max=1; for(var k in byT){ if(byT[k]>max)max=byT[k]; }
    var cell=12,gap=3,padL=26,padT=16,W=padL+weeks*(cell+gap)+6,H=padT+7*(cell+gap)+18;
    var col=function(c){ if(!c)return 'var(--panel2)'; var a=22+Math.round(73*(c/max)); return 'color-mix(in srgb, var(--gold) '+a+'%, var(--panel2))'; };
    var s='<svg width="'+W+'" height="'+H+'" style="max-width:none">';
    [[1,'Mon'],[3,'Wed'],[5,'Fri']].forEach(function(p){ s+='<text x="0" y="'+(padT+p[0]*(cell+gap)+cell-2)+'" style="font-family:var(--mono);font-size:8.5px;fill:var(--ink3)">'+p[1]+'</text>'; });
    var lastMonth=-1;
    for(var wm=0;wm<weeks;wm++){ var dn0=gridStart+wm*7; if(dn0>today)break; var dt0=new Date(dn0*DAY); var mo=dt0.getUTCMonth(); if(mo!==lastMonth){ lastMonth=mo; s+='<text x="'+(padL+wm*(cell+gap))+'" y="'+(padT-5)+'" style="font-family:var(--mono);font-size:8.5px;fill:var(--ink3)">'+dt0.toLocaleDateString('en-US',{timeZone:'UTC',month:'short'})+'</text>'; } }
    for(var w=0;w<weeks;w++){ for(var r=0;r<7;r++){ var dn=gridStart+w*7+r; if(dn<startDay||dn>today)continue; var c=byT[dn]||0; var dt=new Date(dn*DAY); s+='<rect x="'+(padL+w*(cell+gap))+'" y="'+(padT+r*(cell+gap))+'" width="'+cell+'" height="'+cell+'" rx="2" fill="'+col(c)+'"><title>'+c+' joined · '+dt.toLocaleDateString('en-US',{timeZone:'UTC',month:'short',day:'numeric',year:'numeric'})+'</title></rect>'; } }
    var ly=padT+7*(cell+gap)+8,lx=padL;
    s+='<text x="'+lx+'" y="'+(ly+10)+'" style="font-family:var(--mono);font-size:8.5px;fill:var(--ink3)">less</text>';
    [0,0.25,0.5,0.75,1].forEach(function(f,i){ s+='<rect x="'+(lx+24+i*(cell+2))+'" y="'+ly+'" width="'+cell+'" height="'+cell+'" rx="2" fill="'+col(Math.round(f*max))+'"/>'; });
    s+='<text x="'+(lx+24+5*(cell+2)+2)+'" y="'+(ly+10)+'" style="font-family:var(--mono);font-size:8.5px;fill:var(--ink3)">more</text>';
    s+='</svg>'; return '<div style="overflow-x:auto;border:1px solid var(--line2);border-radius:10px;padding:8px;background:var(--panel2)">'+s+'</div>';
  }
  function renderTenure(host, range){
    range = range || 90;
    host.innerHTML='<div class="panel-head"><div><h2>Tenure</h2><div class="sub">Joins, calendar and cohorts.</div></div>'+tenRangeButtons(range)+'</div><div id="tenBody" style="padding:6px 2px;color:var(--ink3);font-size:13px"></div>';
    host.querySelectorAll('#tenRanges [data-trange]').forEach(function(b){ b.addEventListener('click',function(){ renderTenure(host,+b.dataset.trange); }); });
    var body=host.querySelector('#tenBody');
    function draw(d){
      var byT={}; var minT=NOW; (d.byDay||[]).forEach(function(x){ var t=Date.parse(x.date+'T00:00:00Z'); if(!isFinite(t))return; var dn=Math.floor(t/DAY); byT[dn]=(byT[dn]||0)+x.count; if(t<minT)minT=t; });
      var today=Math.floor(NOW/DAY);
      var startDay = range>=9999 ? Math.floor(minT/DAY) : today-range;
      var totalWin=0; for(var dn=startDay; dn<=today; dn++){ totalWin+=byT[dn]||0; }
      // Median tenure across all dated members (weighted by join-day counts).
      var ent=Object.keys(byT).map(function(k){return [+k,byT[k]];}).sort(function(a,b){return a[0]-b[0];});
      var totalC=0; ent.forEach(function(e){ totalC+=e[1]; });
      var total=d.total||totalC, half=totalC/2, acc=0, medDay=today;
      for(var i=0;i<ent.length;i++){ acc+=ent[i][1]; if(acc>=half){ medDay=ent[i][0]; break; } }
      var medTen=Math.max(0,today-medDay);
      var winDays=Math.max(1,today-startDay+1), perWeek=totalWin/(winDays/7);
      var stat=function(n,l){ return '<div><div style="font-size:19px;font-weight:800;color:var(--ink);font-family:var(--mono)">'+n+'</div><div style="font-size:9.5px;color:var(--ink3);font-family:var(--mono);letter-spacing:.06em;text-transform:uppercase">'+l+'</div></div>'; };
      body.innerHTML=
        '<div style="display:flex;gap:26px;flex-wrap:wrap;margin:6px 0 2px">'+
          stat(total.toLocaleString(),'members w/ join date')+
          stat(totalWin.toLocaleString(),'joined in window')+
          stat(medTen+'d','median tenure')+
          stat(perWeek.toFixed(perWeek<10?1:0),'avg joins/week')+
        '</div>'+
        tenLabel('Cohort distribution')+tenDistBar(d.buckets||[],total)+
        '<div style="display:flex;gap:10px;flex-wrap:wrap;margin:14px 0 0">'+tenCards(d.buckets||[],total)+'</div>'+
        tenLabel('Daily joins')+tenBars(byT,startDay,today)+
        tenLabel('Calendar')+tenHeat(byT,startDay,today);
    }
    if(!TENURE_CACHE) TENURE_CACHE=tenDemo();
    draw(TENURE_CACHE);
  }
  function tenDemo(){ var arr=[],tot=0,b=[0,0,0,0,0],today=Math.floor(NOW/DAY); for(var i=200;i>=0;i--){ var c=Math.max(0,Math.round(2+2.4*Math.sin(i*0.17)+(i%9===0?4:0)+((i*7%11)/10-0.4))); if(c>0){ var dt=new Date((today-i)*DAY); arr.push({date:dt.toISOString().slice(0,10),count:c}); tot+=c; if(i<=30)b[0]+=c; else if(i<=60)b[1]+=c; else if(i<=90)b[2]+=c; else if(i<=180)b[3]+=c; else b[4]+=c; } } return {total:tot,datedLeads:tot,buckets:[{key:'0-30',label:'0–30 days',count:b[0]},{key:'31-60',label:'31–60 days',count:b[1]},{key:'61-90',label:'61–90 days',count:b[2]},{key:'91-180',label:'91–180 days',count:b[3]},{key:'180+',label:'180+ days',count:b[4]}],byDay:arr}; }

  var VIEWS = {
    timeline: { host:null, render:function(h){ renderTimeline(h,21); }, done:false },
    stages:   { host:null, render:renderStages, done:false },
    map:      { host:null, render:renderMap, done:false },
    stream:   { host:null, render:function(h){ renderStream(h,21); }, done:false },
    tenure:   { host:null, render:function(h){ renderTenure(h,90); }, done:false }
  };
  function showView(name){
    Object.keys(VIEWS).forEach(function(k){ VIEWS[k].host.classList.toggle('active', k===name); VIEWS[k].host.hidden=k!==name; });
    document.querySelectorAll('.tab[data-view]').forEach(function(t){ var selected=t.dataset.view===name; t.classList.toggle('active',selected); t.setAttribute('aria-selected',String(selected)); t.tabIndex=selected?0:-1; });
    var v=VIEWS[name]; if(v && !v.done){ try{ v.render(v.host); v.done=true; }catch(e){ v.host.innerHTML='<div style="padding:40px;color:var(--ink3)">View error: '+esc(e.message)+'</div>'; console.error(e); } }
    // View state is in-memory only and resets on reload.
    hideCard(true);
    v.host.querySelectorAll('.stream-canvas,.scroll,[style*="overflow-x:auto"]').forEach(function(el){el.tabIndex=0;el.setAttribute('role','region');el.setAttribute('aria-label',name+' chart, scroll horizontally for full detail');});
  }
  function initTheme(){
    function apply(){ document.getElementById('app').setAttribute('data-theme','light'); }
    apply();
    document.getElementById('resetPulse').addEventListener('click',function(){
      CUSTOM={t0:null,t1:null,active:false}; TENURE_CACHE=null;
      Object.keys(VIEWS).forEach(function(k){ var v=VIEWS[k]; v.done=false; v.host.innerHTML=''; delete v.host.dataset.built; });
      apply(); showView('stream'); document.querySelector('[data-view="stream"]').focus();
    });
  }
  function init(){
    card=document.getElementById('dcard');
    VIEWS.timeline.host=document.getElementById('view-timeline');
    VIEWS.stages.host=document.getElementById('view-stages');
    VIEWS.map.host=document.getElementById('view-map');
    VIEWS.stream.host=document.getElementById('view-stream');
    VIEWS.tenure.host=document.getElementById('view-tenure');
    // Member chip.
    var _mc; if((_mc=document.getElementById('mcName')))_mc.textContent=(PERSONA.name||'Member');
    if((_mc=document.getElementById('mcInit')))_mc.textContent=(PERSONA.initials||(PERSONA.name||'?').slice(0,2).toUpperCase());
    if((_mc=document.getElementById('mcTier')))_mc.textContent=PERSONA.tier;
    try{ if(PERSONA.name) document.title='Member Pulse · '+PERSONA.name; }catch(e){}
    document.querySelectorAll('.tab[data-view]').forEach(function(t){ t.addEventListener('click',function(e){ e.preventDefault(); showView(t.dataset.view); }); });
    document.querySelector('.tabs').addEventListener('keydown',function(e){
      var target=e.target.closest('[data-view]'); if(!target)return;
      var keys=['ArrowLeft','ArrowRight','Home','End']; if(keys.indexOf(e.key)<0)return;
      var list=Array.from(this.querySelectorAll('[data-view]')), i=list.indexOf(target);
      i=e.key==='Home'?0:e.key==='End'?list.length-1:(i+(e.key==='ArrowRight'?1:-1)+list.length)%list.length;
      e.preventDefault(); showView(list[i].dataset.view); list[i].focus();
    });
    initTheme();
    if(card && !card._w){ card._w=1; card.addEventListener('mouseenter',function(){card.classList.add('on');}); card.addEventListener('mouseleave',function(){if(!pinned)card.classList.remove('on');});
      document.addEventListener('click',function(){pinned=null;card.classList.remove('on');}); document.addEventListener('keydown',function(e){if(e.key==='Escape'){pinned=null;card.classList.remove('on');}}); }
    var start='stream';
    if(!VIEWS[start]) start='stream';
    showView(start);
    var rt; window.addEventListener('resize',function(){ clearTimeout(rt); rt=setTimeout(function(){ ['timeline','stream'].forEach(function(k){ if(VIEWS[k].done && VIEWS[k].host.classList.contains('active')){ VIEWS[k].render(VIEWS[k].host); } }); },180); });
    window.__pulse={ SCORES:SCORES, events:EVENTS.length };
  }
  // V10 colour pass: the embed's strict CSP (style-src 'self') ignores style="" attributes written into markup,
  // which left source dots, lanes and score colours ink/blank. Re-apply those declarations through CSSOM (CSP-safe).
  function __cssom(root){ if(!root||root.nodeType!==1) return; var list=[].slice.call(root.querySelectorAll('[style]')); if(root.hasAttribute('style')) list.unshift(root); for(var i=0;i<list.length;i++){ var el=list[i], s=el.getAttribute('style'); if(s && el.style && el.style.length===0 && /\S/.test(s)) el.style.cssText=s; } }
  if(window.MutationObserver){ new MutationObserver(function(ms){ for(var i=0;i<ms.length;i++){ var a=ms[i].addedNodes; for(var j=0;j<a.length;j++) __cssom(a[j]); } }).observe(document.documentElement,{childList:true,subtree:true}); }
  document.addEventListener('DOMContentLoaded',function(){ __cssom(document.body); });
  function __boot(){ if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init); else init(); __cssom(document.body); }
  // No URL-driven data loading.
  __boot();
})();

