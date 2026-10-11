"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/*
  The course page's main buttons, by access. The page itself is static (built once for everyone),
  so this reads the readable cookies after mount; the lesson pages re-check access on the server.
*/

type State = "anon" | "preview" | "member";

export function readAccess(): State {
  const has = (k: string) => document.cookie.split("; ").some((c) => c.startsWith(k + "="));
  return has("oc_member") && has("oc_user") ? "member" : has("oc_user") ? "preview" : "anon";
}

export function Lock({ title = "Locked" }: { title?: string }) {
  return (
    <svg className="lock-ico" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" role="img" aria-label={title}>
      <rect x="2.5" y="6" width="9" height="6.5" rx="1.5" /><path d="M4.5 6V4.5a2.5 2.5 0 0 1 5 0V6" />
    </svg>
  );
}

export default function CourseAccess({ id }: { id: string }) {
  const [state, setState] = useState<State>("anon");
  useEffect(() => setState(readAccess()), []);
  const first = `/courses/${id}/lessons/1`;
  const Arr = () => <span className="arr" aria-hidden="true">→</span>;
  if (state === "member") return <div className="btns"><Link className="btn primary" href={first}>Start the course <Arr /></Link></div>;
  if (state === "preview") {
    return (
      <div className="btns">
        <Link className="btn primary" href={first}>Start the preview <Arr /></Link>
        <Link className="btn" href={`/account?next=${encodeURIComponent(`/courses/${id}/lessons/2`)}`}>Unlock every course</Link>
      </div>
    );
  }
  return (
    <div className="btns">
      <Link className="btn primary" href={`/login?next=${encodeURIComponent(first)}`}>Sign in to preview <Arr /></Link>
      <Link className="btn" href="/diagnostic">Take the diagnostic</Link>
    </div>
  );
}
