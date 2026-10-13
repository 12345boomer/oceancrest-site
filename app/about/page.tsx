import type { Metadata } from "next";
import Link from "next/link";
import ClosingCall from "@/components/ClosingCall";
import Coast from "@/components/Coast";
import { AdvisorySection, LineageSection, Notch, TeamSection } from "./sections";
import "./page.css";
import { MEETING } from "@/lib/site";

export const metadata: Metadata = {
  title: "About — OceanCrest AI",
  description: "The people in the room. OceanCrest AI is the consulting division of OceanCrest Ventures: a small team that embeds rather than advises, advised by operators, investors and counsel."
};

export default function Page() {
  return (
    <main id="main" className="page-about">
      {/* 1. Hero */}
      <Coast as="section" seed="about-hero-cove" image="/assets/img/heroes/about-fleet.jpg" video="/assets/video/about-fleet.mp4" palette="hero" size="hero" className="page-hero ph-photo a-hero has-contours">
        <i className="tick tick-tl" aria-hidden="true" />
        <i className="tick tick-tr" aria-hidden="true" />
        <i className="tick tick-bl" aria-hidden="true" />
        <i className="tick tick-br" aria-hidden="true" />
        <div className="wrap" style={{ width: "100%" }}>
          <div className="eyebrow">
            About
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
      <ClosingCall seed="about-final-dusk" image="/assets/img/sea/dusk-sail.jpg" video="/assets/video/sea-dusk-sail.mp4" lede={`Talk to the people on this page about one task that eats your team's time: ${MEETING}, no overhaul required. If you're not ready, we'll tell you, and tell you what to fix first.`} />
    </main>
  );
}
