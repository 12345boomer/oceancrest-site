import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ClosingCall from "@/components/ClosingCall";
import { READINESS } from "@/lib/site";
import { PhaseImplementation, WritingSection } from "../../transformation/sections";
import "../../transformation/page.css";
import "./page.css";
import { ServiceRoute, DashboardPeek } from "@/components/ServiceHero";

export const metadata: Metadata = {
  title: "Workflows and automation — OceanCrest AI",
  description: "Only what the assessment justified gets built: the dashboard, automation and AI agents, on infrastructure you own. An asset, not a subscription."
};

// Tool logos, doubled so the marquee loops seamlessly (the second set is hidden from screen readers).
// Same list as the home page's strip (app/page.tsx); keep the two in step.
const TOOLS = ["slack", "quickbooks", "notion", "microsoft", "google-workspace", "hubspot", "salesforce", "dropbox", "stripe", "shopify", "airtable", "asana", "monday", "trello", "claude", "openai"];
const TOOL_NAMES: Record<string, string> = { "google-workspace": "Google Workspace", "monday": "monday.com", "openai": "OpenAI", "hubspot": "HubSpot", "quickbooks": "QuickBooks" };
const toolName = (t: string) => TOOL_NAMES[t] || t.charAt(0).toUpperCase() + t.slice(1);

const Lane = ({ bearing }: { bearing: string }) => (
  <div className="course-lane" aria-hidden="true">
    <span className="course-waypoint" />
    <span className="course-rule" />
    <span className="course-bearing">{bearing}</span>
  </div>
);

// The three pieces in order, as on the home page's transformation half.
const PIECES: { name: string; line: string; peb: string; items: [string, string][] }[] = [
  { name: "Assessment", line: "We read the business before we touch it.", peb: "var(--shallows)", items: [
    ["Readiness score", ", 0 to 100, a baseline for leadership."],
    ["Process mapping", " of how the work actually happens."],
    ["Workflow grading", ": manual, hybrid, or automated."],
    ["A ranked build plan", " for where AI moves the P&L first."]
  ] },
  { name: "Implementation", line: "Only what the assessment justified gets built.", peb: "var(--lagoon)", items: [
    ["A scoped build", ", priced to scope."],
    ["Dashboard, clients and pipeline", " on one live screen."],
    ["Automation and AI agents", " for the repetitive work."],
    ["Owned infrastructure", ": an asset, not a subscription."]
  ] },
  { name: "Amplification", line: "What it returned, put back to work.", peb: "var(--sage)", items: [
    ["Documented ROI", ": what changed, and what it's worth."],
    ["Savings redeployed", " into deeper automation and growth."],
    ["A fractional partnership", ", month over month."],
    ["Next process, next department.", " The build compounds."]
  ] }
];

export default function Page() {
  return (
    <main id="main" className="page-services-workflows page-transformation">
      <PageHero image="/assets/img/heroes/workflows-painted.jpg" video="/assets/video/sub-workflows-painted.mp4" painted className="ph-flip"
        seed="workflows-automation-hero-559"
        zoom={false}
        alive
        aside={<><ServiceRoute current="workflows" /><DashboardPeek /></>}
        palette="technical"
        scene="headland"
        eyebrow={<>Workflows and automation <span className="chart-ref" style={{ marginLeft: "10px", color: "var(--deep)" }}>OC-02a / The partnership</span></>}
        title={<>The repetitive work runs <span className="stroke">itself</span>.</>}
        lede="Only what the assessment justified gets built: the dashboard, automation and AI agents, on infrastructure you own."
      >
        <Link className="btn primary" href="/book">
          Book now <span className="arr" aria-hidden="true">→</span>
        </Link>
        <a className="btn" href={READINESS} target="_blank" rel="noopener" style={{ background: "var(--paper)" }}>
          Score your readiness <span aria-hidden="true">↗</span>
        </a>
      </PageHero>

      {/* Tools we build on */}
      <section className="tools">
        <div className="wrap">
          <p className="ref">We build on the tools your business already runs</p>
          <div className="marquee-wrap">
            <div className="marquee">
              <div className="marquee-track">
                {TOOLS.map((t) => <img key={t} src={`/assets/img/integrations/logo-${t}.svg`} alt={toolName(t)} loading="lazy" />)}
                {TOOLS.map((t) => <img key={`${t}-2`} src={`/assets/img/integrations/logo-${t}.svg`} alt="" aria-hidden="true" loading="lazy" />)}
              </div>
            </div>
            <button type="button" className="marquee-toggle" aria-pressed="false">Pause</button>
          </div>
        </div>
      </section>

      {/* The build: phase 02 from /transformation */}
      <section className="lane-host section" id="build">
        <Lane bearing="CO 171°" />
        <div className="wrap">
          <div className="sec-head reveal">
            <div>
              <div className="eyebrow">Implementation</div>
              <h2 className="h2">
                A running system you <span className="stroke">own</span>.
              </h2>
            </div>
            <p className="lede">
              We sit inside the business, grade every workflow, and build only what the assessment justifies. Stop at any handoff and keep everything that was built.
            </p>
          </div>
          <PhaseImplementation standalone />
        </div>
      </section>

      {/* In order: where the build sits */}
      <section className="lane-host section tinted" id="order">
        <Lane bearing="CO 170°" />
        <div className="wrap">
          <div className="sec-head center reveal">
            <div className="eyebrow">The partnership, in order</div>
            <h2 className="h2">
              Assess, build, <span className="stroke">amplify</span>.
            </h2>
            <p className="lede">
              Each piece ends in something you hold: a score, a running system, a number. Stop at any handoff and keep everything that was built.
            </p>
          </div>
          <div className="steps">
            {PIECES.map((p, i) => (
              <div key={p.name} className="step reveal">
                <span className="pebble" style={{ "--peb": p.peb }}>{i + 1}</span>
                <h3>{p.name}</h3>
                <p>{p.line}</p>
                <ul className="ticks">
                  {p.items.map(([b, rest]) => <li key={b}><span><b>{b}</b>{rest}</span></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="btns order-foot">
            <Link className="btn primary" href="/book">
              Book now <span className="arr" aria-hidden="true">→</span>
            </Link>
            <Link className="link" href="/transformation">The partnership in full</Link>
          </div>
        </div>
      </section>

      {/* How an engagement runs, in writing (from /transformation) */}
      <WritingSection />

      <ClosingCall seed="services-workflows-final" />
    </main>
  );
}
