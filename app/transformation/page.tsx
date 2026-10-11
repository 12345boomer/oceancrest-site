import type { Metadata } from "next";
import Link from "next/link";
import Coast from "@/components/Coast";
import { LeadersSection, PhaseImplementation, WritingSection } from "./sections";
import "./page.css";
import { ServiceRoute, PlanPeek } from "@/components/ServiceHero";

export const metadata: Metadata = {
  title: "AI Transformation Partner — OceanCrest AI",
  description: "What we're really selling is a process. Assessment, implementation and amplification, walked in order inside your operation, with your people, and never further than the assessment justifies."
};

export default function Page() {
  return (
    <main id="main" className="page-transformation">
      {/* 1. Hero */}
      <Coast as="section" seed="transformation-hero-lagoon" video="/assets/video/transformation-hero.mp4" palette="technical" size="hero" scene="headland" alive className="page-hero t-hero has-contours">
        <i className="tick tick-tl" aria-hidden="true" />
        <i className="tick tick-tr" aria-hidden="true" />
        <i className="tick tick-bl" aria-hidden="true" />
        <i className="tick tick-br" aria-hidden="true" />
        <div className="wrap" style={{ width: "100%" }}>
          <div className="ph-grid">
            <div className="ph-copy">
              <div className="eyebrow">
                AI Transformation Partner{" "}
                <span className="chart-ref" style={{ marginLeft: "10px", color: "var(--deep)" }}>OC-02a / Soundings</span>
              </div>
              <h1 className="h1">
                What we're really selling is a{" "}
                <span className="stroke">process</span>
                .
              </h1>
              <p className="lede">
                Three pieces, walked in order: inside your operation, with your people, and never further than the assessment justifies. Each piece ends in something you hold.
              </p>
              <div className="btns">
                <Link className="btn primary" href="/book">
                  Book now{" "}
                  <span className="arr" aria-hidden="true">→</span>
                </Link>
                {" "}
                <a className="btn" href="https://ocv-ai-assessment.netlify.app/" target="_blank" rel="noopener" style={{ background: "var(--paper)" }}>
                  Score your readiness{" "}
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
            <aside className="ph-aside">
              <ServiceRoute current="planning" />
              <PlanPeek />
            </aside>
          </div>
        </div>
      </Coast>
      {/* 2. The three phases */}
      <section className="lane-host section" id="phases">
        <div className="course-lane" aria-hidden="true">
          <span className="course-waypoint" />
          <span className="course-rule" />
          <span className="course-bearing">CO 171°</span>
        </div>
        <div className="wrap">
          <div className="sec-head center reveal">
            <div className="eyebrow">The partnership, in order</div>
            <h2 className="h2">
              Assess, build,{" "}
              <span className="stroke">amplify</span>
              .
            </h2>
            <p className="lede">
              We sit inside the business, grade every workflow, and build only what the assessment justifies. Stop at any handoff and keep everything that was built.
            </p>
          </div>
          <div className="phase-switch">
            <div className="switch" data-switch="phase" data-on="a" role="tablist" aria-label="The three phases">
              <button type="button" role="tab" data-val="a" aria-selected="true" aria-controls="phase-a">
                <i />
                Assessment
              </button>
              {" "}
              <button type="button" role="tab" data-val="b" aria-selected="false" aria-controls="phase-b">
                <i />
                Implementation
              </button>
              {" "}
              <button type="button" role="tab" data-val="c" aria-selected="false" aria-controls="phase-c">
                <i />
                Amplification
              </button>
            </div>
          </div>
          <div className="phase" id="phase-a" role="tabpanel" data-panel="phase:a">
            <Coast seed="phase-assessment-shallows" palette="technical" size="tall" scene="cove" glints className="art">
              <span className="pebble" style={{ "--peb": "var(--shallows)" }}>1</span>
              <div className="you">
                <span className="ref">You hold</span>
                <b>A score, and a ranked plan.</b>
              </div>
            </Coast>
            <div className="txt">
              <span className="ref">Phase 01 of 03</span>
              <h3 className="h3">Assessment.</h3>
              <p className="lede">We read the business before we touch it.</p>
              <div className="items">
                <div>
                  <b>Readiness score</b>
                  <p>0 to 100, a baseline for the leadership team.</p>
                </div>
                <div>
                  <b>Process mapping</b>
                  <p>We sit inside the business and chart how the work actually happens.</p>
                </div>
                <div>
                  <b>Workflow grading</b>
                  <p>Every workflow marked manual, hybrid, or automated.</p>
                </div>
                <div>
                  <b>Ranked build plan</b>
                  <p>Where AI moves the P&L first, reported to leadership.</p>
                </div>
              </div>
              <div className="go">
                <a className="btn sm" href="https://ocv-ai-assessment.netlify.app/" target="_blank" rel="noopener">
                  Score your readiness{" "}
                  <span aria-hidden="true">↗</span>
                </a>
                <span className="ref">Free · about three minutes · 0 to 100</span>
              </div>
            </div>
          </div>
          <PhaseImplementation />
          <div className="phase" id="phase-c" role="tabpanel" data-panel="phase:c" hidden>
            <Coast seed="phase-amplification-open" palette="hero" size="tall" scene="open" glints className="art">
              <span className="pebble" style={{ "--peb": "var(--sage)" }}>3</span>
              <div className="you">
                <span className="ref">You hold</span>
                <b>A number that proves it.</b>
              </div>
            </Coast>
            <div className="txt">
              <span className="ref">Phase 03 of 03</span>
              <h3 className="h3">Amplification.</h3>
              <p className="lede">What it returned, put back to work.</p>
              <div className="items">
                <div>
                  <b>Documented ROI</b>
                  <p>What changed, and what it's worth.</p>
                </div>
                <div>
                  <b>Savings redeployed</b>
                  <p>Into deeper automation, training, growth.</p>
                </div>
                <div>
                  <b>Fractional partnership</b>
                  <p>We stay on the team, month over month.</p>
                </div>
                <div>
                  <b>Next process, next department</b>
                  <p>The build compounds.</p>
                </div>
              </div>
              <div className="go">
                <Link className="btn primary sm" href="/book">
                  Book now{" "}
                  <span className="arr" aria-hidden="true">→</span>
                </Link>
                <a className="link" href="#options">Ways to start</a>
              </div>
            </div>
          </div>
          <p className="phases-foot">Each piece ends in something you hold: a score, a running system, a number.</p>
        </div>
      </section>
      {/* 3. The capability gap: live geometry from home OC-01c (svg.gap-chart), recoloured pastel */}
      <section className="lane-host section tinted has-contours">
        <div className="course-lane" aria-hidden="true">
          <span className="course-waypoint" />
          <span className="course-rule" />
          <span className="course-bearing">CO 170°</span>
        </div>
        <div className="wrap">
          <div className="sec-head reveal">
            <div>
              <div className="eyebrow">
                The opening{" "}
                <span className="chart-ref" style={{ marginLeft: "10px" }}>OC-01c / The capability gap</span>
              </div>
              <h2 className="h2">
                What models can do. What businesses actually{" "}
                <span className="stroke warm">use</span>
                .
              </h2>
            </div>
            <p className="lede">
              Capability compounds faster than adoption. The distance between the two curves is the work, and it is the work we do.
            </p>
          </div>
          <div className="gap-panel">
            <figure className="gapduo reveal">
              <svg className="gap-chart" viewBox="0 0 900 440" role="img" aria-label="A chart whose vertical axis is capability. Two curves rise across an illustrative time axis from 2023 through today to 2030. What models can do climbs steeply; what businesses actually use climbs gently. The hatched area between them widens year on year, and a bracket at the right measures it: that gap is the opportunity. The axes carry no numbers.">
                <defs>
                  <pattern id="oc-gap-hatch" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <rect width="9" height="9" fill="#a8dde3" fillOpacity=".22" />
                    <line x1="0" y1="0" x2="0" y2="9" stroke="#7fc4d8" strokeWidth="1.6" strokeOpacity=".6" />
                  </pattern>
                </defs>
                <g className="gc-grid" aria-hidden="true">
                  <line x1="80" y1="60" x2="660" y2="60" />
                  <line x1="80" y1="145" x2="660" y2="145" />
                  <line x1="80" y1="230" x2="660" y2="230" />
                  <line x1="80" y1="315" x2="660" y2="315" />
                </g>
                <line className="gc-now" x1="370" y1="45" x2="370" y2="400" />
                <line className="gc-axis" x1="80" y1="40" x2="80" y2="400" />
                <polygon className="gc-axis-h" points="80,30 75.5,42 84.5,42" />
                <text className="gc-axis-lbl" x="80" y="20">Capability</text>
                <line className="gc-axis" x1="80" y1="400" x2="672" y2="400" />
                <g className="gc-tick">
                  <text x="80" y="422">2023</text>
                  <text x="370" y="422" textAnchor="middle">Today</text>
                  <text x="660" y="422" textAnchor="end">2030</text>
                </g>
                <path className="gc-wedge late" fill="url(#oc-gap-hatch)" d="M 80 398 C 340 396, 520 300, 660 60 L 660 330 C 480 372, 300 392, 80 398 Z" />
                <g className="late" aria-hidden="true">
                  <circle className="sp" cx="600" cy="230" r="3" />
                  <circle className="sp" cx="540" cy="300" r="2.4" style={{ animationDelay: "1.1s" }} />
                  <circle className="sp" cx="630" cy="150" r="2.8" style={{ animationDelay: "2s" }} />
                  <circle className="sp" cx="470" cy="345" r="2.2" style={{ animationDelay: "2.7s" }} />
                </g>
                <path className="gc-use ln" pathLength="1" d="M 80 398 C 300 392, 480 372, 660 330" />
                <path className="gc-cap ln" pathLength="1" d="M 80 398 C 340 396, 520 300, 660 60" />
                <circle className="gc-end-cap late" cx="660" cy="60" r="6" />
                <circle className="gc-end-use late" cx="660" cy="330" r="6" />
                <g className="late" aria-hidden="true">
                  <path className="gc-brk" d="M 674 60 H 686 M 680 60 V 330 M 674 330 H 686" />
                  <text className="gc-note" x="696" y="200">The gap</text>
                </g>
                <g className="gc-conn gc-conn--cap late">
                  <path d="M 1010 110 L 952 110 C 900 60, 800 60, 698 60" />
                  <polygon points="0,-6 10,0 0,6" transform="translate(698,60) rotate(180)" />
                </g>
                <g className="gc-conn gc-conn--use late">
                  <path d="M 1010 290 L 952 290 C 900 330, 800 330, 698 330" />
                  <polygon points="0,-6 10,0 0,6" transform="translate(698,330) rotate(180)" />
                </g>
              </svg>
              <div className="gapcalls">
                <div className="gapbox gapbox--cap">
                  <p className="gb-head">
                    <span className="gb-key" aria-hidden="true" />
                    What models can actually do
                  </p>
                  <ul>
                    <li>Automate workflows</li>
                    <li>Think for themselves</li>
                    <li>Customize applications</li>
                  </ul>
                </div>
                <div className="gapbox gapbox--use">
                  <p className="gb-head">
                    <span className="gb-key" aria-hidden="true" />
                    What businesses actually use
                  </p>
                  <ul>
                    <li>For email</li>
                    <li>For high-level research</li>
                    <li>For really simple use cases</li>
                  </ul>
                </div>
              </div>
              <figcaption className="sources">
                Illustrative. The axes carry no claimed numbers. The shape is the argument: capability compounds faster than adoption, and the distance between the two curves is the work.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
      <div className="wrap" style={{ paddingTop: "28px" }}>
        <div className="notch" aria-hidden="true">
          <svg viewBox="0 0 1200 28" preserveAspectRatio="none">
            <path d="M0 10 H452 L480 18 H1200" fill="none" stroke="#b3b8bf" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          </svg>
          <i />
        </div>
      </div>
      {/* 4. Engagement options */}
      <section className="lane-host section" id="options">
        <div className="course-lane" aria-hidden="true">
          <span className="course-waypoint" />
          <span className="course-rule" />
          <span className="course-bearing">CO 169°</span>
        </div>
        <div className="wrap">
          <div className="sec-head reveal">
            <div>
              <div className="eyebrow">Engagement options</div>
              <h2 className="h2">
                Start where you{" "}
                <span className="stroke">are</span>
                .
              </h2>
            </div>
            <p className="lede">
              Three ways in, each one finished on its own. A business can stop at any handoff and keep everything that was built.
            </p>
          </div>
          <div className="ways">
            <article className="card way reveal">
              <Coast seed="option-learn-dawn" palette="mindset" size="card" scene="beach" glints className="art-top">
                <span className="half e">Education</span>
                <span className="pebble sm" style={{ "--peb": "var(--blush)" }}>1</span>
              </Coast>
              <span className="ref">Learn</span>
              <h3>The learning solution.</h3>
              <dl>
                <dt>For</dt>
                <dd>Companies whose people have to learn it first.</dd>
                <dt>What happens</dt>
                <dd>
                  The whole company completes the course: 3 stages, 10 modules, 5 hours. Completion is assigned, deadlined, and on file.
                </dd>
                <dt>You leave with</dt>
                <dd>A certificate of completion for every person, and a team that shares one vocabulary.</dd>
              </dl>
              <div className="start">
                <span className="ref">Start with</span>
                <Link className="btn sm" href="/education">
                  Explore the learning solution{" "}
                  <span className="arr" aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
            <article className="card way reveal">
              <Coast seed="option-diagnose-shallows" palette="technical" size="card" scene="cove" glints className="art-top">
                <span className="half">Transformation</span>
                <span className="pebble sm" style={{ "--peb": "var(--shallows)" }}>2</span>
              </Coast>
              <span className="ref">Diagnose</span>
              <h3>The assessment.</h3>
              <dl>
                <dt>For</dt>
                <dd>Leadership teams that need to know where AI pays before they spend on it.</dd>
                <dt>What happens</dt>
                <dd>
                  We sit inside the business and chart how the work actually happens, then grade every workflow manual, hybrid, or automated.
                </dd>
                <dt>You leave with</dt>
                <dd>A readiness score from 0 to 100 and a ranked build plan, reported to leadership.</dd>
              </dl>
              <div className="start">
                <span className="ref">Start with</span>
                <a className="btn sm" href="https://ocv-ai-assessment.netlify.app/" target="_blank" rel="noopener">
                  The free readiness assessment{" "}
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
            <article className="card way reveal">
              <Coast seed="option-build-headland" palette="hero" size="card" scene="headland" glints className="art-top">
                <span className="half">Transformation</span>
                <span className="pebble sm" style={{ "--peb": "var(--lagoon)" }}>3</span>
              </Coast>
              <span className="ref">Build</span>
              <h3>The transformation partner.</h3>
              <dl>
                <dt>For</dt>
                <dd>Companies ready to change how the work runs.</dd>
                <dt>What happens</dt>
                <dd>
                  Only what the assessment justified gets built: the dashboard, automation and AI agents, on infrastructure you own.
                </dd>
                <dt>You leave with</dt>
                <dd>Systems that are yours, an asset rather than a subscription, and documented ROI.</dd>
              </dl>
              <div className="start">
                <span className="ref">Start with</span>
                <Link className="btn primary sm" href="/book">
                  Book now{" "}
                  <span className="arr" aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          </div>
          <div className="frac reveal">
            <span className="pebble sm" style={{ "--peb": "var(--sage)" }} aria-hidden="true">+</span>
            <p>
              After any of the three, one option stays open:{" "}
              <b>fractional AI leadership</b>
              . Advisory, governance, a roadmap, and iteration on what is already live. Month to month, and yours to end.
            </p>
          </div>
        </div>
      </section>
      {/* 5. Leadership workshop */}
      <LeadersSection />
      <div className="wrap" style={{ paddingTop: "28px" }}>
        <div className="notch" aria-hidden="true">
          <svg viewBox="0 0 1200 28" preserveAspectRatio="none">
            <path d="M0 10 H452 L480 18 H1200" fill="none" stroke="#b3b8bf" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          </svg>
          <i />
        </div>
      </div>
      {/* 6. How an engagement runs, in writing */}
      <WritingSection />
      {/* 7. Final call */}
      <section className="section" style={{ paddingTop: "0" }}>
        <div className="wrap">
          <Coast seed="transformation-final-dusk" video="/assets/video/transformation-final.mp4" palette="dusk" size="wide" scene="headland" className="final has-contours">
            <i className="tick tick-tl" aria-hidden="true" />
            <i className="tick tick-tr" aria-hidden="true" />
            <i className="tick tick-bl" aria-hidden="true" />
            <i className="tick tick-br" aria-hidden="true" />
            <div className="eyebrow" style={{ color: "var(--deep)" }}>Begin</div>
            <h2 className="h2" style={{ marginTop: "14px" }}>
              Will AI scale across your company, or stall in another{" "}
              <span className="stroke">pilot</span>
              ?
            </h2>
            <p className="lede">
              Book a 30-minute meeting on Teams about transforming the operation. If you're not ready, we'll tell you, and tell you what to fix first. Or start with your team's knowledge: take the diagnostic.
            </p>
            <div className="btns">
              <Link className="btn primary" href="/book" data-sound="chime" data-sparkle="">
                Book now{" "}
                <span className="arr" aria-hidden="true">→</span>
              </Link>
              <Link className="btn" href="/diagnostic" style={{ background: "var(--paper)" }}>Take the diagnostic</Link>
            </div>
            <div className="alt">
              <a href="https://ocv-ai-assessment.netlify.app/" target="_blank" rel="noopener">
                <span className="ref">Not ready for a call</span>
                Score your AI readiness, 0 to 100 ↗
              </a>
              {" "}
              <Link href="/resources">
                <span className="ref">Reading first</span>
                Browse the resources →
              </Link>
            </div>
          </Coast>
        </div>
      </section>
    </main>
  );
}
