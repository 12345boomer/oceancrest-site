import type { Metadata } from "next";
import Link from "next/link";
import Coast from "@/components/Coast";
import { FinderPanel, FinderProvider, FinderResults } from "./finder";
import "./page.css";

export const metadata: Metadata = {
  title: "Courses — OceanCrest AI",
  description: "Every OceanCrest AI course in one place: two tracks, mindset and culture and technical skills, filtered by track, level and category."
};

export default function Page() {
  return (
    <main id="main" className="page-courses">
      <FinderProvider>
        <div className="wrap">
          <Coast as="section" seed="courses-catalog-banner" image="/assets/img/heroes/courses.jpg" video="/assets/video/sub-courses.mp4" palette="mindset" size="wide" scene="beach" className="cat-banner has-contours" aria-labelledby="cat-title">
            <i className="tick tick-tl" aria-hidden="true" />
            <i className="tick tick-tr" aria-hidden="true" />
            <i className="tick tick-bl" aria-hidden="true" />
            <i className="tick tick-br" aria-hidden="true" />
            <div className="cat-head">
             
              <div className="eyebrow">Courses · two tracks</div>
              <h1 className="h1" id="cat-title">
                Every course, in one{" "}
                <span className="stroke warm">place</span>
                .
              </h1>
              <p className="lede">
                Start with the foundations in each track, then pick the courses that fit your role. A seat unlocks every course.
              </p>
            </div>
            <FinderPanel />
          </Coast>
        </div>
        <section className="lane-host cat-results">
          <div className="course-lane" aria-hidden="true">
            <span className="course-waypoint" />
            <span className="course-rule" />
          </div>
          <div className="wrap">
            <aside className="nudge" aria-label="The diagnostic">
              <span className="pebble sm" aria-hidden="true">?</span>
              <div>
                <b>Not sure where to start?</b>
                <p>
                  Check your AI skills: fifteen short questions, about five minutes. You get a level, a score in each area, and the courses that close your gaps.
                </p>
              </div>
              <Link className="btn primary sm" href="/diagnostic">
                Check your AI skills{" "}
                <span className="arr" aria-hidden="true">→</span>
              </Link>
            </aside>
            <FinderResults />
          </div>
        </section>
        <div className="wrap">
          <div className="notch" aria-hidden="true">
            <svg viewBox="0 0 1200 28" preserveAspectRatio="none">
              <path d="M0 10 H452 L480 18 H1200" fill="none" stroke="#b3b8bf" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            </svg>
            <i />
          </div>
        </div>
        <section className="section" style={{ paddingTop: "clamp(40px,5vw,64px)" }}>
          <div className="wrap">
            <Coast seed="courses-final" palette="dusk" size="wide" scene="cove" glints className="final has-contours">
              <i className="tick tick-tl" aria-hidden="true" />
              <i className="tick tick-tr" aria-hidden="true" />
              <i className="tick tick-bl" aria-hidden="true" />
              <i className="tick tick-br" aria-hidden="true" />
              <div className="eyebrow" style={{ color: "var(--deep)" }}>Begin</div>
              <h2 className="h2" style={{ marginTop: "14px" }}>
                Teach the gaps, not the{" "}
                <span className="stroke warm">basics</span>
                .
              </h2>
              <p className="lede">
                Every course, for everyone on the team. Find out what your people know first, or talk to us about putting the whole company on the platform.
              </p>
              <div className="btns">
                <Link className="btn primary" href="/diagnostic" data-sparkle="">
                  Check your AI skills{" "}
                  <span className="arr" aria-hidden="true">→</span>
                </Link>
                <Link className="btn" href="/book">Talk to us about membership</Link>
              </div>
              <div className="alt">
                <Link href="/education#membership">
                  <span className="ref">Membership</span>
                  What you get →
                </Link>
                {" "}
                <Link href="/book">
                  <span className="ref">Transformation</span>
                  Book a meeting →
                </Link>
              </div>
            </Coast>
          </div>
        </section>
      </FinderProvider>
    </main>
  );
}
