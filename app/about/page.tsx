import type { Metadata } from "next";
import Link from "next/link";
import Coast from "@/components/Coast";
import { AdvisorySection, LineageSection, Notch, TeamSection } from "./sections";
import "./page.css";

export const metadata: Metadata = {
  title: "About — OceanCrest AI",
  description: "The people in the room. OceanCrest AI is the consulting division of OceanCrest Ventures: a small team that embeds rather than advises, advised by operators, investors and counsel."
};

export default function Page() {
  return (
    <main id="main" className="page-about">
      {/* 1. Hero */}
      <Coast as="section" seed="about-hero-cove" video="/assets/video/about-hero.mp4" palette="hero" size="hero" scene="cove" className="page-hero a-hero has-contours">
        <i className="tick tick-tl" aria-hidden="true" />
        <i className="tick tick-tr" aria-hidden="true" />
        <i className="tick tick-bl" aria-hidden="true" />
        <i className="tick tick-br" aria-hidden="true" />
        <div className="wrap" style={{ width: "100%" }}>
          <div className="eyebrow">
            About{" "}
            <span className="chart-ref" style={{ marginLeft: "10px", color: "var(--deep)" }}>OC-05b / Ship's company</span>
          </div>
          <h1 className="h1">
            The people in the{" "}
            <span className="stroke sun">room</span>
            .
          </h1>
          <p className="lede">
            OceanCrest AI is the consulting division of OceanCrest Ventures: a small team that embeds rather than advises. The people on this page are the people you'll work with, and the same people teach the courses.
          </p>
          <div className="jump">
            <a className="chip" href="#team">
              <i style={{ background: "var(--lagoon)" }} />
              Our team
            </a>
            {" "}
            <a className="chip" href="#lineage">
              <i style={{ background: "var(--dawn)" }} />
              Lineage
            </a>
            {" "}
            <a className="chip" href="#advisory">
              <i style={{ background: "var(--lilac)" }} />
              The advisory board
            </a>
          </div>
        </div>
      </Coast>
      {/* 2. Team */}
      <TeamSection />
      <Notch />
      {/* 3. Lineage */}
      <LineageSection style={{ marginTop: "28px" }} />
      {/* 4. Advisory board */}
      <AdvisorySection />
      {/* 5. Final call */}
      <section className="section" style={{ paddingTop: "0" }}>
        <div className="wrap close-row">
          <figure className="photo lilac reveal">
            <img src="/assets/img/photos/oc-03-spiral-tall.jpg" alt="A concrete ramp spiralling upward, seen from below. Generated image." loading="lazy" />
          </figure>
          <Coast seed="about-final-dusk" video="/assets/video/about-final.mp4" palette="dusk" size="wide" scene="beach" className="final has-contours">
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
              Book a 30-minute meeting on Teams with the people on this page. If you're not ready, we'll tell you, and tell you what to fix first. Or start with your team's knowledge: take the diagnostic.
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
