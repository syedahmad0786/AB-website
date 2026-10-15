# ahmadbukhari.com

Next.js build of the **Home v8** design from Claude Design. Lives in `home-v8/` so the current multi-page site keeps running.

## Run

1. `npm install`
2. `npm run dev` → http://localhost:3000
3. `npm run build && npm start` for production

## Deploy (Vercel)

1. Vercel project with Root Directory = `home-v8` (framework: Next.js).
2. Add `ahmadbukhari.com` under Project → Settings → Domains and update DNS as Vercel shows.

## Where things live

| Path | What |
| --- | --- |
| `components/Home.jsx` | Page markup, mirrors the design template |
| `lib/homeLogic.js` | All data, state and motion (the design's logic class, unchanged) |
| `lib/dcLogic.js` | Small base class the logic extends |
| `components/ImageSlot.jsx` | Image slots (headshot, portrait, social phone) |
| `app/globals.css` | Fonts, keyframes, dark mode, hover states |
| `public/assets/` | Avatar GIF and OpenXCEL video |
| `components/StaticHome.jsx` | Server-rendered page for crawlers and first paint |
| `lib/site.js`, `lib/siteData.js` | All facts and data, shared by the page, schema, llms.txt and MCP |
| `app/mcp/route.js` | Read-only MCP server |

## Editing content

- Clients, agentic systems, repos, socials: arrays at the top of `lib/homeLogic.js` (`CASES`, `CLIENTS`, `AG`, `REPOS`, `CH`).
- Headline variant: `DEFAULT_PROPS.headline` in `components/Home.jsx` (`Work breaks`, `Messy operations`, `Can it operate?`).
- Social phone screens: empty channels show a logo card. Add an image per channel by passing `src` to the `ImageSlot` in the socials section.

## Crawlers, AI assistants and agents

- `components/StaticHome.jsx` is a server-rendered copy of the page (same copy, links and facts, plain HTML). It is what crawlers and link unfurlers read, and what a visitor sees until the interactive page mounts. `lib/site.js` and `lib/siteData.js` are the single source of truth for both.
- `app/page.jsx` injects the schema.org graph (`lib/schema.js`) server-side.
- Machine-readable routes, all generated from the same data: `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/llms-full.txt`, `/profile.json`, `/feed.xml`, `/.well-known/agent.json`.
- `/mcp` is a read-only MCP server (Streamable HTTP). Connect a client with `{ "url": "https://ahmadbukhari.com/mcp" }`. Tools: `get_profile`, `list_systems`, `get_system`, `list_pages`, `how_to_contact`.
- Canonical host is `SITE_URL` in `lib/site.js` (override with `NEXT_PUBLIC_SITE_URL`). `next.config.mjs` 308-redirects the other host to it.

## Notes

- The interactive page renders client-side only (it reads window size, time and saved theme while rendering). Title, description, canonical and Open Graph tags are server-rendered in `app/layout.jsx`.
- Logos load from cdn.simpleicons.org, Google favicons and aixcelsolutions.com; the black hole image from Wikimedia (credit shown in the contact section).
