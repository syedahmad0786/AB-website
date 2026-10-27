/* Member Pulse auto-tour (V10 contract section 9). */
(()=>{'use strict';if(!window.WorkEmbed)return;
const steps=[
 {id:'stream',label:'Pulse Stream',target:'[data-tour="tab-stream"]',action:'none',dwell:3600,glide:600},
 {id:'event',label:'Event detail',target:'#view-stream .node',action:'hover',dwell:2200},
 {id:'timeline',label:'Timeline',target:'[data-tour="tab-timeline"]',action:'click',dwell:3000},
 {id:'range',label:'30 days',target:'#view-timeline [data-range="30"]',action:'click',dwell:2000},
 {id:'stages',label:'Stages',target:'[data-tour="tab-stages"]',action:'click',dwell:3000},
 {id:'touchpoint',label:'Touchpoint',target:'#view-stages [data-tp]',action:'hover',dwell:2000},
 {id:'map',label:'Experience Map',target:'[data-tour="tab-map"]',action:'click',dwell:3400},
 {id:'tenure',label:'Tenure',target:'[data-tour="tab-tenure"]',action:'click',dwell:3000}
];
window.WorkEmbed.init({app:'member-pulse',steps,reset:()=>{const b=document.getElementById('resetPulse');if(b)b.click();const c=document.getElementById('dcard');if(c)c.classList.remove('on');}});
})();
