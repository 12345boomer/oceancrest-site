/*
  Sections shared by /resources and its sub-pages (white papers, newsletters, playbooks,
  worksheets). Styles live in ./page.css under .page-resources, so any page rendering these
  imports "../page.css" and puts page-resources on its <main>.
*/
import Link from "next/link";
import Coast from "@/components/Coast";
import type { Palette, Scene } from "@/lib/coast";
import SubscribeForm from "./subscribe-form";

/** The quarterly Small Business Guide, cover and copy. */
export function GuideSection() {
  return (
    <section className="lane-host section" id="guide">
      <div className="course-lane" aria-hidden="true">
        <span className="course-waypoint" />
        <span className="course-rule" />
        <span className="course-bearing">CO 172°</span>
      </div>
      <div className="wrap guide">
        <Coast as="a" seed="resources-guide-frame" palette="technical" size="wide" scene="open" glints className="frame reveal" href="https://oceancrest.ai/guide/" target="_blank" rel="noopener">
          <img src="/assets/img/covers/cover-small-business-guide-q3-2026.jpg" alt="Cover sheet of the Q3 2026 Small Business Guide to AI Education and Adoption" loading="lazy" />
        </Coast>
        <div className="reveal">
          <div className="eyebrow">The quarterly guide</div>
          <div className="meta" style={{ marginTop: "16px" }}>
            <span className="tag sun">Current edition</span>
            <span className="ref">OC-206 · 2026-08-18 · 17 sheets · Free</span>
          </div>
          <h2>The Small Business Guide to AI Education and Adoption, Q3 2026.</h2>
          <p className="body">
            Seventeen sheets, once a quarter, in plain language: where small businesses actually stand with AI, what changed in the last ninety days, and the first moves that save money, energy, and time. This is the current edition; the next ships at the start of Q4.
          </p>
          <div className="btns">
            <a className="btn" href="https://oceancrest.ai/guide/" target="_blank" rel="noopener">
              Read the guide{" "}
              <span aria-hidden="true">↗</span>
            </a>
            <a className="link" href="#subscribe">Get the Q4 edition when it ships</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/** The published white papers, with covers and OC numbers. */
export function PapersSection({ style }: { style?: React.CSSProperties }) {
  return (
    <section className="lane-host section tinted has-contours" id="papers" style={style}>
      <div className="course-lane" aria-hidden="true">
        <span className="course-waypoint" />
        <span className="course-rule" />
        <span className="course-bearing">CO 170°</span>
      </div>
      <div className="wrap">
        <div className="sec-head reveal">
          <div>
            <div className="eyebrow">White papers</div>
            <h2 className="h2">
              The papers behind how we{" "}
              <span className="stroke">work</span>
              .
            </h2>
          </div>
          <p className="lede">
            Four letter sheets each, built to read on screen or print. No purchase required for any of it: just decisions, in order.
          </p>
        </div>
        <div className="papers">
          <figure className="photo sage reveal">
            <img src="/assets/img/photos/oc-07-columns-tall.jpg" alt="A colonnade of tall fluted columns seen from below, one small figure walking beneath them. Generated image." loading="lazy" />
          </figure>
          <a className="card pub reveal" href="https://oceancrest.ai/resources/engagement-model/" target="_blank" rel="noopener">
            <div className="cover">
              <img src="/assets/img/covers/cover-engagement-model.jpg" alt="Cover sheet of the white paper The engagement model, in four phases" loading="lazy" />
            </div>
            <span className="ref">OC-401 · 2026-08-28 · 4 sheets · Free</span>
            <h3>The engagement model, in four phases.</h3>
            <p>
              How an OceanCrest AI engagement runs, from the first record we ask for to the day the build team steps back, and what stays behind. Four phases, in order, with what each one asks of you.
            </p>
            <span className="go"><span>Read the paper ↗</span></span>
          </a>
          {" "}
          <a className="card pub reveal" href="https://oceancrest.ai/resources/ninety-days/" target="_blank" rel="noopener">
            <div className="cover">
              <img src="/assets/img/covers/cover-ninety-days.jpg" alt="Cover sheet of the white paper Your next ninety days" loading="lazy" />
            </div>
            <span className="ref">OC-402 · 2026-08-28 · 4 sheets · Free</span>
            <h3>Your next ninety days.</h3>
            <p>
              The one-page AI policy and the 90-day plan from the Q3 guide, on their own so you can hand them to your team.
            </p>
            <span className="go"><span>Read the paper ↗</span></span>
          </a>
        </div>
      </div>
    </section>
  );
}

/** Papers being written now. Each "Notify me" link points at #subscribe on the same page. */
export function PreparationSection() {
  return (
    <section className="lane-host section" id="preparation">
      <div className="course-lane" aria-hidden="true">
        <span className="course-waypoint" />
        <span className="course-rule" />
        <span className="course-bearing">CO 168°</span>
      </div>
      <div className="wrap">
        <div className="sec-head reveal">
          <div>
            <div className="eyebrow">In preparation</div>
            <h2 className="h2">
              On the drawing{" "}
              <span className="stroke sun">table</span>
              .
            </h2>
          </div>
          <p className="lede">
            Three papers we are writing now. None has a date yet; subscribe and we'll send one email when each one ships.
          </p>
        </div>
        <div className="grid g3">
          <article className="card prep reveal">
            <Coast seed="prep-oc403-loop" palette="technical" size="card" scene="cove" glints className="art-top"><span className="tag sun">In preparation</span></Coast>
            <span className="ref">OC-403 · No date set</span>
            <h3>The engagement loop.</h3>
            <p>
              The seven stations every engagement passes through, from the first conversation to proven ROI, and why the loop closes on itself.
            </p>
            <a className="link go" href="#subscribe" style={{ alignSelf: "flex-start" }}>Notify me ↓</a>
          </article>
          <article className="card prep reveal">
            <Coast seed="prep-oc404-curriculum" palette="mindset" size="card" scene="beach" glints className="art-top"><span className="tag sun">In preparation</span></Coast>
            <span className="ref">OC-404 · No date set</span>
            <h3>AI for Business Leaders — the curriculum.</h3>
            <p>
              The fifteen-hour course, module by module, and the all-staff companion course that follows it.
            </p>
            <a className="link go" href="#subscribe" style={{ alignSelf: "flex-start" }}>Notify me ↓</a>
          </article>
          <article className="card prep reveal">
            <Coast seed="prep-oc405-stand" palette="hero" size="card" scene="headland" glints className="art-top"><span className="tag sun">In preparation</span></Coast>
            <span className="ref">OC-405 · No date set</span>
            <h3>Where small businesses stand.</h3>
            <p>
              The adoption spectrum, drawn from the surveys we trust, and why every station on it is a fine place to board from.
            </p>
            <a className="link go" href="#subscribe" style={{ alignSelf: "flex-start" }}>Notify me ↓</a>
          </article>
        </div>
      </div>
    </section>
  );
}

/**
 * The sign-up panel. `flush` (the default, as on /resources) drops the top padding when it
 * follows a section; pass flush={false} when it sits straight under a hero.
 */
export function SubscribeSection({ flush = true }: { flush?: boolean }) {
  return (
    <section className="section" id="subscribe" style={flush ? { paddingTop: "0" } : undefined}>
      <div className="wrap">
        <Coast seed="resources-subscribe-open" image="/assets/img/art/dots-band.jpg" video="/assets/video/art-dots-band.mp4" palette="technical" size="wide" scene="open" className="sub-art has-contours">
          <i className="tick tick-tl" aria-hidden="true" />
          <i className="tick tick-tr" aria-hidden="true" />
          <i className="tick tick-bl" aria-hidden="true" />
          <i className="tick tick-br" aria-hidden="true" />
          <div className="sub-panel reveal">
            <div className="eyebrow">Subscribe</div>
            <h2 className="h2" style={{ marginTop: "14px" }}>
              Hear about the next{" "}
              <span className="stroke warm">one</span>
              .
            </h2>
            <p className="lede">
              One email when a new paper or the next quarterly edition ships. Nothing else: no sequence, no sales call.
            </p>
            <SubscribeForm />
          </div>
        </Coast>
      </div>
    </section>
  );
}

export interface Pointer { seed: string; palette: Palette; scene: Scene; tag: string; title: string; text: string; href: string; cta: string }

/** For the coming-soon pages: cards pointing at what is already published. Same card as "In preparation". */
export function PointersSection({ eyebrow, title, lede, items }: { eyebrow: string; title: React.ReactNode; lede?: React.ReactNode; items: Pointer[] }) {
  return (
    <section className="lane-host section tinted has-contours" id="available">
      <div className="course-lane" aria-hidden="true">
        <span className="course-waypoint" />
        <span className="course-rule" />
        <span className="course-bearing">CO 170°</span>
      </div>
      <div className="wrap">
        <div className="sec-head reveal">
          <div>
            <div className="eyebrow">{eyebrow}</div>
            <h2 className="h2">{title}</h2>
          </div>
          {lede && <p className="lede">{lede}</p>}
        </div>
        <div className="grid g3">
          {items.map((p) => (
            <article className="card prep reveal" key={p.href}>
              <Coast seed={p.seed} palette={p.palette} size="card" scene={p.scene} glints className="art-top"><span className="tag">{p.tag}</span></Coast>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
              <Link className="link go" href={p.href} style={{ alignSelf: "flex-start" }}>{p.cta}</Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
