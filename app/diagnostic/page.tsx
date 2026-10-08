import type { Metadata } from "next";
import Coast from "@/components/Coast";
import Contours from "@/components/Contours";
import Diagnostic from "./Diagnostic";
import "./page.css";

export const metadata: Metadata = {
  title: "The AI diagnostic — OceanCrest AI",
  description: "Find out what you know about AI, and what you don't yet. Fifteen short questions, about five minutes. You get a level, a score in each area, and the courses that close your gaps. Free, no sign-up, results stay in your browser."
};

export default function Page() {
  return (
    <main id="main" className="page-diagnostic">
      <Coast as="section" seed="diagnostic-hero" palette="mindset" size="hero" scene="beach" glints className="page-hero has-contours dg-hero">
        <Contours ink="white" />
        <i className="tick tick-tl" aria-hidden="true" />
        <i className="tick tick-tr" aria-hidden="true" />
        <div className="title-block" aria-hidden="true">
          <p>OceanCrest AI · Education</p>
          <p>Chart OC-03 — Soundings, your own</p>
          <p>Fifteen casts of the lead line</p>
        </div>
        <div className="wrap">
          <div className="eyebrow">The AI diagnostic · Education</div>
          <h1 className="h1">
            Find out what you know about AI, and what you don't{" "}
            <span className="stroke warm">yet</span>
            .
          </h1>
          <p className="lede">
            Fifteen short questions, about five minutes. Real situations, not trivia: spotting a made-up answer, what never goes into a public tool, when a task is worth automating. You get a level, a score in each area, and the courses that close your gaps.
          </p>
          <div className="facts">
            <span className="tag line">15 questions</span>
            <span className="tag line">About 5 minutes</span>
            <span className="tag line">Free · no sign-up</span>
            <span className="tag line">Results stay in your browser</span>
          </div>
        </div>
      </Coast>
      <section className="stage-wrap">
        <div className="wrap">
          <Diagnostic />
        </div>
      </section>
    </main>
  );
}
