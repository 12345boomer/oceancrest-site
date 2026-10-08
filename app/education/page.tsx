import type { Metadata } from "next";
import Link from "next/link";
import Coast from "@/components/Coast";
import Contours from "@/components/Contours";
import { COURSES } from "@/lib/courses";
import { CurPanels, CurTabs, FeaturedProgram, Funnel, Library, ProgramsMain, ProgramsSoon, Skill, TeamRows } from "./parts";
import "./page.css";

export const metadata: Metadata = {
  title: "Education — OceanCrest AI",
  description: "The OceanCrest AI learning solution: a diagnostic first, leaders first, then a course the whole company completes, with a platform that shows leadership the proof."
};

export default function Page() {
  return (
    <main id="main" className="page-education">
      {/* 1. Hero */}
      <Coast as="section" seed="education-hero-v2" palette="mindset" size="hero" scene="beach" glints className="page-hero edu-hero has-contours">
        <Contours ink="white" />
        <i className="tick tick-tl" aria-hidden="true" />
        <i className="tick tick-tr" aria-hidden="true" />
        <i className="tick tick-bl" aria-hidden="true" />
        <i className="tick tick-br" aria-hidden="true" />
        <div className="title-block" aria-hidden="true" style={{ top: "24px", right: "clamp(20px,4vw,48px)" }}>
          <p>OceanCrest AI · Learning</p>
          <p>Chart OC-02 — The learning solution</p>
          <p>Diagnostic, workshops, courses, proof · Corrected 2026</p>
        </div>
        <div className="wrap">
          <span className="half e">Education</span>
          {" "}
          <span className="chart-ref hero-ref">OC-02 / Education</span>
          <div className="eyebrow">AI Learning Solution · what we're really selling is a product</div>
          <h1 className="h1">
            Every course, for everyone on the{" "}
            <span className="stroke warm">team</span>
            .
          </h1>
          <p className="lede">
            A learning system the whole company completes, not a seat licence handed to whoever asks. It starts with a diagnostic, so we teach the gaps, not the basics people already have.
          </p>
          <div className="btns">
            <Link className="btn primary" href="/diagnostic">
              Take the diagnostic{" "}
              <span className="arr" aria-hidden="true">→</span>
            </Link>
            {" "}
            <Link className="btn" href="/book?about=learning">Talk to us about membership</Link>
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
          <span className="course-bearing">CO 168°</span>
        </div>
        <div className="wrap">
          <div className="sec-head reveal">
            <div>
              <div className="eyebrow">How it works</div>
              <h2 className="h2">
                From the diagnostic to the{" "}
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
              <h3>Take the diagnostic.</h3>
              <p>
                Fifteen short questions, about five minutes. A level, a score in each area, and the courses that close your gaps.
              </p>
              <div className="go">
                <span className="ref">Free · no sign-up</span>
                <Link className="link" href="/diagnostic">Take the diagnostic</Link>
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
        <Contours ink="sea" />
        <div className="course-lane" aria-hidden="true">
          <span className="course-waypoint" />
          <span className="course-rule" />
          <span className="course-bearing">CO 166°</span>
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
          <span className="course-bearing">CO 171°</span>
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
          <span className="course-bearing">CO 169°</span>
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
          <span className="course-bearing">CO 173°</span>
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
      <section className="lane-host section tinted has-contours" id="platform">
        <Contours ink="sea" />
        <div className="course-lane" aria-hidden="true">
          <span className="course-waypoint" />
          <span className="course-rule" />
          <span className="course-bearing">CO 164°</span>
        </div>
        <div className="wrap">
          <div className="sec-head reveal">
            <div>
              <div className="eyebrow">The platform</div>
              <h2 className="h2">
                The course everyone completes, and the{" "}
                <span className="stroke">proof</span>
                {" "}that they did.
              </h2>
            </div>
            <p className="lede">
              The OceanCrest AI learning platform runs the course the whole company takes, then shows leadership what changed: who finished, how their skills moved, the hours they say they got back, and where people stall.
            </p>
          </div>
          <figure className="reveal" style={{ margin: "0" }}>
            <Coast seed="education-platform-frame" palette="technical" size="wide" scene="open" glints className="shot">
              <img src="/assets/img/lms-dashboard-2026-09-09.jpg" width="2000" height="660" alt="The OceanCrest AI learner dashboard: welcome back, with the Applied AI certificate course in progress. Demo environment; the learner and company are fictional." loading="lazy" />
            </Coast>
            <figcaption className="sources" style={{ marginTop: "12px" }}>
              The learner dashboard · demo environment · Jordan Alvarez and Brasswell Manufacturing Co. are fictional
            </figcaption>
          </figure>
          <div className="plat-tabs">
            <div className="switch scroll" data-switch="plat" data-on="progress" role="tablist" aria-label="Platform tour">
              <button type="button" role="tab" data-val="progress" aria-selected="true">Progress</button>
              {" "}
              <button type="button" role="tab" data-val="skill" aria-selected="false">Skill</button>
              {" "}
              <button type="button" role="tab" data-val="return" aria-selected="false">Return</button>
              {" "}
              <button type="button" role="tab" data-val="findings" aria-selected="false">Findings</button>
              {" "}
              <button type="button" role="tab" data-val="scorecard" aria-selected="false">Scorecard</button>
            </div>
          </div>
          {/* 01 Progress */}
          <div className="tp" data-panel="plat:progress" role="tabpanel">
            <div className="tp-copy">
              <span className="ref">01 · Progress</span>
              <h3 className="h3">See who started, who stalled, and who finished.</h3>
              <p className="body">
                Every person, every lesson, from the invite to the certificate. A learner with no activity in 14 days is marked stalled, so nobody quietly drops out.
              </p>
              <div className="mock">
                <div className="mock-bar">
                  <b>Adoption funnel.</b>
                  <span className="sample">Sample data · fictional company</span>
                </div>
                <div className="mock-in funnel" id="funnel"><Funnel /></div>
              </div>
            </div>
            <div className="mock">
              <div className="mock-bar">
                <b>Team progress.</b>
                <span className="sample">Sample data · fictional company</span>
              </div>
              <div className="mock-in">
                <div className="kp4">
                  <div>
                    <span className="ref">Enrolled</span>
                    <b data-count="18">0</b>
                    <small>of 20 seats</small>
                  </div>
                  <div>
                    <span className="ref">Started</span>
                    <b data-count="15">0</b>
                    <small>opened a lesson</small>
                  </div>
                  <div>
                    <span className="ref">Completed</span>
                    <b data-count="7">0</b>
                    <small>all 30 lessons</small>
                  </div>
                  <div>
                    <span className="ref">Completion rate</span>
                    <b data-count="39" data-suffix="%">0%</b>
                    <small>of those enrolled</small>
                  </div>
                </div>
                <div className="tbl-cap">
                  <b>
                    Applied AI — the OceanCrest Certificate
                    <span className="pa">PA</span>
                  </b>
                  <span>Brasswell Manufacturing Co. · first 8 of 18 members</span>
                </div>
                <table className="team">
                  <thead>
                    <tr>
                      <th scope="col">Member</th>
                      <th scope="col" className="hs">Department</th>
                      <th scope="col">Course progress</th>
                      <th scope="col" className="hm">Lessons</th>
                      <th scope="col" className="hm">Last active</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody id="team-rows"><TeamRows /></tbody>
                </table>
              </div>
            </div>
          </div>
          {/* 02 Skill */}
          <div className="tp" data-panel="plat:skill" role="tabpanel" hidden>
            <div className="tp-copy">
              <span className="ref">02 · Skill</span>
              <h3 className="h3">Measure skill before the course and after it.</h3>
              <p className="body">
                Six skill lines, rated from 1 to 5 when people start and again when they finish. Self-rated, and shown as self-rated.
              </p>
            </div>
            <div className="mock">
              <div className="mock-bar">
                <b>Skill baseline.</b>
                <span className="sample">Sample data · fictional company</span>
              </div>
              <div className="mock-in">
                <div className="skill" id="skill"><Skill /></div>
                <div className="key">
                  <span>
                    <i style={{ border: "1.5px solid var(--navy)" }} />
                    Intake
                  </span>
                  <span>
                    <i style={{ background: "var(--tide)" }} />
                    Exit
                  </span>
                  <span>Scale 1 to 5 · self-rated</span>
                </div>
              </div>
            </div>
          </div>
          {/* 03 Return */}
          <div className="tp" data-panel="plat:return" role="tabpanel" hidden>
            <div className="tp-copy">
              <span className="ref">03 · Return</span>
              <h3 className="h3">An honest signal on the return.</h3>
              <p className="body">
                People report the hours they spend on repeated tasks when they start and when they finish. We show those hours, marked as self-reported, rather than a dollar figure nobody can check.
              </p>
            </div>
            <div className="mock">
              <div className="mock-bar">
                <b>Time returned.</b>
                <span className="sample">Sample data · fictional company</span>
              </div>
              <div className="mock-in ret">
                <div>
                  <span className="ref">On repeated tasks, before</span>
                  <b>9.5 h</b>
                  <small>a week, at intake</small>
                </div>
                <div>
                  <span className="ref">On repeated tasks, after</span>
                  <b>6.0 h</b>
                  <small>a week, at exit</small>
                </div>
                <div className="hi">
                  <span className="ref">Hours back per week</span>
                  <b>3.5 h</b>
                  <small>self-reported, unverified</small>
                </div>
              </div>
            </div>
          </div>
          {/* 04 Findings */}
          <div className="tp" data-panel="plat:findings" role="tabpanel" hidden>
            <div className="tp-copy">
              <span className="ref">04 · Findings</span>
              <h3 className="h3">Know where to step in.</h3>
              <p className="body">
                Findings are written only when the data clears a threshold, and each one names the numbers behind it. They tell a manager where to look; the decision stays with the manager.
              </p>
            </div>
            <div className="mock">
              <div className="mock-bar">
                <b>Findings.</b>
                <span className="sample">Sample data · fictional company</span>
              </div>
              <div className="mock-in finds">
                <div className="find">
                  <div className="top">
                    <b>Learners are stalling at the same module.</b>
                    <span className="tag e">Adoption</span>
                  </div>
                  <p>
                    3 learners have stalled, with no activity in 14 days. 2 of them stopped at Module 4, Prompting: talking to machines well.
                  </p>
                </div>
                <div className="find">
                  <div className="top">
                    <b>Most AI use is on personal accounts.</b>
                    <span className="tag lilac">Tools</span>
                  </div>
                  <p>
                    40% of respondents use AI on a personal account rather than one the company provides. Providing a cleared tool is a stronger control than prohibiting uncleared ones.
                  </p>
                </div>
                <div className="find">
                  <div className="top">
                    <b>Time on repeated tasks fell.</b>
                    <span className="tag sun">Time</span>
                  </div>
                  <p>
                    7 learners reported hours on repeated tasks at intake and again at exit. The mean fell from 9.5 to 6.0 hours a week, and they report 3.5 hours a week given back, self-reported.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* 05 Scorecard */}
          <div className="tp" data-panel="plat:scorecard" role="tabpanel" hidden>
            <div className="tp-copy">
              <span className="ref">05 · Scorecard</span>
              <h3 className="h3">Scorecard preview.</h3>
              <p className="body">
                The scorecard sets where you start against what the course, and then an engagement, leaves behind. Each line ends in something you can check.
              </p>
            </div>
            <div className="mock">
              <div className="mock-bar">
                <b>Scorecard.</b>
                <span className="sample">Illustrative · starts from your own baseline</span>
              </div>
              <div className="mock-in">
                <table className="score">
                  <thead>
                    <tr>
                      <th scope="col">Area</th>
                      <th scope="col">Day one</th>
                      <th scope="col">After the course</th>
                      <th scope="col">After an engagement</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Adoption</th>
                      <td data-col="Day one">Unmeasured.</td>
                      <td data-col="After the course">Every person enrolled, started, stalled or finished, on file.</td>
                      <td data-col="After an engagement">Reviewed with leadership in a standing monthly slot.</td>
                    </tr>
                    <tr>
                      <th scope="row">Skill</th>
                      <td data-col="Day one">Unknown.</td>
                      <td data-col="After the course">Six skill lines rated at intake and at exit.</td>
                      <td data-col="After an engagement">Named internal owners who can carry it forward.</td>
                    </tr>
                    <tr>
                      <th scope="row">Policy</th>
                      <td data-col="Day one">No written rules on what goes into a tool.</td>
                      <td data-col="After the course">Everyone has been taught what they can and can't put in.</td>
                      <td data-col="After an engagement">A one-page AI policy, owned by one person.</td>
                    </tr>
                    <tr>
                      <th scope="row">The work itself</th>
                      <td data-col="Day one">Unmapped.</td>
                      <td data-col="After the course">Every department can name its three most repetitive tasks.</td>
                      <td data-col="After an engagement">Every workflow graded manual, hybrid, or automated.</td>
                    </tr>
                    <tr>
                      <th scope="row">Return</th>
                      <td data-col="Day one">Untracked.</td>
                      <td data-col="After the course">Hours given back, self-reported.</td>
                      <td data-col="After an engagement">Documented ROI: what changed, and what it's worth.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="notdo reveal">
            <div>
              <span className="tag line">Plainly</span>
              <h3 style={{ marginTop: "12px" }}>What the platform does not do.</h3>
            </div>
            <div>
              <ul className="ticks">
                <li>
                  <span>
                    It does not track usage inside ChatGPT, Copilot or any other tool: tool use is what people report.
                  </span>
                </li>
                <li><span>It does not calculate a dollar ROI.</span></li>
                <li><span>It has no single sign-on yet.</span></li>
                <li>
                  <span>
                    The certificate is a certificate of completion from OceanCrest AI, not a university credential.
                  </span>
                </li>
              </ul>
              <div className="btns" style={{ marginTop: "18px" }}><Link className="link" href="/courses">See every course on the platform</Link></div>
            </div>
          </div>
        </div>
      </section>
      {/* 8. Workshops */}
      <section className="lane-host section" id="workshops">
        <div className="course-lane" aria-hidden="true">
          <span className="course-waypoint" />
          <span className="course-rule" />
          <span className="course-bearing">CO 170°</span>
        </div>
        <div className="wrap">
          <div className="sec-head reveal">
            <div>
              <div className="eyebrow">Workshops</div>
              <h2 className="h2">
                Leaders first, then the whole{" "}
                <span className="stroke warm">company</span>
                .
              </h2>
            </div>
            <p className="lede">
              Strategy sessions with leadership, then the whole team: what AI is and isn't, what your policy allows, and where the wins are. The people who run the work are the people who will run the system.
            </p>
          </div>
          <div className="steps series">
            <div className="step reveal">
              <span className="pebble">1</span>
              <h3>The leadership team.</h3>
              <p>A working session for the owner, the CEO or the COO. Not a vendor pitch.</p>
            </div>
            <div className="step reveal">
              <span className="pebble">2</span>
              <h3>Then the whole company.</h3>
              <p>The same vocabulary for everyone, and the rules for what goes into a tool.</p>
            </div>
            <div className="step reveal">
              <span className="pebble">3</span>
              <h3>Then the course.</h3>
              <p>Everyone completes it on the platform: 3 stages, 10 modules, 5 hours.</p>
            </div>
          </div>
          <div className="sub-head reveal">
            <h3>Two sessions. One shared vocabulary.</h3>
            <p>Hands-on, and built for the people who have to make it stick.</p>
          </div>
          <div className="grid g2">
            <article className="card sess reveal">
              <figure className="photo warm sess-photo">
                <img src="/assets/img/photos/oc-08-atrium-wide.jpg" alt="Generated photograph: an atrium seen from below." loading="lazy" />
                <figcaption>For the leadership team · 90 minutes</figcaption>
              </figure>
              <h3>Leading your company through AI.</h3>
              <p>
                For the CEO, owner or COO; an operations lead is a welcome plus-one. A working session on where AI makes sense in your business, and what your people need to hear before it arrives.
              </p>
              <div className="eyebrow">You leave with</div>
              <ul className="ticks">
                <li><span>Your AI readiness, scored.</span></li>
                <li><span>The story your people need to hear.</span></li>
                <li><span>A charted course from pilot to payoff.</span></li>
              </ul>
            </article>
            <article className="card sess reveal">
              <figure className="photo lilac sess-photo">
                <img src="/assets/img/photos/oc-07-columns-wide.jpg" alt="Generated photograph: a row of columns in raking light." loading="lazy" />
                <figcaption>For the whole company · after the leaders</figcaption>
              </figure>
              <h3>The whole-team session.</h3>
              <p>
                What AI is and isn't, what your policy allows, and where the wins are, for everyone who will use it. It runs after the leadership session, so the room hears one message.
              </p>
              <div className="eyebrow">You leave with</div>
              <ul className="ticks">
                <li><span>A one-page AI policy.</span></li>
                <li><span>A shared vocabulary.</span></li>
                <li><span>A ranked list of workflows, and named internal owners.</span></li>
              </ul>
            </article>
          </div>
          <figure className="quote reveal" style={{ marginInline: "0", marginBottom: "0" }}>
            <img src="/assets/img/team/square/chris-kuselias-v2.jpg" alt="Chris Kuselias" loading="lazy" />
            <blockquote>
              <p>
                “You have to lead yourself in the AI revolution.”
                <span className="pa">PA</span>
              </p>
              <footer>Chris Kuselias · Founder & Chairman</footer>
            </blockquote>
            <p className="sources" style={{ flex: "1 1 100%" }}>PA — position approximate: quotation pending Chris Kuselias's sign-off.</p>
          </figure>
          <div className="btns" style={{ marginTop: "32px" }}>
            <Link className="btn primary" href="/diagnostic">
              Take the diagnostic{" "}
              <span className="arr" aria-hidden="true">→</span>
            </Link>
            {" "}
            <Link className="btn" href="/book?about=learning">Plan a workshop</Link>
          </div>
        </div>
      </section>
      {/* 9. Membership */}
      <section className="lane-host section tinted e" id="membership">
        <div className="course-lane" aria-hidden="true">
          <span className="course-waypoint" />
          <span className="course-rule" />
          <span className="course-bearing">CO 167°</span>
        </div>
        <div className="wrap">
          <div className="sec-head reveal">
            <div>
              <div className="eyebrow">Membership</div>
              <h2 className="h2">
                What you get with{" "}
                <span className="stroke sun">membership</span>
                .
              </h2>
            </div>
            <p className="lede">
              Every course, for everyone on the team: the certificate course, the leaders course, the Making Waves mastery course, and the department courses as they open.
            </p>
          </div>
          <div className="grid g4 get">
            <div className="card reveal">
              <span className="pebble sm">01</span>
              <h3>Every published course.</h3>
              <p>
                For every seat, with the department courses added as they open. One quiz per module on the graded courses, marked instantly.
              </p>
            </div>
            <div className="card reveal">
              <span className="pebble sm">02</span>
              <h3>A baseline at the start and the end.</h3>
              <p>
                A short intake, about three minutes, and the same questions again at exit, so you can see what moved.
              </p>
            </div>
            <div className="card reveal">
              <span className="pebble sm">03</span>
              <h3>Team progress for managers.</h3>
              <p>
                Who started, who stalled, and who finished, with findings that point at where people stop.
              </p>
            </div>
            <div className="card reveal">
              <span className="pebble sm">04</span>
              <h3>A certificate of completion.</h3>
              <p>
                Issued at 100% of the certificate course, with a verification ID. It is from OceanCrest AI, not a university.
              </p>
            </div>
          </div>
          <div className="sub-head reveal" style={{ marginTop: "clamp(48px,6vw,72px)" }}>
            <h3>Why become a member.</h3>
            <p>
              Skills for the work in front of you, used rather than just understood, with proof you can show.
            </p>
          </div>
          <div className="why">
            <div className="reveal">
              <span className="pebble">1</span>
              <div>
                <h3>Skills for the work in front of you.</h3>
                <p>Department playbooks and workflows from your own job, not a lecture on the history of AI.</p>
              </div>
            </div>
            <div className="reveal">
              <span className="pebble">2</span>
              <div>
                <h3>Use it, don't just understand it.</h3>
                <p>
                  Worksheets that save as you type, a first automation in module 6, and a capstone you build and deliver.
                </p>
              </div>
            </div>
            <div className="reveal">
              <span className="pebble">3</span>
              <div>
                <h3>Proof you can show.</h3>
                <p>
                  A certificate of completion with a verification ID, and a before-and-after baseline for the whole team.
                </p>
              </div>
            </div>
          </div>
          <div className="notinc reveal">
            <span className="tag line">Not included</span>
            <p>
              No live coaching or office hours, and no single sign-on yet. The certificate is a certificate of completion from OceanCrest AI, not a university credential.
            </p>
          </div>
          <div className="mem-cta">
            <Link className="btn primary" href="/diagnostic">
              Take the diagnostic{" "}
              <span className="arr" aria-hidden="true">→</span>
            </Link>
            {" "}
            <Link className="btn" href="/book?about=learning" style={{ background: "var(--paper)" }}>Talk to us about membership</Link>
          </div>
        </div>
      </section>
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
            <Contours ink="white" />
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
              <Link className="btn primary" href="/diagnostic" data-sound="chime" data-sparkle="">
                Take the diagnostic{" "}
                <span className="arr" aria-hidden="true">→</span>
              </Link>
              <Link className="btn" href="/book">Book now</Link>
            </div>
            <div className="alt">
              <Link href="/book?about=learning">
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
