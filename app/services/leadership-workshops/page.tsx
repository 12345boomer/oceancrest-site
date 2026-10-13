import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ClosingCall from "@/components/ClosingCall";
import { READINESS } from "@/lib/site";
import { LeadersSection } from "../../transformation/sections";
import { CurCourse } from "../../education/parts";
import { FounderQuote, Notch } from "../../education/sections";
import "../../transformation/page.css";
import "../../education/page.css";
import { ServiceRoute, AgendaPeek } from "@/components/ServiceHero";

export const metadata: Metadata = {
  title: "Leadership workshops and training — OceanCrest AI",
  description: "Leaders are the foundation of an AI rollout, so we start with them: a 90-minute working session on leading your company through AI, then AI for Business Leaders, the course for the leadership team."
};

const Lane = ({ bearing }: { bearing: string }) => (
  <div className="course-lane" aria-hidden="true">
    <span className="course-waypoint" />
    <span className="course-rule" />
  </div>
);

// For the leadership team. The company-wide workshops have their own page (/learning/workshops).
// Borrowed sections keep their source page's scope: each sits in a .page-transformation or
// .page-education wrapper, so the two pages' styles never meet on one element.
export default function Page() {
  return (
    <main id="main" className="page-services-leadership">
      <PageHero image="/assets/img/heroes/leadership-lighthouse.jpg" video="/assets/video/leadership-lighthouse.mp4"
        seed="leadership-workshops-hero-193"
        aside={<><ServiceRoute current="leadership" /><AgendaPeek /></>}
        palette="hero"
        eyebrow={<>Leadership workshops and training</>}
        title={<>Leading your company through <span className="stroke">AI</span>.</>}
        lede="Leaders are the foundation of an AI rollout, so we start with them. A working session for the owner, the CEO or the COO. Not a vendor pitch."
      >
        <Link className="btn primary" href="/book">
          Book a meeting <span className="arr" aria-hidden="true">→</span>
        </Link>
        <a className="btn" href={READINESS} target="_blank" rel="noopener" style={{ background: "var(--paper)" }}>
          Assess your business <span aria-hidden="true">↗</span>
        </a>
      </PageHero>

      {/* The 90-minute session (from /transformation) */}
      <div className="page-transformation">
        <LeadersSection more={{ href: "/learning/workshops", label: "See the workshops" }} />
      </div>

      {/* Leadership-level training: the AI for Business Leaders course (from /education) */}
      <div className="page-education">
        <section className="lane-host section" id="training">
          <Lane bearing="CO 169°" />
          <div className="wrap">
            <div className="sec-head reveal">
              <div>
                <div className="eyebrow">For the leadership team · on the platform</div>
                <h2 className="h2">
                  AI for Business <span className="stroke warm">Leaders</span>.
                </h2>
              </div>
              <p className="lede">
                What the technology actually does, how to lead an organization through adoption, and a 90-day plan you can defend to a board.
              </p>
            </div>
            <CurCourse id="business-leaders" />
            <FounderQuote />
            <div className="btns" style={{ marginTop: "32px" }}>
              <Link className="btn" href="/courses">
                See every course <span className="arr" aria-hidden="true">→</span>
              </Link>
              <Link className="link" href="/learning/platform">The platform</Link>
            </div>
          </div>
        </section>
        <Notch />
      </div>

      <ClosingCall seed="services-leadership-final" image="/assets/img/sea/dusk-sail.jpg" video="/assets/video/sea-dusk-sail.mp4" />
    </main>
  );
}
