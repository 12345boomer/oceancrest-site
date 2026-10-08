import type { Metadata } from "next";
import Link from "next/link";
import Coast from "@/components/Coast";
import Contours from "@/components/Contours";
import "./page.css";

export const metadata: Metadata = {
  title: "About — OceanCrest AI",
  description: "The people in the room. OceanCrest AI is the consulting division of OceanCrest Ventures: a small team that embeds rather than advises, advised by operators, investors and counsel."
};

export default function Page() {
  return (
    <main id="main" className="page-about">
      {/* 1. Hero */}
      <Coast as="section" seed="about-hero-cove" palette="hero" size="hero" scene="cove" glints className="page-hero a-hero has-contours">
        <Contours ink="white" />
        <i className="tick tick-tl" aria-hidden="true" />
        <i className="tick tick-tr" aria-hidden="true" />
        <i className="tick tick-bl" aria-hidden="true" />
        <i className="tick tick-br" aria-hidden="true" />
        <div className="title-block" aria-hidden="true" style={{ bottom: "24px", right: "clamp(20px,4vw,48px)" }}>
          <p>OceanCrest AI · A division of OceanCrest Ventures</p>
          <p>Chart OC-05b — Ship's company</p>
          <p>Crew list and advisory board · Corrected 2026</p>
        </div>
        <div className="wrap" style={{ width: "100%" }}>
          <div className="eyebrow">
            About{" "}
            <span className="chart-ref" style={{ marginLeft: "10px", color: "var(--deep)" }}>OC-05b / Ship's company</span>
          </div>
          <h1 className="h1">
            The people in the{" "}
            <span className="stroke sun">room</span>
            .
          </h1>
          <p className="lede">
            OceanCrest AI is the consulting division of OceanCrest Ventures: a small team that embeds rather than advises. The people on this page are the people you'll work with, and the same people teach the courses.
          </p>
          <div className="jump">
            <a className="chip" href="#team">
              <i style={{ background: "var(--lagoon)" }} />
              Our team
            </a>
            {" "}
            <a className="chip" href="#lineage">
              <i style={{ background: "var(--dawn)" }} />
              Lineage
            </a>
            {" "}
            <a className="chip" href="#advisory">
              <i style={{ background: "var(--lilac)" }} />
              The advisory board
            </a>
          </div>
        </div>
      </Coast>
      {/* 2. Team */}
      <section className="lane-host section" id="team">
        <div className="course-lane" aria-hidden="true">
          <span className="course-waypoint" />
          <span className="course-rule" />
          <span className="course-bearing">CO 172°</span>
        </div>
        <div className="wrap">
          <div className="sec-head reveal">
            <div>
              <div className="eyebrow">
                Our team{" "}
                <span className="chart-ref" style={{ marginLeft: "10px" }}>OC-05b / Crew list</span>
              </div>
              <h2 className="h2">
                Our{" "}
                <span className="stroke">team</span>
                .
              </h2>
            </div>
            <p className="lede">
              Six people, each owning a part of the work: partnerships, the build, learning, delivery, adoption, and the brand.
            </p>
          </div>
          <div className="team">
            <article className="card member reveal">
              <div className="ph">
                <img src="/assets/img/team/chris-kuselias.webp" alt="Chris Kuselias" loading="lazy" style={{ objectPosition: "50% 0%" }} />
              </div>
              <div className="who bio-wrap">
                <h3>Chris Kuselias</h3>
                <span className="role">Founder & Chairman</span>
                <p className="bio">
                  Chris has spent three decades building and running companies: launching ventures, employing thousands of families, and doing the unglamorous work of getting people to change how they operate. He has been profiled on 60 Minutes, CNN, FOX, ABC and NBC.
                </p>
              </div>
            </article>
            <article className="card member reveal">
              <div className="ph">
                <img src="/assets/img/team/eliyahu-cohen-tall2.jpg" alt="Eliyahu Cohen" loading="lazy" style={{ objectPosition: "50% 0%" }} />
              </div>
              <div className="who bio-wrap">
                <h3>Eliyahu Cohen</h3>
                <span className="role">Head of AI & Build</span>
                <p className="bio">
                  Systems and builds: architecture, diagnostics, and the software a client ends up owning outright. Eliyahu has helped venture-backed startups streamline operations, guided private-equity portfolio companies through digital transformation, and built AI systems for healthcare organizations that cut administrative overhead.
                </p>
              </div>
            </article>
            <article className="card member reveal">
              <div className="ph">
                <img src="/assets/img/team/ben-eydlin.jpg" alt="Ben Eydlin" loading="lazy" style={{ objectPosition: "50% 30%" }} />
              </div>
              <div className="who bio-wrap">
                <h3>Ben Eydlin</h3>
                <span className="role">Head of Growth & Learning</span>
                <p className="bio">
                  Ben has always been drawn to how value gets created, from building a business to judging which ones are worth backing. He started and runs his own business, researches public equities for UConn's student-run Opportunity Fund, has evaluated 120+ startups at Hillside Ventures, and works in wealth management at Fidelity.
                </p>
              </div>
            </article>
            <article className="card member reveal">
              <div className="ph">
                <img src="/assets/img/team/david-taiwo.jpg" alt="David Taiwo" loading="lazy" style={{ objectPosition: "50% 30%" }} />
              </div>
              <div className="who bio-wrap">
                <h3>David Taiwo</h3>
                <span className="role">Engineering & Delivery Lead</span>
                <p className="bio">
                  Engineering and delivery, from an enterprise systems background, applied to the unglamorous work of sitting inside a business, mapping how its core processes actually run, and producing a ranked plan for where the money is.
                </p>
              </div>
            </article>
            <article className="card member reveal">
              <div className="ph">
                <img src="/assets/img/team/cheryl-rykowski.jpg" alt="Cheryl Rykowski" loading="lazy" style={{ objectPosition: "50% 30%" }} />
              </div>
              <div className="who bio-wrap">
                <h3>Cheryl Rykowski</h3>
                <span className="role">Cultural AI Strategy Lead</span>
                <p className="bio">
                  Cheryl runs the part of every engagement that decides whether any of it survives contact with a real team: leadership alignment, the people who become internal champions, and the training plan that turns a finished module into a changed room. Her ground is how people actually react: fear, resistance, over-reliance, and the difference between judgment and avoidance.
                </p>
              </div>
            </article>
            <article className="card member reveal">
              <div className="ph">
                <img src="/assets/img/team/alana-kuselias.jpg" alt="Alana Kuselias" loading="lazy" style={{ objectPosition: "50% 25%" }} />
              </div>
              <div className="who bio-wrap">
                <h3>Alana Kuselias</h3>
                <span className="role">Head of Marketing</span>
                <p className="bio">
                  Alana leads marketing operations: campaigns, timelines and execution across teams, plus the social strategy and content behind the brand's digital presence. She helps shape the Making Waves book and course, and handles media outreach, press coordination, partnerships and appearances.
                </p>
              </div>
            </article>
          </div>
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
      {/* 3. Lineage */}
      <section className="lane-host section tinted has-contours" id="lineage" style={{ marginTop: "28px" }}>
        <Contours ink="sea" />
        <div className="course-lane" aria-hidden="true">
          <span className="course-waypoint" />
          <span className="course-rule" />
          <span className="course-bearing">CO 176°</span>
        </div>
        <div className="wrap">
          <div className="lineage">
            <div className="reveal">
              <div className="eyebrow">Lineage</div>
              <h2 className="h2" style={{ marginTop: "14px" }}>
                A division, not an{" "}
                <span className="stroke">agency</span>
                .
              </h2>
              <p className="lede">
                OceanCrest AI is the consulting division of OceanCrest Ventures, an operating company. Everything we sell is designed to be finished: training that ends with the whole company through it, a build that ends in a handoff, systems that end up yours. We are paid to make you independent.
              </p>
              <div className="btns" style={{ marginTop: "26px" }}>
                <a className="link" href="https://oceancrestventures.com" target="_blank" rel="noopener">OceanCrest Ventures ↗</a>
              </div>
            </div>
            <figure className="photo reveal">
              <img src="/assets/img/photos/oc-09-cantilever-tall.jpg" alt="Massive cantilevered concrete slabs stacked in raking light over an empty plaza, one small figure standing beneath them. Generated image." loading="lazy" />
            </figure>
          </div>
          <div className="promises">
            <div className="reveal">
              <span className="pebble" style={{ "--peb": "var(--shallows)" }}>1</span>
              <p>Your team writes the code with us.</p>
            </div>
            <div className="reveal">
              <span className="pebble" style={{ "--peb": "var(--blush)" }}>2</span>
              <p>Your data never trains someone else's product.</p>
            </div>
            <div className="reveal">
              <span className="pebble" style={{ "--peb": "var(--dawn)" }}>3</span>
              <p>Success is measured after the build ships, not when the contract does.</p>
            </div>
          </div>
        </div>
      </section>
      {/* 4. Advisory board */}
      <section className="lane-host section" id="advisory">
        <div className="course-lane" aria-hidden="true">
          <span className="course-waypoint" />
          <span className="course-rule" />
          <span className="course-bearing">CO 181°</span>
        </div>
        <div className="wrap">
          <Coast seed="about-advisory-open" palette="technical" size="tall" scene="open" glints className="board-art has-contours">
            <Contours ink="white" />
            <div className="board-panel">
              <div className="sec-head reveal">
                <div>
                  <div className="eyebrow">
                    Advisory board{" "}
                    <span className="chart-ref" style={{ marginLeft: "10px" }}>OC-05a / The advisory board</span>
                  </div>
                  <h2 className="h2">
                    The OceanCrest AI advisory{" "}
                    <span className="stroke">board</span>
                    .
                  </h2>
                </div>
                <p className="lede">
                  Operators, investors and counsel who have built, sold and governed companies through several technology shifts. They advise the firm, not your project, but the judgement behind our work is theirs as much as ours.
                </p>
              </div>
              <div className="people board reveal">
                <div className="person">
                  <img src="/assets/img/advisors/nick-briere.jpg" alt="Nick Briere" loading="lazy" />
                  <b>Nick Briere</b>
                  <span>CEO at NextMinds, Partner at Sonick Group</span>
                </div>
                <div className="person">
                  <img src="/assets/img/advisors/michael-carter.jpg" alt="Michael Carter" loading="lazy" />
                  <b>Michael Carter</b>
                  <span>Managing Partner, Carter Morse & Goodrich</span>
                </div>
                <div className="person">
                  <img src="/assets/img/advisors/warrick-dunn.jpg" alt="Warrick Dunn" loading="lazy" />
                  <b>Warrick Dunn</b>
                  <span>Founder, Warrick Dunn Charities; Former NFL Player</span>
                </div>
                <div className="person">
                  <img src="/assets/img/advisors/evan-gappelberg.jpg" alt="Evan Gappelberg" loading="lazy" />
                  <b>Evan Gappelberg</b>
                  <span>CEO/Founder, Nextech3D.ai, ARway.ai, Toggle3D.ai</span>
                </div>
                <div className="person">
                  <img src="/assets/img/advisors/wendy-guillies.jpg" alt="Wendy Guillies" loading="lazy" />
                  <b>Wendy Guillies</b>
                  <span>Retired President/CEO, Kauffman Foundation</span>
                </div>
                <div className="person">
                  <img src="/assets/img/advisors/michele-henry.jpg" alt="Michele Henry" loading="lazy" />
                  <b>Michele Henry</b>
                  <span>Founder & CEO, Face Foundrie</span>
                </div>
                <div className="person">
                  <img src="/assets/img/advisors/david-karp.jpg" alt="David Karp" loading="lazy" />
                  <b>David Karp</b>
                  <span>Co-Founder & Senior Managing Director, Cresset Capital</span>
                </div>
                <div className="person">
                  <img src="/assets/img/advisors/david-l-katz.jpg" alt="Dr. David L. Katz" loading="lazy" />
                  <b>Dr. David L. Katz</b>
                  <span>Founder/CEO, Diet ID, Inc.</span>
                </div>
                <div className="person">
                  <img src="/assets/img/advisors/noel-t-langerman.jpg" alt="Noel T. Langerman" loading="lazy" />
                  <b>Noel T. Langerman</b>
                  <span>Managing Partner, Karp & Langerman, P.C.</span>
                </div>
                <div className="person">
                  <img src="/assets/img/advisors/miles-lasater.jpg" alt="Miles Lasater" loading="lazy" />
                  <b>Miles Lasater</b>
                  <span>CEO and Founder, Purpose Built</span>
                </div>
                <div className="person">
                  <img src="/assets/img/advisors/john-lawrence.jpg" alt="John Lawrence, ESQ." loading="lazy" />
                  <b>John Lawrence, ESQ.</b>
                  <span>Partner, Shipman & Goodwin LLP</span>
                </div>
                <div className="person">
                  <img src="/assets/img/advisors/ronald-larrow.jpg" alt="Ronald Larrow, CPA" loading="lazy" />
                  <b>Ronald Larrow, CPA</b>
                  <span>Partner, Simione, Macca & Larrow</span>
                </div>
                <div className="person">
                  <img src="/assets/img/advisors/lawrence-p-ward.jpg" alt="Dr. Lawrence P. Ward" loading="lazy" />
                  <b>Dr. Lawrence P. Ward</b>
                  <span>President, University of Hartford</span>
                </div>
                <div className="person">
                  <img src="/assets/img/advisors/wayne-m-zell.jpg" alt="Wayne M. Zell, ESQ." loading="lazy" />
                  <b>Wayne M. Zell, ESQ.</b>
                  <span>Founder, Zell Law</span>
                </div>
              </div>
            </div>
          </Coast>
        </div>
      </section>
      {/* 5. Final call */}
      <section className="section" style={{ paddingTop: "0" }}>
        <div className="wrap close-row">
          <figure className="photo lilac reveal">
            <img src="/assets/img/photos/oc-03-spiral-tall.jpg" alt="A concrete ramp spiralling upward, seen from below. Generated image." loading="lazy" />
          </figure>
          <Coast seed="about-final-dusk" palette="dusk" size="wide" scene="beach" glints className="final has-contours">
            <Contours ink="white" />
            <i className="tick tick-tl" aria-hidden="true" />
            <i className="tick tick-tr" aria-hidden="true" />
            <i className="tick tick-bl" aria-hidden="true" />
            <i className="tick tick-br" aria-hidden="true" />
            <div className="eyebrow" style={{ color: "var(--deep)" }}>Begin</div>
            <h2 className="h2" style={{ marginTop: "14px" }}>
              Will AI scale across your company, or stall in another{" "}
              <span className="stroke">pilot</span>
              ?
            </h2>
            <p className="lede">
              Book a 30-minute meeting on Teams with the people on this page. If you're not ready, we'll tell you, and tell you what to fix first. Or start with your team's knowledge: take the diagnostic.
            </p>
            <div className="btns">
              <Link className="btn primary" href="/book" data-sound="chime" data-sparkle="">
                Book now{" "}
                <span className="arr" aria-hidden="true">→</span>
              </Link>
              <Link className="btn" href="/diagnostic" style={{ background: "var(--paper)" }}>Take the diagnostic</Link>
            </div>
            <div className="alt">
              <a href="https://ocv-ai-assessment.netlify.app/" target="_blank" rel="noopener">
                <span className="ref">Not ready for a call</span>
                Score your AI readiness, 0 to 100 ↗
              </a>
              {" "}
              <Link href="/resources">
                <span className="ref">Reading first</span>
                Browse the resources →
              </Link>
            </div>
          </Coast>
        </div>
      </section>
    </main>
  );
}
