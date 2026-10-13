import type { Metadata } from "next";
import Link from "next/link";
import Coast from "@/components/Coast";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import { ASSESS_LABEL, MEETING, MEETING_CAP, MEETING_LENGTH, READINESS, SKILLS_LABEL } from "@/lib/site";
import "./page.css";

// Booking runs on Ben's Calendly event (lib/site.ts BOOKING_URL), embedded inline.
export const metadata: Metadata = {
  title: "Book a meeting — OceanCrest AI",
  description: `Book ${MEETING} with OceanCrest AI. Pick a time that suits you and the invite arrives by email. If you're not ready, we'll tell you, and tell you what to fix first.`
};

export default function Page() {
  return (
    <main id="main" className="page-book">
      <Coast as="section" seed="book-harbour" image="/assets/img/heroes/book-harbour.jpg" video="/assets/video/book-harbour.mp4" size="hero" className="page-hero ph-photo has-contours bk-hero">
        <div className="wrap">
          <div className="eyebrow">Book a meeting</div>
          <h1 className="h1">
            Book a{" "}
            <span className="stroke">meeting</span>
            .
          </h1>
          <p className="lede">
            {MEETING_CAP}. Bring one task that eats your team's time. If you're not ready, we'll tell you, and tell you what to fix first.
          </p>
        </div>
      </Coast>
      <section className="bk-wrap">
        <div className="wrap">
          <div className="bk-panel">
            <aside className="bk-side">
              <span className="ref">The meeting</span>
              <b>{MEETING_LENGTH}, by video call.</b>
              <ul className="side-facts">
                <li>Pick a time in your own time zone.</li>
                <li>The invite and the video link arrive by email.</li>
                <li>No preparation needed. Bring one task that eats your team's time.</li>
                <li>Not a sales pitch. If we're not the right fit, we'll say so.</li>
                <li>If it's useful, we'll set up a longer working session afterwards.</li>
              </ul>
            </aside>
            <div className="bk-main">
              <CalendlyEmbed />
            </div>
          </div>
        </div>
      </section>
      <section className="section tight" style={{ paddingTop: "0" }}>
        <div className="wrap">
          <p className="ref" style={{ margin: "22px 0 14px" }}>Not ready yet</p>
          <div className="alts">
            <a className="alt-card" href={READINESS} target="_blank" rel="noopener">
              <span className="half">Your company</span>
              <b>{ASSESS_LABEL} ↗</b>
              <p>A free readiness score for your business, 0 to 100. About three minutes.</p>
            </a>
            {" "}
            <Link className="alt-card" href="/diagnostic">
              <span className="half e">Your own knowledge</span>
              <b>{SKILLS_LABEL} →</b>
              <p>Fifteen questions about what you know. A level, a score in each area, and the courses that fill the gaps.</p>
            </Link>
            {" "}
            <Link className="alt-card" href="/resources">
              <span className="half">Reading first</span>
              <b>Browse the resources →</b>
              <p>The quarterly guide and the papers. None of it asks for a call.</p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
