/*
  Site-wide links and the main menu. The header (desktop dropdowns and mobile menu) and the
  footer read from here, so every page stays in sync.
  Links to documents that live on the current site (guide, papers, case) point at oceancrest.ai.
*/
export const LIVE = "https://oceancrest.ai";
export const READINESS = "https://ocv-ai-assessment.netlify.app/";

// Learner sign-in (app/login). Signed in: the first lesson of every course; the access code
// (app/account) unlocks the rest. See lib/access.ts.
export const LOGIN_URL = "/login";
export const ACCOUNT_URL = "/account";

export const isExternal = (href: string) => /^https?:/.test(href);

export interface MenuItem { title: string; note: string; href: string }
export interface Menu { label: string; /** Routes that mark this menu as current. */ paths: string[]; items: MenuItem[] }

// Menu item titles are in title case (each main word capitalised); the notes under them stay in sentence case.
export const MENUS: Menu[] = [
  { label: "Services", paths: ["/transformation", "/services", "/book"], items: [
    { title: "AI Transformation Planning", note: "Assess, build, amplify: our process, start to finish", href: "/transformation" },
    { title: "Workflows and Automation", note: "Automation and AI agents for the repetitive work", href: "/services/workflows-and-automation" },
    { title: "Leadership Workshops and Training", note: "Leading your company through AI, then the whole team", href: "/services/leadership-workshops" }
  ] },
  { label: "Learning", paths: ["/education", "/learning", "/courses", "/diagnostic"], items: [
    { title: "Courses", note: "Every course, in two tracks", href: "/courses" },
    { title: "The Platform", note: "What leadership sees", href: "/learning/platform" },
    { title: "Workshops", note: "Leaders first, then the whole company", href: "/learning/workshops" }
  ] },
  { label: "Resources", paths: ["/resources"], items: [
    { title: "White Papers", note: "The thinking behind how we work", href: "/resources/white-papers" },
    { title: "Newsletters", note: "Hear about the next paper", href: "/resources/newsletters" },
    { title: "Playbooks", note: "Coming soon", href: "/resources/playbooks" },
    { title: "Worksheets", note: "Coming soon", href: "/resources/worksheets" }
  ] },
  { label: "About", paths: ["/about"], items: [
    { title: "Our Team", note: "The people in the room", href: "/about/team" },
    { title: "Advisory Board", note: "Who we answer to", href: "/about/advisory-board" }
  ] }
];
