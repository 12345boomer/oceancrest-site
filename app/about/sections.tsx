/*
  The about sections, shared by /about, /about/team and /about/advisory-board.
  Their styles live in app/about/page.css, scoped under .page-about, so any page that
  renders them imports "../page.css" (or "./page.css") and puts page-about on its <main>.
*/
import Coast from "@/components/Coast";

/** The crew. The originals differ in framing, so each photo carries its own object-position. */
export const TEAM = [
  {
    name: "Chris Kuselias",
    role: "Founder & Chairman",
    img: "/assets/img/team/chris-kuselias.webp",
    pos: "50% 0%",
    bio: "Chris has spent three decades building and running companies: launching ventures, employing thousands of families, and doing the unglamorous work of getting people to change how they operate. He has been profiled on 60 Minutes, CNN, FOX, ABC and NBC."
  },
  {
    name: "Eliyahu Cohen",
    role: "Head of AI & Build",
    img: "/assets/img/team/eliyahu-cohen-tall2.jpg",
    pos: "50% 0%",
    bio: "Systems and builds: architecture, diagnostics, and the software a client ends up owning outright. Eliyahu has helped venture-backed startups streamline operations, guided private-equity portfolio companies through digital transformation, and built AI systems for healthcare organizations that cut administrative overhead."
  },
  {
    name: "Ben Eydlin",
    role: "Head of Growth & Learning",
    img: "/assets/img/team/ben-eydlin.jpg",
    pos: "50% 30%",
    bio: "Ben has always been drawn to how value gets created, from building a business to judging which ones are worth backing. He started and runs his own business, researches public equities for UConn's student-run Opportunity Fund, has evaluated 120+ startups at Hillside Ventures, and works in wealth management at Fidelity."
  },
  {
    name: "David Taiwo",
    role: "Engineering & Delivery Lead",
    img: "/assets/img/team/david-taiwo.jpg",
    pos: "50% 30%",
    bio: "Engineering and delivery, from an enterprise systems background, applied to the unglamorous work of sitting inside a business, mapping how its core processes actually run, and producing a ranked plan for where the money is."
  },
  {
    name: "Cheryl Rykowski",
    role: "Cultural AI Strategy Lead",
    img: "/assets/img/team/cheryl-rykowski.jpg",
    pos: "50% 30%",
    bio: "Cheryl runs the part of every engagement that decides whether any of it survives contact with a real team: leadership alignment, the people who become internal champions, and the training plan that turns a finished module into a changed room. Her ground is how people actually react: fear, resistance, over-reliance, and the difference between judgment and avoidance."
  },
  {
    name: "Alana Kuselias",
    role: "Head of Marketing",
    img: "/assets/img/team/alana-kuselias.jpg",
    pos: "50% 25%",
    bio: "Alana leads marketing operations: campaigns, timelines and execution across teams, plus the social strategy and content behind the brand's digital presence. She helps shape the Making Waves book and course, and handles media outreach, press coordination, partnerships and appearances."
  }
];

/** The advisory board, as listed on the live site. */
export const ADVISORS = [
  { name: "Nick Briere", title: "CEO at NextMinds, Partner at Sonick Group", img: "nick-briere.jpg" },
  { name: "Michael Carter", title: "Managing Partner, Carter Morse & Goodrich", img: "michael-carter.jpg" },
  { name: "Warrick Dunn", title: "Founder, Warrick Dunn Charities; Former NFL Player", img: "warrick-dunn.jpg" },
  { name: "Evan Gappelberg", title: "CEO/Founder, Nextech3D.ai, ARway.ai, Toggle3D.ai", img: "evan-gappelberg.jpg" },
  { name: "Wendy Guillies", title: "Retired President/CEO, Kauffman Foundation", img: "wendy-guillies.jpg" },
  { name: "Michele Henry", title: "Founder & CEO, Face Foundrie", img: "michele-henry.jpg" },
  { name: "David Karp", title: "Co-Founder & Senior Managing Director, Cresset Capital", img: "david-karp.jpg" },
  { name: "Dr. David L. Katz", title: "Founder/CEO, Diet ID, Inc.", img: "david-l-katz.jpg" },
  { name: "Noel T. Langerman", title: "Managing Partner, Karp & Langerman, P.C.", img: "noel-t-langerman.jpg" },
  { name: "Miles Lasater", title: "CEO and Founder, Purpose Built", img: "miles-lasater.jpg" },
  { name: "John Lawrence, ESQ.", title: "Partner, Shipman & Goodwin LLP", img: "john-lawrence.jpg" },
  { name: "Ronald Larrow, CPA", title: "Partner, Simione, Macca & Larrow", img: "ronald-larrow.jpg" },
  { name: "Dr. Lawrence P. Ward", title: "President, University of Hartford", img: "lawrence-p-ward.jpg" },
  { name: "Wayne M. Zell, ESQ.", title: "Founder, Zell Law", img: "wayne-m-zell.jpg" }
];

function Lane({ bearing }: { bearing: string }) {
  return (
    <div className="course-lane" aria-hidden="true">
      <span className="course-waypoint" />
      <span className="course-rule" />
      <span className="course-bearing">{bearing}</span>
    </div>
  );
}

/** Our team: six cards with the full photos in 4:5 frames, roles and bios. */
export function TeamSection({ bearing = "CO 172°" }: { bearing?: string }) {
  return (
    <section className="lane-host section" id="team">
      <Lane bearing={bearing} />
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
          {TEAM.map((m) => (
            <article className="card member reveal" key={m.name}>
              <div className="ph">
                <img src={m.img} alt={m.name} loading="lazy" style={{ objectPosition: m.pos }} />
              </div>
              <div className="who bio-wrap">
                <h3>{m.name}</h3>
                <span className="role">{m.role}</span>
                <p className="bio">{m.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/** The notched divider between sections. */
export function Notch() {
  return (
    <div className="wrap">
      <div className="notch" aria-hidden="true">
        <svg viewBox="0 0 1200 28" preserveAspectRatio="none">
          <path d="M0 10 H452 L480 18 H1200" fill="none" stroke="#b3b8bf" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        </svg>
        <i />
      </div>
    </div>
  );
}

/** Lineage: a division of OceanCrest Ventures, not an agency, and the three promises. */
export function LineageSection({ bearing = "CO 176°", style }: { bearing?: string; style?: React.CSSProperties }) {
  return (
    <section className="lane-host section tinted has-contours" id="lineage" style={style}>
      <Lane bearing={bearing} />
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
            <span className="pebble" style={{ "--peb": "var(--shallows)" } as React.CSSProperties}>1</span>
            <p>Your team writes the code with us.</p>
          </div>
          <div className="reveal">
            <span className="pebble" style={{ "--peb": "var(--blush)" } as React.CSSProperties}>2</span>
            <p>Your data never trains someone else's product.</p>
          </div>
          <div className="reveal">
            <span className="pebble" style={{ "--peb": "var(--dawn)" } as React.CSSProperties}>3</span>
            <p>Success is measured after the build ships, not when the contract does.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** The advisory board: fourteen advisors on the aerial swell photo (moved here from the Workflows banner). */
export function AdvisorySection({ bearing = "CO 181°" }: { bearing?: string }) {
  return (
    <section className="lane-host section" id="advisory">
      <Lane bearing={bearing} />
      <div className="wrap">
        <Coast seed="about-advisory-open" image="/assets/img/art/swell-lines.jpg" video="/assets/video/art-swell-lines.mp4" palette="technical" size="tall" scene="open" className="board-art swell-lines has-contours">
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
              {ADVISORS.map((a) => (
                <div className="person" key={a.name}>
                  <img src={`/assets/img/advisors/${a.img}`} alt={a.name} loading="lazy" />
                  <b>{a.name}</b>
                  <span>{a.title}</span>
                </div>
              ))}
            </div>
          </div>
        </Coast>
      </div>
    </section>
  );
}
