/* ErrorLens auto-tour (V10 contract section 9). Data-only; WorkEmbed drives it. */
(()=>{'use strict';if(!window.WorkEmbed)return;
const steps=[
 {id:'overview',label:'Overview',target:'[data-tour="nav-overview"]',action:'none',dwell:3600,glide:600},
 {id:'chart-heatmap',label:'Chart type',target:'[data-tour="chart-heatmap"]',action:'click',dwell:2200},
 {id:'incidents',label:'Incidents',target:'[data-tour="nav-incidents"]',action:'click',dwell:2600},
 {id:'search',label:'Search',target:'[data-tour="incident-search"]',action:'type',text:'Stripe',dwell:1800},
 {id:'detail',label:'Error detail',target:'[data-tour="incident-open"]',action:'click',dwell:3400},
 {id:'close',label:'Close',target:null,action:'key',key:'Escape',dwell:600},
 {id:'rules',label:'Rules',target:'[data-tour="nav-rules"]',action:'click',dwell:2800},
 {id:'rule-toggle',label:'Toggle rule',target:'[data-tour="rule-toggle"]',action:'click',dwell:1800},
 {id:'back',label:'Overview',target:'[data-tour="nav-overview"]',action:'click',dwell:2000}
];
window.WorkEmbed.init({app:'errorlens',steps,reset:()=>window.WorkWalkthrough&&window.WorkWalkthrough.reset()});
})();
