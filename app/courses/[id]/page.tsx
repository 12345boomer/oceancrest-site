import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Coast from "@/components/Coast";
import Contours from "@/components/Contours";
import CourseCard from "@/components/CourseCard";
import { COURSES, TRACKS, categoryById, courseById } from "@/lib/courses";
import "./page.css";

/*
  One course page per course in lib/courses, built at build time. Ported from course.html, which
  rendered all of this from ?id= with a script (old course.html?id= links redirect here).
*/

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return COURSES.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = courseById((await params).id);
  if (!c) return { title: "Course — OceanCrest AI" };
  return { title: `${c.title} — OceanCrest AI`, description: c.blurb };
}

const pad = (n: number) => (n < 10 ? "0" : "") + n;
const Arr = () => <span className="arr" aria-hidden="true">→</span>;

export default async function Page({ params }: Props) {
  const c = courseById((await params).id);
  const cat = c && categoryById(c.category);
  if (!c || !cat) notFound();
  const tr = TRACKS[c.track];
  const isTemplate = c.type === "template", mind = c.track === "mindset";

  const format = isTemplate ? "Download + prompts" : mind ? "Reading + reflection" : "Video + hands-on practice";
  const firstCourse = courseById(mind ? "m-without-fear" : "ai-fundamentals");
  const outline = isTemplate
    ? ["The template file", "A prompt for every slide", "Example: a finished deck", "How to adapt it to your business"]
    : ["[Lesson title]", "[Lesson title]", "[Lesson title]", "[Lesson title]", "[Lesson title]"];

  // Up to three more: the same category first, then the rest of the track.
  let related = COURSES.filter((x) => x.category === c.category && x.id !== c.id);
  if (related.length < 3) related = related.concat(COURSES.filter((x) => x.track === c.track && x.category !== c.category && x.id !== c.id));
  related = related.slice(0, 3);
  const bearing = 160 + (c.id.length * 7) % 24;

  return (
    <main id="main" className={`page-course c-${c.track}`}>
      <section className="course-hero">
        <div className="wrap">
          <Coast className="course-art has-contours" seed={c.id} palette={c.track} size="wide" scene={mind ? "beach" : "headland"} glints>
            <Contours ink="white" />
            <i className="tick tick-tl" aria-hidden="true" />
            <i className="tick tick-tr" aria-hidden="true" />
            <i className="tick tick-bl" aria-hidden="true" />
            <i className="tick tick-br" aria-hidden="true" />
            <span className={`tag cat-${c.category}`}>{cat.name}</span>
            <span className={`half${mind ? " e" : ""}`}>{tr.name}</span>
            <div className="title-block" aria-hidden="true">
              <p>OceanCrest AI · Learning</p>
              <p>Chart OC-02d — {cat.name}</p>
              <p>Course {c.id} · Corrected 2026</p>
            </div>
          </Coast>
          <div className="ch-grid">
            <div>
              <nav className="ref crumbs" aria-label="Breadcrumb">
                <Link href="/courses">Courses</Link>
                <span aria-hidden="true">/</span>
                <Link href={`/courses?track=${c.track}`}>{tr.name}</Link>
                <span aria-hidden="true">/</span>
                <Link href={`/courses?cat=${c.category}`}>{cat.name}</Link>
              </nav>
              <h1 className="h1">{c.title}{c.draft && <span className="pa">PA</span>}</h1>
              <p className="lede">{c.blurb}</p>
              <div className="btns">
                <Link className="btn primary" href="/diagnostic">Take the diagnostic <Arr /></Link>
                <Link className="btn" href="/book?about=learning">Book a call to get access</Link>
              </div>
            </div>
            <div className="facts">
              <div><span className="ref">Level</span><b>{c.level}</b></div>
              <div><span className="ref">Length</span><b>{isTemplate ? "Self-serve" : "[X] lessons · [X] hrs"}</b></div>
              <div><span className="ref">Format</span><b>{format}</b></div>
              <div><span className="ref">Track</span><b>{tr.name}</b></div>
            </div>
          </div>
        </div>
      </section>

      <section className="lane-host">
        <div className="course-lane" aria-hidden="true" style={{ top: "clamp(40px,5vw,64px)" }}>
          <span className="course-waypoint" />
          <span className="course-rule" />
          <span className="course-bearing">CO {bearing}°</span>
        </div>
        <div className="wrap course-body">
          <div className="main-col">
            {c.draft && (
              <div className="draft">
                <span className="tag line">Working title</span>
                <p>PA — position approximate: the title is a working title. The mindset team is still shaping this course.</p>
              </div>
            )}
            <h2>{isTemplate ? "What you get." : "What you will be able to do."}</h2>
            <ul className="ticks">
              <li><span>[Outcome 1: a specific thing the learner can do after this course]</span></li>
              <li><span>[Outcome 2]</span></li>
              <li><span>[Outcome 3]</span></li>
            </ul>
            <h2>{isTemplate ? "What is inside." : "Course outline."}</h2>
            <ol className="syllabus">
              {outline.map((t, i) => (
                <li key={i}>
                  <span className="n">{pad(i + 1)}</span>
                  <span className="t">{t}{!isTemplate && <small>[One-line summary]</small>}</span>
                  <span className="d">{isTemplate ? "" : "[X] min"}</span>
                </li>
              ))}
              {!isTemplate && (
                <li className="task">
                  <span className="n">{pad(outline.length + 1)}</span>
                  <span className="t">
                    {mind ? "Team discussion and reflection" : "Course task: build it for your job"}
                    <small>{mind ? "Bring what you learned to your next team meeting." : "Apply the course to a real task and save the result to your playbook."}</small>
                  </span>
                  <span className="d">[X] min</span>
                </li>
              )}
            </ol>
          </div>
          <aside className="side-col" aria-label="About this course">
            {c.prereq ? (
              <div className="box start">
                <span className="eyebrow">Start here</span>
                <p>This is the first course in the {tr.name.toLowerCase()} track. Everything else builds on it.</p>
              </div>
            ) : firstCourse && (
              <div className="box">
                <span className="eyebrow">Before you start</span>
                <p>Take <Link className="link" href={`/courses/${firstCourse.id}`}>{firstCourse.title}</Link> first if you have not already. Or take the diagnostic, and we will tell you where to start.</p>
              </div>
            )}
            <div className="box">
              <span className="eyebrow">Track lead</span>
              <div className="lead">
                <img src={tr.photo} alt={tr.lead} loading="lazy" />
                <div><b>{tr.lead}</b><span>{tr.leadTitle}</span></div>
              </div>
            </div>
            <div className="box">
              <span className="eyebrow">Ends with</span>
              <p>{isTemplate ? "A finished file of your own, adapted to your business." : mind ? "A reflection only you and your manager see, plus a question for your team." : "Something you built for your own job, saved to your playbook."}</p>
            </div>
            <div className="box">
              <span className="eyebrow">Access</span>
              <p>Part of the membership: a seat unlocks every course. <Link className="link" href="/education#membership">What membership includes</Link></p>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="wrap related">
          <div className="sec-h">
            <h2>More in {cat.name.toLowerCase()}.</h2>
            <Link className="link" href={`/courses?cat=${c.category}`}>See all</Link>
          </div>
          <div className="cards">{related.map((r) => <CourseCard key={r.id} course={r} />)}</div>
        </section>
      )}

      <div className="wrap">
        <div className="notch" aria-hidden="true">
          <svg viewBox="0 0 1200 28" preserveAspectRatio="none">
            <path d="M0 10 H452 L480 18 H1200" fill="none" stroke="#b3b8bf" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          </svg>
          <i />
        </div>
      </div>

      <section className="section" style={{ paddingTop: "clamp(40px,5vw,64px)" }}>
        <div className="wrap">
          <Coast className="final has-contours" seed={`course-final-${c.track}`} palette="dusk" size="wide" scene="cove" glints>
            <Contours ink="white" />
            <div className="eyebrow" style={{ color: "var(--deep)" }}>Not sure this is the one</div>
            <h2 className="h2" style={{ marginTop: "14px" }}>Find out what you know before we <span className="stroke warm">teach</span> it.</h2>
            <p className="lede">Fifteen short questions, about five minutes. You get a level, a score in each area, and the courses that close your gaps.</p>
            <div className="btns">
              <Link className="btn primary" href="/diagnostic" data-sound="chime" data-sparkle="">Take the diagnostic <Arr /></Link>
              <Link className="btn" href="/courses">See every course</Link>
            </div>
          </Coast>
        </div>
      </section>
    </main>
  );
}
