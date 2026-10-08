import type { Metadata } from "next";
import Link from "next/link";
import Coast from "@/components/Coast";
import Contours from "@/components/Contours";
import SubscribeForm from "./subscribe-form";
import "./page.css";

// <Coast as="a"> types only HTMLAttributes + href, so the anchor-only attributes go in as a spread.

export const metadata: Metadata = {
  title: "White papers and guides — OceanCrest AI",
  description: "What we would hand you in the room, published. The quarterly Small Business Guide to AI and the papers behind how we work. All of it is free."
};

export default function Page() {
  return (
    <main id="main" className="page-resources">
      {/* 1. Hero */}
      <Coast as="section" seed="resources-hero-beach" palette="hero" size="hero" scene="beach" glints className="page-hero r-hero has-contours">
        <Contours ink="white" />
        <i className="tick tick-tl" aria-hidden="true" />
        <i className="tick tick-tr" aria-hidden="true" />
        <div className="title-block" aria-hidden="true" style={{ top: "24px", right: "clamp(20px,4vw,48px)" }}>
          <p>OceanCrest AI · A division of OceanCrest Ventures</p>
          <p>Chart OC-400 — The library</p>
          <p>Guides and white papers · All free</p>
        </div>
        <div className="wrap" style={{ width: "100%" }}>
          <div className="eyebrow">
            Resources{" "}
            <span className="chart-ref" style={{ marginLeft: "10px", color: "var(--deep)" }}>OC-400 / Publications</span>
          </div>
          <h1 className="h1">
            White papers and{" "}
            <span className="stroke">guides</span>
            .
          </h1>
          <p className="lede">
            What we would hand you in the room, published. Plain-language guidance on AI adoption for small and mid-sized businesses: the quarterly Small Business Guide and the papers behind how we work. Every figure carries its source or an honest mark that says we're still confirming it. All of it is free.
          </p>
          <div className="jump">
            <a className="chip" href="#guide">
              <i style={{ background: "var(--lagoon)" }} />
              The quarterly guide
            </a>
            {" "}
            <a className="chip" href="#papers">
              <i style={{ background: "var(--sage)" }} />
              White papers
            </a>
            {" "}
            <a className="chip" href="#preparation">
              <i style={{ background: "var(--dawn)" }} />
              In preparation
            </a>
            {" "}
            <a className="chip" href="#subscribe">
              <i style={{ background: "var(--coral)" }} />
              Hear about the next one
            </a>
          </div>
        </div>
        <div className="wrap" style={{ width: "100%" }}>
          <figure className="photo r-band">
            <img src="/assets/img/photos/oc-12-curtain-wall-wide.jpg" alt="A glass curtain wall reflecting an overcast sky. Generated image." />
          </figure>
        </div>
      </Coast>
      {/* 2. The quarterly guide */}
      <section className="lane-host section" id="guide">
        <div className="course-lane" aria-hidden="true">
          <span className="course-waypoint" />
          <span className="course-rule" />
          <span className="course-bearing">CO 172°</span>
        </div>
        <div className="wrap guide">
          <Coast as="a" seed="resources-guide-frame" palette="technical" size="wide" scene="open" glints className="frame reveal" href="https://oceancrest.ai/guide/" target="_blank" rel="noopener">
            <img src="/assets/img/covers/cover-small-business-guide-q3-2026.jpg" alt="Cover sheet of the Q3 2026 Small Business Guide to AI Education and Adoption" loading="lazy" />
          </Coast>
          <div className="reveal">
            <div className="eyebrow">The quarterly guide</div>
            <div className="meta" style={{ marginTop: "16px" }}>
              <span className="tag sun">Current edition</span>
              <span className="ref">OC-206 · 2026-08-18 · 17 sheets · Free</span>
            </div>
            <h2>The Small Business Guide to AI Education and Adoption, Q3 2026.</h2>
            <p className="body">
              Seventeen sheets, once a quarter, in plain language: where small businesses actually stand with AI, what changed in the last ninety days, and the first moves that save money, energy, and time. This is the current edition; the next ships at the start of Q4.
            </p>
            <div className="btns">
              <a className="btn" href="https://oceancrest.ai/guide/" target="_blank" rel="noopener">
                Read the guide{" "}
                <span aria-hidden="true">↗</span>
              </a>
              <a className="link" href="#subscribe">Get the Q4 edition when it ships</a>
            </div>
          </div>
        </div>
      </section>
      <div className="wrap">
        <div className="notch" aria-hidden="true">
          <svg viewBox="0 0 1200 28" preserveAspectRatio="none">
            <path d="M0 10 H452 L480 18 H1200" fill="none" stroke="#b3b8bf" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          </svg>
          <i />
        </div>
      </div>
      {/* 3. White papers */}
      <section className="lane-host section tinted has-contours" id="papers" style={{ marginTop: "28px" }}>
        <Contours ink="sea" />
        <div className="course-lane" aria-hidden="true">
          <span className="course-waypoint" />
          <span className="course-rule" />
          <span className="course-bearing">CO 170°</span>
        </div>
        <div className="wrap">
          <div className="sec-head reveal">
            <div>
              <div className="eyebrow">White papers</div>
              <h2 className="h2">
                The papers behind how we{" "}
                <span className="stroke">work</span>
                .
              </h2>
            </div>
            <p className="lede">
              Four letter sheets each, built to read on screen or print. No purchase required for any of it: just decisions, in order.
            </p>
          </div>
          <div className="papers">
            <figure className="photo sage reveal">
              <img src="/assets/img/photos/oc-07-columns-tall.jpg" alt="A colonnade of tall fluted columns seen from below, one small figure walking beneath them. Generated image." loading="lazy" />
            </figure>
            <a className="card pub reveal" href="https://oceancrest.ai/resources/engagement-model/" target="_blank" rel="noopener">
              <div className="cover">
                <img src="/assets/img/covers/cover-engagement-model.jpg" alt="Cover sheet of the white paper The engagement model, in four phases" loading="lazy" />
              </div>
              <span className="ref">OC-401 · 2026-08-28 · 4 sheets · Free</span>
              <h3>The engagement model, in four phases.</h3>
              <p>
                How an OceanCrest AI engagement runs, from the first record we ask for to the day the build team steps back, and what stays behind. Four phases, in order, with what each one asks of you.
              </p>
              <span className="go"><span>Read the paper ↗</span></span>
            </a>
            {" "}
            <a className="card pub reveal" href="https://oceancrest.ai/resources/ninety-days/" target="_blank" rel="noopener">
              <div className="cover">
                <img src="/assets/img/covers/cover-ninety-days.jpg" alt="Cover sheet of the white paper Your next ninety days" loading="lazy" />
              </div>
              <span className="ref">OC-402 · 2026-08-28 · 4 sheets · Free</span>
              <h3>Your next ninety days.</h3>
              <p>
                The one-page AI policy and the 90-day plan from the Q3 guide, on their own so you can hand them to your team.
              </p>
              <span className="go"><span>Read the paper ↗</span></span>
            </a>
          </div>
        </div>
      </section>
      {/* 4. In preparation */}
      <section className="lane-host section" id="preparation">
        <div className="course-lane" aria-hidden="true">
          <span className="course-waypoint" />
          <span className="course-rule" />
          <span className="course-bearing">CO 168°</span>
        </div>
        <div className="wrap">
          <div className="sec-head reveal">
            <div>
              <div className="eyebrow">In preparation</div>
              <h2 className="h2">
                On the drawing{" "}
                <span className="stroke sun">table</span>
                .
              </h2>
            </div>
            <p className="lede">
              Three papers we are writing now. None has a date yet; subscribe and we'll send one email when each one ships.
            </p>
          </div>
          <div className="grid g3">
            <article className="card prep reveal">
              <Coast seed="prep-oc403-loop" palette="technical" size="card" scene="cove" glints className="art-top"><span className="tag sun">In preparation</span></Coast>
              <span className="ref">OC-403 · No date set</span>
              <h3>The engagement loop.</h3>
              <p>
                The seven stations every engagement passes through, from the first conversation to proven ROI, and why the loop closes on itself.
              </p>
              <a className="link go" href="#subscribe" style={{ alignSelf: "flex-start" }}>Notify me ↓</a>
            </article>
            <article className="card prep reveal">
              <Coast seed="prep-oc404-curriculum" palette="mindset" size="card" scene="beach" glints className="art-top"><span className="tag sun">In preparation</span></Coast>
              <span className="ref">OC-404 · No date set</span>
              <h3>AI for Business Leaders — the curriculum.</h3>
              <p>
                The fifteen-hour course, module by module, and the all-staff companion course that follows it.
              </p>
              <a className="link go" href="#subscribe" style={{ alignSelf: "flex-start" }}>Notify me ↓</a>
            </article>
            <article className="card prep reveal">
              <Coast seed="prep-oc405-stand" palette="hero" size="card" scene="headland" glints className="art-top"><span className="tag sun">In preparation</span></Coast>
              <span className="ref">OC-405 · No date set</span>
              <h3>Where small businesses stand.</h3>
              <p>
                The adoption spectrum, drawn from the surveys we trust, and why every station on it is a fine place to board from.
              </p>
              <a className="link go" href="#subscribe" style={{ alignSelf: "flex-start" }}>Notify me ↓</a>
            </article>
          </div>
        </div>
      </section>
      {/* 5. Subscribe */}
      <section className="section" id="subscribe" style={{ paddingTop: "0" }}>
        <div className="wrap">
          <Coast seed="resources-subscribe-open" palette="technical" size="wide" scene="open" glints className="sub-art has-contours">
            <Contours ink="white" />
            <i className="tick tick-tl" aria-hidden="true" />
            <i className="tick tick-tr" aria-hidden="true" />
            <i className="tick tick-bl" aria-hidden="true" />
            <i className="tick tick-br" aria-hidden="true" />
            <div className="sub-panel reveal">
              <div className="eyebrow">Subscribe</div>
              <h2 className="h2" style={{ marginTop: "14px" }}>
                Hear about the next{" "}
                <span className="stroke warm">one</span>
                .
              </h2>
              <p className="lede">
                One email when a new paper or the next quarterly edition ships. Nothing else: no sequence, no sales call.
              </p>
              <SubscribeForm />
            </div>
          </Coast>
        </div>
      </section>
      {/* 6. Final call */}
      <section className="section" style={{ paddingTop: "0" }}>
        <div className="wrap">
          <Coast seed="resources-final-dusk" palette="dusk" size="wide" scene="cove" glints className="final has-contours">
            <Contours ink="white" />
            <i className="tick tick-tl" aria-hidden="true" />
            <i className="tick tick-tr" aria-hidden="true" />
            <i className="tick tick-bl" aria-hidden="true" />
            <i className="tick tick-br" aria-hidden="true" />
            <div className="eyebrow" style={{ color: "var(--deep)" }}>Begin</div>
            <h2 className="h2" style={{ marginTop: "14px" }}>
              Read enough? Then let's talk about your{" "}
              <span className="stroke">operation</span>
              .
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
              <Link href="/transformation">
                <span className="ref">How we work</span>
                See the partnership →
              </Link>
            </div>
          </Coast>
        </div>
      </section>
    </main>
  );
}
