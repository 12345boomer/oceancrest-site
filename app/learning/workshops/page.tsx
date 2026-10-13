import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ClosingCall from "@/components/ClosingCall";
import { CurCourse } from "../../education/parts";
import { LeadershipSessionCard, Notch, TeamSessionCard, WorkshopSeries } from "../../education/sections";
import "../../education/page.css";

export const metadata: Metadata = {
  title: "Workshops — OceanCrest AI",
  description: "Leaders first, then the whole company: what AI is and isn't, what your policy allows, and where the wins are, for everyone who will use it. Then everyone completes the course."
};

const Lane = ({ bearing }: { bearing: string }) => (
  <div className="course-lane" aria-hidden="true">
    <span className="course-waypoint" />
    <span className="course-rule" />
  </div>
);

// Company-wide workshops. The leadership session has its own page (/services/leadership-workshops).
// Cards, series and course block are the education page's own (app/education/), styled under .page-education.
export default function Page() {
  return (
    <main id="main" className="page-learning-workshops page-education">
      <PageHero image="/assets/img/heroes/learning-workshops.jpg" video="/assets/video/sub-learning-workshops.mp4"
        seed="learning-workshops-hero-beach"
        palette="mindset"
        eyebrow={<>Workshops</>}
        title={<>The whole-<span className="stroke warm">team</span> session.</>}
        lede="What AI is and isn't, what your policy allows, and where the wins are, for everyone who will use it. It runs after the leadership session, so the room hears one message."
      >
        <Link className="btn primary" href="/book">
          Plan a workshop <span className="arr" aria-hidden="true">→</span>
        </Link>
        <Link className="btn" href="/services/leadership-workshops" style={{ background: "var(--paper)" }}>For the leadership team</Link>
      </PageHero>

      {/* Leaders first, then the whole company */}
      <section className="lane-host section" id="workshops">
        <Lane bearing="CO 170°" />
        <div className="wrap">
          <div className="sec-head reveal">
            <div>
              <div className="eyebrow">Workshops</div>
              <h2 className="h2">
                Leaders first, then the whole <span className="stroke warm">company</span>.
              </h2>
            </div>
            <p className="lede">
              Strategy sessions with leadership, then the whole team: what AI is and isn't, what your policy allows, and where the wins are. The people who run the work are the people who will run the system.
            </p>
          </div>
          <WorkshopSeries />
          <div className="sub-head reveal">
            <h3>Two sessions. One shared vocabulary.</h3>
            <p>Hands-on, and built for the people who have to make it stick.</p>
          </div>
          <div className="grid g2">
            <TeamSessionCard>
              <div className="btns" style={{ marginTop: "auto", paddingTop: "8px" }}>
                <Link className="btn primary sm" href="/book">
                  Plan a workshop <span className="arr" aria-hidden="true">→</span>
                </Link>
              </div>
            </TeamSessionCard>
            <LeadershipSessionCard>
              <div className="btns" style={{ marginTop: "auto", paddingTop: "8px" }}>
                <Link className="link" href="/services/leadership-workshops">Leadership workshops and training</Link>
              </div>
            </LeadershipSessionCard>
          </div>
        </div>
      </section>

      {/* Then the course */}
      <section className="lane-host section tinted e" id="course">
        <Lane bearing="CO 169°" />
        <div className="wrap">
          <div className="sec-head reveal">
            <div>
              <div className="eyebrow">Then the course</div>
              <h2 className="h2">
                Everyone completes the <span className="stroke sun">course</span>.
              </h2>
            </div>
            <p className="lede">
              The whole-team session, then the course on the platform. Completion is assigned, deadlined, and on file.
            </p>
          </div>
          <CurCourse id="applied-ai" />
          <p className="sources legend">PA — position approximate: the certificate course title is a working title.</p>
          <div className="btns" style={{ marginTop: "28px" }}>
            <Link className="btn" href="/learning/platform" style={{ background: "var(--paper)" }}>
              The platform <span className="arr" aria-hidden="true">→</span>
            </Link>
            <Link className="link" href="/courses">See every course</Link>
          </div>
        </div>
      </section>

      <Notch />
      <ClosingCall
        seed="learning-workshops-final"
        lede="Find out what your team knows before we teach it: fifteen short questions, about five minutes, and the courses that close your gaps. Or book a 30-minute meeting on Teams about transforming the operation."
      />
    </main>
  );
}
