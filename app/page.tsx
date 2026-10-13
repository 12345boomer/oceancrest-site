import type { Metadata } from "next";
import Link from "next/link";
import ClosingCall from "@/components/ClosingCall";
import QuoteExample from "./quote-flow";
import Coast from "@/components/Coast";
import Count from "@/components/Count";
import { TEAM } from "./about/sections";
import { READINESS } from "@/lib/site";
import { COURSES } from "@/lib/courses";
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

export const metadata: Metadata = {
  title: "OceanCrest AI — Your operation, transformed from the inside",
  description: "OceanCrest AI helps businesses simplify everyday work with AI, and teaches their teams how to use it confidently."
};

export default function Page() {
  return (
    <main id="main" className="page-home">
      {/* 1. Hero: the promise, the two halves as two doors */}
      <Coast as="section" seed="oceancrest-home-v2" image="/assets/img/heroes/home-wake.jpg" video="/assets/video/home-wake.mp4" palette="hero" size="hero" scene="cove" className="hero sea-photo has-contours">
        <i className="tick tick-tl" aria-hidden="true" />
        <i className="tick tick-tr" aria-hidden="true" />
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
            We help businesses simplify everyday work with AI, and teach their teams how to use it confidently.
          </p>
          <div className="btns">
            <Link className="btn primary" href="/book">
              Book a meeting{" "}
              <span className="arr" aria-hidden="true">→</span>
            </Link>
            {" "}
            <Link className="btn" href="/diagnostic" style={{ background: "var(--paper)" }}>Check your AI skills</Link>
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
                We find the tasks that eat your team's time and make them simpler.
              </p>
              <div className="row">
                <Link className="btn primary sm" href="/book">
                  Book a meeting{" "}
                  <span className="arr" aria-hidden="true">→</span>
                </Link>
                <a className="link" href="#help">How it works</a>
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
                Short courses that help everyone use AI well, and safely.
              </p>
              <div className="row">
                <Link className="btn sm" href="/diagnostic">
                  Check your AI skills{" "}
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
      {/* 3. One illustrative example: a quote, with a person approving it */}
      <QuoteExample />
      {/* 4. Where to start */}
      <section className="lane-host section">
        <div className="course-lane" aria-hidden="true">
          <span className="course-waypoint" />
          <span className="course-rule" />
        </div>
        <div className="wrap stall">
          <div className="reveal">
            <div className="eyebrow">Where to start</div>
            <h2 className="h2" style={{ marginTop: "14px" }}>
              You don't need to{" "}
              <span className="stroke warm">overhaul</span>
              {" "}your company.
            </h2>
            <p className="body">
              Start with one frustrating task. We look at how it really gets done, try what helps, and let your team shape the change. Nothing big has to move on day one.
            </p>
            <p className="body">
              It's also why so many AI pilots stall: they're built outside the business and handed over, and nobody owns them once the vendor leaves. We build inside your work, with your people, and measure what changed in time and money. Your data stays yours.
            </p>
          </div>
          <div className="gauges reveal">
            <div className="gauge big">
              <div className="top">
                <b><Count to={80} suffix="%+" /></b>
                <span>
                  of organizations have piloted generative AI
                  <sup className="s">S01</sup>
                </span>
              </div>
              <div className="bar" data-to="80"><i /></div>
            </div>
            <div className="gauge small">
              <div className="top">
                <b><Count to={5} prefix="~" suffix="%" /></b>
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
      {/* 5. The people you'd work with */}
      <section className="section tight team-strip">
        <div className="wrap">
          <div className="ts-head">
            <div>
              <div className="eyebrow">The people you'd work with</div>
              <h2 className="h2" style={{ marginTop: "14px" }}>Real people, in the room with you.</h2>
            </div>
            <Link className="link" href="/about/team">Meet the team →</Link>
          </div>
          <ul className="ts-grid">
            {TEAM.map((m) => (
              <li key={m.name} className="reveal">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.img} alt="" loading="lazy" style={{ objectPosition: m.pos }} />
                <div>
                  <b>{m.name}</b>
                  <span className="ref">{m.role}</span>
                  <p>{m.helps}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
      {/* 6. Two ways we can help */}
      <section className="section tinted" id="help">
        <div className="wrap">
          <div className="sec-head center">
            <div className="eyebrow">What we do</div>
            <h2 className="h2">Two ways we can <span className="stroke">help</span>.</h2>
          </div>
          <div className="ways">
            <article className="way">
              <Coast className="way-art" seed="way-processes" image="/assets/img/sea/lagoon.jpg" palette="technical" size="wide" />
              <div className="way-body">
                <span className="half">Your processes</span>
                <h3>Simplify how the work gets done.</h3>
                <p>We help you find the slow, repetitive steps in your business and simplify them with AI.</p>
                <ul className="ticks">
                  <li><span><b>Look first.</b> We learn how the work really runs before changing anything.</span></li>
                  <li><span><b>Build what helps.</b> Only what's worth it, in systems you control.</span></li>
                  <li><span><b>Measure it.</b> You see what changed in time and money.</span></li>
                </ul>
                <div className="way-cta">
                  <Link className="btn primary" href="/book">Book a meeting <span className="arr" aria-hidden="true">→</span></Link>
                  <Link className="link" href="/transformation">See how we work</Link>
                </div>
              </div>
            </article>
            <article className="way e">
              <Coast className="way-art" seed="way-training" image="/assets/img/sea/sunrise-shore.jpg" palette="mindset" size="wide" />
              <div className="way-body">
                <span className="half e">Your team</span>
                <h3>Train your people to use AI well.</h3>
                <p>Practical training that helps employees use AI confidently and safely in their own jobs.</p>
                <ul className="ticks">
                  <li><span><b>Start with a skills check.</b> Fifteen questions show what people already know.</span></li>
                  <li><span><b>Short, practical courses.</b> {COURSES.length} of them, from the basics to each department's work.</span></li>
                  <li><span><b>See the progress.</b> Leaders see who finished and what they learned.</span></li>
                </ul>
                <div className="way-cta">
                  <Link className="btn" href="/diagnostic">Check your AI skills <span className="arr" aria-hidden="true">→</span></Link>
                  <Link className="link" href="/courses">Browse the courses</Link>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
      {/* 7. Final call */}
      <ClosingCall seed="final-call" image="/assets/img/sea/dusk-wave.jpg" video="/assets/video/sea-dusk-wave.mp4" />
    </main>
  );
}
