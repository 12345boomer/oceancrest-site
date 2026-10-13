import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ClosingCall from "@/components/ClosingCall";
import { MembershipSection, Notch, PlatformSection } from "../../education/sections";
import "../../education/page.css";

export const metadata: Metadata = {
  title: "The platform — OceanCrest AI",
  description: "The OceanCrest AI learning platform runs the course the whole company takes, then shows leadership what changed: who finished, how their skills moved, the hours they say they got back, and where people stall."
};

// The platform tour and membership are the education page's own sections (app/education/sections.tsx),
// styled by its page.css under .page-education.
export default function Page() {
  return (
    <main id="main" className="page-learning-platform page-education">
      <PageHero image="/assets/img/heroes/platform.jpg" video="/assets/video/sub-platform.mp4"
        seed="learning-platform-hero-open"
        palette="technical"
        eyebrow={<>The platform</>}
        title={<>What leadership <span className="stroke">sees</span>.</>}
        lede="Leadership sees who finished, how their skills moved, the hours people say they got back, and where people stall. A learner with no activity in 14 days is marked stalled, so nobody quietly drops out."
      >
        <Link className="btn primary" href="/diagnostic">
          Check your AI skills <span className="arr" aria-hidden="true">→</span>
        </Link>
        <Link className="btn" href="/book" style={{ background: "var(--paper)" }}>Talk to us about membership</Link>
      </PageHero>
      <PlatformSection tinted={false} />
      <MembershipSection />
      <Notch />
      <ClosingCall
        seed="learning-platform-final"
        lede="Find out what your team knows before we teach it: fifteen short questions, about five minutes, and the courses that close your gaps. Or book a 30-minute meeting on Teams about transforming the operation."
      />
    </main>
  );
}
