"use client";
/*
  THE AI DIAGNOSTIC. An individual self-check that runs entirely in the browser: no network calls,
  no sign-up. 15 scenario questions, 3 in each of 5 areas. Levels from the total score:
    0-5 Wading · 6-9 Swimming · 10-12 Sailing · 13-15 Navigating
  The last result is kept in localStorage ("oc-diagnostic-last") so it can be shown on return.
  No benchmarks or comparisons with other people: it is a self-check, not a certification.

  Debug hooks (harmless; never saved): #demo=intro · #demo=resume · #demo=q5 (unanswered)
  · #demo=q5a (answered, wrong) · #demo=q5r (answered, right) · #demo=results · #demo=results-low
  · #demo=results-top
*/
import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import Link from "next/link";
import Coast from "@/components/Coast";
import CourseCard from "@/components/CourseCard";
import { PROGRAMS, courseById } from "@/lib/courses";
import type { Course, Program } from "@/lib/courses";
import type { Palette, Scene } from "@/lib/coast";
import { playSound, sparkle } from "@/lib/sea";

/* ---------------- content ---------------- */
type AreaId = "basics" | "prompting" | "checking" | "data" | "automating";
type LevelId = "wading" | "swimming" | "sailing" | "navigating";
interface Area { id: AreaId; name: string; tag: string; c: string; palette: Palette; scene: Scene; line: string }
interface Lvl { id: LevelId; name: string; min: number; max: number; tag: string; c: string; line: string }
interface Question { area: AreaId; a: number; q: string; o: string[]; why: string }

const AREAS: Area[] = [
  { id: "basics", name: "What AI is", tag: "t", c: "var(--shallows)", palette: "hero", scene: "cove",
    line: "What it's good at, where it goes wrong, and why." },
  { id: "prompting", name: "Prompting", tag: "lilac", c: "var(--lilac)", palette: "technical", scene: "headland",
    line: "Giving it the context, examples and format to get a usable answer." },
  { id: "checking", name: "Checking the output", tag: "sun", c: "var(--dawn)", palette: "mindset", scene: "open",
    line: "Spotting made-up facts and checking numbers before they go out." },
  { id: "data", name: "Data and safety", tag: "e", c: "var(--blush)", palette: "dusk", scene: "beach",
    line: "What never goes into a public tool, and which accounts to use." },
  { id: "automating", name: "Automating the work", tag: "sage", c: "var(--sage)", palette: "technical", scene: "open",
    line: "Which tasks are worth automating, and where a person stays in charge." }
];

const LEVELS: Lvl[] = [
  { id: "wading", name: "Wading", min: 0, max: 5, tag: "sand", c: "var(--sand)",
    line: "Getting your feet wet. The basics will pay off quickly." },
  { id: "swimming", name: "Swimming", min: 6, max: 9, tag: "t", c: "var(--shallows)",
    line: "Using AI and getting somewhere, with a few gaps that could cost you." },
  { id: "sailing", name: "Sailing", min: 10, max: 12, tag: "sage", c: "var(--sage)",
    line: "Using AI well and safely, with a gap or two to close." },
  { id: "navigating", name: "Navigating", min: 13, max: 15, tag: "lilac", c: "var(--lilac)",
    line: "Confident and careful. Ready to build, and to help others find their way." }
];

// a = index of the best answer
const Q: Question[] = [
  { area: "basics", a: 1,
    q: "An AI chat tool gives you a wrong answer in a completely confident tone. Why can that happen?",
    o: ["It's designed to hide its mistakes so it seems more useful.",
        "It predicts likely words from patterns it learned, and how sure it sounds isn't tied to whether it's right.",
        "It only makes mistakes when the internet connection drops mid-answer.",
        "It checked a database first, so the database must have been wrong."],
    why: "Chat tools generate text by predicting likely words from patterns in what they learned. That makes them fluent, but fluency isn't accuracy, and the tone doesn't change when the facts are wrong. Treat confidence as style, not evidence." },
  { area: "basics", a: 2,
    q: "Your manager asks an AI chat tool about a rule change your industry regulator announced last week. What should you expect?",
    o: ["It will know, because models update themselves from the news every day.",
        "It will refuse, because AI tools can't discuss regulations.",
        "Unless it searches the web or you give it the announcement, it may not know, and may answer anyway.",
        "It will know, as long as you ask in a formal tone."],
    why: "A model learns from data up to a cutoff date. Unless the tool searches the web or you paste in the source, it may not know about last week's change, and it can still answer as if it does. Give it the announcement, or check the regulator's own site." },
  { area: "basics", a: 0,
    q: "Which of these is a general AI chat assistant best suited to, as it comes?",
    o: ["Drafting a first version of a customer email from your bullet points.",
        "Telling you the exact current balance of your business bank account.",
        "Making the final call on which job applicant to hire.",
        "Guaranteeing that a contract is legally sound."],
    why: "Drafting from your notes plays to its strengths: language, structure and speed, with you checking the result. It can't see your bank account unless it's connected to it, it shouldn't make decisions about people, and it can't guarantee anything is legally sound." },

  { area: "prompting", a: 3,
    q: "You need an email to a client whose invoice is overdue. Which prompt will most likely get a usable first draft?",
    o: ["“Write a payment reminder email.”",
        "“You are the world's best writer. Write the perfect email about the invoice.”",
        "“WRITE A FIRM EMAIL ABOUT THE LATE INVOICE AND MAKE IT GOOD.”",
        "“Write a polite but firm reminder to a long-time client whose invoice is 15 days overdue. Under 120 words, offer a quick call, no threats about fees.”"],
    why: "Good prompts give the context a new colleague would need: who it's for, the facts, the tone, the length, and what to avoid. Flattery and capital letters add no information. Specifics do." },
  { area: "prompting", a: 1,
    q: "The first draft you get is close, but too long and too formal. What's the best next step?",
    o: ["Paste the same prompt again until it comes out right.",
        "Reply in the same chat with specific changes: half the length, plainer words, keep the second paragraph.",
        "Accept it as is, since AI output can't really be adjusted.",
        "Switch to a different AI tool, since this one got it wrong."],
    why: "Iterating is normal. The tool keeps the conversation in view, so precise feedback on what to change usually gets you there faster than starting over or switching tools." },
  { area: "prompting", a: 0,
    q: "You want AI to write product descriptions that sound like your shop. What helps most?",
    o: ["Paste two or three of your best descriptions as examples, and say what to copy: length, tone, structure.",
        "Ask it to be as creative as possible and surprise you.",
        "Keep the prompt very short so it doesn't get confused.",
        "Tell it the job is urgent so it tries harder."],
    why: "Examples are the clearest way to show a style. Saying what to copy from them helps it match your voice instead of inventing a generic one." },

  { area: "checking", a: 2,
    q: "An AI tool drafts a summary for a client report, with three statistics, each with a source link. What do you do before sending it?",
    o: ["Send it. The links show the sources were checked.",
        "Ask the tool “are you sure?” and send it if it says yes.",
        "Open each source and confirm the figure is there and says what the summary claims.",
        "Remove the links so the report looks cleaner."],
    why: "AI tools can produce sources that look real but don't exist, or real links that don't say what the summary claims. A link is not a check, and asking the tool to check itself isn't either. Open each one, find the figure, and read it in context." },
  { area: "checking", a: 3,
    q: "You paste last quarter's expenses into an AI tool and ask for the total. The number looks about right. What's the best check?",
    o: ["None needed. Computers don't make arithmetic mistakes.",
        "Run the same prompt again. If the number matches, it's right.",
        "Round it to the nearest thousand so small errors don't matter.",
        "Compare it with the spreadsheet's own sum before you use it."],
    why: "A language model can slip on arithmetic or miss a row, and asking twice can repeat the same mistake. Check numbers against the source itself, such as the spreadsheet's own total." },
  { area: "checking", a: 1,
    q: "An AI-drafted reply to a customer complaint reads well. What matters most before you send it?",
    o: ["That it's long enough to look thorough.",
        "That every fact and promise is true: the refund amount, the dates, and what your policy actually allows.",
        "That it uses the customer's name several times.",
        "Nothing, if the customer is unlikely to write again."],
    why: "A polished reply can still promise a refund you don't offer or quote the wrong date. Whatever goes out under your name is yours, so check every fact and commitment against your actual policy." },

  { area: "data", a: 0,
    q: "Which of these is fine to paste into a free AI chatbot your company hasn't approved?",
    o: ["A customer email template with the names, addresses and account numbers taken out.",
        "Last month's customer list, so it can personalize each email.",
        "A signed supplier contract, so it can summarize the terms.",
        "A colleague's performance review, so it can soften the wording."],
    why: "Customer lists, contracts and staff reviews hold personal or confidential information that shouldn't go into a tool your company hasn't approved. A template with the details stripped out gets you the same writing help without the risk." },
  { area: "data", a: 2,
    q: "Your company pays for a business AI account set up with data protections. You also have a personal account at home. A client asks for a summary of their confidential proposal. What should you use?",
    o: ["Your personal account, since it's the same kind of tool.",
        "Whichever is quicker to open at the time.",
        "The company-approved account, following your company's AI policy.",
        "Either one, as long as you delete the chat afterwards."],
    why: "A company account is set up under terms and controls your company chose; a personal account may handle your data differently. Deleting a chat afterwards doesn't undo having shared it. Use the approved account and follow the policy." },
  { area: "data", a: 3,
    q: "You get a voicemail that sounds exactly like the owner, asking you to pay a new supplier today, urgently. What do you do?",
    o: ["Pay it. You'd know the owner's voice anywhere.",
        "Call back the number that left the voicemail to confirm.",
        "Send a smaller amount first, then the rest once it clears.",
        "Call the owner on a number you already have, and follow your normal payment approval steps."],
    why: "Voices can now be convincingly copied with AI. Urgency plus a new payee is a classic warning sign. Confirm through a channel you already trust, and never skip your normal approval steps." },

  { area: "automating", a: 1,
    q: "Which of these is the best first candidate for automation?",
    o: ["Deciding how to handle a key client's unusual complaint.",
        "Copying each new website enquiry into your CRM and sending a standard acknowledgement.",
        "Negotiating the price of a large one-off contract.",
        "Setting the company's strategy for next year."],
    why: "Good first candidates are frequent, repetitive and rule-based, with clear inputs and a predictable result. Unusual complaints, one-off negotiations and strategy need judgment, so a person should lead them." },
  { area: "automating", a: 2,
    q: "Your team wants to use AI to help screen job applications. What's the responsible setup?",
    o: ["Let it auto-reject anyone below a set score, to save time.",
        "Use it only on the applications nobody has time to read.",
        "Let it help sort and summarize, while a person makes every decision and you check the results for unfair patterns.",
        "Keep the process private so candidates can't question it."],
    why: "Decisions about people need human judgment and accountability. AI can repeat bias from the data it learned from, so a person should make every decision and the results should be checked for unfair patterns. Some places also regulate automated hiring decisions." },
  { area: "automating", a: 0,
    q: "In an automation tool, what does a “trigger” do?",
    o: ["Starts the workflow when something happens, like a form being submitted or an email arriving.",
        "Writes the content using AI.",
        "Sends the final result to the customer.",
        "Warns you when the automation has failed."],
    why: "A trigger is the event that starts an automation. Connectors link your apps so the automation can read from and act in them, and the steps that follow the trigger are the actions." }
];

const AREA_COURSES: Record<AreaId, string[]> = {
  basics: ["ai-fundamentals", "m-without-fear"],
  prompting: ["ai-assistant", "ai-fundamentals", "writing"],
  checking: ["research", "research-analysis", "ai-fundamentals"],
  data: ["ai-safety", "m-responsible"],
  automating: ["no-code-automation", "connectors", "ai-agents"]
};
const ADVANCED = ["ai-agents", "ai-c-suite", "custom-gpts"];
const ROLES: [string, string][] = [["leader", "Owner or leader"], ["manager", "Manager"], ["ic", "Individual contributor"]];
const DEPTS: [string, string, string][] = [["sales", "Sales", "sales"], ["marketing", "Marketing", "marketing"], ["finance", "Finance", "finance"],
  ["ops", "Operations and HR", "ops-hr"], ["service", "Customer service", "customer-service"], ["other", "Something else", ""]];

const TIPS: Record<LevelId, string[]> = {
  wading: ["Start with AI Fundamentals for Work: prompting, what AI is good and bad at, and how to check its work.",
           "Pick one low-risk task this week, like a first draft of an internal email, and try it in a company-approved tool.",
           "Before you paste anything, ask: would I be fine if someone outside the company read this?"],
  swimming: ["Give every prompt the context a new colleague would need: who it's for, what good looks like, and an example.",
             "Make checking a habit: open the sources and recheck the numbers before anything goes out.",
             "Start with the course for your weakest area below."],
  sailing: ["Close your weakest area first. One gap can undo good habits elsewhere.",
            "Turn a prompt that works into a saved template or a custom assistant your team can reuse.",
            "List the repetitive, rule-based tasks in your week. One may be ready to automate."],
  navigating: ["Write down how you use AI safely and share it. Your habits can become the team's.",
               "Build something: an internal assistant or a small automation, with a person approving the key steps.",
               "Find out where the rest of your team stands. That's where what you know is most useful."]
};

/* ---------------- helpers ---------------- */
type Answers = (number | null)[];
interface Profile { role: string; dept: string }
interface Saved { at: string | null; answers: number[]; profile: Profile }
interface Score { per: Record<AreaId, number>; pct: Record<AreaId, number>; total: number; level: Lvl }

const KEY = "oc-diagnostic-last";
const NO_PROFILE: Profile = { role: "", dept: "" };
const SAMPLE = [1, 2, 0, 3, 0, 0, 0, 3, 0, 0, 2, 3, 1, 0, 0];     // 11 of 15: Sailing, weakest in checking
const LOW    = [0, 2, 1, 0, 0, 0, 2, 0, 1, 0, 0, 1, 1, 0, 1];     // 5 of 15: Wading

function reduced(): boolean { return typeof window !== "undefined" && !!window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches; }
function blank(): Answers { return Q.map(() => null); }
function areaById(id: AreaId): Area { return AREAS.find((a) => a.id === id) || AREAS[0]; }
function levelFor(total: number): Lvl { return LEVELS.find((l) => total >= l.min && total <= l.max) || LEVELS[0]; }
function areaQs(id: AreaId): number[] { const out: number[] = []; Q.forEach((q, i) => { if (q.area === id) out.push(i); }); return out; }
function nameOf(list: [string, string, ...string[]][], id: string): string { const r = list.find((x) => x[0] === id); return r ? r[1] : ""; }
function asProfile(p: unknown): Profile {
  const o = (p && typeof p === "object" ? p : {}) as Partial<Record<keyof Profile, unknown>>;
  return { role: typeof o.role === "string" ? o.role : "", dept: typeof o.dept === "string" ? o.dept : "" };
}

function loadSaved(): Saved | null {
  try {
    const raw = localStorage.getItem(KEY); if (!raw) return null;
    const d: unknown = JSON.parse(raw);
    if (!d || typeof d !== "object") return null;
    const o = d as { at?: unknown; answers?: unknown; profile?: unknown };
    if (!Array.isArray(o.answers) || o.answers.length !== Q.length) return null;
    const answers: unknown[] = o.answers;
    if (answers.some((a) => typeof a !== "number" || a < 0 || a > 3)) return null;
    return { at: typeof o.at === "string" ? o.at : null, answers: answers as number[], profile: asProfile(o.profile) };
  } catch { return null; }
}
function forget() { try { localStorage.removeItem(KEY); } catch { /* storage blocked */ } }

function score(answers: Answers): Score {
  const per = {} as Record<AreaId, number>, pct = {} as Record<AreaId, number>;
  let total = 0;
  AREAS.forEach((a) => { per[a.id] = 0; });
  Q.forEach((q, i) => { if (answers[i] === q.a) { per[q.area]++; total++; } });
  AREAS.forEach((a) => { pct[a.id] = Math.round(per[a.id] / areaQs(a.id).length * 100); });
  return { per, pct, total, level: levelFor(total) };
}

function fmtDate(iso: string): string {
  try { return new Date(iso).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" }); } catch { return ""; }
}

function recommend(sc: Score, profile: Profile): { c: Course; why: string }[] {
  let picks: string[] = [];
  const add = (id: string): boolean => { if (id && picks.indexOf(id) < 0 && courseById(id)) { picks.push(id); return true; } return false; };
  const order = AREAS.slice().sort((a, b) => sc.pct[a.id] - sc.pct[b.id] || AREAS.indexOf(a) - AREAS.indexOf(b));
  const weak = order.filter((a) => sc.pct[a.id] < 100);
  const why: Record<string, string> = {};
  if (sc.level.id === "wading") { add("ai-fundamentals"); why["ai-fundamentals"] = "Start here"; }
  weak.slice(0, 3).forEach((a) => {
    const list = AREA_COURSES[a.id];
    for (let i = 0; i < list.length; i++) { if (add(list[i])) { why[list[i]] = "For " + a.name.toLowerCase(); break; } }
  });
  if (picks.length < 2 && weak[0]) AREA_COURSES[weak[0].id].forEach((id) => { if (picks.length < 2 && add(id)) why[id] = "For " + weak[0].name.toLowerCase(); });
  if (!weak.length) ADVANCED.forEach((id) => { if (add(id)) why[id] = "Your next step: build"; });
  picks = picks.slice(0, 3);
  const dept = DEPTS.find((d) => d[0] === profile.dept && d[2]);
  if (dept && add(dept[2])) why[dept[2]] = "For your work in " + dept[1].toLowerCase();
  return picks.slice(0, 4).flatMap((id) => { const c = courseById(id); return c ? [{ c, why: why[id] || "" }] : []; });
}
function programFor(profile: Profile): Program | null {
  const id = profile.role === "leader" ? "business-leaders" : "applied-ai";
  return PROGRAMS.find((p) => p.id === id) || null;
}

/* ---------------- sounding chart ---------------- */
// A depth profile: the shallows on the left, open water on the right. The lead line marks the score.
function Sounding({ sc }: { sc: Score }) {
  const W = 600, H = 232, top = 70;
  const bed = (x: number) => 104 + 108 * Math.pow(x / W, 1.35);
  const pts: string[] = []; for (let x = 0; x <= W; x += 20) pts.push(x + " " + bed(x).toFixed(1));
  const seabed = "M0 " + bed(0).toFixed(1) + " L" + pts.join(" L") + " L" + W + " " + H + " L0 " + H + " Z";
  const water = "M0 " + top + " L" + W + " " + top + " L" + pts.slice().reverse().join(" L") + " Z";
  const zw = W / LEVELS.length, lv = sc.level, li = LEVELS.indexOf(lv);
  const px = li * zw + zw * (sc.total - lv.min + 0.5) / (lv.max - lv.min + 1), py = bed(px);
  const labX = Math.min(Math.max(px, 60), W - 60);
  const mono = "Geist Mono, monospace";
  return (
    <svg viewBox={"0 0 " + W + " " + H} role="img" aria-label={"Depth chart: the four levels from the shallows to open water. Your score of " + sc.total + " of " + Q.length + " sits in " + lv.name + "."}>
      <path d={water} fill="#a8dde3" fillOpacity=".45" />
      <path d={"M0 " + top + "H" + W} stroke="#4a8fb8" strokeOpacity=".6" />
      <path d={seabed} fill="#f2e3c6" />
      <path d={"M0 " + bed(0).toFixed(1) + " L" + pts.join(" L")} fill="none" stroke="#16202e" strokeOpacity=".35" />
      {LEVELS.map((l, i) => {
        const x0 = i * zw, cur = l === lv;
        return (
          <g key={l.id}>
            {i > 0 && <path d={"M" + x0 + " " + top + "V" + bed(x0).toFixed(1)} stroke="#16202e" strokeOpacity=".18" strokeDasharray="3 5" />}
            <text x={x0 + zw / 2} y="18" textAnchor="middle" fontFamily={mono} fontSize="14" letterSpacing="1.2" fill={cur ? "#16202e" : "#64748b"} fontWeight={cur ? "500" : undefined}>{l.name.toUpperCase()}</text>
            <text x={x0 + zw / 2} y="36" textAnchor="middle" fontFamily={mono} fontSize="12" fill="#71717a">{l.min + "–" + l.max}</text>
          </g>
        );
      })}
      {[[70, 2], [190, 4], [300, 7], [410, 11], [530, 16]].map((m) => (
        <text key={m[0]} x={m[0]} y={(bed(m[0]) - 10).toFixed(1)} fontFamily={mono} fontSize="10" fill="#1f4e70" fillOpacity=".45" textAnchor="middle">{m[1]}</text>
      ))}
      <g transform={"translate(" + px.toFixed(1) + " " + top + ")"}>
        <path d="M-14 -2h28l-5 6h-18z" fill="#1f4e70" />
        <path d="M0 -4v-22l12 20z" fill="#ffffff" stroke="#1f4e70" strokeWidth="1" />
        <path d="M-2 -5v-16l-8 15z" fill="#f4b8a2" />
      </g>
      <path d={"M" + px.toFixed(1) + " " + (top + 4) + "V" + (py - 6).toFixed(1)} stroke="#2563eb" strokeWidth="1.5" strokeDasharray="2 3" />
      <circle cx={px.toFixed(1)} cy={py.toFixed(1)} r="6" fill="#2563eb" />
      <circle cx={px.toFixed(1)} cy={py.toFixed(1)} r="11" fill="none" stroke="#2563eb" strokeOpacity=".35" />
      <g transform={"translate(" + labX.toFixed(1) + " " + Math.min(py + 26, H - 6).toFixed(1) + ")"}>
        <rect x="-54" y="-15" width="108" height="24" rx="12" fill="#ffffff" />
        <text textAnchor="middle" y="2" fontFamily={mono} fontSize="13" fill="#16202e">{"YOU · " + sc.total + "/" + Q.length}</text>
      </g>
    </svg>
  );
}

/* ---------------- results ---------------- */
interface ResultsProps { answers: Answers; profile: Profile; at: string | null; demo: boolean; quiet: boolean; focus: boolean; onRetake: () => void; onShown: () => void }

// Remounted (by key) for every showing, so the bars, badge, sound and light play each time.
function Results({ answers, profile, at, demo, quiet, focus, onRetake, onShown }: ResultsProps) {
  const [barsOn, setBarsOn] = useState(false);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sc = score(answers), lv = sc.level;

  useEffect(() => {
    let r2 = 0;
    const r1 = requestAnimationFrame(() => { r2 = requestAnimationFrame(() => setBarsOn(true)); });
    let t: ReturnType<typeof setTimeout> | undefined;
    if (!quiet) {
      playSound("chime");
      t = setTimeout(() => { if (badgeRef.current) sparkle(badgeRef.current); }, 350);
    }
    onShown();
    if (focus) titleRef.current?.focus({ preventScroll: true });
    return () => { cancelAnimationFrame(r1); cancelAnimationFrame(r2); if (t) clearTimeout(t); };
  }, []); // once per showing: the parent keys this component

  const order = AREAS.slice().sort((a, b) => sc.pct[b.id] - sc.pct[a.id] || AREAS.indexOf(a) - AREAS.indexOf(b));
  const strong = order[0], weak = order[order.length - 1], even = sc.pct[strong.id] === sc.pct[weak.id];
  const recs = recommend(sc, profile), prog = programFor(profile);
  const tailor: string[] = [];
  if (profile.role) tailor.push(nameOf(ROLES, profile.role));
  if (profile.dept && profile.dept !== "other") tailor.push(nameOf(DEPTS, profile.dept));
  const crew = ["var(--sand)", "var(--sage)", "var(--shallows)", "var(--sand)", "var(--lilac)", "var(--shallows)", "var(--sage)", "var(--shallows)", "var(--sand)"];

  return (
    <>
      <Coast seed={"diagnostic-result-" + lv.id} palette="dusk" size="wide" scene="cove" glints className="res-banner has-contours">
        <div className="badge" id="badge" ref={badgeRef} style={{ "--lv": lv.c }}>
          <span className="ref">Your level</span><b>{lv.name}</b><span className="ref">{sc.total} of {Q.length} right</span>
        </div>
        <div className="res-card">
          <span className="ref">{demo ? "Sample result · not saved" : "Your result" + (at ? " · " + fmtDate(at) : "")}</span>
          <h2 className="h2" id="res-title" tabIndex={-1} ref={titleRef}>You&apos;re {lv.name.toLowerCase()}.</h2>
          <p className="lede">{lv.line}</p>
          {tailor.length > 0 && <p className="ref tailor">Suggestions tailored for: {tailor.join(" · ")}</p>}
        </div>
      </Coast>

      <div className="res-grid">
        <div>
          <div className="eyebrow">Score in each area</div>
          <h3 className="h3">Where you stand, area by area.</h3>
          <div className="ares">
            {AREAS.map((a) => {
              const p = sc.pct[a.id];
              return (
                <div className="ar" key={a.id}>
                  <span>{a.name}</span>
                  <div className={"bar " + (p >= 50 ? "t" : "e")} role="img" aria-label={a.name + ": " + p + " out of 100"}>
                    <i style={barsOn ? { width: Math.max(p, 0) + "%" } : undefined} />
                  </div>
                  <span>{p}</span>
                </div>
              );
            })}
          </div>
          <div className="callouts">
            {even ? (
              <div>
                <span className="ref">Across the board</span><b>Even in every area</b>
                <span className="s">{sc.pct[strong.id] === 100 ? "Every answer right. Time to build." : "No single area stands out, so the fundamentals will lift all five."}</span>
              </div>
            ) : (
              <>
                <div><span className="ref">Strongest</span><b>{strong.name}</b><span className="s">{sc.per[strong.id]} of 3 right</span></div>
                <div className="weak"><span className="ref">Weakest</span><b>{weak.name}</b><span className="s">{sc.per[weak.id]} of 3 right · start here</span></div>
              </>
            )}
          </div>
          <figure className="sounding" style={{ margin: "28px 0 0" }}>
            <Sounding sc={sc} />
            <figcaption className="ref">Sounding · the four levels, shallows to open water</figcaption>
          </figure>
        </div>
        <div className="res-next">
          <div className="eyebrow">Next steps for {lv.name.toLowerCase()}</div>
          <h3 className="h3">What to do this month.</h3>
          <ul className="ticks">{TIPS[lv.id].map((t) => <li key={t}><span>{t}</span></li>)}</ul>
        </div>
      </div>

      <div className="res-sec">
        <div className="head">
          <div><div className="eyebrow">Recommended for you</div><h3 className="h3" style={{ marginTop: 12 }}>Courses that close your gaps.</h3></div>
          <p className="body">Picked from your weakest areas{tailor.length ? " and what you told us about your work" : ""}. <Link className="link" href="/courses">See all the courses</Link></p>
        </div>
        <div className="cards">
          {recs.map((r) => <div className="rec" key={r.c.id}><span className="ref">{r.why}</span><CourseCard course={r.c} /></div>)}
        </div>
        {prog && (
          <Link className="prog" href="/education">
            <Coast className="art" seed={"program-" + prog.id} palette={prog.palette || "hero"} size="wide" scene="open"><span className="tag line">Flagship program</span></Coast>
            <div className="tx">
              <span className="ref">{prog.audience}</span>
              <h3>{prog.title}{prog.pa && <span className="pa" title="Working title">PA</span>}</h3>
              <p>{prog.summary}</p>
              <span className="ref">{prog.facts}</span>
              <span className="link" style={{ alignSelf: "flex-start", marginTop: 4 }}>The learning solution</span>
            </div>
          </Link>
        )}
      </div>

      <div className="res-sec team">
        <Coast className="art" seed="diagnostic-team" palette="mindset" size="wide" scene="beach" glints aria-hidden="true">
          <div className="crew">
            {crew.map((c, i) => <i key={i} style={{ "--c": c }} />)}
            <span className="ref">A team, at different depths</span>
          </div>
        </Coast>
        <div className="tx">
          <span className="half e">Your whole team</span>
          <h2 className="h2" style={{ marginTop: 16 }}>Now find out where your whole team <span className="stroke warm">stands</span>.</h2>
          <p className="body">One result tells you where to start. The real value is the whole picture: who is ready to build, who needs the basics, and which gaps the team shares. We run the same diagnostic across your team, then teach to the gaps, not the basics people already have.</p>
          <div className="btns">
            <Link className="btn primary" href="/book?about=learning">Book now <span className="arr" aria-hidden="true">&rarr;</span></Link>
            <Link className="btn" href="/courses">See the courses</Link>
          </div>
        </div>
      </div>

      <details className="review">
        <summary>See every question and the best answer</summary>
        <ol>
          {Q.map((q, i) => {
            const a = areaById(q.area), pick = answers[i], ok = pick === q.a;
            return (
              <li key={i}>
                <div className="top"><span className={"tag " + a.tag}>{a.name}</span><span className="ref">Question {i + 1} · {ok ? "Right" : "Not quite"}</span></div>
                <p className="q">{q.q}</p>
                <p><b>Your answer:</b> {pick == null ? "None" : q.o[pick]}</p>
                {!ok && <p><b>Best answer:</b> {q.o[q.a]}</p>}
                <p>{q.why}</p>
              </li>
            );
          })}
        </ol>
      </details>
      <div className="res-actions">
        <button type="button" className="btn" data-act="retake" onClick={onRetake}>Retake the diagnostic</button>
        <Link className="link" href="/education">How we teach a whole company</Link>
      </div>
      <p className="sources fine">This is a self-check, not a certification or a measure of how you do your job. Fifteen questions can&apos;t cover everything you know; use it to decide where to start. Your answers stay in this browser and are never sent to us.</p>
    </>
  );
}

/* ---------------- the stage ---------------- */
type Screen = "boot" | "intro" | "question" | "results";
interface State {
  screen: Screen;
  rev: number;               // bumped on every render of a screen, so it replays its entrance
  i: number;
  answers: Answers;
  profile: Profile;
  at: string | null;
  demo: boolean;             // a #demo hook: nothing is saved, and the stage is still
  saved: Saved | null;       // the result offered on the intro ("Welcome back")
  swap: boolean;             // animate the question as it swaps in
  quiet: boolean;            // results: no chime or light
  focusResults: boolean;
}

export default function Diagnostic() {
  const [S, setS] = useState<State>({
    screen: "boot", rev: 0, i: 0, answers: blank(), profile: NO_PROFILE, at: null, demo: false,
    saved: null, swap: false, quiet: false, focusResults: true
  });
  const [barW, setBarW] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  // Work to do once React has put the next render on screen (focus, scrolling).
  const after = useRef<(() => void)[]>([]);
  const later = (fn: () => void) => { after.current.push(fn); };
  useEffect(() => {
    const fns = after.current; after.current = [];
    fns.forEach((fn) => fn());
  });

  const bringIntoView = useCallback(() => {
    const stage = stageRef.current; if (!stage) return;
    const top = stage.getBoundingClientRect().top;
    if (top < 60 || top > window.innerHeight * 0.45) {
      window.scrollTo({ top: window.scrollY + top - 88, behavior: reduced() ? "auto" : "smooth" });
    }
  }, []);
  const focusId = (id: string) => { const el = document.getElementById(id); if (el) el.focus({ preventScroll: true }); };

  // The progress bar starts where it was and slides to the new position.
  const pct = Math.round(S.i / Q.length * 100);
  useEffect(() => {
    if (S.screen !== "question") return;
    let r2 = 0;
    const r1 = requestAnimationFrame(() => { r2 = requestAnimationFrame(() => setBarW(Math.max(pct, 2))); });
    return () => { cancelAnimationFrame(r1); cancelAnimationFrame(r2); };
  }, [S.screen, S.rev, pct]);

  /* ---------------- boot, with harmless #demo hooks ---------------- */
  useEffect(() => {
    function boot() {
      const m = /^#demo=([\w-]+)$/.exec(location.hash || "");
      if (!m) { setS((s) => ({ ...s, screen: "intro", rev: s.rev + 1, demo: false, saved: loadSaved() })); return; }
      const d = m[1], qm = /^q(\d+)([ar]?)$/.exec(d);
      if (d === "results" || d === "results-low" || d === "results-top") {
        const answers = d === "results" ? SAMPLE.slice() : d === "results-low" ? LOW.slice() : Q.map((q) => q.a);
        setS((s) => ({ ...s, screen: "results", rev: s.rev + 1, demo: true, at: null, answers,
          profile: d === "results-low" ? { role: "manager", dept: "sales" } : s.profile, quiet: true, focusResults: false }));
      } else if (qm) {
        const n = Math.min(Math.max(+qm[1], 1), Q.length) - 1;
        const answers = blank();
        for (let i = 0; i < n; i++) answers[i] = SAMPLE[i];
        if (qm[2]) { const q = Q[n]; answers[n] = qm[2] === "r" ? q.a : (q.a + 1) % 4; }
        setBarW(Math.round(n / Q.length * 100));
        setS((s) => ({ ...s, screen: "question", rev: s.rev + 1, demo: true, at: null, answers, i: n, swap: false }));
      } else if (d === "resume") {
        setS((s) => ({ ...s, screen: "intro", rev: s.rev + 1, demo: true, at: null,
          saved: { at: new Date().toISOString(), answers: SAMPLE.slice(), profile: NO_PROFILE } }));
      } else {
        setS((s) => ({ ...s, screen: "intro", rev: s.rev + 1, demo: true, at: null, saved: null }));
      }
    }
    boot();
    window.addEventListener("hashchange", boot);
    return () => window.removeEventListener("hashchange", boot);
  }, []);

  /* ---------------- actions ---------------- */
  function goQuestion(i: number, from?: Partial<State>) {
    setS((s) => ({ ...s, ...from, screen: "question", rev: s.rev + 1, i, swap: true }));
    later(() => { bringIntoView(); focusId("q-text"); });
  }
  function start(extra?: Partial<State>) {
    setBarW(0);
    goQuestion(0, { ...extra, answers: blank(), at: null });
  }
  function answer(k: number) {
    if (S.answers[S.i] != null) return;
    const answers = S.answers.slice(); answers[S.i] = k;
    setS({ ...S, answers });
    later(() => {
      stageRef.current?.querySelector<HTMLButtonElement>('[data-act="next"]')?.focus({ preventScroll: true });
      const fb = stageRef.current?.querySelector(".fb");
      if (fb) {
        const r = fb.getBoundingClientRect();
        if (r.bottom > window.innerHeight - 20) window.scrollBy({ top: r.bottom - window.innerHeight + 90, behavior: reduced() ? "auto" : "smooth" });
      }
    });
  }
  function next() {
    if (S.i < Q.length - 1) { goQuestion(S.i + 1); return; }
    // Finish: date it, keep it in this browser (unless it's a demo), show the results.
    const at = new Date().toISOString();
    if (!S.demo) {
      try { localStorage.setItem(KEY, JSON.stringify({ v: 1, at, answers: S.answers, profile: S.profile })); } catch { /* storage blocked */ }
    }
    setS({ ...S, at, screen: "results", rev: S.rev + 1, quiet: false, focusResults: true });
  }
  function back() {
    if (S.i > 0) { goQuestion(S.i - 1); return; }
    setS({ ...S, screen: "intro", rev: S.rev + 1, saved: S.demo ? null : loadSaved() });
    later(bringIntoView);
  }
  function showLast() {
    const d = loadSaved(); if (!d) return;
    setS({ ...S, answers: d.answers, profile: d.profile, at: d.at, screen: "results", rev: S.rev + 1, quiet: false, focusResults: true });
  }
  function toggle(key: keyof Profile, val: string) {
    setS({ ...S, profile: { ...S.profile, [key]: S.profile[key] === val ? "" : val } });
  }

  // Keys A to D (or 1 to 4) pick an answer; arrows, Home and End move between the options.
  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const stage = stageRef.current;
    if (S.screen !== "question" || !stage) return;
    const opts = Array.from(stage.querySelectorAll<HTMLButtonElement>(".opt"));
    const answered = S.answers[S.i] != null;
    const idx = opts.indexOf(document.activeElement as HTMLButtonElement);
    const k = e.key;
    const tag = e.target instanceof Element ? e.target.tagName : "";
    if (!answered && !e.metaKey && !e.ctrlKey && !e.altKey && /^[a-dA-D1-4]$/.test(k) && !/INPUT|TEXTAREA/.test(tag)) {
      const n = /\d/.test(k) ? +k - 1 : k.toLowerCase().charCodeAt(0) - 97;
      if (opts[n]) { e.preventDefault(); opts[n].focus(); opts[n].click(); }
      return;
    }
    if (idx < 0) return;
    let to: number | null = null;
    if (k === "ArrowDown" || k === "ArrowRight") to = (idx + 1) % opts.length;
    else if (k === "ArrowUp" || k === "ArrowLeft") to = (idx - 1 + opts.length) % opts.length;
    else if (k === "Home") to = 0;
    else if (k === "End") to = opts.length - 1;
    if (to != null) { e.preventDefault(); opts[to].focus(); }
  }

  /* ---------------- screens ---------------- */
  let screen: ReactNode = null, cls = "", key = "";

  if (S.screen === "intro") {
    cls = "intro"; key = "intro-" + S.rev;
    const saved = S.saved, sv = saved ? score(saved.answers) : null;
    const chips = (list: [string, string, ...string[]][], k: keyof Profile, label: string) => (
      <div className="chip-row" role="group" aria-label={label}>
        <span className="ref">{label}</span>
        {list.map((r) => (
          <button type="button" className="chip" key={r[0]} {...{ ["data-" + k]: r[0] }} aria-pressed={S.profile[k] === r[0]} onClick={() => toggle(k, r[0])}>
            <i aria-hidden="true" />{r[1]}
          </button>
        ))}
      </div>
    );
    screen = (
      <>
        {saved && sv && (
          <div className="resume" id="resume">
            <p>Welcome back. {saved.at ? "On " + fmtDate(saved.at) + " you" : "Last time you"} reached <b>{sv.level.name}</b>, {sv.total} of {Q.length}.</p>
            <div className="btns">
              <button type="button" className="btn sm primary" data-act="show-last" onClick={showLast}>Show my last result</button>
              <button type="button" className="btn sm ghost" data-act="forget" onClick={() => { forget(); setS({ ...S, saved: null }); }}>Clear it</button>
            </div>
          </div>
        )}
        <div className="intro-grid">
          <div>
            <div className="eyebrow">How it works</div>
            <h2 className="h3">Fifteen questions in five areas.</h2>
            <p className="body">Each question is a situation you could meet at work this week. Pick the best answer and you&apos;ll see why straight away. You can go back, but not change an answer once you&apos;ve seen why.</p>
            <ul className="areas">
              {AREAS.map((a) => <li key={a.id} style={{ "--ac": a.c }}><b>{a.name}</b><em>3 questions</em><span>{a.line}</span></li>)}
            </ul>
          </div>
          <div>
            <div className="eyebrow">The four levels</div>
            <h2 className="h3">From the shallows to open water.</h2>
            <ol className="levels">
              {LEVELS.map((l, i) => (
                <li key={l.id} style={{ "--lv": l.c }}>
                  <span className="pebble sm" aria-hidden="true">{i + 1}</span>
                  <div><b>{l.name}</b><span>{l.line}</span></div>
                  <em>{l.min}–{l.max} right</em>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="profile">
          <div>
            <div className="eyebrow">Optional · about you</div>
            <p className="note">Only used to tailor the courses we suggest. Skip it if you like.</p>
            {chips(ROLES, "role", "Your role")}
            {chips(DEPTS, "dept", "Your department")}
          </div>
          <div className="start-col">
            <button type="button" className="btn primary big" data-act="start" onClick={() => start()}>Start the diagnostic <span className="arr" aria-hidden="true">&rarr;</span></button>
            <span className="ref">Free · no sign-up · results stay in your browser</span>
          </div>
        </div>
      </>
    );
  } else if (S.screen === "question") {
    const q = Q[S.i], area = areaById(q.area), list = areaQs(q.area), pos = list.indexOf(S.i);
    const pick = S.answers[S.i], answered = pick != null, right = pick === q.a, last = S.i === Q.length - 1;
    // The painting stays put while you move within an area; a new area brings a new screen.
    cls = "q-screen"; key = "q-" + area.id;
    const inner = (
      <><b>{area.name}</b><span>Question {pos + 1} of {list.length} in this area</span>
        <div className="dots">{list.map((qi, k) => <i key={qi} className={k < pos ? "on" : k === pos ? "cur" : ""} />)}</div></>
    );
    screen = (
      <>
        <div className="q-top-slot">
          <div className="q-top">
            <button type="button" className="back-btn" data-act="back" onClick={back}><span aria-hidden="true">&larr;</span> Back</button>
            <span className="ref" id="q-count">Question {S.i + 1} of {Q.length}</span>
          </div>
          <div className="bar q-bar" role="progressbar" aria-label="Progress" aria-valuemin={0} aria-valuemax={Q.length} aria-valuenow={S.i}><i style={{ width: barW + "%" }} /></div>
        </div>
        <div className="q-grid">
          <Coast as="aside" className="q-art" data-area={area.id} seed={"diagnostic-area-" + area.id} palette={area.palette} size="tall" scene={area.scene} glints
            style={{ "--ac": area.c }} aria-hidden="true">
            <span className={"tag " + area.tag}>Area {AREAS.indexOf(area) + 1} of {AREAS.length}</span>
            <div className="in">{inner}</div>
          </Coast>
          <div className={"q-main" + (S.swap ? " swap" : "")} key={"m" + S.rev}>
            <span className={"tag " + area.tag}>{area.name}</span>
            <h2 className="q-text" id="q-text" tabIndex={-1} style={{ marginTop: 14 }}>{q.q}</h2>
            <div className="opts" role="group" aria-labelledby="q-text">
              {q.o.map((t, k) => {
                const mark = answered ? (k === q.a ? "is-right" : k === pick ? "is-wrong" : "") : "";
                return (
                  <button type="button" key={k} className={"opt" + (mark ? " " + mark : "")} data-k={k} aria-pressed={answered && k === pick}
                    aria-disabled={answered ? true : undefined} onClick={() => { if (!answered) answer(k); }}>
                    <span className="k" aria-hidden="true">{"ABCD"[k]}</span>
                    <span className="tx">{t}</span>
                    {mark === "is-right" && <span className="mk">Best answer</span>}
                    {mark === "is-wrong" && <span className="mk">Your pick</span>}
                  </button>
                );
              })}
            </div>
            <p className="ref keys" id="keys" hidden={answered}>Pick one · keys A to D, or arrows and Enter</p>
            <div id="fb-slot" aria-live="polite">
              {answered && (
                <div className={"fb" + (right ? "" : " no")}>
                  <p className="fb-head"><span className="pebble sm" aria-hidden="true">{right ? "✓" : "–"}</span>{right ? "Right." : "Not quite."}</p>
                  <p className="body">{q.why}</p>
                  <div className="btns">
                    <button type="button" className="btn primary" data-act="next" data-sound={last ? "chime" : undefined} onClick={next}>
                      {last ? "See your results" : "Next question"} <span className="arr" aria-hidden="true">&rarr;</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  } else if (S.screen === "results") {
    cls = "results"; key = "results-" + S.rev;
    screen = (
      <Results key={key} answers={S.answers} profile={S.profile} at={S.at} demo={S.demo} quiet={S.quiet} focus={S.focusResults}
        onShown={bringIntoView}
        onRetake={() => start({ demo: false })} />
    );
  }

  return (
    <div className={"stage" + (S.demo ? " still" : "")} id="stage" aria-live="off" ref={stageRef} onKeyDown={onKeyDown}>
      {S.screen === "boot" ? (
        <noscript>
          <p className="body">The diagnostic runs in your browser and needs JavaScript. Turn it on and reload the page, or <Link className="link" href="/courses">browse the courses</Link> instead.</p>
        </noscript>
      ) : (
        <div className={"screen " + cls} key={key}>{screen}</div>
      )}
    </div>
  );
}
