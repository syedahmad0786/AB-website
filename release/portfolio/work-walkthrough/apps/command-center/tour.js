/* Command Center auto-tour (V10 contract section 9). */
(()=>{'use strict';if(!window.WorkEmbed)return;
const steps=[
 {id:'lifecycle',label:'Lifecycle',target:'[data-tour="kpis"]',action:'none',dwell:3200,glide:600},
 {id:'dashboard',label:'Dashboard',target:'[data-tour="nav-dashboard"]',action:'click',dwell:3600},
 {id:'clients',label:'Clients',target:'[data-tour="nav-clients"]',action:'click',dwell:2400},
 {id:'client',label:'Client record',target:'[data-tour="client-open"]',action:'click',dwell:3200},
 {id:'client-close',label:'Close',target:null,action:'key',key:'Escape',dwell:600},
 {id:'milestones',label:'Milestones',target:'[data-tour="nav-milestones"]',action:'click',dwell:3000},
 {id:'drafts',label:'Email drafts',target:'[data-tour="nav-drafts"]',action:'click',dwell:2400},
 {id:'draft',label:'Draft review',target:'[data-tour="draft-open"]',action:'click',dwell:3000},
 {id:'draft-close',label:'Close',target:null,action:'key',key:'Escape',dwell:600},
 {id:'reports',label:'Reports',target:'[data-tour="nav-reports"]',action:'click',dwell:3000},
 {id:'sync',label:'GHL sync',target:'[data-tour="nav-sync"]',action:'click',dwell:2800},
 {id:'activity',label:'Activity log',target:'[data-tour="nav-activity"]',action:'click',dwell:2800}
];
window.WorkEmbed.init({app:'command-center',steps,reset:()=>window.WorkWalkthrough&&window.WorkWalkthrough.reset()});
})();
