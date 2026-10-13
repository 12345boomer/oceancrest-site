# CLAUDE.md: oceancrest.ai, v2 (the painted coast)

A full remake of oceancrest.ai in the new, more playful brand. Next.js (App Router) + TypeScript (strict), converted from static HTML on 2026-10-07. Started 2026-10-06 by Ben Eydlin. This is a working draft beside the live site. It does not replace Eliyahu's repo (`Eco-15/oceancrest-ai-website`) until the team decides it should.

## The idea
OceanCrest AI is half transformation partner and half AI educator. The site is built around those two halves:
- **Transformation** (lagoon blues, `.half`): assess, build, measure. CTA: **Book a meeting** → `/book`.
- **Education** (dawn and coral, `.half.e`): courses in two tracks, the platform, workshops, membership. CTA: **Check your AI skills** → `/diagnostic` (a personal quiz).
The two assessments are named plainly (Ben, 2026-10-13): **Assess your business** is the company readiness assessment (`READINESS`, external) and **Check your AI skills** is the personal quiz. The header carries **Assess your business** beside **Book a meeting**, plus **Log in**; the skills check is in the Learning menu. Consulting pages pair Book a meeting with Assess your business. Labels live in `lib/site.ts` (`ASSESS_LABEL`, `SKILLS_LABEL`).
Copy is plain language (Ben, 2026-10-13): no "P&L", "fractional", "owned infrastructure" or "amplification"; say time or money saved, ongoing support, systems you control, measure what changed. The chart codes (OC-xx in eyebrows) and compass bearings were removed; document numbers on papers stay. The structure borrows from sectionai.com: painted landscape heroes, white rounded panels on top, outcome cards, tabs and an either/or closing CTA. The words are ours.

## Pages (app/)
Each route is `app/<route>/page.tsx` (a server component that exports `metadata`) with its styles in `page.css` next to it, every selector scoped under `main.page-<name>` so pages can't restyle each other. Interactive parts are small "use client" files beside the page.
- `/` home (`app/page.tsx`; each section has one job, for owners new to AI: hero with two brief doors, tools strip, the illustrative quote example (`app/quote-flow.tsx`: Request → Draft quote → Your approval → Sent), where to start, team strip, "Two ways we can help", and the closing invitation. The assessment detail lives on `/transformation#assessment`, not here.) · `/transformation` (phase-link) · `/education` (parts, cur-link) · `/resources` (subscribe-form) · `/about`
- `/courses` (finder.tsx: search, track/level switches, categories, URL sync) and `/courses/[id]` (static pages from `generateStaticParams`)
- `/diagnostic` (Diagnostic.tsx) · `/book` (Booking.tsx)
Old `*.html` URLs redirect to the new routes (`next.config.ts`), including `course.html?id=x` → `/courses/x`.
Documents that still live on the current site are linked absolutely: the quarterly guide, the two papers, case-001 and the readiness assessment (`ocv-ai-assessment.netlify.app`).

## Shared code (edit these, not copies)
- `app/globals.css`: tokens, components and the carried-over live-site graphics. `app/layout.tsx` mounts the header, footer, touch layer and enhancers once.
- `lib/site.ts`: the main menu (`MENUS`), `LOGIN_URL` (placeholder: the learning-site prototype; swap for the live platform) and outside links. `components/Header.tsx` and `Footer.tsx` render from it.
- `components/Coast.tsx` + `lib/sea-photos.ts`: the one art system, realistic ocean photography (Ben, 2026-10-13: no painted art anywhere). `<Coast seed palette="hero|technical|mindset|dusk" image? video?>` shows `image` if given, otherwise a photo from the library in `public/assets/img/sea/` picked by palette (technical = cool blues, mindset = warm dawn, dusk = closing bands, hero = bright mix) and seed, so a spot always shows the same picture. `video` fades a looping Higgsfield clip in over the still (start frame = end frame, last 0.5s blended into the first); skipped under reduced motion. The painter (`lib/coast.ts`) is gone; `size`, `scene`, `water`, `glints`, `alive` are accepted but unused. Page banners have their own stills and clips in `public/assets/img/heroes/` and `public/assets/video/`.
- The home page and the three service pages (Transformation, Workflows and Automation, Leadership Workshops and Training) use realistic ocean photography, not paintings (Ben, 2026-10-12: the painted art there looked "childish"; he wants realistic waves, in the soft, high-key style of the sub-page pictures he likes). Higgsfield stills (nano_banana_2_1, 2k, with team/platform/playbooks as style references) plus Kling loops (start frame = end frame, last 0.5s blended into the first). The home hero takes the aerial boat-and-wake from the cover of Chris Kuselias's book *Making Waves*. Banners: `heroes/home-wake.jpg`, `transformation-crest.jpg`, `workflows-harbour.jpg` (a misty working harbour, muted sage and grey, so it differs from the other two), `leadership-lighthouse.jpg` (each with a matching `video/*.mp4`); section art lives in `public/assets/img/sea/` (lagoon, sunrise shore, underwater light, sunrise foam, depth gradient, reef break, open swell, dusk wave, dusk sail). Every page closes with the shared `ClosingCall` band (Book a meeting + Assess your business; optional `title`, `lede`, `image`, `video`, `more`).
- The other dropdown sub-pages (learning, resources, about) and the courses banner use their own Higgsfield picture instead of a painting: `<PageHero image="/assets/img/heroes/<name>.jpg" video="/assets/video/sub-<name>.mp4">` (`Coast` `image` prop; `.ph-photo` framing with a soft white wash behind the copy). Each page has a different one, styled on Ben's references (aerial beach, caustic water, halftone dots, wavy bands), so no two banners repeat. The halftone-dot band lives off the banners, behind the shared subscribe panel (`public/assets/img/art/dots-band.jpg`). The two aerial beach photos that used to sit on the Workflows and Leadership banners are section art now: the caustic shallows behind the leaders' 90-minute session card (`caustic-shallows.jpg`, transformation and leadership pages) and the swell lines behind the advisory board (`swell-lines.jpg`, about pages).
- `components/SeaLayer.tsx` + `lib/sea.ts`: ripples where you press and bursts of light (`sparkle`, `data-sparkle`). No sounds and no sound toggle: Ben had them removed site-wide on 2026-10-12.
- `components/Enhancers.tsx`: reveal on scroll, counters (`data-count`), bars (`.bar[data-to]`), switches (`[data-switch]` + `[data-panel]`), hero word rotator, course lanes. These change the DOM directly, so don't drive those classes/attributes from React state.
- `lib/courses.ts`: the typed two-track course library (`COURSES`, `CATEGORIES`, `TRACKS`) and the flagship platform courses (`PROGRAMS`). `components/CourseCard.tsx` renders one card.
- `types/css.d.ts` lets inline styles set CSS custom properties (`style={{ "--peb": "var(--blush)" }}`).

## Accounts and access (no outside service yet)
- Anyone: the catalog and every course page. Signed in (`/login`: name + email, no password): lesson 1 of every course, the preview. Access code entered (`/account`): every lesson of every course.
- `lib/access.ts` holds the rules. There is one access code; only its SHA-256 is in the repo (set `ACCESS_CODE_SHA256` in the environment to change it, which locks everyone out until they enter the new one). The entered code lives in an httpOnly cookie and is re-checked on every request. Never put the plaintext code in the repo.
- Lessons: `lib/lessons.ts` (placeholders until content is written) and `/courses/[id]/lessons/[n]`, rendered per request so access is checked on the server. `components/CourseAccess.tsx` switches the course page's buttons by access.
- Payments and real logins (Supabase was the plan) wait until they're needed.

## Brand decisions (owner: Ben, 2026-10-06)
- Kept from the brand: white ground, navy ink, blue #2563eb as the one UI accent, Archivo, Geist and Geist Mono, sentence-case headlines with a period, no exclamation marks, and no unverified statistics (every figure keeps its S-key source on the page).
- New: a pastel tier for tags, pebbles and tints, and realistic ocean photography as the only art (the paintings were retired on 2026-10-13). Pill shapes, painted underline words (`.stroke`), glints and hover lifts. (Sounds were tried and removed.)
- Carried over from the live site, because Ben asked to keep its graphics:
  - the rotating highlighted hero word, and the blue course line with bearings (the drifting contour animation was removed on 2026-10-08 as too distracting);
  - corner ticks and the chart title block, and soundings with graticule ticks;
  - the notched dividers and the capability-gap chart;
  - the new-model chart and the integrations strip;
  - colour team photos, the advisory board, and the OC-308 photo library, toned sea-glass (`.photo`).
- This runs ahead of the brand repo. Its CLAUDE.md lists the colour reset as "owner decision pending".

## Team photos
The crew grid (home) and team cards (about) show the full original photos from `public/assets/img/team/` in tall 4:5 frames, positioned per person with an inline `object-position`. Chris's and Eliyahu's originals are half-body shots, so they read zoomed-out; the other four originals are headshots and can't zoom out further until wider photos arrive. The small round track-lead avatars use the matched squares in `public/assets/img/team/square/`.

## Booking
`/book` embeds Ben's Calendly event (`BOOKING_URL` in `lib/site.ts`; `components/CalendlyEmbed.tsx` loads Calendly's widget script, with a plain link as the fallback). The event is an hour on Google Meet, so the site says "an hour-long video call". The old Netlify-functions booking flow (`Booking.tsx`, `/api/slots`) was removed on 2026-10-13.

## Run it
`npm install` once, then `npm run dev` and open http://localhost:3000/. `npm run build` checks types and prerenders every page; `npm run typecheck` runs TypeScript alone.
