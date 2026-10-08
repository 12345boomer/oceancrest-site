# OceanCrest AI website, v2 draft

A redesign of oceancrest.ai in the new painted-coast brand, built with Next.js (App Router) and TypeScript.

This is a working draft for internal review, and it is not the live site. Pages are marked `noindex`.

- **Transformation** (`/transformation`): assess, build, amplify. The call to action is "Book now".
- **Education** (`/education`, `/courses`, `/diagnostic`): courses, the platform, workshops and membership. The call to action is "Take the diagnostic".

To run it locally:

```
npm install
npm run dev
```

Then open http://localhost:3000. `npm run build` makes a production build.

Booking (`/book`) needs the live site's Netlify functions (`/api/slots`, `/api/book`). Anywhere else, it shows the email and phone fallback. The "Log in" link points at the learning-platform prototype until the live platform exists (`LOGIN_URL` in `lib/site.ts`).
