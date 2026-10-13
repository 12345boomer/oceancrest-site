import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CodeForm } from "@/app/account/forms";
import { Lock } from "@/components/CourseAccess";
import { TRACKS, courseById } from "@/lib/courses";
import { isPreview, lessonsFor } from "@/lib/lessons";
import { getAccess } from "@/lib/access";

/*
  One lesson. Checked on the server on every request: lesson 1 needs a signed-in visitor (the
  preview), every other lesson needs the access code. Lesson content isn't written yet.
*/

type Props = { params: Promise<{ id: string; n: string }> };

async function load(params: Props["params"]) {
  const { id, n } = await params;
  const c = courseById(id), num = Number(n);
  const lessons = c ? lessonsFor(c) : [];
  const lesson = lessons.find((l) => l.n === num);
  return c && lesson ? { c, lessons, lesson } : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const x = await load(params);
  return x ? { title: `Lesson ${x.lesson.n} · ${x.c.title} — OceanCrest AI` } : { title: "Lesson — OceanCrest AI" };
}

export default async function Page({ params }: Props) {
  const x = await load(params);
  if (!x) notFound();
  const { c, lessons, lesson } = x;
  const { user, member } = await getAccess();
  const here = `/courses/${c.id}/lessons/${lesson.n}`;
  const open = member || (!!user && isPreview(lesson.n));
  const prev = lessons.find((l) => l.n === lesson.n - 1), next = lessons.find((l) => l.n === lesson.n + 1);

  return (
    <main id="main" className="page-lesson">
      <div className="wrap lesson">
        <nav className="ref crumbs" aria-label="Breadcrumb">
          <Link href="/courses">Courses</Link><span aria-hidden="true">/</span>
          <Link href={`/courses/${c.id}`}>{c.title}</Link><span aria-hidden="true">/</span>
          <span>Lesson {lesson.n}</span>
        </nav>
        <div className="lesson-grid">
          <aside className="lesson-list" aria-label="Lessons in this course">
            <span className="ref">{TRACKS[c.track].name}</span>
            <b>{c.title}</b>
            <ol>
              {lessons.map((l) => {
                const can = member || (!!user && isPreview(l.n));
                return (
                  <li key={l.n} className={(l.n === lesson.n ? "cur " : "") + (can ? "" : "locked")}>
                    <Link href={`/courses/${c.id}/lessons/${l.n}`} aria-current={l.n === lesson.n ? "page" : undefined}>
                      <span className="n">{l.n < 10 ? "0" + l.n : l.n}</span>
                      <span className="t">{l.title}{isPreview(l.n) && !member && <em>Preview</em>}</span>
                      {!can && <span className="lock"><Lock /></span>}
                    </Link>
                  </li>
                );
              })}
            </ol>
          </aside>
          <article className="lesson-main">
            <span className="ref">Lesson {lesson.n} of {lessons.length}{isPreview(lesson.n) && !member ? " · Preview" : ""}</span>
            <h1 className="h2">{lesson.title}</h1>
            {lesson.summary && <p className="lede">{lesson.summary}</p>}
            {open ? (
              <>
                <div className="lesson-body">
                  <div className="lesson-video" aria-label="Lesson video placeholder"><span className="ref">[Lesson video]</span></div>
                  <p>[Lesson content to come. This is where the lesson's video, reading and exercises go.]</p>
                  <p>[Practice: a short task to try in ChatGPT, Claude or Copilot, with an example of a good result.]</p>
                </div>
                <div className="lesson-nav">
                  {prev ? <Link className="btn" href={`/courses/${c.id}/lessons/${prev.n}`}>← Lesson {prev.n}</Link> : <span />}
                  {next
                    ? <Link className="btn primary" href={`/courses/${c.id}/lessons/${next.n}`}>Lesson {next.n} <span className="arr" aria-hidden="true">→</span></Link>
                    : <Link className="btn primary" href="/courses" data-sparkle="">Finish the course <span className="arr" aria-hidden="true">→</span></Link>}
                </div>
              </>
            ) : (
              <div className="lesson-lock">
                <span className="lock-badge"><Lock title="This lesson is locked" /></span>
                {!user ? (
                  <>
                    <b>Sign in to preview this course.</b>
                    <p>The first lesson of every course is open to anyone signed in. An access code unlocks the rest.</p>
                    <div className="btns">
                      <Link className="btn primary" href={`/login?next=${encodeURIComponent(isPreview(lesson.n) ? here : `/courses/${c.id}/lessons/1`)}`}>Sign in <span className="arr" aria-hidden="true">→</span></Link>
                      <Link className="btn" href={`/courses/${c.id}`}>Back to the course</Link>
                    </div>
                  </>
                ) : (
                  <>
                    <b>This lesson is part of the full library.</b>
                    <p>You can open the first lesson of every course. Enter your access code to unlock every lesson.</p>
                    <CodeForm next={here} />
                    <p className="acc-fine">No code yet? <Link className="link" href="/book">Talk to us about access</Link>, or <Link className="link" href={`/courses/${c.id}/lessons/1`}>open the preview lesson</Link>.</p>
                  </>
                )}
              </div>
            )}
          </article>
        </div>
      </div>
    </main>
  );
}
