import Link from "next/link";
import Coast from "@/components/Coast";
import { MEETING, READINESS } from "@/lib/site";

/**
 * The close at the bottom of a page: a welcoming invitation to book a meeting, or take the free readiness check first.
 * Two choices only, so the next step is clear. Every page uses this one band;
 * pass `image` (and a looping `video`) for a specific photo, or let Coast pick a dusk photo by `seed`.
 */
export default function ClosingCall({ seed, title, lede, image, video }: {
  seed: string;
  title?: React.ReactNode;
  lede?: React.ReactNode;
  image?: string;
  video?: string;
}) {
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <Coast seed={seed} image={image} video={video} palette="dusk" size="wide" className="final has-contours">
          <i className="tick tick-tl" aria-hidden="true" />
          <i className="tick tick-tr" aria-hidden="true" />
          <i className="tick tick-bl" aria-hidden="true" />
          <i className="tick tick-br" aria-hidden="true" />
          <div className="eyebrow" style={{ color: "var(--deep)" }}>Begin</div>
          <h2 className="h2" style={{ marginTop: "14px" }}>
            {title ?? <>What would you like to make <span className="stroke warm">easier</span>?</>}
          </h2>
          <p className="lede">
            {lede ?? `You don't need to know anything about AI to start. Bring one task that frustrates your team to ${MEETING}, and we'll talk through what could make it easier. No jargon, no pressure.`}
          </p>
          <div className="btns">
            <Link className="btn primary" href="/book" data-sparkle="">
              Book a meeting <span className="arr" aria-hidden="true">→</span>
            </Link>
            <a className="btn" href={READINESS} target="_blank" rel="noopener" style={{ background: "var(--paper)" }}>
              Take the free readiness check <span aria-hidden="true">↗</span>
            </a>
          </div>
        </Coast>
      </div>
    </section>
  );
}
