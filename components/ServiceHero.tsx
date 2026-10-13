import Link from "next/link";
import DashRuns from "@/components/DashRuns";
import Count from "@/components/Count";

/*
  The right half of the three service banners: the route card (doubles as navigation between
  the three service pages) and a peek at the thing each one leaves you holding.
  Figures in the peeks are sample data for a fictional company and are labelled that way.
*/

export type ServiceId = "planning" | "workflows" | "leadership";

const STOPS: { id: ServiceId; phase: string; title: string; href: string }[] = [
  { id: "planning", phase: "Assess", title: "AI Transformation Planning", href: "/transformation" },
  { id: "workflows", phase: "Build", title: "Workflows and Automation", href: "/services/workflows-and-automation" },
  { id: "leadership", phase: "Grow", title: "Leadership Workshops and Training", href: "/services/leadership-workshops" }
];

/** Assess → Build → Grow as buoys on a dotted line, with "You are here".
 *  On phones it shrinks to the three buoys and one "You are here" line, so the painting shows. */
export function ServiceRoute({ current }: { current: ServiceId }) {
  const at = STOPS.find((s) => s.id === current);
  return (
    <nav className="svc-card svc-route" aria-label="The three services, in order">
      <div className="svc-h"><span className="ref">The route</span></div>
      <ol>
        {STOPS.map((s, i) => {
          const here = s.id === current;
          const body = (
            <>
              <span className="buoy" aria-hidden="true">{i + 1}</span>
              <span className="ref">{s.phase}</span>
              <b>{s.title}</b>
            </>
          );
          return (
            <li key={s.id} className={here ? "here" : undefined}>
              {here && <em className="pin">You are here</em>}
              {here ? <span aria-current="page">{body}</span> : <Link href={s.href} aria-label={`${s.phase}: ${s.title}`}>{body}</Link>}
            </li>
          );
        })}
      </ol>
      <p className="svc-here" aria-hidden="true"><span className="ref">You are here</span> <b>{at?.phase}</b></p>
    </nav>
  );
}

function Sample() {
  return <span className="tag line">Sample · fictional company</span>;
}

/** Workflows and Automation: the dashboard you build, in miniature. */
export function DashboardPeek() {
  return (
    <figure className="svc-card svc-peek">
      <div className="svc-h"><span className="ref">What you hold</span><Sample /></div>
      <b className="svc-t">Operations dashboard</b>
      <div className="dash-kpis">
        <div><span className="ref"><span className="lg">Open quotes</span><span className="sm">Quotes</span></span><b>14</b></div>
        <div><span className="ref"><span className="lg">Invoices due</span><span className="sm">Invoices</span></span><b>6</b></div>
        <div><span className="ref"><span className="lg">New leads</span><span className="sm">Leads</span></span><b>23</b></div>
      </div>
      <DashRuns />
    </figure>
  );
}

/** Leadership Workshops and Training: the 90-minute session, as a running order. */
export function AgendaPeek() {
  return (
    <figure className="svc-card svc-peek">
      <div className="svc-h"><span className="ref">The running order</span><span className="tag sun">90 minutes</span></div>
      <ol className="agenda timed">
        <li><time>0:00</time><span><b>Readiness score</b><em>Where the company stands, out of 100</em></span></li>
        <li><time>0:30</time><span><b>The story</b><em>What your people need to hear, and from whom</em></span></li>
        <li><time>1:00</time><span><b>The course</b><em>From pilot to payoff, charted</em></span></li>
        <li><time>1:30</time><span><b>Wrap-up</b><em>Next steps agreed, before anyone leaves the room</em></span></li>
      </ol>
    </figure>
  );
}

/** AI Transformation Planning: the readiness score and ranked build plan. */
export function PlanPeek() {
  return (
    <figure className="svc-card svc-peek">
      <div className="svc-h"><span className="ref">What you hold</span><Sample /></div>
      <div className="plan-score">
        <b><Count to={62} /><small> / 100</small></b>
        <span className="ref">Readiness score</span>
        <span className="bar t" data-to="62" aria-hidden="true"><i style={{ width: 0 }} /></span>
      </div>
      <ol className="plan-rank" aria-label="Ranked build plan">
        <li><span className="buoy sm">1</span>Quote follow-ups<em>Manual → automated</em></li>
        <li><span className="buoy sm">2</span>Weekly reporting<em>Manual → hybrid</em></li>
        <li><span className="buoy sm">3</span>Scheduling<em>Hybrid → automated</em></li>
      </ol>
    </figure>
  );
}
