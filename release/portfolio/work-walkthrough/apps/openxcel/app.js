/* OpenXCEL Slack replica: workspace content transcribed from the OpenXCEL product film
   (R/tmp/v10-ox-frames, extracted locally from openxcel.mp4) plus the V9 onboarding-update scene. */
(function(){'use strict';
var PEOPLE={
  elena:{name:'Elena Park',img:'people/head-of-delivery.png',role:'Head of delivery'},
  aisha:{name:'Aisha Rahman',img:'people/ops-lead.png',role:'Ops lead'},
  marcus:{name:'Marcus Hale',img:'people/account-manager.png',role:'Account manager'},
  sam:{name:'Sam Ortega',img:'people/content-designer.png',role:'Content designer'},
  ox:{name:'OpenXCEL',img:'/portfolio-brand/openxcel-mark.png',app:true}
};
var CHANNELS=[
  {id:'general',topic:'Company-wide updates. Ask @OpenXCEL for anything.'},
  {id:'client-juniper',topic:'Juniper Physio · onboarding → launch. Ask @OpenXCEL for anything.'},
  {id:'client-harbor',topic:'Harbor Dental · onboarding → launch'},
  {id:'creative',topic:'Ad creative, video and landing pages',bold:true},
  {id:'dev',topic:'Northfield web + automations. Ask @OpenXCEL for anything.'},
  {id:'growth',topic:'Partners, outreach and new channels'},
  {id:'onboarding',topic:'New teammates · accounts, tasks and intros',private:true},
  {id:'reports',topic:'Client reports · drafted by OpenXCEL, approved by a human'}
];
var DMS=['marcus','aisha','sam'];

var ADS=[
  {lead:'Desk-job neck pain? Fixed at the source.',head:['STIFF NECK FROM ','DESK WORK?'],pts:['Neck pain by 3pm','Tension headaches','Shoulders up by your ears'],tone:'a'},
  {lead:'Run Denver pain-free this season.',head:['KNEE PAIN SLOWING YOUR ','RUNS?'],pts:['Pain on downhills','Stiff after long runs','Old injury flaring up'],tone:'b'},
  {lead:'Better balance starts with one visit.',head:['FEEL ','STEADY',' ON YOUR FEET AGAIN'],pts:['Balance training','Strength for daily life','Fall-prevention plan'],tone:'c'},
  {lead:'Morning back pain? Get assessed this week.',head:['LOWER BACK PAIN WHEN YOU ','WAKE UP?'],pts:['Morning stiffness','Pain bending or lifting','Sitting makes it worse'],tone:'d'}
];

/* A scene = one request in one channel. The scene list is the tour. */
var SCENES=[
  {id:'ads',label:'Create the ads',ch:'client-juniper',
    ask:{by:'aisha',time:'9:20 AM',text:'@OpenXCEL make 4 Meta ad creatives from the brief. Use their brand.'},
    msgs:[
      {by:'ox',time:'9:20 AM',text:'On it — generating the ad creative variations.'},
      {by:'ox',time:'9:23 AM',text:'Here are the 4 ad creative variations for Juniper Physio, featuring the $49 first assessment:',
        bullets:['_Ad 1 (Desk neck):_ sage header, clay pain points for remote workers.','_Ad 2 (Runner knees):_ trail-run angle for Denver runners.','_Ad 3 (Steady on your feet):_ balance and strength for 55+.','_Ad 4 (Morning back):_ stiffness on waking, hands-on assessment.'],
        note:'Generated with GPT Image 2 | Total cost: $0.54. Draft — pending Elena’s approval.',
        art:{type:'ads'},reactions:[['🔥',4],['😍',2]]}
    ],
    after:[{by:'aisha',time:'9:25 AM',text:'These look great, thank you! 🔥'}]},
  {id:'landing',label:'Build the landing page',ch:'client-juniper',
    ask:{by:'elena',time:'9:31 AM',text:'@OpenXCEL landing page for the $49 offer, mobile first please'},
    msgs:[{by:'ox',time:'9:36 AM',text:'**Landing page built** and published as a draft in HighLevel → [juniperphysio.com/first-assessment]',art:{type:'landing'},reactions:[['👏',3]]}]},
  {id:'video',label:'Make the video ad',ch:'client-juniper',
    ask:{by:'aisha',time:'9:40 AM',text:'And a 15s video ad from the same shots? 🎬'},
    msgs:[{by:'ox',time:'9:44 AM',art:{type:'video',name:'juniper-15s-v1.mp4',meta:'9:16 · 0:15'},reactions:[['🎬',2]]}]},
  {id:'launch',label:'Launch with approval',ch:'client-juniper',thread:true,
    ask:{by:'sam',time:'10:12 AM',file:{kind:'sheet',name:'denver-gyms-and-studios.csv',meta:'CSV · 148 rows'},text:'@OpenXCEL enrich these and score them for referral partnerships'},
    msgs:[
      {by:'ox',time:'10:19 AM',text:'**148 enriched · 37 scored 80+ · 3 intro emails drafted for approval**',files:[['CSV','denver-gyms-enriched.csv'],['PDF','juniper-launch-brief.pdf'],['HTML','partner-leads.html']]},
      {by:'ox',time:'10:21 AM',art:{type:'launch'},approve:{done:'✓ Approved by Elena · campaign live'},reactions:[['🎉',4],['🚀',3],['✅',1]]}
    ]},
  {id:'brief',label:'Brief me on the ads',ch:'client-juniper',day:'Thursday, October 29',topic:'Juniper Physio · live campaigns. Ask @OpenXCEL for anything.',
    ask:{by:'elena',time:'9:12 AM',text:'@OpenXCEL brief me on Juniper’s Meta account, last 7 days'},
    msgs:[
      {by:'ox',time:'9:12 AM',tools:['Meta Ads insights','via Composio']},
      {by:'ox',time:'9:13 AM',text:'**Juniper Physio · Meta Ads · last 7 days** — $1,284 spent · 92 leads · CPL $13.96 · 31 booked',art:{type:'brief'},
        bullets:['Desk neck brings 37% of leads at $12.12.','Morning back costs 42% more per lead. Test a new hook.','31 of 92 leads booked the $49 assessment (34%).'],buttons:['Open full brief','Ask a follow-up']},
      {by:'ox',time:'2:14 PM',divider:'2:14 PM',sub:'Watch · cost-per-lead spike · checks every 30 min',art:{type:'alert'}}
    ]},
  {id:'reports',label:'Give clients a live view',ch:'reports',day:'Monday, November 2',
    msgs:[
      {by:'ox',time:'9:00 AM',sub:'Cron · weekly-client-reports · Mondays 9:00',text:'**Weekly client reports are drafted.** Nothing goes out until you approve.',art:{type:'reports'},approve:{done:'✓ Approved by Elena · sent to 6 clients · 9:04 AM'},reactions:[['🎉',3],['✅',2]]},
      {by:'ox',time:'9:05 AM',text:'Juniper’s live dashboard (the link their team gets):',art:{type:'live'}}
    ],
    after:[{by:'elena',time:'9:07 AM',text:'Love this. Thank you! 🙌'}]},
  {id:'fix',label:'Ship a fix',ch:'dev',day:'Tuesday, November 3',thread:true,
    ask:{by:'sam',time:'11:02 AM',text:'@OpenXCEL the Juniper landing page form is throwing 500s since this morning'},
    msgs:[
      {by:'ox',time:'11:02 AM',tools:['Sentry errors','GitHub repo']},
      {by:'ox',time:'11:06 AM',text:'Root cause: yesterday’s form update renamed `phone` to `phone_number`, so every submit failed.',checks:['Fix is up as PR #212 · tests passing','14 failed leads recovered from the error log','Only the Juniper form was affected'],art:{type:'diff'},buttons:['Merge PR','View on GitHub'],needs:'Needs Marcus'}
    ]},
  {id:'hire',label:'Set up a new hire',ch:'onboarding',day:'Thursday, November 5',
    ask:{by:'elena',time:'4:40 PM',text:'@OpenXCEL Nadia joins as a designer on Monday. Set her up.'},
    msgs:[{by:'ox',time:'4:44 PM',text:'Nadia is set for Monday. Here’s what I did:',art:{type:'hire'},reactions:[['🎉',2]]}]},
  {id:'accounts',label:'Open ad accounts',ch:'client-harbor',day:'Friday, November 6',
    ask:{by:'marcus',time:'10:15 AM',text:'@OpenXCEL Harbor Dental signed. Set up their ad accounts.'},
    msgs:[{by:'ox',time:'10:16 AM',text:'Ready to create Harbor Dental’s ad accounts. Nothing is created until you approve.',art:{type:'accounts'},approve:{done:'✓ Approved by Elena · billing invite sent to Harbor Dental · logged to audit trail'},reactions:[['✅',1]]}]},
  {id:'update',label:'Draft the client update',ch:'general',
    ask:{by:'aisha',time:'8:52 AM',text:'@OpenXCEL can you draft this week’s onboarding update for the client? Use what we saved from last week’s call.'},
    msgs:[
      {by:'ox',time:'8:52 AM',tools:['Company memory','Skill · Weekly client update']},
      {by:'ox',time:'8:53 AM',text:'Sure. I’ll draft it from the saved notes and hold it for your review before anything goes out.',art:{type:'draft'},reactions:[['👀',1]]}
    ]}
];
var TIMING={typeChar:24,typeMin:900,typeMax:1800,send:220,typingMin:900,typingMax:1300,word:38,enter:420,pill:240,react:160,hold:3500,between:350,approve:900};
window.OX_DATA={PEOPLE:PEOPLE,CHANNELS:CHANNELS,DMS:DMS,ADS:ADS,SCENES:SCENES,TIMING:TIMING};
})();

/* OpenXCEL in Slack: a working Slack-desktop replica with a scene engine wired to WorkEmbed.bridge. No network, no storage. */
(function(){'use strict';
var D=window.OX_DATA;if(!D)return;
var P=D.PEOPLE,T=D.TIMING,SC=D.SCENES,N=SC.length;
var esc=function(v){return String(v==null?'':v).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')};
var $=function(s,r){return (r||document).querySelector(s)};
var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var reduced=function(){return !!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)};

/* ---------- icons (inline SVG, no style attributes) ---------- */
var I={
  home:'<path d="M4 11.5 12 5l8 6.5V19a1 1 0 0 1-1 1h-4.5v-5h-5v5H5a1 1 0 0 1-1-1z"/>',
  dms:'<path d="M5 5h11a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H10l-4 3v-3H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"/><path d="M20 9h1v8h-1v3l-3-3h-5"/>',
  bell:'<path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>',
  files:'<path d="M8 4h7l4 4v11a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"/><path d="M5 7v13a1 1 0 0 0 1 1h9"/>',
  agent:'<rect x="5" y="8" width="14" height="10" rx="3"/><path d="M12 4v4M9 13h.01M15 13h.01"/>',
  thread:'<path d="M5 5h14v10H9l-4 4z"/><path d="M9 9h6M9 12h4"/>',
  huddle:'<path d="M5 14v-2a7 7 0 0 1 14 0v2"/><rect x="4" y="13" width="4" height="6" rx="1.5"/><rect x="16" y="13" width="4" height="6" rx="1.5"/>',
  send:'<path d="M4 12 20 4l-5 16-3-7z"/>',
  draft:'<path d="M5 19 19 5M5 19l1-4 10-10 3 3-10 10z"/>',
  dir:'<path d="M6 4h10l2 2v14l-7-4-7 4V6z"/>',
  hash:'<path d="M9 4 7 20M17 4l-2 16M4 9h16M3 15h16"/>',
  lock:'<rect x="6" y="11" width="12" height="9" rx="2"/><path d="M8.5 11V8a3.5 3.5 0 0 1 7 0v3"/>',
  chev:'<path d="m7 10 5 5 5-5"/>',
  gear:'<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/>',
  compose:'<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13 7l4 4"/>',
  search:'<circle cx="11" cy="11" r="6"/><path d="m20 20-4.5-4.5"/>',
  star:'<path d="m12 4 2.4 5 5.4.6-4 3.7 1.1 5.4L12 16l-4.9 2.7 1.1-5.4-4-3.7 5.4-.6z"/>',
  msg:'<path d="M5 5h14v10H9l-4 4z"/>',
  canvas:'<path d="M5 19 19 5M5 19l1-4 10-10 3 3-10 10z"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  bold:'<path d="M7 5h6a3.5 3.5 0 0 1 0 7H7zM7 12h7a3.5 3.5 0 0 1 0 7H7z"/>',
  smile:'<circle cx="12" cy="12" r="8"/><path d="M8.5 14a4.5 4.5 0 0 0 7 0M9.5 10h.01M14.5 10h.01"/>',
  at:'<circle cx="12" cy="12" r="3.5"/><path d="M15.5 12v1.5a2.5 2.5 0 0 0 5 0V12a8.5 8.5 0 1 0-3.4 6.8"/>',
  video:'<rect x="4" y="7" width="11" height="10" rx="2"/><path d="m15 11 5-3v8l-5-3"/>',
  mic:'<rect x="9" y="4" width="6" height="10" rx="3"/><path d="M6 11a6 6 0 0 0 12 0M12 17v3"/>',
  slash:'<rect x="4" y="4" width="16" height="16" rx="3"/><path d="m14 8-4 8"/>',
  close:'<path d="M6 6l12 12M18 6 6 18"/>',
  more:'<circle cx="12" cy="6" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="12" cy="18" r="1.2"/>',
  check:'<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  warn:'<path d="M12 4 21 19H3z"/><path d="M12 10v4M12 16.5v.5"/>',
  clock:'<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>',
  play:'<path d="M9 7v10l8-5z"/>',
  sheet:'<rect x="5" y="4" width="14" height="16" rx="2"/><path d="M5 9h14M5 14h14M10 4v16"/>',
  pr:'<circle cx="7" cy="6" r="2"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/><path d="M7 8v8M17 16V9a3 3 0 0 0-3-3h-3"/>',
  doc:'<path d="M7 4h7l4 4v12H7z"/><path d="M14 4v4h4M9.5 13h5M9.5 16h5"/>',
  mail:'<rect x="4" y="6" width="16" height="12" rx="2"/><path d="m4.5 7 7.5 6 7.5-6"/>',
  cal:'<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/>',
  tasks:'<path d="M9 7h11M9 12h11M9 17h11M4 7l1 1 2-2M4 12l1 1 2-2M4 17l1 1 2-2"/>',
  pen:'<path d="M12 20c4-1 6-4 6-8l-6-8-6 8c0 4 2 7 6 8z"/><circle cx="12" cy="12" r="1.5"/>'
};
function ic(name,cls){return '<svg class="sk-i'+(cls?' '+cls:'')+'" viewBox="0 0 24 24" aria-hidden="true" focusable="false">'+(I[name]||'')+'</svg>'}

/* ---------- inline markup: **bold** _italic_ `code` [link] @OpenXCEL ---------- */
function parse(text){
  var out=[],re=/(\*\*[^*]+\*\*|_[^_]+_|`[^`]+`|\[[^\]]+\]|@OpenXCEL)/g,last=0,m;
  text=String(text||'');
  while((m=re.exec(text))){
    if(m.index>last)out.push({c:'',s:text.slice(last,m.index)});
    var t=m[0];
    if(t.indexOf('**')===0)out.push({c:'sk-b',s:t.slice(2,-2)});
    else if(t[0]==='_')out.push({c:'sk-it',s:t.slice(1,-1)});
    else if(t[0]==='`')out.push({c:'sk-code',s:t.slice(1,-1)});
    else if(t[0]==='[')out.push({c:'sk-link',s:t.slice(1,-1)});
    else out.push({c:'sk-mention',s:t});
    last=m.index+t.length;
  }
  if(last<text.length)out.push({c:'',s:text.slice(last)});
  return out;
}
function rich(text){return parse(text).map(function(p){return p.c?'<span class="'+p.c+'">'+esc(p.s)+'</span>':esc(p.s)}).join('')}

/* ---------- artifacts ---------- */
var OX_MARK='/portfolio-brand/openxcel-mark.png';
var ART={
  ads:function(){
    return '<div class="sk-attach-meta">4 attachments <span aria-hidden="true">⌄</span> · '+ic('files')+' Download all</div><div class="sk-ads">'+D.ADS.map(function(a,i){
      var head=a.head.map(function(h,j){return (a.head.length===2?j===1:j===1)?'<span class="sk-ad-hl">'+esc(h)+'</span>':esc(h)}).join('');
      return '<figure class="sk-ad sk-ad-'+a.tone+' sk-art-item" data-i="'+i+'"><div class="sk-ad-top"><span class="sk-ad-logo" aria-hidden="true">J</span><span><b>Juniper Physio</b><small>Sponsored</small></span></div><p class="sk-ad-lead">'+esc(a.lead)+'</p><div class="sk-ad-head">'+head+'</div><div class="sk-ad-mid"><div class="sk-ad-photo" aria-hidden="true"><span class="sk-ad-sun"></span><span class="sk-ad-fig"></span><span class="sk-ad-price"><b>$49</b>FIRST ASSESSMENT</span></div><ul>'+a.pts.map(function(p){return '<li>'+ic('check')+esc(p)+'</li>'}).join('')+'</ul></div><div class="sk-ad-foot">Juniper Physio · Denver, CO · Book online</div><div class="sk-ad-cta"><span>juniperphysio.com</span><span class="sk-ad-btn">Book now</span></div></figure>';
    }).join('')+'</div>';
  },
  landing:function(){
    return '<div class="sk-unfurl sk-landing"><div class="sk-unfurl-copy"><small>juniperphysio.com/first-assessment</small><b>Move without pain. Start this week.</b><span>Same-week appointments · Book your $49 assessment</span><span class="sk-muted">★ 4.9 · 380 reviews</span></div><div class="sk-phone" aria-hidden="true"><span class="sk-phone-brand">Juniper Physio</span><span class="sk-phone-photo"></span><span class="sk-phone-h">Move without pain.</span><span class="sk-phone-btn">Book your $49 assessment</span></div></div>';
  },
  video:function(a){
    return '<div class="sk-file sk-file-video"><span class="sk-thumb" aria-hidden="true"><span class="sk-thumb-text">Stiff neck again?</span><span class="sk-play">'+ic('play')+'</span></span><span class="sk-file-copy"><b>'+esc(a.name)+'</b><small>'+esc(a.meta)+'</small></span></div>';
  },
  launch:function(){
    return '<div class="sk-card sk-launch"><b>Ready to launch · Juniper Physio</b><span>4 ads · $60/day on Meta · landing page · 15 s video · 3 partner intros</span>'+actions()+'</div>';
  },
  brief:function(){
    var rows=[['Desk neck · 1:1','$412','34','$12.12'],['Runner knees · 4:5','$338','27','$12.52'],['Steady feet · 1:1','$296','19','$15.58'],['Morning back · 4:5','$238','12','$19.83',1]];
    return '<div class="sk-table-wrap"><table class="sk-table"><thead><tr><th scope="col">Ad set</th><th scope="col">Spend</th><th scope="col">Leads</th><th scope="col">CPL</th></tr></thead><tbody>'+rows.map(function(r,i){return '<tr class="sk-art-item" data-i="'+i+'"><td>'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td><td'+(r[4]?' class="sk-hot"':'')+'>'+r[3]+'</td></tr>'}).join('')+'</tbody></table></div>';
  },
  alert:function(){
    return '<div class="sk-card sk-alert"><b>'+ic('warn','sk-warn')+'Cost per lead spike · Morning back · 4:5</b><p><b>$38.20</b> per lead in the last 6 hours (7-day average $13.96). Frequency 4.1, CTR down to 0.9%.</p><p class="sk-muted">Suggested: pause this ad set and move its $34/day to Desk neck.</p><div class="sk-btnrow"><span class="sk-btn sk-btn-go">Approve pause</span><span class="sk-btn sk-btn-deny">Deny</span><span class="sk-muted">Needs Marcus or Elena</span></div></div>';
  },
  reports:function(){
    var rows=[['Juniper Physio','92 leads · CPL $13.96','+18%'],['Harbor Dental','41 booked cleanings','+6%'],['Lumen Realty','28 seller leads','−4%'],['Cedar & Co.','12 sales calls booked','+9%'],['Oak & Ivy','8.4k organic visits','+11%'],['Brightwell Clinics','57 leads · CPL $18.20','+3%']];
    return '<div class="sk-card sk-reports"><ul>'+rows.map(function(r,i){return '<li class="sk-art-item" data-i="'+i+'">'+ic('doc','sk-pdf')+'<b>'+esc(r[0])+'</b><span>'+esc(r[1])+'</span><span class="'+(r[2][0]==='+'?'sk-up':'sk-down')+'">'+esc(r[2])+'</span><span class="sk-state"><i class="sk-state-draft">DRAFT</i><i class="sk-state-sent">SENT</i></span></li>'}).join('')+'</ul>'+actions()+'</div>';
  },
  live:function(){
    return '<div class="sk-unfurl sk-live"><div class="sk-unfurl-copy"><small>Northfield Studio</small><span class="sk-link sk-link-b">Juniper Physio · Growth dashboard</span><span>Leads, bookings and cost per booking, updated live.</span></div><div class="sk-minibars" aria-hidden="true"><i class="b1"></i><i class="b2"></i><i class="b3"></i><i class="b4"></i><i class="b5"></i></div></div>';
  },
  diff:function(){
    var l=[['del','1','-','const phone = lead.phone;'],['add','2','+','const phone = lead.phone_number ?? lead.phone;'],['add','3','+',"if (!phone) return res.status(422).json({ error: 'phone required' });"]];
    return '<div class="sk-diff"><div class="sk-diff-head"><span>'+ic('pr')+'api/forms/lead.ts</span><span>PR #212</span></div>'+l.map(function(x,i){return '<div class="sk-diff-line sk-'+x[0]+' sk-art-item" data-i="'+i+'"><span class="sk-ln">'+x[1]+'</span><span class="sk-sign">'+x[2]+'</span><code>'+esc(x[3])+'</code></div>'}).join('')+'</div>';
  },
  hire:function(){
    var rows=[['slack','Accounts created','nadia@northfieldstudio.com · #creative · design repo (read)','ok'],['tasks','9 onboarding tasks in Asana','Brand kits, client list, tool access, first-week goals','ok'],['cal','3 intro calls booked','Elena, Aisha and Sam · Monday and Tuesday','ok'],['mail','Welcome email scheduled','Monday 9:00 AM','ok'],['pen','Figma seat requested','Waiting for an admin to approve the seat','wait']];
    return '<div class="sk-card sk-checklist"><div class="sk-card-title">New hire · Nadia Farouk · Designer</div><ul>'+rows.map(function(r,i){
      var lead=r[0]==='slack'?'<img class="sk-row-logo" src="/platform-logos/slack-mark.svg" alt="Slack" width="18" height="18">':'<span class="sk-row-glyph">'+ic(r[0])+'</span>';
      return '<li class="sk-art-item" data-i="'+i+'">'+lead+'<span class="sk-row-copy"><b>'+esc(r[1])+'</b><small>'+esc(r[2])+'</small></span><span class="sk-status sk-status-'+r[3]+'" aria-label="'+(r[3]==='ok'?'Done':'Waiting')+'">'+ic(r[3]==='ok'?'check':'clock')+'</span></li>'}).join('')+'</ul></div>';
  },
  accounts:function(){
    var rows=[['<img class="sk-row-logo" src="/platform-logos/google-ads.svg" alt="Google Ads" width="18" height="18">','Google Ads account <b>482-617-3309</b> created','USD · America/Chicago · conversion: booked cleaning'],['<span class="sk-pill">Meta</span>','Meta ad account <b>Harbor Dental · Ads</b> created','Pixel + booking-form event attached'],['<img class="sk-row-logo" src="/platform-logos/google-analytics.svg" alt="Google Analytics" width="18" height="18">','GA4 property created, tags drafted','Tags go live after the client approves the site change']];
    return '<div class="sk-card sk-checklist sk-accounts"><ul>'+rows.map(function(r,i){return '<li class="sk-art-item" data-i="'+i+'"><span class="sk-row-lead">'+r[0]+'</span><span class="sk-row-copy"><span>'+r[1]+'</span><small>'+esc(r[2])+'</small></span><span class="sk-status sk-status-gate"><i class="sk-gate-wait">'+ic('clock')+'</i><i class="sk-gate-ok">'+ic('check')+'</i></span></li>'}).join('')+'</ul>'+actions()+'</div>';
  },
  draft:function(){
    var secs=['Completed this week','What we need from you','Plan for next week'];
    return '<div class="sk-card sk-draft"><div class="sk-draft-head"><span>'+ic('doc')+'<b>Draft · Weekly onboarding update</b></span><span class="sk-pill sk-pill-hold">Held for review</span></div><ol>'+secs.map(function(s,i){return '<li class="sk-art-item" data-i="'+i+'">'+esc(s)+'</li>'}).join('')+'</ol><div class="sk-btnrow"><span class="sk-btn sk-btn-go">Approve</span><span class="sk-btn">Request changes</span></div><p class="sk-muted sk-lock">'+ic('lock')+'Nothing is sent until a person approves.</p></div>';
  }
};
function actions(){return '<div class="sk-btnrow sk-approve-actions"><span class="sk-btn sk-btn-go" data-approve>Approve</span><span class="sk-btn">Request changes</span></div>'}

/* ---------- message markup ---------- */
function avatar(p){return p.app?'<span class="sk-av sk-av-app"><img src="'+OX_MARK+'" alt="" width="36" height="36"></span>':'<img class="sk-av" src="'+esc(p.img)+'" alt="" width="36" height="36">'}
function msgHTML(m,opt){
  opt=opt||{};var p=P[m.by]||P.ox,live=!!opt.live;
  var h='<div class="sk-msg'+(live?' sk-enter is-live is-building':'')+'" data-by="'+esc(m.by)+'">'+avatar(p)+'<div class="sk-body"><div class="sk-meta"><span class="sk-name">'+esc(p.name)+'</span>'+(p.app?'<span class="sk-app">APP</span>':'')+'<span class="sk-time">'+esc(m.time)+'</span></div>';
  if(m.sub)h+='<div class="sk-sub">'+ic('clock')+esc(m.sub)+'</div>';
  if(m.file)h+='<div class="sk-file sk-x"><span class="sk-fico">'+ic('sheet')+'</span><span class="sk-file-copy"><b>'+esc(m.file.name)+'</b><small>'+esc(m.file.meta)+'</small></span></div>';
  if(m.text)h+='<div class="sk-text">'+(live?'':rich(m.text))+'</div>';
  if(m.tools)h+='<div class="sk-tools sk-x">'+m.tools.map(function(t){return '<span class="sk-tool">'+esc(t)+'<i class="sk-tool-st">'+(live?'<span class="sk-spin"></span>':ic('check'))+'</i></span>'}).join('')+'</div>';
  if(m.bullets&&m.art&&m.art.type==='ads')h+='<ul class="sk-bullets sk-x">'+m.bullets.map(function(b){return '<li>'+rich(b)+'</li>'}).join('')+'</ul>';
  if(m.note)h+='<p class="sk-note sk-x">'+esc(m.note)+'</p>';
  if(m.checks)h+='<ul class="sk-checks sk-x">'+m.checks.map(function(c){return '<li>'+ic('check')+esc(c)+'</li>'}).join('')+'</ul>';
  if(m.art)h+='<div class="sk-art sk-art-'+m.art.type+'">'+ART[m.art.type](m.art)+'</div>';
  if(m.bullets&&!(m.art&&m.art.type==='ads'))h+='<ul class="sk-bullets sk-x">'+m.bullets.map(function(b){return '<li>'+rich(b)+'</li>'}).join('')+'</ul>';
  if(m.files)h+='<div class="sk-fchips sk-x">'+m.files.map(function(f){return '<span class="sk-fchip"><span class="sk-ftype sk-ftype-'+f[0].toLowerCase()+'">'+esc(f[0])+'</span>'+esc(f[1])+'</span>'}).join('')+'</div>';
  if(m.buttons)h+='<div class="sk-btnrow sk-x">'+m.buttons.map(function(b,i){return '<span class="sk-btn'+(i===0?' sk-btn-go':'')+'">'+esc(b)+'</span>'}).join('')+(m.needs?'<span class="sk-muted">'+esc(m.needs)+'</span>':'')+'</div>';
  if(m.approve)h+='<p class="sk-approved">'+esc(m.approve.done)+'</p>';
  if(m.reactions)h+='<div class="sk-reacts">'+m.reactions.map(function(r,i){return '<span class="sk-react'+(i===m.reactions.length-1&&r[0]==='✅'?' is-mine':'')+'"><span class="sk-emoji">'+r[0]+'</span>'+r[1]+'</span>'}).join('')+'<span class="sk-react sk-react-add" aria-hidden="true">'+ic('smile')+'</span></div>';
  h+='</div></div>';return h;
}
function dividerHTML(t,live){return '<div class="sk-day'+(live?' sk-enter':'')+'"><span>'+esc(t)+'</span></div>'}
function repliesHTML(s){return '<button type="button" class="sk-replies" data-thread="'+esc(s.id)+'"><span class="sk-replies-av"><img src="'+OX_MARK+'" alt="" width="20" height="20"></span><b>'+s.msgs.length+' replies</b><span class="sk-muted">Last reply today</span></button>'}

/* static render of a finished scene into the main channel */
function sceneStatic(s){
  var h='';if(s.day)h+=dividerHTML(s.day);
  if(s.ask){h+=msgHTML(s.ask);if(s.thread)h=h.replace(/<\/div><\/div>$/,repliesHTML(s)+'</div></div>');}
  if(!s.thread)s.msgs.forEach(function(m){if(m.divider)h+=dividerHTML(m.divider);h+=msgHTML(m)});
  (s.after||[]).forEach(function(m){h+=msgHTML(m)});
  return h;
}

/* ---------- shell ---------- */
function shell(){
  var ch=D.CHANNELS.map(function(c){return '<li><button type="button" class="sk-ch'+(c.bold?' is-unread':'')+'" data-ch="'+c.id+'" aria-label="'+(c.private?'Private channel ':'Channel ')+c.id+'">'+ic(c.private?'lock':'hash','sk-ch-i')+'<span>'+c.id+'</span></button></li>'}).join('');
  var dm=D.DMS.map(function(k){var p=P[k];return '<li><button type="button" class="sk-ch sk-dm" data-dm="'+k+'"><span class="sk-dm-av"><img src="'+p.img+'" alt="" width="20" height="20"><i class="sk-presence"></i></span><span>'+esc(p.name)+'</span></button></li>'}).join('');
  var strip=D.CHANNELS.map(function(c){return '<button type="button" class="sk-strip-ch" data-ch="'+c.id+'">'+(c.private?ic('lock','sk-ch-i'):'#')+c.id+'</button>'}).join('');
  return '<div class="sk" id="sk">'+
  '<nav class="sk-rail" aria-label="Workspace"><button type="button" class="sk-ws" data-switcher aria-label="Northfield Studio workspace">NS</button>'+
   [['home','Home',1],['dms','DMs'],['bell','Activity'],['files','Files'],['agent','Agents']].map(function(r){return '<span class="sk-rail-item'+(r[2]?' is-on':'')+'"><span class="sk-rail-btn">'+ic(r[0])+(r[0]==='dms'||r[0]==='bell'?'<i class="sk-dot"></i>':'')+'</span><small>'+r[1]+'</small></span>'}).join('')+
   '<span class="sk-rail-fill"></span><span class="sk-rail-add">'+ic('plus')+'</span><span class="sk-me"><img src="'+P.elena.img+'" alt="Elena Park" width="36" height="36"><i class="sk-presence"></i></span></nav>'+
  '<aside class="sk-side" aria-label="Northfield Studio"><div class="sk-side-head"><button type="button" class="sk-ws-name" data-switcher aria-haspopup="menu" aria-expanded="false">Northfield Studio'+ic('chev')+'</button><span class="sk-side-icons">'+ic('gear')+ic('compose')+'</span>'+
   '<div class="sk-switcher" role="menu" hidden><p class="sk-switcher-label">Workspaces</p><span role="menuitem" class="sk-switcher-item is-on"><span class="sk-ws sk-ws-sm">NS</span>Northfield Studio'+ic('check')+'</span><span role="menuitem" class="sk-switcher-item">'+ic('plus')+'Add a workspace</span></div></div>'+
   '<div class="sk-find">'+ic('search')+'Find a conversation…</div>'+
   '<ul class="sk-nav"><li>'+ic('thread')+'Threads</li><li>'+ic('huddle')+'Huddles</li><li>'+ic('send')+'Drafts &amp; sent</li><li>'+ic('dir')+'Directories</li></ul>'+
   '<div class="sk-sec">'+ic('chev')+'Channels</div><ul class="sk-list sk-chlist"><li class="sk-active-pill" aria-hidden="true"></li>'+ch+'</ul>'+
   '<div class="sk-sec">'+ic('chev')+'Direct messages</div><ul class="sk-list">'+dm+'</ul>'+
   '<div class="sk-sec">'+ic('chev')+'Apps</div><ul class="sk-list"><li><button type="button" class="sk-ch sk-dm" data-dm="ox"><span class="sk-dm-av sk-dm-app"><img src="'+OX_MARK+'" alt="" width="20" height="20"></span><span>OpenXCEL</span></button></li></ul></aside>'+
  '<section class="sk-main" aria-label="Conversation"><header class="sk-head"><div class="sk-head-l">'+ic('star','sk-star')+'<h1 class="sk-title"><span class="sk-title-i"></span><span class="sk-title-t"></span></h1><p class="sk-topic"></p></div><div class="sk-head-r"><span class="sk-faces">'+['elena','marcus','aisha','sam'].map(function(k){return '<img src="'+P[k].img+'" alt="" width="22" height="22">'}).join('')+'</span><span class="sk-count">5</span>'+ic('huddle')+ic('bell')+ic('search')+ic('more')+'</div></header>'+
   '<nav class="sk-strip" aria-label="Channels">'+strip+'</nav>'+
   '<div class="sk-tabs" role="tablist" aria-label="Channel views"><span class="sk-tab is-on" role="tab" aria-selected="true">'+ic('msg')+'Messages</span><span class="sk-tab" role="tab" aria-selected="false">'+ic('files')+'Files &amp; links</span><span class="sk-tab sk-tab-x" role="tab" aria-selected="false">'+ic('canvas')+'Canvas</span><span class="sk-tab sk-tab-x">'+ic('plus')+'</span></div>'+
   '<div class="sk-scroll" tabindex="0" role="log" aria-label="Messages" aria-live="off"><div class="sk-stream"></div></div>'+
   '<div class="sk-composer"><div class="sk-input" role="textbox" aria-readonly="true" aria-label="Message"><span class="sk-ph"></span><span class="sk-typed"></span><span class="sk-caret" aria-hidden="true"></span></div><div class="sk-comp-tools"><span class="sk-comp-plus">'+ic('plus')+'</span>'+ic('bold')+ic('smile')+ic('at')+ic('video')+ic('mic')+ic('slash')+'<span class="sk-send" aria-hidden="true">'+ic('send')+'</span></div></div>'+
   '<p class="sk-typing" aria-live="polite"></p></section>'+
  '<aside class="sk-thread" aria-label="Thread" hidden><header class="sk-thread-head"><div><b>Thread</b><span class="sk-thread-ch"></span></div><button type="button" class="sk-thread-close" aria-label="Close thread">'+ic('close')+'</button></header><div class="sk-thread-scroll" tabindex="0"><div class="sk-thread-stream"></div></div><p class="sk-typing sk-thread-typing" aria-live="polite"></p><div class="sk-composer sk-thread-composer"><div class="sk-input" role="textbox" aria-readonly="true" aria-label="Reply"><span class="sk-ph">Reply…</span></div></div></aside>'+
  '</div>';
}

/* ---------- engine state ---------- */
var gen=0,cur=0,dirty=false,firstPlay=true,playing=false,currentCh=null,threadOpen=null;
var el={};
function sleep(ms,g){return new Promise(function(r){setTimeout(function(){r(g===gen)},Math.max(0,ms|0))})}
function rnd(a,b){return a+Math.round(Math.random()*(b-a))}
function chan(id){for(var i=0;i<D.CHANNELS.length;i++)if(D.CHANNELS[i].id===id)return D.CHANNELS[i];return D.CHANNELS[0]}
function toBottom(sc){if(sc)sc.scrollTop=sc.scrollHeight}

function movePill(animate){
  var btn=$('.sk-chlist .sk-ch.is-active'),pill=el.pill;if(!pill)return;
  if(!btn){pill.classList.remove('is-on');return}
  pill.classList.toggle('is-still',!animate);
  pill.style.transform='translateY('+btn.parentNode.offsetTop+'px)';
  pill.style.height=btn.offsetHeight+'px';
  pill.classList.add('is-on');
}
function setChannel(id,animate,dm){
  $$('.sk-ch,.sk-strip-ch').forEach(function(b){var on=dm?b.getAttribute('data-dm')===dm:b.getAttribute('data-ch')===id;b.classList.toggle('is-active',on);if(on){b.setAttribute('aria-current','true');b.classList.remove('is-unread')}else b.removeAttribute('aria-current')});
  movePill(animate);
  var strip=$('.sk-strip-ch.is-active');if(strip&&strip.scrollIntoView){try{el.strip.scrollLeft=strip.offsetLeft-12}catch(_){}}
  if(dm){var p=P[dm];el.titleI.innerHTML='';el.titleT.textContent=p.name;el.topic.textContent=p.app?'OpenXCEL · an AI teammate in your Slack':(p.role||'');el.ph.textContent='Message '+p.name;el.input.setAttribute('aria-label','Message '+p.name);currentCh='dm:'+dm;return}
  var c=chan(id);el.titleI.innerHTML=ic(c.private?'lock':'hash');el.titleT.textContent=c.id;el.topic.textContent=c.topic;el.ph.textContent='Message #'+c.id;el.input.setAttribute('aria-label','Message #'+c.id);currentCh=id;
}
function intro(id){var c=chan(id);return '<div class="sk-intro"><b>'+(c.private?'':'#')+esc(c.id)+'</b><p>This is the very beginning of the '+(c.private?'private ':'')+'<span class="sk-b">#'+esc(c.id)+'</span> channel. '+esc(c.topic)+'</p></div>'}
function renderChannel(id,upto){
  var h=intro(id);for(var i=0;i<Math.min(upto,N);i++){if(SC[i].ch===id){h+=sceneStatic(SC[i]);if(SC[i].topic)el.topic.textContent=SC[i].topic}}
  el.stream.innerHTML=h;toBottom(el.scroll);
}
function renderDM(k){
  var p=P[k];
  el.stream.innerHTML=k==='ox'?'<div class="sk-intro sk-intro-app"><span class="sk-av sk-av-app sk-av-lg"><img src="'+OX_MARK+'" alt="" width="72" height="72"></span><b>OpenXCEL</b><p>Your AI teammate. Mention <span class="sk-mention">@OpenXCEL</span> in any channel, or message it here. It works from company memory and skills, and asks before anything goes out.</p></div>':'<div class="sk-intro sk-intro-dm"><img class="sk-av sk-av-lg" src="'+p.img+'" alt="" width="72" height="72"><b>'+esc(p.name)+'</b><p>This conversation is just between you and <span class="sk-b">'+esc(p.name)+'</span>.</p></div>';
  toBottom(el.scroll);
}
async function crossfade(fn,g){
  el.scroll.classList.add('is-fading');
  if(!(await sleep(140,g))){el.scroll.classList.remove('is-fading');return false}
  fn();el.scroll.classList.remove('is-fading');return true;
}

/* thread pane */
function openThread(s,static_){
  threadOpen=s.id;el.threadCh.textContent=(chan(s.ch).private?'':'#')+s.ch;
  var h=msgHTML(s.ask)+'<div class="sk-thread-count"><span>'+s.msgs.length+' replies</span></div>';
  if(static_)s.msgs.forEach(function(m){h+=msgHTML(m)});
  el.tstream.innerHTML=h;el.thread.hidden=false;el.root.classList.add('has-thread');
  requestAnimationFrame(function(){el.thread.classList.add('is-open')});
  toBottom(el.tscroll);
}
function closeThread(){threadOpen=null;el.thread.classList.remove('is-open');el.root.classList.remove('has-thread');el.thread.hidden=true;el.tstream.innerHTML='';el.ttyping.textContent=''}

/* live helpers */
function typingOn(target,on){var t=target==='thread'?el.ttyping:el.typing;t.innerHTML=on?'<span class="sk-dots" aria-hidden="true"><i></i><i></i><i></i></span><b>OpenXCEL</b> is typing…':''}
async function typeComposer(text,g){
  var len=text.length,total=Math.max(T.typeMin,Math.min(T.typeMax,len*T.typeChar)),per=total/len;
  el.root.classList.add('is-composing');el.typed.textContent='';
  for(var i=1;i<=len;i++){if(!(await sleep(per,g)))return false;el.typed.textContent=text.slice(0,i)}
  if(!(await sleep(T.send,g)))return false;
  el.send.classList.add('is-hot');
  if(!(await sleep(120,g)))return false;
  el.typed.textContent='';el.send.classList.remove('is-hot');el.root.classList.remove('is-composing');
  return true;
}
function append(stream,html){var w=document.createElement('div');w.innerHTML=html;var node=w.firstChild;stream.appendChild(node);return node}
async function stream(node,text,g,sc){
  var box=$('.sk-text',node);if(!box)return true;
  var segs=parse(text),words=[];
  segs.forEach(function(sg){var span=document.createElement('span');if(sg.c)span.className=sg.c;box.appendChild(span);sg.s.split(/(\s+)/).forEach(function(w){if(w)words.push([span,w])})});
  for(var i=0;i<words.length;i++){words[i][0].textContent+=words[i][1];if(!/^\s+$/.test(words[i][1])){if(!(await sleep(T.word,g)))return false;if(i%6===0)toBottom(sc)}}
  return true;
}
async function liveMsg(m,target,g){
  var st=target==='thread'?el.tstream:el.stream,sc=target==='thread'?el.tscroll:el.scroll;
  if(m.divider){append(st,dividerHTML(m.divider,true));toBottom(sc);if(!(await sleep(T.between,g)))return false}
  if(m.by==='ox'){typingOn(target,true);if(!(await sleep(rnd(T.typingMin,T.typingMax),g))){typingOn(target,false);return false}typingOn(target,false)}
  var node=append(st,msgHTML(m,{live:true}));toBottom(sc);
  if(m.text&&!(await stream(node,m.text,g,sc)))return false;
  var tools=$$('.sk-tool',node);for(var t=0;t<tools.length;t++){tools[t].classList.add('is-on');if(!(await sleep(260,g)))return false}
  var xs=$$('.sk-x',node);
  for(var i=0;i<xs.length;i++){if(xs[i].classList.contains('sk-fchips')||xs[i].classList.contains('sk-btnrow'))continue;xs[i].classList.add('is-on');toBottom(sc);if(!(await sleep(160,g)))return false}
  if(tools.length){if(!(await sleep(500,g)))return false;tools.forEach(function(x){var s=$('.sk-tool-st',x);if(s)s.innerHTML=ic('check');x.classList.add('is-done')})}
  var art=$('.sk-art',node);
  if(art){art.classList.add('is-on');toBottom(sc);var items=$$('.sk-art-item',art);for(var k=0;k<items.length;k++){items[k].classList.add('is-on');if(!(await sleep(90,g)))return false}if(!(await sleep(T.enter,g)))return false;toBottom(sc)}
  xs.forEach(function(x){x.classList.add('is-on')});toBottom(sc);
  if(m.approve){
    if(!(await sleep(T.approve,g)))return false;
    var b=$('[data-approve]',node);if(b)b.classList.add('is-press');
    if(!(await sleep(260,g)))return false;
    node.classList.add('is-approved');toBottom(sc);
    if(!(await sleep(300,g)))return false;
  }
  node.classList.remove('is-building');
  if(m.reactions){if(!(await sleep(T.react+120,g)))return false;node.classList.add('is-reacted');toBottom(sc)}
  return true;
}

async function playScene(i,g){
  var s=SC[i];
  if(currentCh!==s.ch||dirty){
    var prev=currentCh;closeThread();
    if(prev!==s.ch){setChannel(s.ch,true);if(!(await sleep(T.pill,g)))return false}
    if(!(await crossfade(function(){renderChannel(s.ch,i)},g)))return false;
  }
  dirty=true;
  if(s.topic)el.topic.textContent=s.topic;
  if(!(await sleep(T.between,g)))return false;
  if(s.day){append(el.stream,dividerHTML(s.day,true));toBottom(el.scroll);if(!(await sleep(T.between,g)))return false}
  var askNode=null;
  if(s.ask){
    if(!(await typeComposer(s.ask.text,g)))return false;
    askNode=append(el.stream,msgHTML(s.ask));askNode.classList.add('sk-enter');toBottom(el.scroll);
    if(!(await sleep(T.between+150,g)))return false;
  }
  var target='main';
  if(s.thread){openThread(s,false);target='thread';if(!(await sleep(T.enter,g)))return false}
  for(var k=0;k<s.msgs.length;k++){if(!(await liveMsg(s.msgs[k],target,g)))return false;if(!(await sleep(T.between,g)))return false}
  if(s.thread&&askNode){var body=$('.sk-body',askNode);var w=document.createElement('div');w.innerHTML=repliesHTML(s);var r=w.firstChild;r.classList.add('sk-pop');body.appendChild(r);toBottom(el.scroll)}
  var after=s.after||[];
  for(var a=0;a<after.length;a++){if(!(await sleep(500,g)))return false;if(!(await typeComposer(after[a].text,g)))return false;var n=append(el.stream,msgHTML(after[a]));n.classList.add('sk-enter');toBottom(el.scroll)}
  if(!(await sleep(T.hold,g)))return false;
  dirty=false;
  return true;
}
async function run(g){
  if(firstPlay){firstPlay=false;cur=0;if(!(await sleep(1800,g)))return;cur=1}
  while(g===gen){
    var ok=await playScene(cur,g);
    if(!ok||g!==gen)return;
    cur=(cur+1)%N;
  }
}

/* ---------- default view + user control ---------- */
function renderDefault(){closeThread();setChannel(SC[0].ch,false);renderChannel(SC[0].ch,1);cur=0;dirty=false;firstPlay=true}
function userChannel(id){
  gen++;closeThread();setChannel(id,true);renderChannel(id,N);
  var last=-1;for(var i=0;i<N;i++)if(SC[i].ch===id)last=i;
  if(last>=0)cur=(last+1)%N;dirty=true;firstPlay=false;
}
function userDM(k){gen++;closeThread();setChannel(null,true,k);renderDM(k);dirty=true;firstPlay=false}
function bind(){
  el.root.addEventListener('click',function(e){
    var t=e.target.closest?e.target.closest('[data-ch],[data-dm],[data-thread],.sk-thread-close,[data-switcher]'):null;
    if(!t){closeSwitcher();return}
    if(t.hasAttribute('data-switcher')){toggleSwitcher();return}
    closeSwitcher();
    if(t.hasAttribute('data-ch'))userChannel(t.getAttribute('data-ch'));
    else if(t.hasAttribute('data-dm'))userDM(t.getAttribute('data-dm'));
    else if(t.hasAttribute('data-thread')){var id=t.getAttribute('data-thread');for(var i=0;i<N;i++)if(SC[i].id===id){gen++;dirty=true;openThread(SC[i],true);el.threadClose.focus({preventScroll:true});break}}
    else if(t.classList.contains('sk-thread-close')){closeThread()}
  });
  document.addEventListener('keydown',function(e){if(e.key==='Escape'){if(!el.switcher.hidden){closeSwitcher();el.wsName.focus()}else if(threadOpen)closeThread()}});
  window.addEventListener('resize',function(){movePill(false)});
}
function toggleSwitcher(){var open=el.switcher.hidden;el.switcher.hidden=!open;el.wsName.setAttribute('aria-expanded',String(open))}
function closeSwitcher(){if(!el.switcher.hidden){el.switcher.hidden=true;el.wsName.setAttribute('aria-expanded','false')}}

function boot(){
  var host=document.getElementById('ox-app')||document.body;
  host.innerHTML=shell();
  el.root=$('#sk');el.stream=$('.sk-stream');el.scroll=$('.sk-scroll');el.typing=$('.sk-main > .sk-typing');el.typed=$('.sk-main .sk-typed');el.ph=$('.sk-main .sk-ph');el.input=$('.sk-main .sk-input');el.send=$('.sk-main .sk-send');
  el.titleI=$('.sk-title-i');el.titleT=$('.sk-title-t');el.topic=$('.sk-topic');el.pill=$('.sk-active-pill');el.strip=$('.sk-strip');
  el.thread=$('.sk-thread');el.tstream=$('.sk-thread-stream');el.tscroll=$('.sk-thread-scroll');el.ttyping=$('.sk-thread-typing');el.threadCh=$('.sk-thread-ch');el.threadClose=$('.sk-thread-close');
  el.switcher=$('.sk-switcher');el.wsName=$('.sk-ws-name');
  renderDefault();bind();
  requestAnimationFrame(function(){movePill(false)});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();

window.OX={bridge:{
  app:'openxcel',
  onPlay:function(){if(reduced())return;playing=true;var g=++gen;run(g)},
  onPause:function(){playing=false;gen++;typingOn('main',false);typingOn('thread',false);if(el.typed){el.typed.textContent='';el.root.classList.remove('is-composing')}},
  onVisible:function(){},onHidden:function(){},
  onReset:function(){gen++;renderDefault();if(playing&&!reduced()){var g=++gen;run(g)}}
},scenes:SC.map(function(s){return {id:s.id,label:s.label,channel:s.ch}})};
})();
