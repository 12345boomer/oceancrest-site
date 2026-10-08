"use client";
/*
  Book now: the interactive parts of /book. Ported from book.html's inline script
  (from the live oceancrest.ai/book/, OC-06a "the berth"). An in-house slot picker, no iframe.
    GET  /api/slots -> { ok, tz:"America/New_York", durationMin:30, horizonDays:21, slots:[ISO-UTC...] }
    POST /api/book  <- { start, name, email, company?, note?, tz, about?, website }   (website = honeypot)
                    -> 200 { ok, start, end, joinUrl } · 409 slot just taken (refetch, keep the form) · 400 invalid_*
  Both are Netlify Functions in the main repo; the Teams invite is sent by Outlook, not by us.
  Slots are grouped and shown in the VISITOR's zone; the tz note says so when it differs from the host's.
  ?about=learning|partnership (whitelist) sets the topic, the note label and the POST field.
  STATES: loading · pick a day · pick a time · details (validated) · confirming · booked ·
  nothing open (empty) · calendar didn't load (fallback, Try again) · 409 (status + refetch).
  Locally /api does not exist (404), so the fallback shows. Debug hooks, localhost only:
  #demo=slots · #demo=confirm · #demo=done · #demo=empty (mock data, never calls /api/book).
*/
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent, KeyboardEvent } from "react";
import Coast from "@/components/Coast";
import Contours from "@/components/Contours";
import { playSound, sparkle } from "@/lib/sea";
import { READINESS } from "@/lib/site";

/* ---------- ?about= : whitelist only ---------- */
export type AboutKey = "" | "learning" | "partnership";
const ABOUT = {
  learning: { topic: "The AI learning solution and membership", label: "What do you want to know about the learning solution or membership? (optional)" },
  partnership: { topic: "The AI transformation partnership", label: "What's the one workflow that hurts? (optional)" }
};
const NOTE_LABEL = "What's the one workflow that hurts? (optional)";
function aboutOf(v: string | null): AboutKey { return v === "learning" || v === "partnership" ? v : ""; }
function useAbout(): AboutKey { return aboutOf(useSearchParams().get("about")); }

/* ---------- calendar helpers, always in the visitor's zone ---------- */
const DAY = 86400000;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_LONG = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const WD = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const WD_LONG = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const FAIL = "Couldn't reach the calendar. Try again in a moment, or email eliyahu@oceancrest.ai.";

interface Fmt { tz: string; key: Intl.DateTimeFormat; time: Intl.DateTimeFormat; timeZ: Intl.DateTimeFormat; long: Intl.DateTimeFormat }
function makeFmt(tz: string): Fmt {
  const F = (o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat(undefined, { timeZone: tz, ...o });
  return {
    tz,
    key: F({ year: "numeric", month: "2-digit", day: "2-digit" }),
    time: F({ hour: "numeric", minute: "2-digit" }),
    timeZ: F({ hour: "numeric", minute: "2-digit", timeZoneName: "short" }),
    long: F({ weekday: "long", day: "numeric", month: "long" })
  };
}
function visitorZone(): string { try { return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC"; } catch { return "UTC"; } }
function partsOf(fmt: Intl.DateTimeFormat, d: Date): Record<string, string> { const p: Record<string, string> = {}; fmt.formatToParts(d).forEach((x) => { p[x.type] = x.value; }); return p; }
function keyOf(f: Fmt, d: Date) { const p = partsOf(f.key, d); return p.year + "-" + p.month + "-" + p.day; }
function keyToUtc(k: string) { const a = k.split("-").map(Number); return Date.UTC(a[0], a[1] - 1, a[2]); }
function dowOfKey(k: string) { return new Date(keyToUtc(k)).getUTCDay(); }
function labelOfKey(k: string) { const dt = new Date(keyToUtc(k)); return WD_LONG[dt.getUTCDay()] + " " + dt.getUTCDate() + " " + MONTHS[dt.getUTCMonth()]; }
function zoneAbbr(tz: string) { try { return partsOf(new Intl.DateTimeFormat(undefined, { timeZone: tz, timeZoneName: "short" }), new Date()).timeZoneName || ""; } catch { return ""; } }
function pretty(tz: string) { return tz.replace(/_/g, " "); }
function isoZ(d: Date) { return d.toISOString().replace(/\.\d{3}Z$/, "Z"); }
function reduced() { return typeof window !== "undefined" && !!window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches; }

/* ---------- loaded data ---------- */
interface Slot { date: Date; iso: string; time: string }
type Cell = { kind: "void" } | { kind: "day"; key: string; n: number; month: string | null; count: number; label: string };
interface Grid { cols: number[]; cells: Cell[]; head: string }
interface Loaded { byDay: Map<string, Slot[]>; dayKeys: string[]; grid: Grid }
interface SlotsReply { tz?: unknown; durationMin?: unknown; slots: unknown[] }
interface BookReply { ok: boolean; start?: string; end?: string; joinUrl?: string; error?: string }

function isSlotsReply(v: unknown): v is SlotsReply {
  return !!v && typeof v === "object" && Array.isArray((v as { slots?: unknown }).slots);
}
function readReply(v: unknown): BookReply | null {
  if (!v || typeof v !== "object") return null;
  const o = v as Record<string, unknown>;
  const s = (k: string) => (typeof o[k] === "string" ? (o[k] as string) : undefined);
  return { ok: !!o.ok, start: s("start"), end: s("end"), joinUrl: s("joinUrl"), error: s("error") };
}

function buildGrid(f: Fmt, byDay: Map<string, Slot[]>, dayKeys: string[]): Grid {
  const t = partsOf(f.key, new Date());
  const first = Date.UTC(+t.year, +t.month - 1, +t.day);
  let last = first + 21 * DAY;
  const lastKey = dayKeys[dayKeys.length - 1];
  if (lastKey && keyToUtc(lastKey) > last) last = keyToUtc(lastKey);
  const weekend = dayKeys.some((k) => { const w = dowOfKey(k); return w === 0 || w === 6; });
  const cols = weekend ? [1, 2, 3, 4, 5, 6, 0] : [1, 2, 3, 4, 5];
  const dow = (ms: number) => new Date(ms).getUTCDay();
  const gridStart = first - ((dow(first) + 6) % 7) * DAY;
  const gridEnd = last + ((7 - dow(last)) % 7) * DAY;
  const cells: Cell[] = [];
  let firstVisible = true;
  for (let ms = gridStart; ms <= gridEnd; ms += DAY) {
    const w = dow(ms);
    if (cols.indexOf(w) < 0) continue;
    if (ms < first || ms > last) { cells.push({ kind: "void" }); continue; }
    const dt = new Date(ms), key = dt.toISOString().slice(0, 10), n = dt.getUTCDate();
    const count = (byDay.get(key) || []).length;
    cells.push({
      kind: "day", key, n, count,
      month: firstVisible || n === 1 ? MONTHS[dt.getUTCMonth()] : null,
      label: WD_LONG[w] + " " + n + " " + MONTHS_LONG[dt.getUTCMonth()] + (count ? ", " + count + (count === 1 ? " time" : " times") : ", no times")
    });
    firstVisible = false;
  }
  const a = new Date(first), z = new Date(last);
  return { cols, cells, head: MONTHS[a.getUTCMonth()] + " " + a.getUTCDate() + " – " + MONTHS[z.getUTCMonth()] + " " + z.getUTCDate() };
}

function mockSlots(demo: string) {
  // Local preview only: weekday half-hours from 9:00 to 16:30 in the visitor's clock, thinned out.
  let out: string[] = [];
  const now = new Date();
  for (let dd = 1; dd <= 21; dd++) {
    const day = new Date(now.getFullYear(), now.getMonth(), now.getDate() + dd);
    if (day.getDay() === 0 || day.getDay() === 6) continue;
    for (let h = 9; h < 17; h += 0.5) {
      if ((dd * 7 + h * 4) % 5 < 2) continue;
      const s = new Date(day); s.setHours(Math.floor(h), h % 1 ? 30 : 0, 0, 0); out.push(s.toISOString());
    }
  }
  if (demo === "empty") out = [];
  return { ok: true, tz: "America/New_York", durationMin: 30, horizonDays: 21, slots: out };
}

/* ---------- the hero's "two ways in" ---------- */
export function BookWays({ about }: { about: AboutKey }) {
  const learning = about === "learning";
  return (
    <>
      <p className="topic" id="topic" hidden={!about}>
        {about && <span className={"half" + (learning ? " e" : "")}>Topic · {ABOUT[about].topic}</span>}
      </p>
      <div className="ways" aria-label="Two ways in">
        <div className={"way" + (learning ? "" : " cur")} id="way-t">
          <div className="row">
            <span className="half">About transformation</span>
            <span className="here" id="here-t" hidden={learning}>You&apos;re here</span>
          </div>
          <b>Book a 30-minute meeting on Teams.</b>
          <p>
            Changing how the work runs: the assessment, the build, and what it returns. Pick a time below.
          </p>
          <Link className="link go" id="go-t" href="/book" hidden={!learning}>Book about transformation instead</Link>
        </div>
        <div className={"way" + (learning ? " cur" : "")} id="way-e">
          <div className="row">
            <span className="half e">About training your team</span>
            <span className="here" id="here-e" hidden={!learning}>You&apos;re here</span>
          </div>
          <b id="way-e-title">{learning ? "This meeting is about training your team." : "Take the diagnostic first."}</b>
          <p id="way-e-copy">
            {learning
              ? "The learning solution and membership. Haven't taken the diagnostic yet? It takes about five minutes, and it helps us teach your team more accurately."
              : "Fifteen questions, about five minutes. It shows what you know and what you don't yet, so we teach your team more accurately."}
          </p>
          <Link className="link go" href="/diagnostic">
            Take the diagnostic{" "}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </>
  );
}
/** BookWays with ?about= read from the URL. Render inside <Suspense>. */
export function BookWaysFromQuery() { return <BookWays about={useAbout()} />; }

/* ---------- the booking panel ---------- */
type View = "pick" | "confirm" | "done" | "empty" | "fallback";
interface Fields { name: string; email: string; company: string; note: string; website: string }
interface Errors { name?: string; email?: string }
interface Booked { email: string; when: string; joinUrl: string | null }
const STEP_ORDER = ["day", "time", "details"];

export function BookPanel({ about }: { about: AboutKey }) {
  const [view, setView] = useState<View>("pick");
  const [demo, setDemo] = useState(false);
  const [tz, setTz] = useState("");
  const [pickBusy, setPickBusy] = useState(true);
  const [data, setData] = useState<Loaded | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [chosenIso, setChosenIso] = useState("");
  const [chosenWhen, setChosenWhen] = useState("");
  const [tzNote, setTzNote] = useState("");
  const [live, setLive] = useState("Loading available times.");
  const [status, setStatus] = useState("");
  const [fields, setFields] = useState<Fields>({ name: "", email: "", company: "", note: "", website: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusyState] = useState(false);
  const [booked, setBooked] = useState<Booked | null>(null);
  const [, setTick] = useState(0);

  const fmtRef = useRef<Fmt | null>(null);
  const durRef = useRef(30);
  const demoRef = useRef("");
  const reqRef = useRef(0);
  const busyRef = useRef(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const timesHeadRef = useRef<HTMLHeadingElement>(null);
  const timesListRef = useRef<HTMLDivElement>(null);
  const confirmTitleRef = useRef<HTMLHeadingElement>(null);
  const doneTitleRef = useRef<HTMLHeadingElement>(null);
  const doneMarkRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  // Work that needs the next render on screen (focus, scrolling) queues here.
  const queue = useRef<Array<() => void>>([]);
  function later(fn: () => void) { queue.current.push(fn); setTick((n) => n + 1); }
  useEffect(() => {
    if (!queue.current.length) return;
    const q = queue.current;
    queue.current = [];
    q.forEach((fn) => fn());
  });

  function intoView() {
    const p = panelRef.current;
    if (!p) return;
    const t = p.getBoundingClientRect().top;
    if (t < 60) window.scrollTo({ top: window.scrollY + t - 88, behavior: reduced() ? "auto" : "smooth" });
  }

  function selectDay(key: string, focusTimes: boolean, byDay: Map<string, Slot[]>) {
    setSelectedDay(key);
    const slots = byDay.get(key) || [];
    setLive(slots.length ? WD_LONG[dowOfKey(key)] + ": " + slots.length + (slots.length === 1 ? " time." : " times.") : labelOfKey(key) + ": no times left.");
    if (focusTimes) later(() => timesHeadRef.current?.focus());
    const fromDay = !!document.activeElement && document.activeElement.classList.contains("day");
    if (window.matchMedia("(max-width: 1159px)").matches && !focusTimes && fromDay) {
      later(() => timesHeadRef.current?.scrollIntoView({ block: "nearest", behavior: reduced() ? "auto" : "smooth" }));
    }
  }

  function pickSlot(s: Slot) {
    const f = fmtRef.current;
    if (!f) return;
    setChosenIso(s.iso);
    const end = new Date(s.date.getTime() + durRef.current * 60000);
    setChosenWhen(f.long.format(s.date) + " · " + s.time + "–" + f.timeZ.format(end));
    setStatus("");
    setView("confirm");
    later(() => { intoView(); confirmTitleRef.current?.focus({ preventScroll: true }); });
  }

  /** Fetch the open times. `then` runs with the selected day's first slot once they're shown. */
  async function load(keepDay: string | null, then?: (first: Slot | null) => void) {
    const f = fmtRef.current;
    if (!f) return;
    const id = ++reqRef.current;
    setPickBusy(true);
    setView("pick");
    setLive("Loading available times.");
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 10000);
    try {
      let raw: unknown;
      if (demoRef.current) raw = mockSlots(demoRef.current);
      else {
        const res = await fetch("/api/slots", { cache: "no-store", headers: { accept: "application/json" }, signal: ctrl.signal });
        if (!res.ok) throw new Error("http " + res.status);
        raw = await res.json();
      }
      if (id !== reqRef.current) return;
      if (!isSlotsReply(raw)) throw new Error("shape");
      const hostTz = typeof raw.tz === "string" ? raw.tz : "America/New_York";
      if (typeof raw.durationMin === "number" && raw.durationMin > 0) durRef.current = raw.durationMin;
      const now = Date.now();
      const dates = raw.slots
        .map((s) => new Date(typeof s === "string" || typeof s === "number" ? s : NaN))
        .filter((d) => !isNaN(d.getTime()) && d.getTime() > now)
        .sort((x, y) => x.getTime() - y.getTime());
      const byDay = new Map<string, Slot[]>();
      dates.forEach((d) => {
        const k = keyOf(f, d);
        if (!byDay.has(k)) byDay.set(k, []);
        byDay.get(k)!.push({ date: d, iso: isoZ(d), time: f.time.format(d) });
      });
      const dayKeys = Array.from(byDay.keys()).sort();
      if (!dayKeys.length) { setView("empty"); setLive("Nothing open in the next three weeks."); return; }
      setData({ byDay, dayKeys, grid: buildGrid(f, byDay, dayKeys) });
      if (f.tz === hostTz) setTzNote("Times shown in Eastern (" + pretty(hostTz) + ")");
      else { const abbr = zoneAbbr(f.tz); setTzNote("Times shown in " + pretty(f.tz) + (abbr ? " (" + abbr + ")" : "") + " · host is Eastern"); }
      const day = keepDay && byDay.has(keepDay) ? keepDay : dayKeys[0];
      selectDay(day, false, byDay);
      setPickBusy(false);
      if (then) then((byDay.get(day) || [])[0] || null);
    } catch {
      if (id !== reqRef.current) return;
      setView("fallback");
      setLive("The calendar did not load.");
    } finally {
      clearTimeout(timer);
    }
  }

  function onBooked(reply: BookReply, email: string, start: string) {
    const f = fmtRef.current;
    if (!f) return;
    const s = new Date(reply.start || start);
    const e = new Date(reply.end || s.getTime() + durRef.current * 60000);
    const join = reply.joinUrl && /^https:\/\/teams\.microsoft\.com\//.test(reply.joinUrl) ? reply.joinUrl : null;
    setBooked((prev) => ({
      email,
      when: ": " + f.long.format(s) + ", " + f.time.format(s) + "–" + f.timeZ.format(e) + ", on Microsoft Teams, sent from Outlook. Accept it to add the meeting to your calendar.",
      joinUrl: prev?.joinUrl || join
    }));
    setView("done");
    document.title = "Booked — OceanCrest AI";
    later(() => { intoView(); doneTitleRef.current?.focus({ preventScroll: true }); });
    setLive("Booked.");
    playSound("chime");
    setTimeout(() => { if (doneMarkRef.current) sparkle(doneMarkRef.current); }, 200);
  }

  function setBusy(on: boolean) { busyRef.current = on; setBusyState(on); }

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    if (busyRef.current) return;
    const name = fields.name.trim(), email = fields.email.trim();
    const errs: Errors = {};
    if (name.length < 2) errs.name = "Add your name.";
    if (!email) errs.email = "Add a work email for the invite.";
    else if (!EMAIL.test(email)) errs.email = "That email doesn't look right.";
    setErrors(errs);
    if (errs.name || errs.email) { later(() => (errs.name ? nameRef : emailRef).current?.focus()); return; }
    if (!chosenIso) { setStatus("Pick a time first."); setView("pick"); return; }
    const payload: Record<string, string> = { start: chosenIso, name, email, tz: fmtRef.current?.tz || "UTC", website: fields.website };
    if (fields.company.trim()) payload.company = fields.company.trim();
    if (fields.note.trim()) payload.note = fields.note.trim();
    if (about) payload.about = about;
    setBusy(true);
    setStatus("");
    if (demoRef.current) {
      const start = chosenIso;
      setTimeout(() => { setBusy(false); onBooked({ ok: true, start }, email, start); }, 500);
      return;
    }
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 12000);
    try {
      const res = await fetch("/api/book", { method: "POST", headers: { "content-type": "application/json", accept: "application/json" }, body: JSON.stringify(payload), signal: ctrl.signal });
      const reply = readReply(await res.json().catch(() => null));
      if (res.ok && reply && reply.ok) { setBusy(false); onBooked(reply, email, chosenIso); return; }
      if (res.status === 409) {
        setBusy(false);
        setStatus("That time was just taken. Pick another. Your details are kept.");
        setChosenIso("");
        await load(selectedDay, () => later(() => timesHeadRef.current?.focus()));
        return;
      }
      if (res.status === 400 && reply) {
        if (reply.error === "invalid_email") { setErrors({ email: "That email doesn't look right." }); later(() => emailRef.current?.focus()); return; }
        if (reply.error === "invalid_name") { setErrors({ name: "Add your name." }); later(() => nameRef.current?.focus()); return; }
        setStatus("The form was rejected. Check the fields and try again.");
        return;
      }
      setStatus(FAIL);
    } catch {
      setStatus(FAIL);
    } finally {
      clearTimeout(timer);
      if (busyRef.current) setBusy(false);
    }
  }

  function changeTime() {
    setStatus("");
    setView("pick");
    later(() => {
      const pressed = timesListRef.current?.querySelector<HTMLElement>('.slot[aria-pressed="true"]');
      (pressed || timesHeadRef.current)?.focus();
    });
  }

  /* arrow keys across the day grid; every button stays tabbable */
  function onGridKey(ev: KeyboardEvent<HTMLDivElement>) {
    const cols = data ? data.grid.cols.length : 5;
    const jump = ({ ArrowLeft: -1, ArrowRight: 1, ArrowUp: -cols, ArrowDown: cols } as Record<string, number>)[ev.key];
    const grid = gridRef.current;
    if (!jump || !grid) return;
    const all = Array.from(grid.children) as HTMLElement[];
    const i = all.indexOf(document.activeElement as HTMLElement);
    if (i < 0) return;
    ev.preventDefault();
    const step = jump > 0 ? 1 : -1;
    let j = i + jump;
    while (j >= 0 && j < all.length && !(all[j] instanceof HTMLButtonElement && !(all[j] as HTMLButtonElement).disabled)) j += step;
    if (j >= 0 && j < all.length) all[j].focus();
  }

  const field = (k: keyof Fields) => (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const v = ev.target.value;
    setFields((p) => ({ ...p, [k]: v }));
  };

  // First load, plus the localhost-only #demo= hooks.
  useEffect(() => {
    let mode = "";
    try {
      if (/^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname)) {
        const m = /^#demo=(slots|confirm|done|empty)$/.exec(location.hash || "");
        if (m) mode = m[1];
      }
    } catch { /* no location */ }
    demoRef.current = mode;
    setDemo(!!mode);
    fmtRef.current = makeFmt(visitorZone());
    setTz(fmtRef.current.tz);
    load(null, (first) => {
      if ((mode === "confirm" || mode === "done") && first) {
        pickSlot(first);
        if (mode === "done") onBooked({ ok: true, start: first.iso }, "you@company.com", first.iso);
      }
    });
    // A remount (or Strict Mode's rehearsal) drops any reply still in flight.
    return () => { reqRef.current++; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* derived */
  const stepOn = view === "pick" ? (selectedDay ? "time" : "day") : view === "confirm" ? "details" : view === "done" ? "booked" : "none";
  const stepIdx = STEP_ORDER.indexOf(stepOn);
  const stepClass = (s: string) => {
    const i = STEP_ORDER.indexOf(s);
    return [i === stepIdx ? "on" : "", (stepIdx < 0 ? stepOn === "booked" : i < stepIdx) ? "ok" : ""].filter(Boolean).join(" ") || undefined;
  };
  const daySlots = data && selectedDay ? data.byDay.get(selectedDay) || [] : null;
  const nextDay = data && selectedDay && daySlots && !daySlots.length ? data.dayKeys.filter((k) => k > selectedDay)[0] : undefined;
  const colsStyle = data ? { gridTemplateColumns: "repeat(" + data.grid.cols.length + ", minmax(0,1fr))" } : undefined;
  const fade = (v: View) => (view === v ? "fade-in" : undefined);
  const err = (k: keyof Errors) => (errors[k] ? { "aria-invalid": true, "aria-describedby": "err-" + k } : {});

  return (
    <div className={"bk-panel" + (demo ? " demo" : "")} id="panel" ref={panelRef}>
      <Coast as="aside" seed="book-side-berth" palette="hero" size="tall" scene="cove" glints className="bk-side has-contours">
        <Contours ink="white" />
        <div className="side-card">
          <span className="ref">The meeting</span>
          <b>30 minutes, on Microsoft Teams.</b>
          <ul className="side-facts">
            <li>The invite comes by email, from Outlook, with a Teams link.</li>
            <li>Times are shown in your time zone.</li>
            <li>No preparation needed. Bring one workflow that hurts.</li>
          </ul>
        </div>
        <figure className="photo side-photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/img/photos/oc-03-spiral-tall.jpg" alt="A concrete spiral ramp seen from directly below, its coils receding upward. Generated image." loading="lazy" />
        </figure>
        <ol className="steps3" id="steps3" aria-label="Steps">
          <li data-s="day" className={stepClass("day")}><span className="pebble" aria-hidden="true">1</span>Pick a day</li>
          <li data-s="time" className={stepClass("time")}><span className="pebble" aria-hidden="true">2</span>Pick a time</li>
          <li data-s="details" className={stepClass("details")}><span className="pebble" aria-hidden="true">3</span>Your details</li>
        </ol>
      </Coast>

      <div className="bk-main">
        <p className="status" id="status" role="status" aria-live="polite">{status}</p>

        <section id="pick" className={fade("pick")} hidden={view !== "pick"} aria-busy={pickBusy} aria-labelledby="pick-title">
          <h2 className="sr" id="pick-title">Pick a time</h2>
          <div className="pick-grid">
            <div className="days">
              <div className="sub-head">
                <h2>Pick a day.</h2>
                <span className="ref" id="days-head">{data ? data.grid.head : "The next three weeks"}</span>
              </div>
              <div className="days-wd" id="days-wd" aria-hidden="true" style={colsStyle}>
                {(data ? data.grid.cols : [1, 2, 3, 4, 5]).map((c) => <span key={c}>{WD[c]}</span>)}
              </div>
              <div className="days-grid" id="days-grid" role="group" aria-label="Days with open times" ref={gridRef} style={colsStyle} onKeyDown={onGridKey}>
                {data
                  ? data.grid.cells.map((c, i) => c.kind === "void"
                    ? <span key={i} className="day void" />
                    : (
                      <button
                        key={c.key}
                        type="button"
                        className="day opt"
                        data-date={c.key}
                        aria-pressed={c.key === selectedDay}
                        aria-label={c.label}
                        disabled={!c.count}
                        onClick={c.count ? () => selectDay(c.key, false, data.byDay) : undefined}
                      >
                        {c.month && <span className="m">{c.month}</span>}
                        <span className="n">{c.n}</span>
                        {c.count > 0 && <span className="c" aria-hidden="true">{c.count}</span>}
                      </button>
                    ))
                  : Array.from({ length: 15 }, (_, i) => <span key={i} className="skel" />)}
              </div>
            </div>
            <div className="times">
              <div className="sub-head">
                <h2 id="times-head" tabIndex={-1} ref={timesHeadRef}>{selectedDay ? labelOfKey(selectedDay) + "." : "Pick a time."}</h2>
                <span className="ref" id="times-meta">{daySlots ? (daySlots.length ? daySlots.length + (daySlots.length === 1 ? " time" : " times") : "No times") : ""}</span>
              </div>
              <div className="times-list" id="times-list" role="group" aria-label="Open times" ref={timesListRef}>
                {daySlots
                  ? daySlots.map((s) => (
                    <button key={s.iso} type="button" className="slot opt" data-start={s.iso} aria-pressed={s.iso === chosenIso} onClick={() => pickSlot(s)}>{s.time}</button>
                  ))
                  : Array.from({ length: 6 }, (_, i) => <span key={i} className="slot-skel" />)}
              </div>
              <p className="times-empty" id="times-empty" hidden={!daySlots || daySlots.length > 0}>
                {selectedDay && daySlots && !daySlots.length && <>
                  Nothing left on {WD_LONG[dowOfKey(selectedDay)]}.
                  {nextDay && data && <>
                    {" The next open day is " + labelOfKey(nextDay) + ". "}
                    <button type="button" className="link-btn" onClick={() => selectDay(nextDay, true, data.byDay)}>Go to {labelOfKey(nextDay)}</button>
                  </>}
                </>}
              </p>
            </div>
          </div>
          <p className="tz-note ref" id="tz-note">{tzNote}</p>
          <p className="sr" id="slots-live" aria-live="polite">{live}</p>
        </section>

        <section id="confirm" className={fade("confirm")} hidden={view !== "confirm"} aria-labelledby="confirm-title">
          <div className="sub-head"><h2 id="confirm-title" tabIndex={-1} ref={confirmTitleRef}>Your details.</h2></div>
          <div className="chosen">
            <span className="ref">Chosen time</span>
            <p className="chosen-when" id="chosen-when">{chosenWhen}</p>
            <button type="button" className="link-btn" id="change-time" onClick={changeTime}>Change time</button>
          </div>
          <form id="book-form" className="card" noValidate onSubmit={onSubmit}>
            <p className="hp" aria-hidden="true">
              <label>
                Website{" "}
                <input type="text" name="website" tabIndex={-1} autoComplete="off" value={fields.website} onChange={field("website")} />
              </label>
            </p>
            <input type="hidden" name="start" value={chosenIso} />
            <input type="hidden" name="tz" value={tz} />
            <input type="hidden" name="about" value={about} />
            <label>
              <span className="k">Name</span>
              <input type="text" name="name" autoComplete="name" required maxLength={80} ref={nameRef} value={fields.name} onChange={field("name")} {...err("name")} />
              {errors.name && <p className="err" id="err-name">{errors.name}</p>}
            </label>
            <label>
              <span className="k">Work email</span>
              <input type="email" name="email" autoComplete="email" inputMode="email" required maxLength={120} ref={emailRef} value={fields.email} onChange={field("email")} {...err("email")} />
              {errors.email && <p className="err" id="err-email">{errors.email}</p>}
            </label>
            <label>
              <span className="k">Company (optional)</span>
              <input type="text" name="company" autoComplete="organization" maxLength={120} value={fields.company} onChange={field("company")} />
            </label>
            <label>
              <span className="k" id="note-label">{about ? ABOUT[about].label : NOTE_LABEL}</span>
              <textarea name="note" maxLength={500} rows={3} value={fields.note} onChange={field("note")} />
            </label>
            <button type="submit" className="btn primary" id="submit" data-sound="none" disabled={busy} aria-busy={busy}>
              {busy ? "Confirming…" : <>Confirm the meeting <span className="arr" aria-hidden="true">→</span></>}
            </button>
            <p className="fine">The invite comes by email, from Outlook, with a Microsoft Teams link.</p>
          </form>
        </section>

        <section className={"panel done" + (view === "done" ? " fade-in" : "")} id="done" hidden={view !== "done"} aria-labelledby="done-title">
          <span className="pebble" id="done-mark" aria-hidden="true" ref={doneMarkRef}>✓</span>
          <span className="ref">Booked</span>
          <h2 id="done-title" tabIndex={-1} ref={doneTitleRef}>Booked. See you on Teams.</h2>
          <p className="body" id="done-copy">{booked && <>The invite is on its way to <b>{booked.email}</b>{booked.when}</>}</p>
          <p className="next-box" id="done-next">
            {about === "learning"
              ? "Next: if you haven't yet, take the AI diagnostic before we meet, so we start from what your team already knows."
              : "Next: bring the one workflow that hurts. If you haven't taken the readiness assessment, do it before we meet. It shapes the first ten minutes."}
          </p>
          <div className="links" id="done-links">
            {booked?.joinUrl && <a className="link" id="join-link" href={booked.joinUrl} target="_blank" rel="noopener">Teams link for the meeting ↗</a>}
            <a className="link" href={READINESS} target="_blank" rel="noopener" id="done-assess">Take the readiness assessment ↗</a>
            <Link className="link" href="/diagnostic">Take the AI diagnostic</Link>
            <Link className="link" href="/resources">Browse the resources</Link>
            <Link className="link" href="/">Back to the home page</Link>
          </div>
        </section>

        <section className={"panel warm" + (view === "empty" ? " fade-in" : "")} id="empty" hidden={view !== "empty"} aria-labelledby="empty-title">
          <span className="pebble" aria-hidden="true">~</span>
          <span className="ref">Fully booked</span>
          <h2 id="empty-title" tabIndex={-1}>Nothing open in the next three weeks.</h2>
          <p className="body">
            Email <a href="mailto:eliyahu@oceancrest.ai?subject=Meeting">eliyahu@oceancrest.ai</a> or call{" "}
            <a href="tel:+12144351200">214-435-1200</a> with a few times that work, and we&apos;ll send the invite.
          </p>
          <div className="btns">
            <a className="btn primary" href="mailto:eliyahu@oceancrest.ai?subject=Meeting">Email Eliyahu</a>
            <a className="btn" href="tel:+12144351200">Call 214-435-1200</a>
          </div>
        </section>

        <section className={"panel warm" + (view === "fallback" ? " fade-in" : "")} id="fallback" hidden={view !== "fallback"} aria-labelledby="fallback-title">
          <span className="pebble" aria-hidden="true">~</span>
          <span className="ref">Calendar</span>
          <h2 id="fallback-title" tabIndex={-1}>The calendar didn&apos;t load.</h2>
          <p className="body">
            Try again in a moment, or email <a href="mailto:eliyahu@oceancrest.ai?subject=Meeting">eliyahu@oceancrest.ai</a>.
            Say which days work and the Teams invite comes back by email. Phone: <a href="tel:+12144351200">214-435-1200</a>.
          </p>
          <div className="btns">
            <button type="button" className="btn primary" id="retry" onClick={() => load(selectedDay)}>Try again</button>
            <a className="btn" href="mailto:eliyahu@oceancrest.ai?subject=Meeting">Email eliyahu@oceancrest.ai</a>
            <a className="link" href="tel:+12144351200">Call 214-435-1200</a>
          </div>
        </section>

        {/* Without JavaScript the picker is hidden (page.css, @media (scripting: none)) and this shows instead. */}
        <noscript>
          <section className="panel warm" aria-labelledby="nojs-title">
            <span className="ref">Calendar</span>
            <h2 id="nojs-title">Booking needs JavaScript.</h2>
            <p className="body">
              Email <a href="mailto:eliyahu@oceancrest.ai?subject=Meeting">eliyahu@oceancrest.ai</a>. Say which days work and the Teams invite comes back by email.
              Phone: <a href="tel:+12144351200">214-435-1200</a>.
            </p>
          </section>
        </noscript>
      </div>
    </div>
  );
}
/** BookPanel with ?about= read from the URL. Render inside <Suspense>. */
export function BookPanelFromQuery() { return <BookPanel about={useAbout()} />; }
