"use client";
/*
  The course finder: search, Track and Level switches, categories grouped by track with live
  counts, flagship programs and grouped results. Ported from the inline script in courses.html.

  The filter panel sits inside the painted banner and the results sit in the section below it, so
  both read one shared state from <FinderProvider>. The page prerenders unfiltered; <ParamsSync>
  (inside its own Suspense) applies ?track=, ?cat=, ?level= and ?q= once the client has them.
*/
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import Coast from "@/components/Coast";
import CourseCard from "@/components/CourseCard";
import { CATEGORIES, COURSES, PROGRAMS, TRACKS, categoryById, type Course, type Level, type Program, type TrackId } from "@/lib/courses";

type Any<T> = T | "all";
interface State { track: Any<TrackId>; cat: string; level: Any<Level>; /** The search box as typed. */ q: string }
type Group = "track" | "cat" | "level";

const EMPTY: State = { track: "all", cat: "all", level: "all", q: "" };
const LEVELS: Level[] = ["Beginner", "Intermediate", "Advanced"];
const SIDES: TrackId[] = ["mindset", "technical"];

// Read a query string into a state; a category also selects its track, an unknown one is dropped.
function fromParams(p: URLSearchParams): State {
  const t = p.get("track"), lv = p.get("level");
  const st: State = {
    track: t === "mindset" || t === "technical" ? t : "all",
    cat: p.get("cat") || "all",
    level: LEVELS.find((l) => l === lv) ?? "all",
    q: p.get("q") || ""
  };
  if (st.cat !== "all") {
    const cc = categoryById(st.cat);
    if (cc) st.track = cc.track; else st.cat = "all";
  }
  return st;
}

function toQuery(st: State): string {
  const p = new URLSearchParams();
  if (st.cat !== "all") p.set("cat", st.cat);
  else if (st.track !== "all") p.set("track", st.track);
  if (st.level !== "all") p.set("level", st.level);
  if (st.q.trim()) p.set("q", st.q.trim());
  return p.toString();
}

function matches(c: Course, st: State): boolean {
  if (st.track !== "all" && c.track !== st.track) return false;
  if (st.cat !== "all" && c.category !== st.cat) return false;
  if (st.level !== "all" && c.level !== st.level) return false;
  const q = st.q.trim().toLowerCase();
  if (q) {
    const hay = `${c.title} ${c.blurb} ${categoryById(c.category)?.name ?? ""} ${TRACKS[c.track].name} ${c.level}`.toLowerCase();
    if (!hay.includes(q)) return false;
  }
  return true;
}

// Pressing a chip: a selected category pressed again clears; a track clears the category.
function press(st: State, g: Group, value: string): State {
  if (g === "track") return { ...st, track: value as Any<TrackId>, cat: "all" };
  if (g === "level") return { ...st, level: value as Any<Level> };
  const cat = st.cat === value ? "all" : value;
  const cc = cat === "all" ? undefined : categoryById(cat);
  return { ...st, cat, track: cc ? cc.track : st.track };
}

// Live counts: what you would get if you pressed this chip, given the other filters.
function countFor(st: State, g: Group, value: string): number {
  const next: State = g === "track" ? { ...st, track: value as Any<TrackId>, cat: "all" } : { ...st, [g]: value };
  return COURSES.filter((c) => matches(c, next)).length;
}

interface Finder { st: State; set: (st: State) => void; press: (g: Group, value: string) => void; clear: () => void }
const Ctx = createContext<Finder | null>(null);
function useFinder(): Finder {
  const f = useContext(Ctx);
  if (!f) throw new Error("Finder parts must sit inside <FinderProvider>.");
  return f;
}

export function FinderProvider({ children }: { children: ReactNode }) {
  const [st, setSt] = useState<State>(EMPTY);
  // The query we last wrote, so our own replaceState doesn't come back in as a navigation.
  const written = useRef<string | null>(null);

  const set = useCallback((next: State) => {
    setSt(next);
    const s = toQuery(next);
    written.current = s;
    try { window.history.replaceState(null, "", window.location.pathname + (s ? `?${s}` : "")); } catch { /* ignore */ }
  }, []);

  const value = useMemo<Finder>(() => ({
    st,
    set,
    press: (g, v) => set(press(st, g, v)),
    clear: () => set(EMPTY)
  }), [st, set]);

  const fromUrl = useCallback((s: string) => {
    if (s === written.current) return;
    written.current = s;
    setSt(fromParams(new URLSearchParams(s)));
  }, []);

  return (
    <Ctx.Provider value={value}>
      <Suspense fallback={null}><ParamsSync onChange={fromUrl} /></Suspense>
      {children}
    </Ctx.Provider>
  );
}

// Applies the URL's query on load and on client navigation to another /courses?… link.
function ParamsSync({ onChange }: { onChange: (s: string) => void }) {
  const params = useSearchParams();
  const s = params.toString();
  useEffect(() => { onChange(s); }, [s, onChange]);
  return null;
}

function Chip({ g, value, label, before }: { g: Group; value: string; label: string; before?: ReactNode }) {
  const { st, press } = useFinder();
  const n = countFor(st, g, value), on = st[g] === value;
  return (
    <button type="button" data-group={g} data-value={value} aria-pressed={on} disabled={!n && !on} onClick={() => press(g, value)}>
      {before}<span>{label}</span><span className="n">{n}</span>
    </button>
  );
}

/** The white filter panel inside the banner. */
export function FinderPanel() {
  const { st, set, clear } = useFinder();
  const count = COURSES.filter((c) => matches(c, st)).length;
  const active = st.track !== "all" || st.cat !== "all" || st.level !== "all" || !!st.q.trim();
  const sides = SIDES.filter((t) => st.track === "all" || st.track === t);
  return (
    <div className="panel" role="search" aria-label="Find a course">
      <div className="searchrow">
        <label className="search" htmlFor="q">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <circle cx="8" cy="8" r="5.5" />
            <path d="M12.2 12.2L16 16" />
          </svg>
          {" "}
          <span className="sr">Search courses</span>
          {" "}
          <input id="q" type="search" placeholder={'Search courses, like "sales" or "Excel"'} autoComplete="off"
            value={st.q} onChange={(e) => set({ ...st, q: e.target.value })} />
        </label>
        <span className="ref" id="count" aria-live="polite">{count}{count === 1 ? " course" : " courses"}</span>
      </div>
      <div className="frow">
        <div className="seg" id="f-track" role="group" aria-label="Track">
          <Chip g="track" value="all" label="Both tracks" />
          <Chip g="track" value="mindset" label={TRACKS.mindset.name} before={<i className="e" />} />
          <Chip g="track" value="technical" label={TRACKS.technical.name} before={<i />} />
        </div>
        <div className="seg" id="f-level" role="group" aria-label="Level">
          <Chip g="level" value="all" label="Any level" />
          {LEVELS.map((l) => <Chip key={l} g="level" value={l} label={l} />)}
        </div>
      </div>
      {/* Categories sit under their track; pressing a selected one again clears it. */}
      <div className="cats" id="f-cat" role="group" aria-label="Category">
        {sides.map((t, i) => (
          <div key={t} className={`catline${t === "mindset" ? " e" : ""}`}>
            <span className="ref">{TRACKS[t].name}</span>
            <div className="chips">
              {CATEGORIES.filter((c) => c.track === t).map((c) => (
                <Chip key={c.id} g="cat" value={c.id} label={c.name} before={<i className={`cat-${c.id}`} />} />
              ))}
            </div>
            {i === 0 && active ? <button type="button" className="clear" id="clear" onClick={clear}>Clear filters</button> : <span />}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProgramCard({ p }: { p: Program }) {
  return (
    <Link className="cc" href={`/education#${p.soon ? "programs" : "curriculum"}`}>
      <Coast className="cc-art" seed={`courses-prog-${p.id}`} palette={p.palette} size="card">
        {p.soon ? <span className="tag sun">Coming soon</span> : <span className="tag">Flagship</span>}
      </Coast>
      <div className="cc-body">
        <div className="cc-top"><span className="ref">{p.audience}</span></div>
        <h3>{p.title}{p.pa && <span className="pa">PA</span>}</h3>
        <p>{p.summary}</p>
        <div className="cc-meta">
          <span>{p.facts.split(" · ").slice(0, 2).join(" · ")}</span>
          <span>{p.soon ? "Soon" : "On the platform"}</span>
        </div>
      </div>
    </Link>
  );
}

/** Flagship programs (only with no filter set), then the matching courses grouped by category. */
export function FinderResults() {
  const { st, clear } = useFinder();
  const list = COURSES.filter((c) => matches(c, st));
  const none = st.track === "all" && st.cat === "all" && st.level === "all" && !st.q.trim();
  return (
    <>
      <div id="flagship">
        {none && (
          <>
            <section className="group flag" style={{ "--tag": "var(--coral)" }}>
              <div className="group-h">
                <h2>Flagship programs</h2>
                <p>The courses already on the platform, and two on the way. <Link className="link" href="/education#programs">How they fit together</Link></p>
              </div>
              <div className="cards">{PROGRAMS.map((p) => <ProgramCard key={p.id} p={p} />)}</div>
            </section>
            <p className="sources legend" style={{ margin: "-28px 0 clamp(40px,5vw,56px)" }}>PA — position approximate: the certificate course title is a working title.</p>
          </>
        )}
      </div>
      <div id="groups">
        {!list.length ? (
          <div className="empty">
            <p>No courses match. Try a different word or clear a filter.</p>
            <button type="button" className="btn sm" onClick={clear}>Clear all filters</button>
          </div>
        ) : SIDES.flatMap((t) => CATEGORIES.filter((c) => c.track === t).map((cat) => {
          const items = list.filter((c) => c.category === cat.id);
          if (!items.length) return null;
          return (
            <section key={cat.id} className={`group cat-${cat.id}`}>
              <div className="group-h">
                <h2>{cat.name} <span className="ref">{TRACKS[t].name} · {items.length}</span></h2>
                <p>{cat.note}</p>
              </div>
              <div className="cards">{items.map((c) => <CourseCard key={c.id} course={c} />)}</div>
            </section>
          );
        }))}
      </div>
    </>
  );
}
