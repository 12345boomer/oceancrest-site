import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ClosingCall from "@/components/ClosingCall";
import { TeamSection } from "../sections";
import "../page.css";
import "./page.css";
import { MEETING } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our team — OceanCrest AI",
  description: "The people in the room. A small team that embeds rather than advises: the people you'll work with, and the same people who teach the courses."
};

export default function Page() {
  return (
    <main id="main" className="page-about page-team">
      <PageHero image="/assets/img/heroes/team.jpg" video="/assets/video/sub-team.mp4"
        seed="about-team-hero-cove"
        palette="hero"
        className="a-hero"
        eyebrow={<>About</>}
        title={<>The people in the <span className="stroke sun">room</span>.</>}
        lede="A small team that embeds rather than advises. The people on this page are the people you'll work with, and the same people teach the courses."
      >
        <Link className="btn" href="/about/advisory-board" style={{ background: "var(--paper)" }}>
          The advisory board <span className="arr" aria-hidden="true">→</span>
        </Link>
      </PageHero>
      <TeamSection />
      <ClosingCall
        seed="about-team-final-dusk"
        lede={`Book ${MEETING} with the people on this page. If you're not ready, we'll tell you, and tell you what to fix first. Or start with your team's knowledge: check your AI skills.`}
      />
    </main>
  );
}
