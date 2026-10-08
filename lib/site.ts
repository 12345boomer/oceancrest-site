/*
  Site-wide links and the main menu. The header (desktop dropdowns and mobile menu) and the
  footer read from here, so every page stays in sync.
  Links to documents that live on the current site (guide, papers, case) point at oceancrest.ai.
*/
export const LIVE = "https://oceancrest.ai";
export const READINESS = "https://ocv-ai-assessment.netlify.app/";

// Learner login. Courses are public to browse; lessons need a seat (invite or company code).
// Placeholder: the learning-site prototype's sign-in page. Swap for the live platform URL.
export const LOGIN_URL = "http://localhost:8000/signin.html";

export const isExternal = (href: string) => /^https?:/.test(href);

export interface MenuItem { title: string; note: string; href: string }
export interface Menu { label: string; /** Routes that mark this menu as current. */ paths: string[]; items: MenuItem[] }

export const MENUS: Menu[] = [
  { label: "Services", paths: ["/transformation", "/book"], items: [
    { title: "AI transformation", note: "Assess, build, amplify: our process, start to finish", href: "/transformation" },
    { title: "The readiness assessment", note: "Free, online: where AI pays in your business", href: READINESS },
    { title: "Leadership workshop", note: "Leading your company through AI, in 90 minutes", href: "/education#workshops" },
    { title: "Fractional AI leadership", note: "Advisory, governance and a roadmap, month to month", href: "/transformation#options" },
    { title: "How an engagement runs", note: "The model in writing, before you book", href: "/transformation#engagement" }
  ] },
  { label: "Learning", paths: ["/education", "/courses", "/diagnostic"], items: [
    { title: "The learning solution", note: "How we teach a whole company", href: "/education" },
    { title: "Courses", note: "Every course, in two tracks", href: "/courses" },
    { title: "The AI diagnostic", note: "Find out what you know, in about five minutes", href: "/diagnostic" },
    { title: "The platform", note: "What leadership sees", href: "/education#platform" },
    { title: "Workshops", note: "Leaders first, then the whole company", href: "/education#workshops" }
  ] },
  { label: "Resources", paths: ["/resources"], items: [
    { title: "The quarterly guide", note: "AI for small business, every quarter", href: "/resources#guide" },
    { title: "Papers", note: "The thinking behind how we work", href: "/resources#papers" },
    { title: "Demonstration case", note: "A full engagement, chapter by chapter", href: `${LIVE}/case-001/` },
    { title: "Membership", note: "Every course, for everyone on the team", href: "/education#membership" },
    { title: "Newsletter", note: "Hear about the next paper", href: "/resources#subscribe" }
  ] },
  { label: "About", paths: ["/about"], items: [
    { title: "Our team", note: "The people in the room", href: "/about#team" },
    { title: "Advisory board", note: "Who we answer to", href: "/about#advisory" },
    { title: "Our lineage", note: "A division of OceanCrest Ventures", href: "/about#lineage" }
  ] }
];
