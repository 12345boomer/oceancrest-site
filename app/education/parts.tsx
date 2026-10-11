/*
  The data-driven parts of the education page, built from lib/courses on the server.
  Ported from the inline script in education.html.
*/
import Link from "next/link";
import Coast from "@/components/Coast";
import { CATEGORIES, COURSES, PROGRAMS, TRACKS, courseById, type Program, type TrackId } from "@/lib/courses";
import CurLink from "./cur-link";

const Arr = () => <span className="arr" aria-hidden="true">→</span>;
const pad = (n: number) => (n < 10 ? "0" : "") + n;

function prog(id: string): Program {
  const p = PROGRAMS.find((x) => x.id === id);
  if (!p) throw new Error(`Unknown program: ${id}`);
  return p;
}
const Title = ({ p }: { p: Program }) => <>{p.title}{p.pa && <span className="pa">PA</span>}</>;

// ---- The library: one panel per track ----
const START_HERE: Record<TrackId, string> = { mindset: "m-without-fear", technical: "ai-fundamentals" };
const LINE: Record<TrackId, string> = {
  mindset: "The mindset that has to shift: how to think about AI at work, how to lead with it, and the habits, norms and trust across the company.",
  technical: "The technical craft, for the people who go further: the basics every employee needs, then tools, builds and department work."
};

export function Library() {
  return (
    <>
      {(["mindset", "technical"] as const).map((t) => {
        const tr = TRACKS[t];
        const n = COURSES.filter((c) => c.track === t).length;
        const first = courseById(START_HERE[t]);
        return (
          <article key={t} className={`card lib ${t} reveal`}>
            <Coast className="lib-art" seed={`education-lib-${t}`} palette={t} size="wide" scene={t === "mindset" ? "cove" : "headland"} glints>
              <span className={`half${t === "mindset" ? " e" : ""}`}>{tr.name}</span>
              <span className="tag">{n} courses</span>
            </Coast>
            <div className="lib-body">
              <h3>{tr.name}.</h3>
              <p>{LINE[t]}</p>
              {first && (
                <p className="ref">
                  Start here ·{" "}
                  <Link className="link" href={`/courses/${first.id}`} style={{ textTransform: "none", letterSpacing: 0, fontFamily: "var(--sans)", fontSize: "14px" }}>{first.title}</Link>
                </p>
              )}
              <div className="catrows">
                {CATEGORIES.filter((c) => c.track === t).map((cat) => {
                  const k = COURSES.filter((c) => c.category === cat.id).length;
                  return (
                    <Link key={cat.id} className={`catrow cat-${cat.id}`} href={`/courses?cat=${cat.id}`}>
                      <span>{cat.name}</span>
                      <span className="n">{k}{k === 1 ? " course" : " courses"} →</span>
                    </Link>
                  );
                })}
              </div>
              <div className="who">
                <img src={tr.photo} alt={tr.lead} loading="lazy" />
                <div><span className="ref">Track lead</span><b>{tr.lead}</b><span>{tr.leadTitle}</span></div>
              </div>
            </div>
          </article>
        );
      })}
    </>
  );
}

// ---- Flagship programs ----
export function FeaturedProgram() {
  const cert = prog("applied-ai");
  return (
    <article className="card feat">
      <div className="feat-copy">
        <span className="tag sun">Featured · the certificate track</span>
        <h3><Title p={cert} /></h3>
        <p>{cert.summary}</p>
        <span className="facts-line">3 stages · {cert.facts}</span>
        <div className="btns"><CurLink className="btn sm" open="applied-ai">Module by module <Arr /></CurLink></div>
      </div>
      <Coast className="feat-art" seed="education-cert" palette={cert.palette} size="tall" scene="open" glints>
        {(cert.stages ?? []).map((s, i) => (
          <div key={s.name} className="stage">
            <span className="pebble sm">{i + 1}</span>
            <b>{s.name}<span className="ref">Stage {i + 1} · {s.facts}</span></b>
            <p>{s.line}</p>
          </div>
        ))}
      </Coast>
    </article>
  );
}

export function ProgramsMain() {
  return (
    <>
      {["business-leaders", "making-waves"].map((id) => {
        const p = prog(id);
        return (
          <article key={id} className="card prog reveal">
            <Coast className="art-top" seed={`education-prog-${p.id}`} palette={p.palette} size="card" scene={id === "making-waves" ? "beach" : "cove"}>
              <span className="tag">{p.audience}</span>
            </Coast>
            <h3><Title p={p} /></h3>
            <p>{p.summary}</p>
            <span className="facts-line">{p.facts}</span>
            <div className="btns"><CurLink className="link" open={p.id}>See every module</CurLink></div>
          </article>
        );
      })}
    </>
  );
}

export function ProgramsSoon() {
  return (
    <>
      {PROGRAMS.filter((p) => p.soon).map((p) => (
        <article key={p.id} className="card soon reveal">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            <span className="tag sun">Coming soon</span>
            <span className="tag line">Department track</span>
          </div>
          <h3><Title p={p} /></h3>
          <p>{p.summary}</p>
          <span className="facts-line">{p.facts}</span>
        </article>
      ))}
    </>
  );
}

// ---- Module by module (from PROGRAMS). Module lengths for the certificate and Making Waves
// are 30 min · 3 lessons each, from the live membership page. ----
const CUR: [string, string][] = [["applied-ai", "Applied AI certificate"], ["business-leaders", "AI for Business Leaders"], ["making-waves", "Making Waves"]];
const CUR_FACTS: Record<string, string> = {
  "applied-ai": "3 stages · 10 modules · 30 lessons · 5 hours",
  "business-leaders": "6 modules · 25 lessons · 15 hours",
  "making-waves": "10 modules · 30 lessons · 5 hours · ungraded"
};
const STAGE_PEB = ["var(--shallows)", "var(--sage)", "var(--dawn)"];

/** The tab buttons; the global [data-switch] handler does the switching. */
export function CurTabs() {
  return (
    <>
      {CUR.map(([id, label], i) => (
        <button key={id} type="button" role="tab" data-val={id} aria-selected={i === 0}>{label}</button>
      ))}
    </>
  );
}

function Mod({ n, t, d, f }: { n: number; t: string; d?: string; f?: string }) {
  return (
    <li className="mod">
      <span className="num">Module {pad(n)}</span>
      <b>{t}</b>
      {f && <span className="f">{f}</span>}
      {d && <p>{d}</p>}
    </li>
  );
}

function CurBody({ p }: { p: Program }) {
  if (p.stages) {
    let n = 0;
    return (
      <>
        {p.stages.map((s, si) => (
          <div key={s.name} className="stage-block">
            <div className="lab">
              <span className="pebble sm" style={{ "--peb": STAGE_PEB[si] }}>{si + 1}</span>
              <span className="ref">Stage {si + 1} · {s.facts}</span>
              <b>{s.name}</b>
              <p>{s.line}</p>
            </div>
            <ol className="mods">{s.modules.map((m) => { n++; return <Mod key={n} n={n} t={m} f="30 min · 3 lessons" />; })}</ol>
          </div>
        ))}
      </>
    );
  }
  const mods = p.modules ?? [];
  if (p.id === "business-leaders") return <ol className="mods">{mods.map((m, mi) => <Mod key={mi} n={mi + 1} t={m.t} d={m.d} f={m.f} />)}</ol>;
  return <ol className="mods two">{mods.map((m, mi) => <Mod key={mi} n={mi + 1} t={m.t} f="30 min · 3 lessons" />)}</ol>;
}

function CurInner({ p }: { p: Program }) {
  return (
    <>
      <Coast className="cur-head" seed={`education-cur-${p.id}`} palette={p.palette} size="wide" scene="open">
        <div>
          <span className="ref">{p.audience}</span>
          <h3><Title p={p} /></h3>
          <span className="facts-line">{CUR_FACTS[p.id]}</span>
        </div>
      </Coast>
      <div className="cur-body"><CurBody p={p} /></div>
    </>
  );
}

export function CurPanels() {
  return (
    <>
      {CUR.map(([id], i) => {
        const p = prog(id);
        return (
          <div key={id} className="cur" data-panel={`cur:${p.id}`} role="tabpanel" hidden={i > 0}>
            <CurInner p={p} />
          </div>
        );
      })}
    </>
  );
}

/** One course's module-by-module block on its own (no tabs), for pages outside /education. */
export function CurCourse({ id }: { id: string }) {
  return <div className="cur reveal"><CurInner p={prog(id)} /></div>;
}

// ---- Platform sample data (fictional company: Brasswell Manufacturing Co.) ----
type Status = "Complete" | "In progress" | "Stalled" | "Not started";
const TEAM: [string, string, number, string, string, Status][] = [
  ["Sam Whitfield", "Finance", 100, "30/30", "3 days ago", "Complete"],
  ["Dana Okafor", "HR", 100, "30/30", "Yesterday", "Complete"],
  ["Aisha Rahman", "Marketing", 77, "23/30", "Today", "In progress"],
  ["Priya Natarajan", "Sales", 60, "18/30", "Today", "In progress"],
  ["Elena Ruiz", "Customer service", 50, "15/30", "2 days ago", "In progress"],
  ["Jordan Alvarez", "Operations", 27, "8/30", "Today", "In progress"],
  ["Marcus Bell", "Operations", 13, "4/30", "16 days ago", "Stalled"],
  ["Tom Grady", "Operations", 0, "0/30", "—", "Not started"]
];
const ST_TAG: Record<Status, string> = { "Complete": "sage", "In progress": "t", "Stalled": "e", "Not started": "line" };

export function TeamRows() {
  return (
    <>
      {TEAM.map(([name, dept, pc, lessons, last, st]) => (
        <tr key={name}>
          <td>{name}</td>
          <td className="hs">{dept}</td>
          <td><div className="pc"><div className={`bar ${st === "Stalled" ? "e" : "t"}`} data-to={pc}><i style={{ width: 0 }} /></div><span>{pc}%</span></div></td>
          <td className="hm">{lessons}</td>
          <td className="hm">{last}</td>
          <td><span className={`tag ${ST_TAG[st]}`}>{st}</span></td>
        </tr>
      ))}
    </>
  );
}

const FUNNEL: [string, number][] = [["Invited", 20], ["Enrolled", 18], ["Started", 15], ["Reached 25%", 14], ["Reached 50%", 11], ["Reached 75%", 9], ["Completed", 7], ["Certificate opened", 6]];

export function Funnel() {
  return (
    <>
      {FUNNEL.map(([label, n]) => (
        <div key={label} className="r">
          <span>{label}</span>
          <div className="bar e" data-to={n / 20 * 100}><i style={{ width: 0 }} /></div>
          <b>{n}</b>
        </div>
      ))}
    </>
  );
}

const SKILL: [string, number, number][] = [
  ["I understand, in plain language, what these tools actually do.", 35, 72.5],
  ["I use one proactively in my own work, without being told to.", 22.5, 60],
  ["I can tell when the output is wrong.", 30, 65],
  ["I know what I am and am not allowed to put into one.", 25, 77.5],
  ["I could explain the value to a sceptical colleague.", 20, 57.5],
  ["I have changed how a task gets done, not just done it faster.", 15, 50]
];

export function Skill() {
  return (
    <>
      {SKILL.map(([line, a, b]) => (
        <div key={line} className="row">
          <span>{line}</span>
          <span className="trk" style={{ "--a": `${a}%`, "--b": `${b}%` }} aria-hidden="true">
            <span className="rng" />
            <span className="pt a" />
            <span className="pt b" />
          </span>
        </div>
      ))}
    </>
  );
}
