import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import Coast from "@/components/Coast";
import Contours from "@/components/Contours";
import { READINESS } from "@/lib/site";
import { BookPanel, BookPanelFromQuery, BookWays, BookWaysFromQuery } from "./Booking";
import "./page.css";

// The booking flow lives in ./Booking (client). Both halves read ?about= with useSearchParams, so
// each sits in a <Suspense> whose fallback is the same markup with no topic: that is what the
// server renders, and what a visitor without JavaScript keeps.
export const metadata: Metadata = {
  title: "Book a meeting — OceanCrest AI",
  description: "Book a 30-minute meeting with OceanCrest AI on Microsoft Teams. Pick a time and the invite comes by email from Outlook. If you're not ready, we'll tell you, and tell you what to fix first."
};

export default function Page() {
  return (
    <main id="main" className="page-book">
      <Coast as="section" seed="book-safe-water" palette="technical" size="hero" scene="headland" glints className="page-hero has-contours bk-hero">
        <Contours ink="white" />
        <i className="tick tick-tl" aria-hidden="true" />
        <i className="tick tick-tr" aria-hidden="true" />
        <div className="title-block" aria-hidden="true">
          <p>OceanCrest AI · A division of OceanCrest Ventures</p>
          <p>Chart OC-06a — Safe water</p>
          <p>The berth · 30 minutes on Teams</p>
        </div>
        <div className="wrap">
          <div className="eyebrow">Book now</div>
          <h1 className="h1">
            Book a{" "}
            <span className="stroke">meeting</span>
            .
          </h1>
          <p className="lede">
            A 30-minute meeting on Teams. If you're not ready, we'll tell you, and tell you what to fix first.
          </p>
          <Suspense fallback={<BookWays about="" />}><BookWaysFromQuery /></Suspense>
        </div>
      </Coast>
      <section className="bk-wrap">
        <div className="wrap">
          <Suspense fallback={<BookPanel about="" />}><BookPanelFromQuery /></Suspense>
        </div>
      </section>
      <section className="section tight" style={{ paddingTop: "0" }}>
        <div className="wrap">
          <div className="notch" aria-hidden="true">
            <svg viewBox="0 0 1200 28" preserveAspectRatio="none">
              <path d="M0 10 H452 L480 18 H1200" fill="none" stroke="#b3b8bf" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            </svg>
            <i />
          </div>
          <p className="ref" style={{ margin: "22px 0 14px" }}>Not ready yet</p>
          <div className="alts">
            <a className="alt-card" href={READINESS} target="_blank" rel="noopener">
              <span className="half">Company readiness</span>
              <b>Score your AI readiness, 0 to 100 ↗</b>
              <p>The free readiness assessment, about three minutes.</p>
            </a>
            {" "}
            <Link className="alt-card" href="/diagnostic">
              <span className="half e">Your own knowledge</span>
              <b>Take the AI diagnostic →</b>
              <p>Fifteen questions. A level, a score in each area, and the courses that close your gaps.</p>
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
