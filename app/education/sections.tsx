/*
  Sections of the education page that other pages show too (/learning/platform,
  /learning/workshops, /services/leadership-workshops). Their styles live in ./page.css under
  .page-education, so a page that renders one wraps it in (or puts on its <main>) that class.
*/
import Link from "next/link";
import Coast from "@/components/Coast";
import { Funnel, Skill, TeamRows } from "./parts";
import Count from "@/components/Count";

const Lane = ({ bearing }: { bearing: string }) => (
  <div className="course-lane" aria-hidden="true">
    <span className="course-waypoint" />
    <span className="course-rule" />
  </div>
);

/** The notched divider, with the room above and below it that the closing call needs. */
export function Notch() {
  return (
    <div className="wrap" style={{ paddingTop: "clamp(48px,6vw,72px)", paddingBottom: "clamp(40px,5vw,64px)" }}>
      <div className="notch" aria-hidden="true">
        <svg viewBox="0 0 1200 28" preserveAspectRatio="none">
          <path d="M0 10 H452 L480 18 H1200" fill="none" stroke="#b3b8bf" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        </svg>
        <i />
      </div>
    </div>
  );
}

// ---- The platform ----

/** The platform tour: the dashboard, five tabs of sample data, and what it does not do. */
export function PlatformSection({ tinted = true }: { tinted?: boolean }) {
  return (
    <section className={`lane-host section${tinted ? " tinted" : ""} has-contours`} id="platform">
      <Lane bearing="CO 164°" />
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
                  <b><Count to={18} /></b>
                  <small>of 20 seats</small>
                </div>
                <div>
                  <span className="ref">Started</span>
                  <b><Count to={15} /></b>
                  <small>opened a lesson</small>
                </div>
                <div>
                  <span className="ref">Completed</span>
                  <b><Count to={7} /></b>
                  <small>all 30 lessons</small>
                </div>
                <div>
                  <span className="ref">Completion rate</span>
                  <b><Count to={39} suffix="%" /></b>
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
  );
}

// ---- Workshops ----

/** The three-step series: the leadership team, then the whole company, then the course. */
export function WorkshopSeries() {
  return (
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
  );
}

/** "Leading your company through AI": the 90-minute leadership session card. */
export function LeadershipSessionCard({ children }: { children?: React.ReactNode }) {
  return (
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
      {children}
    </article>
  );
}

/** The whole-team session card. */
export function TeamSessionCard({ children }: { children?: React.ReactNode }) {
  return (
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
      {children}
    </article>
  );
}

/** Chris Kuselias's line, with its PA note. */
export function FounderQuote() {
  return (
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
  );
}

/** The workshops section of the education page. */
export function WorkshopsSection() {
  return (
    <section className="lane-host section" id="workshops">
      <Lane bearing="CO 170°" />
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
        <WorkshopSeries />
        <div className="sub-head reveal">
          <h3>Two sessions. One shared vocabulary.</h3>
          <p>Hands-on, and built for the people who have to make it stick.</p>
        </div>
        <div className="grid g2">
          <LeadershipSessionCard />
          <TeamSessionCard />
        </div>
        <FounderQuote />
        <div className="btns" style={{ marginTop: "32px" }}>
          <Link className="btn primary" href="/diagnostic">
            Check your AI skills{" "}
            <span className="arr" aria-hidden="true">→</span>
          </Link>
          {" "}
          <Link className="btn" href="/book">Plan a workshop</Link>
        </div>
      </div>
    </section>
  );
}

// ---- Membership ----

/** What a membership includes, why to become a member, and what is not included. */
export function MembershipSection() {
  return (
    <section className="lane-host section tinted e" id="membership">
      <Lane bearing="CO 167°" />
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
            Check your AI skills{" "}
            <span className="arr" aria-hidden="true">→</span>
          </Link>
          {" "}
          <Link className="btn" href="/book" style={{ background: "var(--paper)" }}>Talk to us about membership</Link>
        </div>
      </div>
    </section>
  );
}
