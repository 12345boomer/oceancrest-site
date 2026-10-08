import type { Metadata } from "next";
import Link from "next/link";
import Coast from "@/components/Coast";
import { CATEGORIES, COURSES, TRACKS, type TrackId } from "@/lib/courses";
import "./page.css";

// Tool logos, doubled so the marquee loops seamlessly (the second set is hidden from screen readers).
const TOOLS = ["slack", "quickbooks", "notion", "microsoft", "google-workspace", "hubspot", "salesforce", "dropbox", "stripe", "shopify", "airtable", "asana", "monday", "trello", "claude", "openai"];
const TOOL_NAMES: Record<string, string> = { "google-workspace": "Google Workspace", "monday": "monday.com", "openai": "OpenAI", "hubspot": "HubSpot", "quickbooks": "QuickBooks" };
const toolName = (t: string) => TOOL_NAMES[t] || t.charAt(0).toUpperCase() + t.slice(1);

function Logos() {
  return (
    <>
      {TOOLS.map((t) => <img key={t} src={`/assets/img/integrations/logo-${t}.svg`} alt={toolName(t)} loading="lazy" />)}
      {TOOLS.map((t) => <img key={`${t}-2`} src={`/assets/img/integrations/logo-${t}.svg`} alt="" aria-hidden="true" loading="lazy" />)}
    </>
  );
}

// The two tracks, built from lib/courses so counts and categories stay in sync.
const TRACK_COPY: Record<TrackId, { scene: "headland" | "beach"; title: string; line: string }> = {
  technical: { scene: "headland", title: "Technical skills.", line: "The tools themselves: prompting, building assistants and automations, and AI applied to each department's work." },
  mindset: { scene: "beach", title: "Mindset and culture.", line: "The people side: what AI means for each job, how leaders bring it to a team, and the habits that make it stick." }
};

function TrackCard({ t, i }: { t: TrackId; i: number }) {
  const tr = TRACKS[t], cp = TRACK_COPY[t];
  const all = COURSES.filter((c) => c.track === t);
  const first = all.find((c) => c.prereq);
  return (
    <article className={`card track${t === "mindset" ? " e" : ""}`}>
      <Coast className="art-top" seed={`track-${t}`} palette={t} size="card" scene={cp.scene} water>
        <span className="tag" style={{ background: "var(--paper)" }}>Track 0{i + 1} · {all.length} courses</span>
      </Coast>
      <h3>{cp.title}</h3>
      <p>{cp.line}</p>
      <div className="lead">
        <img src={tr.photo} alt="" loading="lazy" />
        <span><b>{tr.lead}</b>Track lead · {tr.leadTitle}</span>
      </div>
      <ul className="track-cats">
        {CATEGORIES.filter((c) => c.track === t).map((cat) => (
          <li key={cat.id}>
            <Link href={`/courses?cat=${cat.id}`}>
              <i className={`cat-${cat.id}`} />
              <span><b>{cat.name}</b>{cat.note}</span>
              <em>{all.filter((c) => c.category === cat.id).length}</em>
            </Link>
          </li>
        ))}
      </ul>
      {first && (
        <Link className="start" href={`/courses/${first.id}`}>
          <span className="ref">Start here</span>{first.title} <span aria-hidden="true">→</span>
        </Link>
      )}
      <div className="more"><Link className="link" href={`/courses?track=${t}`}>All {all.length} {t} courses</Link></div>
    </article>
  );
}

export const metadata: Metadata = {
  title: "OceanCrest AI — Your operation, transformed from the inside",
  description: "OceanCrest AI is half transformation partner, half AI educator. We assess your operation and build inside it, and we teach your whole company to work with what we build."
};

export default function Page() {
  return (
    <main id="main" className="page-home">
      {/* 1. Hero: the promise, the two halves as two doors */}
      <Coast as="section" seed="oceancrest-home-v2" palette="hero" size="hero" scene="cove" water className="hero has-contours">
        <i className="tick tick-tl" aria-hidden="true" />
        <i className="tick tick-tr" aria-hidden="true" />
        <div className="title-block hero-tb" aria-hidden="true">
          <p>OceanCrest AI · A division of OceanCrest Ventures</p>
          <p>Chart OC-00 — First approach</p>
          <p>Soundings in production systems · Corrected 2026</p>
        </div>
        <div className="wrap hero-copy">
          <div className="eyebrow">AI transformation and education · for small and mid-sized businesses</div>
          <h1 className="display" aria-label="Your operation, transformed from the inside.">
            <span aria-hidden="true">
              <span className="nw">
                Your{" "}
                <span className="rotator"><span className="rotator-slot">operation</span></span>
                ,
              </span>
              <br />
              transformed from the{" "}
              <span className="stroke">inside</span>
              .
            </span>
          </h1>
          <p className="lede">
            We are half transformation partner, half AI educator. We assess your operation and build inside it, and we teach your whole company to work with what we build. Inside your walls, until it runs without us.
          </p>
          <div className="btns">
            <Link className="btn primary" href="/book">
              Book now{" "}
              <span className="arr" aria-hidden="true">→</span>
            </Link>
            {" "}
            <Link className="btn" href="/diagnostic" style={{ background: "var(--paper)" }}>Take the diagnostic</Link>
          </div>
        </div>
        <div className="wrap" style={{ width: "100%" }}>
          <div className="doors">
            <article className="door t">
              <div className="pebbles" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
              <span className="half">Transformation</span>
              <h2>Change how the work runs.</h2>
              <p>
                We sit inside the business, grade every workflow, and build only what the assessment justifies. You keep systems you own and a number that proves it.
              </p>
              <div className="row">
                <Link className="btn primary sm" href="/book">
                  Book now{" "}
                  <span className="arr" aria-hidden="true">→</span>
                </Link>
                <Link className="link" href="/transformation">See the partnership</Link>
              </div>
            </article>
            <article className="door e">
              <div className="pebbles" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
              <span className="half e">Education</span>
              <h2>Teach the whole team.</h2>
              <p>
                Courses in two tracks, mindset and technical, that the whole company completes. Start with a diagnostic so we teach what your people don't know yet.
              </p>
              <div className="row">
                <Link className="btn sm" href="/diagnostic">
                  Take the diagnostic{" "}
                  <span className="arr" aria-hidden="true">→</span>
                </Link>
                <Link className="link" href="/courses">See the courses</Link>
              </div>
            </article>
          </div>
        </div>
      </Coast>
      {/* 2. Tools we build on */}
      <section className="tools" style={{ borderBottom: "0" }}>
        <div className="wrap">
          <p className="ref">We build on the tools your business already runs</p>
          <div className="marquee-wrap">
            <div className="marquee"><div className="marquee-track" id="logos"><Logos /></div></div>
            <button type="button" className="marquee-toggle" aria-pressed="false">Pause</button>
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
      {/* 3. The stall */}
      <section className="lane-host section">
        <div className="course-lane" aria-hidden="true">
          <span className="course-waypoint" />
          <span className="course-rule" />
          <span className="course-bearing">CO 172°</span>
        </div>
        <div className="wrap stall">
          <div className="reveal">
            <div className="eyebrow">The problem</div>
            <h2 className="h2" style={{ marginTop: "14px" }}>
              Most AI pilots stall in the{" "}
              <span className="stroke warm">demo</span>
              .
            </h2>
            <p className="body">
              The tooling is not the problem. Ownership is. Systems built outside your business, by vendors who leave, die the day the contract ends. Everyone has the tool. Almost nobody has the system.
            </p>
            <p className="body">
              We build the other kind: inside your walls, with your people, measured in the three currencies a small business actually runs on. Money, energy, and time. Your team learns first. Your data stays yours.
            </p>
          </div>
          <div className="gauges reveal">
            <div className="gauge big">
              <div className="top">
                <b data-count="80" data-suffix="%+">0%</b>
                <span>
                  of organizations have piloted generative AI
                  <sup className="s">S01</sup>
                </span>
              </div>
              <div className="bar" data-to="80"><i /></div>
            </div>
            <div className="gauge small">
              <div className="top">
                <b data-count="5" data-prefix="~" data-suffix="%">~0%</b>
                <span>
                  got it running in production at scale
                  <sup className="s">S01</sup>
                </span>
              </div>
              <div className="bar" data-to="5"><i /></div>
            </div>
            <p className="sources">
              S01 ·{" "}
              <a href="https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf" target="_blank" rel="noopener">MIT NANDA, The GenAI Divide, Jul 2025 ↗</a>
              {" "}· 52 interviews, 153 leaders, 300 deployments · self-labeled preliminary
            </p>
          </div>
        </div>
      </section>
      {/* 4. The two halves, switchable */}
      <section className="lane-host section tinted has-contours" id="halves">
        <div className="course-lane" aria-hidden="true">
          <span className="course-waypoint" />
          <span className="course-rule" />
          <span className="course-bearing">CO 171°</span>
        </div>
        <div className="wrap">
          <div className="sec-head center reveal">
            <div className="eyebrow">What we do</div>
            <h2 className="h2">
              One practice, two{" "}
              <span className="stroke">halves</span>
              .
            </h2>
            <p className="lede">
              Small businesses sit all along the spectrum on AI: 30% call themselves early adopters, 54% careful evaluators, and 21% would rather wait and see.
              <sup className="s">S02</sup>
              {" "}So we do two things. A process for the companies ready to change how the work runs, and a product for the companies whose people have to learn it first.
            </p>
          </div>
          <div className="halves-switch">
            <div className="switch" data-switch="halves" data-on="t" role="tablist" aria-label="Choose a half">
              <button type="button" role="tab" data-val="t" aria-selected="true">
                <i />
                Transformation
              </button>
              {" "}
              <button type="button" role="tab" data-val="e" aria-selected="false">
                <i />
                Education
              </button>
            </div>
          </div>
          <div className="half-panel t" data-panel="halves:t">
            <Coast seed="half-transformation" palette="technical" size="wide" scene="headland" water className="art">
              <span className="half">AI Transformation Partner · what we're really selling is a process</span>
            </Coast>
            <div className="steps">
              <div className="step">
                <span className="pebble">1</span>
                <h3>Assessment</h3>
                <p>We read the business before we touch it.</p>
                <ul className="ticks">
                  <li>
                    <span>
                      <b>Readiness score</b>
                      , 0 to 100, a baseline for leadership.
                    </span>
                  </li>
                  <li>
                    <span>
                      <b>Process mapping</b>
                      {" "}of how the work actually happens.
                    </span>
                  </li>
                  <li>
                    <span>
                      <b>Workflow grading</b>
                      : manual, hybrid, or automated.
                    </span>
                  </li>
                  <li>
                    <span>
                      <b>A ranked build plan</b>
                      {" "}for where AI moves the P&L first.
                    </span>
                  </li>
                </ul>
              </div>
              <div className="step">
                <span className="pebble">2</span>
                <h3>Implementation</h3>
                <p>Only what the assessment justified gets built.</p>
                <ul className="ticks">
                  <li>
                    <span>
                      <b>A scoped build</b>
                      , priced to scope.
                    </span>
                  </li>
                  <li>
                    <span>
                      <b>Dashboard, clients and pipeline</b>
                      {" "}on one live screen.
                    </span>
                  </li>
                  <li>
                    <span>
                      <b>Automation and AI agents</b>
                      {" "}for the repetitive work.
                    </span>
                  </li>
                  <li>
                    <span>
                      <b>Owned infrastructure</b>
                      : an asset, not a subscription.
                    </span>
                  </li>
                </ul>
              </div>
              <div className="step">
                <span className="pebble">3</span>
                <h3>Amplification</h3>
                <p>What it returned, put back to work.</p>
                <ul className="ticks">
                  <li>
                    <span>
                      <b>Documented ROI</b>
                      : what changed, and what it's worth.
                    </span>
                  </li>
                  <li>
                    <span>
                      <b>Savings redeployed</b>
                      {" "}into deeper automation and growth.
                    </span>
                  </li>
                  <li>
                    <span>
                      <b>A fractional partnership</b>
                      , month over month.
                    </span>
                  </li>
                  <li>
                    <span>
                      <b>Next process, next department.</b>
                      {" "}The build compounds.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="foot">
              <p>
                Each piece ends in something you hold: a score, a running system, a number. Stop at any handoff and keep everything that was built.
              </p>
              <div className="btns">
                <Link className="btn primary" href="/book">
                  Book now{" "}
                  <span className="arr" aria-hidden="true">→</span>
                </Link>
                <Link className="link" href="/transformation">The partnership in full</Link>
              </div>
            </div>
          </div>
          <div className="half-panel e" data-panel="halves:e" hidden>
            <Coast seed="half-education" palette="mindset" size="wide" scene="beach" water className="art">
              <span className="half e">AI Learning Solution · what we're really selling is a product</span>
            </Coast>
            <div className="steps">
              <div className="step">
                <span className="pebble">1</span>
                <h3>By department</h3>
                <p>The department's own work.</p>
                <ul className="ticks">
                  <li>
                    <span>
                      <b>HR</b>
                      : hiring, onboarding, reviews.
                    </span>
                  </li>
                  <li>
                    <span>
                      <b>Sales and marketing</b>
                      : follow-up, content, pipeline.
                    </span>
                  </li>
                  <li>
                    <span>
                      <b>Finance and admin</b>
                      : invoices, receipts, paperwork.
                    </span>
                  </li>
                  <li>
                    <span>
                      <b>Service and operations</b>
                      : answers, scheduling, tickets.
                    </span>
                  </li>
                </ul>
              </div>
              <div className="step">
                <span className="pebble">2</span>
                <h3>Mindset and culture</h3>
                <p>The mindset that has to shift.</p>
                <ul className="ticks">
                  <li>
                    <span>
                      <b>What AI is, and isn't</b>
                      , with no vocabulary wall.
                    </span>
                  </li>
                  <li>
                    <span>
                      <b>Money, energy, and time</b>
                      : the three currencies it pays in.
                    </span>
                  </li>
                  <li>
                    <span>
                      <b>Culture and change</b>
                      : adopt it without breaking morale.
                    </span>
                  </li>
                  <li>
                    <span>
                      <b>Guardrails</b>
                      : safe, governed use before rogue use.
                    </span>
                  </li>
                </ul>
              </div>
              <div className="step">
                <span className="pebble">3</span>
                <h3>Technical skills</h3>
                <p>The craft, for the people who go further.</p>
                <ul className="ticks">
                  <li>
                    <span>
                      <b>Tools, hands-on</b>
                      : working sessions, not lectures.
                    </span>
                  </li>
                  <li>
                    <span>
                      <b>Prompts, routines, agents</b>
                      {" "}for staff who go deeper.
                    </span>
                  </li>
                  <li>
                    <span>
                      <b>Applied to real workflows</b>
                      : each person's actual job.
                    </span>
                  </li>
                  <li>
                    <span>
                      <b>Completion tracked</b>
                      : assigned, deadlined, on file.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="foot">
              <p>
                A learning system the whole company completes, not a seat licence handed to whoever asks. It starts with a diagnostic, so we teach the gaps, not the basics people already have.
              </p>
              <div className="btns">
                <Link className="btn primary" href="/diagnostic">
                  Take the diagnostic{" "}
                  <span className="arr" aria-hidden="true">→</span>
                </Link>
                <Link className="link" href="/education">The learning solution in full</Link>
              </div>
            </div>
          </div>
          <p className="sources" style={{ marginTop: "28px", textAlign: "center" }}>
            S02 · Business.com, 2026 Small Business AI Outlook, Jan 2026, n=1,009 · self-described categories that overlap, so they sum past 100%
          </p>
        </div>
      </section>
      {/* 5. Why OceanCrest AI: the capability gap and the new model, as tabs */}
      <section className="lane-host section">
        <div className="course-lane" aria-hidden="true">
          <span className="course-waypoint" />
          <span className="course-rule" />
          <span className="course-bearing">CO 170°</span>
        </div>
        <div className="wrap">
          <div className="sec-head center reveal">
            <div className="eyebrow">Why OceanCrest AI</div>
            <h2 className="h2">
              The tools got good. The work didn't{" "}
              <span className="stroke">change</span>
              .
            </h2>
          </div>
          <div className="halves-switch">
            <div className="switch" data-switch="why" data-on="gap" role="tablist" aria-label="Choose a chart">
              <button type="button" role="tab" data-val="gap" aria-selected="true">
                <i />
                The capability gap
              </button>
              {" "}
              <button type="button" role="tab" data-val="model" aria-selected="false">
                <i style={{ background: "var(--dawn)" }} />
                A new model
              </button>
            </div>
          </div>
          <div className="why-panel gapduo" data-panel="why:gap">
            <figure className="reveal" style={{ margin: "0" }} aria-label="Illustrative chart. Capability on the vertical axis, time from 2023 through today to 2030 on the horizontal. What models can do climbs steeply; what businesses actually use climbs gently. The hatched gap between them widens every year.">
              <svg className="gap-chart" viewBox="0 0 790 440" role="img" aria-hidden="true">
                <defs>
                  <pattern id="oc-gap-hatch" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <rect width="9" height="9" fill="#7fc4d8" fillOpacity="0.10" />
                    <line x1="0" y1="0" x2="0" y2="9" stroke="#4a8fb8" strokeWidth="1.3" strokeOpacity="0.35" />
                  </pattern>
                </defs>
                <g stroke="#e4e4e7" strokeWidth="1" strokeDasharray="2 5">
                  <line x1="80" y1="60" x2="660" y2="60" />
                  <line x1="80" y1="145" x2="660" y2="145" />
                  <line x1="80" y1="230" x2="660" y2="230" />
                  <line x1="80" y1="315" x2="660" y2="315" />
                </g>
                <line x1="370" y1="45" x2="370" y2="400" stroke="#b3b8bf" strokeDasharray="3 4" />
                <line x1="80" y1="40" x2="80" y2="400" stroke="#b3b8bf" />
                <polygon points="80,30 75.5,42 84.5,42" fill="#b3b8bf" />
                <text x="80" y="20" fontFamily="Geist Mono, monospace" fontSize="12" letterSpacing="1.6" fill="#71717a" textAnchor="middle">CAPABILITY</text>
                <line x1="80" y1="400" x2="672" y2="400" stroke="#b3b8bf" />
                <g fontFamily="Geist Mono, monospace" fontSize="12" letterSpacing="1.6" fill="#71717a">
                  <text x="80" y="424">2023</text>
                  <text x="370" y="424" textAnchor="middle">TODAY</text>
                  <text x="660" y="424" textAnchor="end">2030</text>
                </g>
                <path className="gc-wedge" fill="url(#oc-gap-hatch)" d="M 80 398 C 340 396, 520 300, 660 60 L 660 330 C 480 372, 300 392, 80 398 Z" />
                <path className="gc-line gc-use" d="M 80 398 C 300 392, 480 372, 660 330" fill="none" stroke="#f2a990" strokeWidth="4" strokeLinecap="round" />
                <path className="gc-line gc-cap" d="M 80 398 C 340 396, 520 300, 660 60" fill="none" stroke="#4a8fb8" strokeWidth="4" strokeLinecap="round" />
                <circle cx="660" cy="60" r="7" fill="#4a8fb8" />
                <circle cx="660" cy="330" r="7" fill="#f2a990" />
                <path d="M 680 60 H 692 M 686 60 V 330 M 680 330 H 692" stroke="#16202e" strokeWidth="1.5" fill="none" />
                <text x="700" y="200" fontFamily="Archivo, sans-serif" fontSize="18" fill="#16202e">The gap</text>
              </svg>
            </figure>
            <div className="gapcalls">
              <div className="gapbox cap">
                <p className="gb-head">
                  <span className="gb-key" />
                  What models can actually do
                </p>
                <ul className="ticks">
                  <li>Automate workflows</li>
                  <li>Think for themselves</li>
                  <li>Customize applications</li>
                </ul>
              </div>
              <div className="gapbox use">
                <p className="gb-head">
                  <span className="gb-key" />
                  What businesses actually use
                </p>
                <ul className="ticks">
                  <li>For email</li>
                  <li>For high-level research</li>
                  <li>For really simple use cases</li>
                </ul>
              </div>
              <p className="sources">
                Illustrative. The axes carry no claimed numbers. The shape is the argument: capability compounds faster than adoption, and the distance between the two curves is the work.
              </p>
            </div>
          </div>
          <div className="why-panel model" data-panel="why:model" hidden>
            <div>
              <h3 className="h3">A new model for a new problem.</h3>
              <p className="body" style={{ marginTop: "16px", maxWidth: "520px" }}>
                Consulting is tailored and slow. Software is fast and the same for everyone. We do both: strategy with your people in the room, and a platform the whole company completes.
              </p>
              <p className="sources" style={{ marginTop: "24px" }}>
                Illustrative. Positions are our reading of the market, not a measurement. No circle is a named firm. Circle size is the investment.
              </p>
            </div>
            <figure style={{ margin: "0" }} aria-label="Chart: speed to value against level of customization. Self-serve AI tools are fast but generic, generic online courses are fast-ish and generic, large consultancies are bespoke but slow, and OceanCrest AI sits fast and bespoke.">
              <svg viewBox="0 0 560 440" role="img" aria-hidden="true">
                <rect width="560" height="440" fill="#ffffff" />
                <g stroke="#e4e4e7" strokeWidth="1" fill="none">
                  <path d="M60 30v350h470" />
                  <path d="M60 205h470M295 30v350" strokeDasharray="4 6" />
                </g>
                <g fontFamily="Geist Mono, monospace" fontSize="11" fill="#64748b" letterSpacing="1.2">
                  <text x="60" y="404">SLOW</text>
                  <text x="530" y="404" textAnchor="end">FAST</text>
                  <text x="295" y="426" textAnchor="middle">SPEED TO VALUE</text>
                  <text x="48" y="380" textAnchor="end" transform="rotate(-90 48 380)">GENERIC</text>
                  <text x="48" y="30" textAnchor="end" transform="rotate(-90 48 30)" dx="-0">BESPOKE</text>
                </g>
                <g fontFamily="Geist, sans-serif" fontSize="14" fill="#16202e">
                  <circle cx="430" cy="320" r="34" fill="#ddd3f0" />
                  <text x="430" y="370" textAnchor="middle">Self-serve AI tools</text>
                  <text x="430" y="386" textAnchor="middle" fill="#71717a" fontSize="12">Seats, no plan</text>
                  <circle cx="300" cy="300" r="26" fill="#fde9b8" />
                  <text x="282" y="268" textAnchor="middle">Generic online courses</text>
                  <text x="282" y="252" textAnchor="middle" fill="#71717a" fontSize="12">Same for everyone</text>
                  <circle cx="140" cy="90" r="58" fill="#f7d6cb" />
                  <text x="140" y="168" textAnchor="middle">Large consultancies</text>
                  <text x="140" y="184" textAnchor="middle" fill="#71717a" fontSize="12">Advise, then leave</text>
                  <circle className="ring" cx="440" cy="92" r="42" fill="none" stroke="#7fc4d8" strokeWidth="3" />
                  <circle cx="440" cy="92" r="42" fill="#7fc4d8" />
                  <circle cx="440" cy="92" r="31" fill="#ffffff" />
                  <g transform="translate(440 92) scale(.66) translate(-32 -33)" fill="none" strokeWidth="5" strokeLinecap="round">
                    <path d="M6 22 C15 12, 25 12, 32 19 C39 26, 49 26, 58 17" stroke="#2563eb" />
                    <path d="M6 36 C15 26, 25 26, 32 33 C39 40, 49 40, 58 31" stroke="#16202e" />
                    <path d="M6 50 C15 40, 25 40, 32 47 C39 54, 49 54, 58 45" stroke="#b3b8bf" />
                  </g>
                  <text x="440" y="158" textAnchor="middle" fontWeight="500" fontSize="16">OceanCrest AI</text>
                </g>
              </svg>
            </figure>
          </div>
        </div>
      </section>
      {/* 6. The two tracks */}
      <section className="lane-host section tinted e" id="library">
        <div className="course-lane" aria-hidden="true">
          <span className="course-waypoint" />
          <span className="course-rule" />
          <span className="course-bearing">CO 168°</span>
        </div>
        <div className="wrap">
          <div className="sec-head reveal">
            <div>
              <div className="eyebrow">The library</div>
              <h2 className="h2">
                Two tracks, one{" "}
                <span className="stroke">library</span>
                .
              </h2>
            </div>
            <p className="lede">
              Most AI training only teaches tools. Ours runs two tracks side by side: one teaches the tools, the other teaches your teams to adopt them, so the skills get used once training ends. A seat unlocks both.
            </p>
          </div>
          <div className="tracks" id="tracks">
            {(["technical", "mindset"] as const).map((t, i) => <TrackCard key={t} t={t} i={i} />)}
          </div>
          <p className="sources" style={{ marginTop: "18px" }}>Mindset track course titles are working titles until the mindset team confirms them.</p>
          <div className="btns" style={{ marginTop: "32px", justifyContent: "center" }}>
            <Link className="btn" href="/courses">
              See all{" "}
              <span id="n-courses">{COURSES.length}</span>
              {" "}courses{" "}
              <span className="arr" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
      {/* 7. Final call */}
      <section className="section" style={{ paddingTop: "0" }}>
        <div className="wrap">
          <Coast seed="final-call" palette="dusk" size="wide" scene="cove" water className="final has-contours">
            <i className="tick tick-tl" aria-hidden="true" />
            <i className="tick tick-tr" aria-hidden="true" />
            <i className="tick tick-bl" aria-hidden="true" />
            <i className="tick tick-br" aria-hidden="true" />
            <div className="eyebrow" style={{ color: "var(--deep)" }}>Begin</div>
            <h2 className="h2" style={{ marginTop: "14px" }}>
              Will AI scale across your company, or stall in another{" "}
              <span className="stroke warm">pilot</span>
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
                <span className="ref">Company readiness</span>
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
