export const TIMING = {"typeChar":24,"typeMin":900,"typeMax":1800,"word":38,"answerMin":700,"answerMax":1600,"send":220,"gap":350,"work":1300,"shell":360,"leave":280,"start":400,"slide":380,"workChip":90,"answerFade":140,"artGap":200,"enter":420};
export const SCENES = [
 {
  "slug": "openxcel-ai",
  "channel": "requests",
  "chip": "OpenXCEL · Slack coworker",
  "caption": "Illustrative walkthrough authored for this portfolio with example wording. It is not a recording of a connected workspace. Earlier memory and connections screens are in the case study.",
  "q": "@OpenXCEL can you draft this week's onboarding update for the client? Use what we saved from last week's call.",
  "who": "Ops lead",
  "initials": "OL",
  "reply": "OpenXCEL",
  "ri": "OX",
  "work": "Checking company memory and skills…",
  "chips": [
   "Company memory",
   "Skill · Weekly client update"
  ],
  "answer": "Sure. I'll draft it from the saved notes and hold it for your review before anything goes out.",
  "type": "draft-card",
  "build": 2000,
  "hold": 4000,
  "screen": {
   "file": "openxcel-memory.png",
   "source": "portfolio-v2/assets/owned-products/openxcel-memory.png",
   "alt": "OpenXCEL company memory page with reviewer-gated facts",
   "pos": "0 0",
   "aspect": "1600 / 746",
   "src": "/live-workspace/openxcel-memory.png"
  },
  "askTag": "example",
  "replyTag": "Slack coworker",
  "secondArt": 400
 },
 {
  "slug": "healthcare-agency-operating-os",
  "channel": "client-delivery",
  "chip": "Command Center · shared view",
  "caption": "Local operating interface with synthetic client records. The conversation is an authored example.",
  "q": "Which clients are behind on a milestone right now?",
  "who": "Head of delivery",
  "initials": "HD",
  "reply": "Account manager",
  "ri": "AM",
  "work": "Opening Command Center · Milestones",
  "chips": [
   "Lifecycle board"
  ],
  "answer": "Two Day-30 check-ins are overdue and both are flagged for review. One Day-60 is a week late. Board's below.",
  "type": "board",
  "build": 1800,
  "hold": 4200,
  "screen": {
   "file": "command-center-lifecycle-board.png",
   "source": "portfolio-v2/assets/reviewed-v3/command-center/04-lifecycle-board.png",
   "pos": "100% 30%",
   "aspect": "16 / 9",
   "alt": "Lifecycle board with synthetic client records",
   "src": "/live-workspace/command-center-lifecycle-board.png"
  },
  "columns": [
   [
    "Pending",
    5,
    [
     [
      "Premier Spine & Wellness",
      "D60",
      "in 12d"
     ],
     [
      "Pacific Performance Chiro",
      "D60",
      "7d overdue"
     ]
    ]
   ],
   [
    "Survey Sent",
    2,
    [
     [
      "Coastal Chiropractic",
      "D60",
      "in 3d"
     ],
     [
      "Northern Lights Wellness",
      "D30",
      "in 4d"
     ]
    ]
   ],
   [
    "Completed",
    4,
    [
     [
      "Riverside Chiro",
      "D30",
      "2d overdue",
      2
     ],
     [
      "Valley Health Spine",
      "D30",
      "1d overdue",
      2
     ]
    ]
   ],
   [
    "Draft Ready",
    2,
    [
     [
      "Bayview Chiropractic",
      "D30",
      "today",
      9
     ],
     [
      "Summit Spine",
      "D90",
      "in 1d",
      8
     ]
    ]
   ],
   [
    "Upsold",
    1,
    [
     [
      "Downtown Chiro Group",
      "D90",
      "today",
      9
     ]
    ]
   ]
  ],
  "askTag": "example",
  "replyTag": "example"
 },
 {
  "slug": "member-onboarding",
  "channel": "onboarding",
  "chip": "Onboard · checkpoint view",
  "caption": "Local example operators and checkpoints; not live member data.",
  "q": "Is anything stuck between Close and the community invite?",
  "who": "Onboarding lead",
  "initials": "OB",
  "reply": "Ops coordinator",
  "ri": "OC",
  "work": "Opening Onboard · Pipeline",
  "chips": [
   "Integration health"
  ],
  "answer": "Mighty Networks has two failed invites. Email validation, Airtable, Intercom and VendHub have one each. Retries are ready on the cards.",
  "type": "checkpoints",
  "build": 2000,
  "hold": 4000,
  "screen": {
   "file": "onboarding-pipeline.png",
   "source": "portfolio-v2/assets/reviewed-v3/onboarding/01-populated-six-stage-pipeline.png",
   "pos": "50% 52%",
   "aspect": "2160 / 560",
   "alt": "Onboarding pipeline with local example checkpoints",
   "src": "/live-workspace/onboarding-pipeline.png"
  },
  "tiles": [
   [
    "Close CRM",
    "LEAD WON",
    20,
    0
   ],
   [
    "Email validation",
    "VERIFIED",
    17,
    1
   ],
   [
    "Airtable",
    "STUDENT + CLIENT",
    15,
    1
   ],
   [
    "Mighty Networks",
    "COMMUNITY INVITE",
    11,
    2
   ],
   [
    "Intercom",
    "CONTACT SYNCED",
    8,
    1
   ],
   [
    "VendHub",
    "OPERATOR LIVE",
    5,
    1
   ]
  ],
  "askTag": "example",
  "replyTag": "example"
 },
 {
  "slug": "automation-monitoring",
  "channel": "automation-alerts",
  "chip": "ErrorLens · alert path",
  "caption": "Local interface with example incidents; not current client failures.",
  "q": "Is it just the one workflow?",
  "who": "Ops lead",
  "initials": "OL",
  "reply": "Automation engineer",
  "ri": "AE",
  "work": "Opening ErrorLens · Error feed",
  "chips": [
   "Filter · make"
  ],
  "answer": "No. The same token error hit Notion → Linear twice, and the HubSpot mirror has a separate field error. Taking both.",
  "type": "feed",
  "build": 1500,
  "hold": 4000,
  "screen": {
   "file": "errorlens-platform-filter.png",
   "source": "portfolio-v2/assets/reviewed-v3/errorlens/02-platform-filter-synthetic.png",
   "pos": "60% 30%",
   "aspect": "16 / 8",
   "alt": "ErrorLens error feed filtered by platform, synthetic data",
   "src": "/live-workspace/errorlens-platform-filter.png"
  },
  "askTag": "example",
  "replyTag": "example",
  "alert": {
   "by": "ErrorLens",
   "tag": "app · example",
   "title": "OAuth token expired — refresh failed (invalid_grant)",
   "rows": [
    [
     "Workflow",
     "Notion → Linear sync"
    ],
    [
     "Platform",
     "make"
    ],
    [
     "Status",
     "OPEN"
    ]
   ]
  },
  "askDelay": 600
 },
 {
  "slug": "dashboards-daily-pulse",
  "channel": "member-journey",
  "chip": "Member Pulse · shared view",
  "caption": "Recovered Member Pulse product view with fictional records, not live member data.",
  "q": "Where is Example Member 001 in the lifecycle right now?",
  "who": "Community lead",
  "initials": "CL",
  "reply": "Member success",
  "ri": "MS",
  "work": "Opening Member Pulse · Stages",
  "chips": [
   "Fictional records"
  ],
  "answer": "Active, and the signals read confident. At-Risk is an example-only state with no connected records.",
  "type": "stages",
  "build": 1900,
  "hold": 3800,
  "screen": {
   "file": "member-pulse-stages.png",
   "source": "portfolio-v6/assets/member-pulse/02-stages.png",
   "pos": "50% 50%",
   "aspect": "2082 / 800",
   "alt": "Member Pulse stages view with fictional records",
   "src": "/live-workspace/member-pulse-stages.png"
  },
  "askTag": "example",
  "replyTag": "example"
 },
 {
  "slug": "signal",
  "channel": "ai-visibility",
  "chip": "SIGNAL · sample dataset",
  "caption": "Existing SIGNAL product views with a sample bicycle-brand dataset, not an AiXCEL client result.",
  "q": "In the sample set, how often does AI mention our brand versus the others?",
  "who": "Marketing lead",
  "initials": "ML",
  "reply": "Content strategist",
  "ri": "CS",
  "work": "Opening SIGNAL · Visibility",
  "chips": [
   "Sample dataset",
   "2 of 3 models shown"
  ],
  "answer": "Sample brand leads on ChatGPT at 37%. On Google AI, Canyon is ahead, 31% to 28%.",
  "type": "matrix",
  "build": 1900,
  "hold": 4200,
  "q2": "And AI referral traffic?",
  "work2": "Opening SIGNAL · AI Visitors",
  "answer2": "Sample sessions: 4,929, up 21.4%. ChatGPT is the top source on the busiest page.",
  "screen": {
   "file": "signal-matrix.png",
   "source": "portfolio-v5/assets/products/signal-matrix.png",
   "pos": "0 50%",
   "aspect": "1000 / 900",
   "alt": "SIGNAL visibility matrix with sample bicycle-brand data",
   "src": "/live-workspace/signal-matrix.png"
  },
  "rows": [
   [
    "Specialized",
    37,
    28
   ],
   [
    "Canyon",
    19,
    31
   ],
   [
    "Trek Bikes",
    15,
    19
   ],
   [
    "Cannondale",
    11,
    7
   ],
   [
    "Giant",
    7,
    9
   ],
   [
    "Polygon Bikes",
    15,
    7
   ],
   [
    "Orbea",
    7,
    6
   ],
   [
    "Cube",
    7,
    4
   ]
  ],
  "askTag": "example",
  "replyTag": "example",
  "chips2": [],
  "askDelay2": 900
 }
];
export const SIGNAL_WHITELIST = [37,28,19,31,15,11,7,9,6,4,4929,21.4,642,488,416,24,18,16,214,490,640,790,870];
