import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ClosingCall from "@/components/ClosingCall";
import { AdvisorySection, LineageSection } from "../sections";
import "../page.css";
import "./page.css";

export const metadata: Metadata = {
  title: "Advisory board — OceanCrest AI",
  description: "Operators, investors and counsel who have built, sold and governed companies through several technology shifts. They advise the firm, not your project."
};

export default function Page() {
  return (
    <main id="main" className="page-about page-advisory">
      <PageHero image="/assets/img/heroes/advisory-board.jpg" video="/assets/video/sub-advisory-board.mp4"
        seed="about-advisory-hero-headland"
        palette="technical"
        scene="headland"
        className="a-hero"
        eyebrow={<>About <span className="chart-ref" style={{ marginLeft: "10px", color: "var(--deep)" }}>OC-05a / The advisory board</span></>}
        title={<>Who we answer <span className="stroke">to</span>.</>}
        lede="Operators, investors and counsel who have built, sold and governed companies through several technology shifts. They advise the firm, not your project, but the judgement behind our work is theirs as much as ours."
      >
        <Link className="btn" href="/about/team" style={{ background: "var(--paper)" }}>
          Our team <span className="arr" aria-hidden="true">→</span>
        </Link>
      </PageHero>
      <AdvisorySection />
      <LineageSection />
      <ClosingCall seed="about-advisory-final-dusk" />
    </main>
  );
}
