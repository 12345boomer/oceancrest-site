# CLAUDE.md: oceancrest.ai, v2 (the painted coast)

A full remake of oceancrest.ai in the new, more playful brand. Next.js (App Router) + TypeScript (strict), converted from static HTML on 2026-10-07. Started 2026-10-06 by Ben Eydlin. This is a working draft beside the live site. It does not replace Eliyahu's repo (`Eco-15/oceancrest-ai-website`) until the team decides it should.

## The idea
OceanCrest AI is half transformation partner and half AI educator. The site is built around those two halves:
- **Transformation** (lagoon blues, `.half`): assess, build, amplify. CTA: **Book now** → `/book`.
- **Education** (dawn and coral, `.half.e`): courses in two tracks, the platform, workshops, membership. CTA: **Take the diagnostic** → `/diagnostic`.
Both CTAs are in the header on every page, with a **Log in** link for the learning platform (courses are public to browse; lessons need a seat). The structure borrows from sectionai.com: painted landscape heroes, white rounded panels on top, outcome cards, tabs and an either/or closing CTA. The words are ours.

## Pages (app/)
Each route is `app/<route>/page.tsx` (a server component that exports `metadata`) with its styles in `page.css` next to it, every selector scoped under `main.page-<name>` so pages can't restyle each other. Interactive parts are small "use client" files beside the page.
- `/` home (`app/page.tsx`) · `/transformation` (phase-link) · `/education` (parts, cur-link) · `/resources` (subscribe-form) · `/about`
- `/courses` (finder.tsx: search, track/level switches, categories, URL sync) and `/courses/[id]` (static pages from `generateStaticParams`)
- `/diagnostic` (Diagnostic.tsx) · `/book` (Booking.tsx)
Old `*.html` URLs redirect to the new routes (`next.config.ts`), including `course.html?id=x` → `/courses/x`.
Documents that still live on the current site are linked absolutely: the quarterly guide, the two papers, case-001 and the readiness assessment (`ocv-ai-assessment.netlify.app`).

## Shared code (edit these, not copies)
- `app/globals.css`: tokens, components and the carried-over live-site graphics. `app/layout.tsx` mounts the header, footer, sound layer and enhancers once.
- `lib/site.ts`: the main menu (`MENUS`), `LOGIN_URL` (placeholder: the learning-site prototype; swap for the live platform) and outside links. `components/Header.tsx` and `Footer.tsx` render from it.
- `components/Coast.tsx` + `lib/coast.ts`: painted coast art. `<Coast as="section" seed palette="hero|technical|mindset|dusk" size="hero|wide|card|tall" scene="cove|headland|beach|open" water glints>`. `water` makes the sea drift; `glints` adds light in the water. `video="/assets/video/x.mp4"` fades a looping clip in over the still (and replaces `water`); skipped under reduced motion. The page heroes and the three "Will AI scale" closing bands use Higgsfield clips made from their own stills (start frame = end frame, tail blended into the head so the loop has no seam). Change a seed, palette or scene and its clip no longer matches, so regenerate it.
- The three service banners (Transformation, Workflows and Automation, Leadership Workshops and Training) are all painted, so sibling pages share one art style (Ben, 2026-10-08: photos there "break the brand"). Each is a distinct scene: Transformation the headland, Workflows a working harbour, Leadership a lighthouse leading a fleet at dawn. The two service-page ones are Higgsfield paintings in the transformation hero's style: `<PageHero image="/assets/img/heroes/<name>-painted.jpg" video="/assets/video/sub-<name>-painted.mp4" painted>` (`.ph-paint`: framed like the transformation hero, no wash).
- The other dropdown sub-pages (learning, resources, about) and the courses banner use their own Higgsfield picture instead of a painting: `<PageHero image="/assets/img/heroes/<name>.jpg" video="/assets/video/sub-<name>.mp4">` (`Coast` `image` prop; `.ph-photo` framing with a soft white wash behind the copy). Each page has a different one, styled on Ben's references (aerial beach, caustic water, halftone dots, wavy bands), so no two banners repeat. The two halftone-dot graphics live off the banners, where they read better: the band behind the shared subscribe panel (`public/assets/img/art/dots-band.jpg`) and the columns in the Implementation phase card (`dots-columns.jpg`). The two aerial beach photos that used to sit on the Workflows and Leadership banners are section art now: the caustic shallows behind the leaders' 90-minute session card (`caustic-shallows.jpg`, transformation and leadership pages) and the swell lines behind the advisory board (`swell-lines.jpg`, about pages).
- `components/SeaLayer.tsx` + `lib/sea.ts`: sounds (Web Audio, no files), ripples, bursts of light (`playSound`, `sparkle`, `data-sound`, `data-sparkle`) and the sound toggle.
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
- New: a pastel art tier for paintings, tags, pebbles and tints. Pill shapes, painted underline words (`.stroke`), sounds, glints and hover lifts.
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
`/book` calls the live site's Netlify functions (`GET /api/slots`, `POST /api/book`). Those exist only when deployed beside `netlify/functions` from the main repo. Locally the page shows its fallback (email or phone).

## Run it
`npm install` once, then `npm run dev` and open http://localhost:3000/. `npm run build` checks types and prerenders every page; `npm run typecheck` runs TypeScript alone.
