"use client";
/*
  <DashRuns />: the Workflows dashboard's activity log, ticking. Every few seconds a new
  automation slides in at the top and the oldest drops off the bottom, so the card shows the
  work running itself. Sample data for a fictional company, like the rest of the peek.
  Ticks only while the card is on screen and the tab is visible; still under reduced motion.
*/
import { useEffect, useRef, useState } from "react";

type Run = { id: number; label: string; time: string };

// Newest first. The server render and the first client render match; ticking starts after mount.
const START: Run[] = [
  { id: 3, label: "Weekly report drafted", time: "16:30" },
  { id: 2, label: "New leads routed to sales", time: "10:15" },
  { id: 1, label: "Quote follow-ups sent", time: "09:02" }
];
const NEXT = [
  "Invoice reminder sent",
  "New lead scored and routed",
  "Quote follow-up sent",
  "Timesheet reminders sent",
  "Reorder drafted for approval",
  "Onboarding email sent",
  "Overdue invoice flagged",
  "Daily cash summary posted"
];
const STEPS = [12, 7, 9, 5, 11, 8, 6, 10]; // minutes between runs, fixed so the log reads the same each visit
const EVERY = 3200;
const SHOWN = 3;

function later(time: string, mins: number): string {
  const [h, m] = time.split(":").map(Number), t = (h * 60 + m + mins) % (24 * 60);
  return String(Math.floor(t / 60)).padStart(2, "0") + ":" + String(t % 60).padStart(2, "0");
}

export default function DashRuns() {
  const [runs, setRuns] = useState<Run[]>(START);
  const ref = useRef<HTMLUListElement>(null);
  const n = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let onScreen = true, timer = 0;
    const io = "IntersectionObserver" in window ? new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; }) : null;
    io?.observe(el);
    const tick = () => {
      if (onScreen && !document.hidden) {
        const i = n.current++;
        setRuns((rs) => [{ id: rs[0].id + 1, label: NEXT[i % NEXT.length], time: later(rs[0].time, STEPS[i % STEPS.length]) }, ...rs].slice(0, SHOWN + 1));
      }
      timer = window.setTimeout(tick, EVERY);
    };
    timer = window.setTimeout(tick, EVERY);
    return () => { window.clearTimeout(timer); io?.disconnect(); };
  }, []);

  // One extra row stays in the DOM below the fold of the list, so the new row can push it out smoothly.
  return (
    <ul className="dash-runs live" ref={ref} aria-label="Automations that ran today" aria-live="off">
      {runs.map((r, i) => (
        <li key={r.id} className={r.id > START[0].id && i === 0 ? "new" : undefined}><i aria-hidden="true" />{r.label}<span>{r.time}</span></li>
      ))}
    </ul>
  );
}
