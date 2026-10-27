/* Onboard auto-tour (V10 contract section 9). */
(()=>{'use strict';if(!window.WorkEmbed)return;
const steps=[
 {id:'pipeline',label:'Pipeline',target:'[data-tour="nav-pipeline"]',action:'none',dwell:3600,glide:600},
 {id:'errors-filter',label:'Errors',target:'[data-tour="filter-errors"]',action:'click',dwell:2400},
 {id:'stuck',label:'Stuck member',target:'[data-tour="lead-stuck"]',action:'click',dwell:3000},
 {id:'retry',label:'Retry',target:'[data-tour="drawer-retry"]',action:'click',dwell:2400},
 {id:'close',label:'Close',target:null,action:'key',key:'Escape',dwell:600},
 {id:'members',label:'Members',target:'[data-tour="nav-operators"]',action:'click',dwell:2800},
 {id:'errors',label:'Errors & retries',target:'[data-tour="nav-errors"]',action:'click',dwell:3000},
 {id:'integrations',label:'Integration health',target:'[data-tour="nav-integrations"]',action:'click',dwell:3200},
 {id:'analytics',label:'Analytics',target:'[data-tour="nav-analytics"]',action:'click',dwell:3000}
];
window.WorkEmbed.init({app:'onboard',steps,reset:()=>window.WorkWalkthrough&&window.WorkWalkthrough.reset()});
})();
