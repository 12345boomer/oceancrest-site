import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ClosingCall from "@/components/ClosingCall";
import { GuideSection, SubscribeSection } from "../sections";
import "../page.css";

export const metadata: Metadata = {
  title: "Newsletters — OceanCrest AI",
  description: "One email when a new white paper or the next quarterly Small Business Guide to AI ships. Nothing else: no sequence, no sales call."
};

export default function Page() {
  return (
    <main id="main" className="page-resources page-newsletters">
      <PageHero image="/assets/img/heroes/newsletters.jpg" video="/assets/video/sub-newsletters.mp4"
        seed="newsletters-hero"
        palette="technical"
        eyebrow="Resources · Newsletters"
        title={<>One email when something <span className="stroke warm">ships</span>.</>}
        lede="We write when there is something new to read: a new white paper, or the next edition of the quarterly Small Business Guide to AI. Both are free."
      >
        <a className="btn primary" href="#subscribe">Subscribe <span className="arr" aria-hidden="true">↓</span></a>
        <Link className="btn" href="/resources/white-papers" style={{ background: "var(--paper)" }}>Read the white papers</Link>
      </PageHero>
      <SubscribeSection flush={false} />
      <GuideSection />
      <ClosingCall seed="newsletters-final" />
    </main>
  );
}
