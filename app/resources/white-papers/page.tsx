import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ClosingCall from "@/components/ClosingCall";
import { PapersSection, PreparationSection, SubscribeSection } from "../sections";
import "../page.css";

export const metadata: Metadata = {
  title: "White papers — OceanCrest AI",
  description: "The papers behind how we work. Four letter sheets each, built to read on screen or print, and all of them free."
};

export default function Page() {
  return (
    <main id="main" className="page-resources page-white-papers">
      <PageHero image="/assets/img/heroes/white-papers.jpg" video="/assets/video/sub-white-papers.mp4"
        seed="white-papers-hero"
        palette="hero"
        eyebrow="Resources · White papers"
        title={<>White <span className="stroke">papers</span>.</>}
        lede="What we would hand you in the room, published. Plain-language guidance on AI adoption for small and mid-sized businesses, in four letter sheets each. All of it is free."
      >
        <a className="btn primary" href="#papers">Read the papers <span className="arr" aria-hidden="true">↓</span></a>
        <Link className="btn" href="/resources/newsletters" style={{ background: "var(--paper)" }}>Hear about the next paper</Link>
      </PageHero>
      <PapersSection />
      <PreparationSection />
      <SubscribeSection />
      <ClosingCall seed="white-papers-final" />
    </main>
  );
}
