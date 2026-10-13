/*
  Site-wide links and the main menu. The header (desktop dropdowns and mobile menu) and the
  footer read from here, so every page stays in sync.
  Links to documents that live on the current site (guide, papers, case) point at oceancrest.ai.
*/
export const LIVE = "https://oceancrest.ai";
// The two assessments, named plainly (Ben, 2026-10-13): the company one is "Assess your business"
// (the external readiness assessment); the personal quiz at /diagnostic is "Check your AI skills".
export const READINESS = "https://ocv-ai-assessment.netlify.app/";
export const ASSESS_LABEL = "Assess your business";
export const SKILLS_LABEL = "Check your AI skills";

// Booking: Ben's Calendly event, embedded on /book. Keep MEETING_MINUTES equal to the event's length in
// Calendly (60 today; Ben may move to a 20–30 minute intro); every mention of the call reads from here.
export const BOOKING_URL = "https://calendly.com/ben-eydlin/oceancrest";
export const MEETING_MINUTES: number = 60;
/** "an hour-long video call" / "a 30-minute video call" */
export const MEETING = MEETING_MINUTES === 60 ? "an hour-long video call" : `a ${MEETING_MINUTES}-minute video call`;
/** "An hour" / "30 minutes" */
export const MEETING_LENGTH = MEETING_MINUTES === 60 ? "An hour" : `${MEETING_MINUTES} minutes`;
const cap = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
export const MEETING_CAP = cap(MEETING);

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
    { title: "AI Transformation Planning", note: "Assess, build, measure: our process, start to finish", href: "/transformation" },
    { title: "Workflows and Automation", note: "Automation and AI agents for the repetitive work", href: "/services/workflows-and-automation" },
    { title: "Leadership Workshops and Training", note: "Leading your company through AI, then the whole team", href: "/services/leadership-workshops" }
  ] },
  { label: "Learning", paths: ["/education", "/learning", "/courses", "/diagnostic"], items: [
    { title: "Courses", note: "Every course, in two tracks", href: "/courses" },
    { title: "The Platform", note: "What leadership sees", href: "/learning/platform" },
    { title: "Workshops", note: "Leaders first, then the whole company", href: "/learning/workshops" },
    { title: "Check Your AI Skills", note: "Fifteen questions, about five minutes", href: "/diagnostic" }
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
