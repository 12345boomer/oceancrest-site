import type { Metadata } from "next";
import Link from "next/link";
import ClosingCall from "@/components/ClosingCall";
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
      <Coast as="section" seed="resources-hero-beach" image="/assets/img/heroes/resources-sandbar.jpg" video="/assets/video/resources-sandbar.mp4" palette="hero" size="hero" className="page-hero ph-photo r-hero has-contours">
        <i className="tick tick-tl" aria-hidden="true" />
        <i className="tick tick-tr" aria-hidden="true" />
        <div className="wrap" style={{ width: "100%" }}>
          <div className="eyebrow">
            Resources
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
      <ClosingCall seed="resources-final-dusk" title={<>Read enough? Then let's talk about your <span className="stroke">operation</span>.</>} />
    </main>
  );
}
