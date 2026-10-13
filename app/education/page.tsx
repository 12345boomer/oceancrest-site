import type { Metadata } from "next";
import Link from "next/link";
import Coast from "@/components/Coast";
import { COURSES } from "@/lib/courses";
import { CurPanels, CurTabs, FeaturedProgram, Library, ProgramsMain, ProgramsSoon } from "./parts";
import { MembershipSection, PlatformSection, WorkshopsSection } from "./sections";
import "./page.css";

export const metadata: Metadata = {
  title: "Education — OceanCrest AI",
  description: "The OceanCrest AI learning solution: an AI skills check first, leaders first, then a course the whole company completes, with a platform that shows leadership the proof."
};

export default function Page() {
  return (
    <main id="main" className="page-education">
      {/* 1. Hero */}
      <Coast as="section" seed="education-hero-v2" image="/assets/img/heroes/education-dawn.jpg" video="/assets/video/education-dawn.mp4" palette="mindset" size="hero" className="page-hero ph-photo edu-hero has-contours">
        <i className="tick tick-tl" aria-hidden="true" />
        <i className="tick tick-tr" aria-hidden="true" />
        <i className="tick tick-bl" aria-hidden="true" />
        <i className="tick tick-br" aria-hidden="true" />
        <div className="wrap">
          <span className="half e">Education</span>
          {" "}
          <div className="eyebrow">AI Learning Solution · what we're really selling is a product</div>
          <h1 className="h1">
            Every course, for everyone on the{" "}
            <span className="stroke warm">team</span>
            .
          </h1>
          <p className="lede">
            A learning system the whole company completes, not a seat licence handed to whoever asks. It starts with a quick AI skills check, so we teach the gaps, not the basics people already have.
          </p>
          <div className="btns">
            <Link className="btn primary" href="/diagnostic">
              Check your AI skills{" "}
              <span className="arr" aria-hidden="true">→</span>
            </Link>
            {" "}
            <Link className="btn" href="/book">Talk to us about membership</Link>
          </div>
          <nav className="jump" aria-label="On this page">
            <a href="#how">How it works</a>
            <a href="#branches">Three branches</a>
            <a href="#library">The library</a>
            <a href="#programs">Programs</a>
            <a href="#platform">The platform</a>
            <a href="#workshops">Workshops</a>
            <a href="#membership">Membership</a>
          </nav>
        </div>
      </Coast>
      {/* 2. How it works */}
      <div className="wrap" style={{ paddingTop: "28px" }}>
        <div className="notch" aria-hidden="true">
          <svg viewBox="0 0 1200 28" preserveAspectRatio="none">
            <path d="M0 10 H452 L480 18 H1200" fill="none" stroke="#b3b8bf" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          </svg>
          <i />
        </div>
      </div>
      <section className="lane-host section" id="how">
        <div className="course-lane" aria-hidden="true">
          <span className="course-waypoint" />
          <span className="course-rule" />
        </div>
        <div className="wrap">
          <div className="sec-head reveal">
            <div>
              <div className="eyebrow">How it works</div>
              <h2 className="h2">
                From the skills check to the{" "}
                <span className="stroke warm">proof</span>
                .
              </h2>
            </div>
            <p className="lede">
              Leaders are the foundation of an AI rollout, so we start with them. Then the whole company, in the same words, in the same order.
            </p>
          </div>
          <div className="steps path">
            <div className="step reveal">
              <span className="pebble">1</span>
              <span className="ref">Find the gaps</span>
              <h3>Check your AI skills.</h3>
              <p>
                Fifteen short questions, about five minutes. A level, a score in each area, and the courses that close your gaps.
              </p>
              <div className="go">
                <span className="ref">Free · no sign-up</span>
                <Link className="link" href="/diagnostic">Check your AI skills</Link>
              </div>
            </div>
            <div className="step reveal">
              <span className="pebble">2</span>
              <span className="ref">Leaders first</span>
              <h3>A working session with leadership.</h3>
              <p>
                For the owner, the CEO or the COO. Where AI makes sense in your business, and what your people need to hear before it arrives.
              </p>
              <div className="go">
                <span className="ref">90 minutes</span>
                <a className="link" href="#workshops">The workshops</a>
              </div>
            </div>
            <div className="step reveal">
              <span className="pebble">3</span>
              <span className="ref">The whole company</span>
              <h3>Everyone completes the course.</h3>
              <p>
                The whole-team session, then the course on the platform. Completion is assigned, deadlined, and on file.
              </p>
              <div className="go">
                <span className="ref">3 stages · 10 modules · 5 hours</span>
                <a className="link" href="#programs">The programs</a>
              </div>
            </div>
            <div className="step reveal">
              <span className="pebble">4</span>
              <span className="ref">The proof</span>
              <h3>Leadership sees what changed.</h3>
              <p>
                Who finished, how their skills moved, the hours they say they got back, and where people stall.
              </p>
              <div className="go">
                <span className="ref">On the platform</span>
                <a className="link" href="#platform">The platform</a>
              </div>
            </div>
          </div>
          <figure className="photo sun strip reveal">
            <img src="/assets/img/photos/oc-05-zigzag-stairs-wide.jpg" alt="Generated photograph: a zigzagging concrete stair structure against a pale sky, stepping up in even stages." loading="lazy" />
            <figcaption>One step at a time, in the same order for everyone</figcaption>
          </figure>
        </div>
      </section>
      {/* 3. Three branches */}
      <section className="lane-host section tinted e has-contours" id="branches">
        <div className="course-lane" aria-hidden="true">
          <span className="course-waypoint" />
          <span className="course-rule" />
        </div>
        <div className="wrap">
          <div className="sec-head reveal">
            <div>
              <div className="eyebrow">AI Learning Solution</div>
              <h2 className="h2">
                Three branches, running at{" "}
                <span className="stroke sun">once</span>
                .
              </h2>
            </div>
            <p className="lede">
              The department's own work, the mindset that has to shift, and the technical craft for the people who go further.
            </p>
          </div>
          <div className="grid g3">
            <article className="card branch reveal">
              <Coast seed="branch-department" palette="mindset" size="card" scene="cove" className="art-top">
                <span className="tag cat-department" style={{ background: "var(--paper)" }}>01 · By department</span>
              </Coast>
              <h3>By department.</h3>
              <p>The department's own work.</p>
              <ul className="ticks">
                <li>
                  <span>
                    <b>HR.</b>
                    {" "}Hiring, onboarding, reviews.
                  </span>
                </li>
                <li>
                  <span>
                    <b>Sales and marketing.</b>
                    {" "}Follow-up, content, pipeline.
                  </span>
                </li>
                <li>
                  <span>
                    <b>Finance and admin.</b>
                    {" "}Invoices, receipts, paperwork.
                  </span>
                </li>
                <li>
                  <span>
                    <b>Customer service and operations.</b>
                    {" "}Answers, scheduling, tickets.
                  </span>
                </li>
              </ul>
              <div className="more"><Link className="link" href="/courses?cat=department">Courses by department</Link></div>
            </article>
            <article className="card branch reveal">
              <Coast seed="branch-mindset" palette="mindset" size="card" scene="beach" className="art-top"><span className="tag" style={{ background: "var(--paper)" }}>02 · Mindset training</span></Coast>
              <h3>Mindset and culture.</h3>
              <p>The mindset that has to shift.</p>
              <ul className="ticks">
                <li>
                  <span>
                    <b>What AI is, and isn't.</b>
                    {" "}Demystified, no vocabulary wall.
                  </span>
                </li>
                <li>
                  <span>
                    <b>Money, energy, and time.</b>
                    {" "}The three currencies it pays in.
                  </span>
                </li>
                <li>
                  <span>
                    <b>Culture and change management.</b>
                    {" "}Adopt it without breaking morale.
                  </span>
                </li>
                <li>
                  <span>
                    <b>Guardrails.</b>
                    {" "}Safe, governed use before rogue use.
                  </span>
                </li>
              </ul>
              <div className="more"><Link className="link" href="/courses?track=mindset">The mindset track</Link></div>
            </article>
            <article className="card branch reveal">
              <Coast seed="branch-technical" palette="technical" size="card" scene="headland" className="art-top">
                <span className="tag" style={{ background: "var(--paper)" }}>03 · Technical training</span>
              </Coast>
              <h3>Technical skills.</h3>
              <p>The technical craft, for the people who go further.</p>
              <ul className="ticks">
                <li>
                  <span>
                    <b>Tools, hands-on.</b>
                    {" "}Working sessions, not lectures.
                  </span>
                </li>
                <li>
                  <span>
                    <b>Prompts, routines, agents.</b>
                    {" "}For the staff who go deeper.
                  </span>
                </li>
                <li>
                  <span>
                    <b>Applied to real workflows.</b>
                    {" "}Each person's actual job.
                  </span>
                </li>
                <li>
                  <span>
                    <b>Completion tracked.</b>
                    {" "}Assigned, deadlined, on file.
                  </span>
                </li>
              </ul>
              <div className="more"><Link className="link" href="/courses?track=technical">The technical track</Link></div>
            </article>
          </div>
        </div>
      </section>
      {/* 4. The library */}
      <section className="lane-host section" id="library">
        <div className="course-lane" aria-hidden="true">
          <span className="course-waypoint" />
          <span className="course-rule" />
        </div>
        <div className="wrap">
          <div className="sec-head reveal">
            <div>
              <div className="eyebrow">The library</div>
              <h2 className="h2">
                Two tracks, one{" "}
                <span className="stroke">library</span>
                .
              </h2>
            </div>
            <p className="lede">
              Most AI training only teaches tools. Ours also teaches teams how to adopt them, so the skills get used once training ends. A seat unlocks every course.
            </p>
          </div>
          <div className="libgrid" id="libgrid"><Library /></div>
          <p className="sources" style={{ marginTop: "18px" }}>Mindset track course titles are working titles until the mindset team confirms them.</p>
          <div className="btns" style={{ marginTop: "28px", justifyContent: "center" }}>
            <Link className="btn" href="/courses">
              See all{" "}
              <span id="n-courses">{COURSES.length}</span>
              {" "}courses{" "}
              <span className="arr" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
      {/* 5. Flagship programs */}
      <section className="lane-host section tinted e" id="programs">
        <div className="course-lane" aria-hidden="true">
          <span className="course-waypoint" />
          <span className="course-rule" />
        </div>
        <div className="wrap">
          <div className="sec-head reveal">
            <div>
              <div className="eyebrow">Flagship programs</div>
              <h2 className="h2">
                Three courses today, two more on the{" "}
                <span className="stroke sun">way</span>
                .
              </h2>
            </div>
            <p className="lede">
              One membership puts your whole company on the OceanCrest AI learning platform: the certificate course, the leaders course, the Making Waves mastery course, and the department courses as they open.
            </p>
          </div>
          <div id="featured-program" className="reveal"><FeaturedProgram /></div>
          <div className="grid g2" id="programs-main" style={{ marginTop: "clamp(16px,2vw,24px)" }}><ProgramsMain /></div>
          <div className="grid g2" id="programs-soon" style={{ marginTop: "clamp(16px,2vw,24px)" }}><ProgramsSoon /></div>
          <p className="sources legend">PA — position approximate: the certificate course title is a working title.</p>
        </div>
      </section>
      {/* 6. Module by module */}
      <section className="lane-host section" id="curriculum">
        <div className="course-lane" aria-hidden="true">
          <span className="course-waypoint" />
          <span className="course-rule" />
        </div>
        <div className="wrap">
          <div className="sec-head center reveal">
            <div className="eyebrow">The curriculum</div>
            <h2 className="h2">
              Module by{" "}
              <span className="stroke warm">module</span>
              .
            </h2>
            <p className="lede">Every module in the three courses on the platform today. Pick a course.</p>
          </div>
          <div className="cur-switch">
            <div className="switch scroll" data-switch="cur" data-on="applied-ai" role="tablist" aria-label="Choose a course" id="cur-switch"><CurTabs /></div>
          </div>
          <div id="cur-panels"><CurPanels /></div>
          <p className="sources legend">PA — position approximate: the certificate course title is a working title.</p>
        </div>
      </section>
      {/* 7. The platform */}
      <PlatformSection />
      {/* 8. Workshops */}
      <WorkshopsSection />
      {/* 9. Membership */}
      <MembershipSection />
      {/* 10. Final call */}
      <div className="wrap" style={{ paddingTop: "clamp(48px,6vw,72px)" }}>
        <div className="notch" aria-hidden="true">
          <svg viewBox="0 0 1200 28" preserveAspectRatio="none">
            <path d="M0 10 H452 L480 18 H1200" fill="none" stroke="#b3b8bf" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          </svg>
          <i />
        </div>
      </div>
      <section className="section" style={{ paddingTop: "clamp(40px,5vw,64px)" }}>
        <div className="wrap">
          <Coast seed="education-final" palette="dusk" size="wide" scene="cove" glints className="final has-contours">
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
              Find out what your team knows before we teach it: fifteen short questions, about five minutes, and the courses that close your gaps. Or book a 30-minute meeting on Teams about transforming the operation.
            </p>
            <div className="btns">
              <Link className="btn primary" href="/diagnostic" data-sparkle="">
                Check your AI skills{" "}
                <span className="arr" aria-hidden="true">→</span>
              </Link>
              <Link className="btn" href="/book">Book a meeting</Link>
            </div>
            <div className="alt">
              <Link href="/book">
                <span className="ref">Membership</span>
                Talk to us about membership →
              </Link>
              {" "}
              <Link href="/courses">
                <span className="ref">The library</span>
                See every course →
              </Link>
            </div>
          </Coast>
        </div>
      </section>
    </main>
  );
}
