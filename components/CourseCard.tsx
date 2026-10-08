import Link from "next/link";
import Coast from "@/components/Coast";
import { TRACKS, categoryById, type Course } from "@/lib/courses";

/** One course card, shared by the home, education, courses, course and diagnostic pages. */
export default function CourseCard({ course: c }: { course: Course }) {
  const cat = categoryById(c.category);
  return (
    <Link className={`cc ${c.track}`} href={`/courses/${c.id}`}>
      <Coast className="cc-art" seed={c.id} palette={c.track} size="card">
        <span className={`tag cat-${c.category}`}>{cat?.name}</span>
      </Coast>
      <div className="cc-body">
        <div className="cc-top">
          <span className="ref">{TRACKS[c.track].name}</span>
          {c.prereq && <span className="tag t">Start here</span>}
          {c.type === "template" && <span className="tag line">Template</span>}
          {c.draft && <span className="tag line">Working title</span>}
        </div>
        <h3>{c.title}</h3>
        <p>{c.blurb}</p>
        <div className="cc-meta">
          <span>{c.level}</span>
          <span>{c.type === "template" ? "Download" : "[X] lessons · [X] hrs"}</span>
        </div>
      </div>
    </Link>
  );
}
