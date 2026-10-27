/* SIGNAL auto-tour (V10 contract section 9). Runs only inside embed.html through the shared WorkEmbed runtime. */
(()=>{'use strict';
const STEPS=[
  {id:'visibility',label:'Visibility',target:'[data-tour="nav-visibility"]',action:'click',dwell:4000},
  {id:'top-cell',label:'Top brand on ChatGPT',target:'[data-tour="cell-top"]',action:'hover',dwell:1800},
  {id:'visitors',label:'AI Visitors',target:'[data-tour="nav-visitors"]',action:'click',dwell:3600},
  {id:'pages',label:'Landing pages',target:'[data-tour="nav-pages"]',action:'click',dwell:3400},
  {id:'first-page',label:'Top landing page',target:'[data-tour="page-row-first"]',action:'hover',dwell:1600},
  {id:'projects',label:'Projects',target:'[data-tour="nav-projects"]',action:'click',dwell:3400}
];
const reset=()=>{if(window.WorkWalkthrough)window.WorkWalkthrough.reset()};
if(window.WorkEmbed)window.WorkEmbed.init({app:'signal',steps:STEPS,reset});
})();