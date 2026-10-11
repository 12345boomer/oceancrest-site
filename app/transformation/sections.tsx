/*
  Sections of the transformation page that other pages show too (/services/leadership-workshops,
  /services/workflows-and-automation). Their styles live in ./page.css under .page-transformation,
  so a page that renders one wraps it in (or puts on its <main>) that class.
*/
import Link from "next/link";
import Coast from "@/components/Coast";

const Lane = ({ bearing }: { bearing: string }) => (
  <div className="course-lane" aria-hidden="true">
    <span className="course-waypoint" />
    <span className="course-rule" />
    <span className="course-bearing">{bearing}</span>
  </div>
);

/**
 * Phase 02, Implementation. On /transformation it is one panel of the phase switch; with
 * `standalone` it drops the tab-panel wiring and shows on its own.
 */
export function PhaseImplementation({ standalone = false }: { standalone?: boolean }) {
  const panel = standalone ? {} : { id: "phase-b", role: "tabpanel", "data-panel": "phase:b", hidden: true };
  return (
    <div className="phase" {...panel}>
      <Coast seed="phase-implementation-lagoon" image="/assets/img/art/dots-columns.jpg" video="/assets/video/art-dots-columns.mp4" palette="technical" size="tall" scene="headland" className="art dots-columns">
        <span className="pebble" style={{ "--peb": "var(--lagoon)" }}>2</span>
        <div className="you">
          <span className="ref">You hold</span>
          <b>A running system you own.</b>
        </div>
      </Coast>
      <div className="txt">
        <span className="ref">Phase 02 of 03</span>
        <h3 className="h3">Implementation.</h3>
        <p className="lede">Only what the assessment justified gets built.</p>
        <div className="items">
          <div>
            <b>Scoped build</b>
            <p>Only what the assessment justifies, priced to scope.</p>
          </div>
          <div>
            <b>Dashboard, clients and pipeline</b>
            <p>The whole business on one live screen.</p>
          </div>
          <div>
            <b>Automation and AI agents</b>
            <p>The repetitive work runs itself.</p>
          </div>
          <div>
            <b>Owned infrastructure</b>
            <p>It's yours: an asset, not a subscription.</p>
          </div>
        </div>
        <div className="go">
          <a className="link" href="https://oceancrest.ai/case-001/" target="_blank" rel="noopener">See a demonstration engagement ↗</a>
        </div>
      </div>
    </div>
  );
}

/**
 * "Leaders first, then the whole company": the leadership workshop beside its session card.
 * `more` is the button under the copy (on /transformation it points at the workshops).
 */
export function LeadersSection({ more = { href: "/education#workshops", label: "See the workshops" } }: { more?: { href: string; label: string } }) {
  return (
    <section className="lane-host section tinted e">
      <Lane bearing="CO 168°" />
      <div className="wrap ws">
        <div className="reveal">
          <span className="half e">Education · Workshops</span>
          <h2 className="h2" style={{ marginTop: "18px" }}>
            Leaders first, then the whole{" "}
            <span className="stroke warm">company</span>
            .
          </h2>
          <p className="body">
            Leaders are the foundation of an AI rollout, so we start with them. Strategy sessions with leadership, then the whole team: what AI is and isn't, what your policy allows, and where the wins are. The people who run the work are the people who will run the system.
          </p>
          <div className="btns" style={{ marginTop: "28px" }}>
            <Link className="btn" href={more.href} style={{ background: "var(--paper)" }}>
              {more.label}{" "}
              <span className="arr" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <Coast seed="workshop-leaders-dawn" image="/assets/img/art/caustic-shallows.jpg" video="/assets/video/art-caustic-shallows.mp4" palette="mindset" size="wide" scene="cove" className="ws-art caustic-shallows reveal">
          <article className="session">
            <div className="top">
              <span className="ref">For the leadership team</span>
              <span className="tag sun">90 minutes</span>
            </div>
            <h3>Leading your company through AI.</h3>
            <p>
              For the CEO, owner or COO; an operations lead is a welcome plus-one. A working session on where AI makes sense in your business, and what your people need to hear before it arrives. Not a vendor pitch.
            </p>
            <ul className="ticks">
              <li><span>Your AI readiness, scored.</span></li>
              <li><span>The story your people need to hear.</span></li>
              <li><span>A charted course from pilot to payoff.</span></li>
            </ul>
          </article>
        </Coast>
      </div>
    </section>
  );
}

/** "How an engagement runs, in writing": the engagement-model paper and the demonstration case. */
export function WritingSection() {
  return (
    <section className="lane-host section has-contours" id="engagement">
      <Lane bearing="CO 167°" />
      <div className="wrap">
        <div className="sec-head reveal">
          <div>
            <div className="eyebrow">Before you book</div>
            <h2 className="h2">
              How an engagement runs, in{" "}
              <span className="stroke">writing</span>
              .
            </h2>
          </div>
          <p className="lede">
            Read the model, then see it played out on a demonstration engagement. Neither asks for a call.
          </p>
        </div>
        <div className="grid writing">
          <figure className="photo reveal">
            <img src="/assets/img/photos/oc-05-zigzag-stairs-tall.jpg" alt="A zigzagging concrete stair structure against a pale sky, stepping up in even stages. Generated image." loading="lazy" />
            <figcaption>In order, one stage at a time</figcaption>
          </figure>
          <a className="card pub reveal" href="https://oceancrest.ai/resources/engagement-model/" target="_blank" rel="noopener">
            <div className="cover">
              <img src="/assets/img/covers/cover-engagement-model.jpg" alt="Cover sheet of the white paper The engagement model, in four phases" loading="lazy" />
            </div>
            <span className="ref">Paper · OC-401 · 4 sheets · Free</span>
            <h3>The engagement model, in four phases.</h3>
            <p>
              How an engagement runs, from the first record we ask for to the day the build team steps back, and what stays behind. Collect the record, educate and align, implement and build, then the Office of AI, with what each phase asks of you.
            </p>
            <span className="link go">Read the paper ↗</span>
          </a>
          {" "}
          <a className="card pub reveal" href="https://oceancrest.ai/case-001/" target="_blank" rel="noopener">
            <Coast seed="demo-case-planning-engine" palette="technical" size="card" scene="open" glints className="cover"><span className="tag line">Demonstration</span></Coast>
            <span className="ref">Case · OC-100 · Five chapters</span>
            <h3>The planning engine.</h3>
            <p>
              A documented engagement, chapter by chapter: discovery, set-up, the team's own views, what runs under the hood, and the outcomes. A composite engagement with a fictional client, marked as a demonstration throughout.
            </p>
            <span className="link go">Open the demonstration case ↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
