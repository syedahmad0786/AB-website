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

## Editing content

- Clients, agentic systems, repos, socials: arrays at the top of `lib/homeLogic.js` (`CASES`, `CLIENTS`, `AG`, `REPOS`, `CH`).
- Headline variant: `DEFAULT_PROPS.headline` in `components/Home.jsx` (`Work breaks`, `Messy operations`, `Can it operate?`).
- Social phone screens: empty channels show a logo card. Add an image per channel by passing `src` to the `ImageSlot` in the socials section.

## Notes

- The page renders client-side only (it reads window size, time and saved theme while rendering). Title, description and Open Graph tags are server-rendered in `app/layout.jsx`.
- Logos load from cdn.simpleicons.org, Google favicons and aixcelsolutions.com; the black hole image from Wikimedia (credit shown in the contact section).
