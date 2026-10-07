# OceanCrest AI website, v2 draft

A redesign of oceancrest.ai in the new painted-coast brand. Static HTML, CSS and JS with no build step.

This is a working draft for internal review, and it is not the live site. Pages are marked `noindex`.

- **Transformation** (`transformation.html`): assess, build, amplify. The call to action is "Book now".
- **Education** (`education.html`, `courses.html`, `diagnostic.html`): courses, the platform, workshops and membership. The call to action is "Take the diagnostic".

To run it locally, run `python3 -m http.server` in this folder and open http://localhost:8000.

Booking (`book.html`) needs the live site's Netlify functions (`/api/slots`, `/api/book`). Anywhere else, it shows the email and phone fallback.
