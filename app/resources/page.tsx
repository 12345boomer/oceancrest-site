import type { Metadata } from "next";
import Link from "next/link";
import Coast from "@/components/Coast";
import { GuideSection, PapersSection, PreparationSection, SubscribeSection } from "./sections";
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
      <Coast as="section" seed="resources-hero-beach" video="/assets/video/resources-hero.mp4" palette="hero" size="hero" scene="beach" className="page-hero r-hero has-contours">
        <i className="tick tick-tl" aria-hidden="true" />
        <i className="tick tick-tr" aria-hidden="true" />
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
      <GuideSection />
      <div className="wrap">
        <div className="notch" aria-hidden="true">
          <svg viewBox="0 0 1200 28" preserveAspectRatio="none">
            <path d="M0 10 H452 L480 18 H1200" fill="none" stroke="#b3b8bf" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          </svg>
          <i />
        </div>
      </div>
      {/* 3. White papers */}
      <PapersSection style={{ marginTop: "28px" }} />
      {/* 4. In preparation */}
      <PreparationSection />
      {/* 5. Subscribe */}
      <SubscribeSection />
      {/* 6. Final call */}
      <section className="section" style={{ paddingTop: "0" }}>
        <div className="wrap">
          <Coast seed="resources-final-dusk" palette="dusk" size="wide" scene="cove" glints className="final has-contours">
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
