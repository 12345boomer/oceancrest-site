import Link from "next/link";
import Coast from "@/components/Coast";
import { READINESS } from "@/lib/site";

/** The either/or close at the bottom of a page: book a meeting, or take the diagnostic. */
export default function ClosingCall({ seed, lede }: { seed: string; lede?: React.ReactNode }) {
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <Coast seed={seed} palette="dusk" size="wide" scene="cove" className="final has-contours">
          <i className="tick tick-tl" aria-hidden="true" />
          <i className="tick tick-tr" aria-hidden="true" />
          <i className="tick tick-bl" aria-hidden="true" />
          <i className="tick tick-br" aria-hidden="true" />
          <div className="eyebrow" style={{ color: "var(--deep)" }}>Begin</div>
          <h2 className="h2" style={{ marginTop: "14px" }}>
            Will AI scale across your company, or stall in another <span className="stroke warm">pilot</span>?
          </h2>
          <p className="lede">
            {lede ?? "Book a 30-minute meeting on Teams about transforming the operation. If you're not ready, we'll tell you, and tell you what to fix first. Or start with your team's knowledge: take the diagnostic."}
          </p>
          <div className="btns">
            <Link className="btn primary" href="/book" data-sound="chime" data-sparkle="">
              Book now <span className="arr" aria-hidden="true">→</span>
            </Link>
            <Link className="btn" href="/diagnostic" style={{ background: "var(--paper)" }}>Take the diagnostic</Link>
          </div>
          <div className="alt">
            <a href={READINESS} target="_blank" rel="noopener"><span className="ref">Not ready for a call</span>Score your AI readiness, 0 to 100 ↗</a>
            <Link href="/resources"><span className="ref">Reading first</span>Browse the resources →</Link>
          </div>
        </Coast>
      </div>
    </section>
  );
}
