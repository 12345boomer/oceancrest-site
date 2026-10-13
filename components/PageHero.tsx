import Coast from "@/components/Coast";
import type { Palette } from "@/lib/sea-photos";

/**
 * The photo banner at the top of a page: eyebrow, h1, lede and optional buttons. `title` may carry one painted word: <span className="stroke">.
 */
export default function PageHero({ seed, palette = "hero", image, video, aside, eyebrow, title, lede, children, className }: {
  seed: string;
  palette?: Palette;
  /** A finished picture for the banner (e.g. a Higgsfield still under public/) in place of the library pick. */
  image?: string;
  /** A looping clip of that picture; fades in over it once playing. */
  video?: string;
  /** Cards for the right half of the banner (the service pages' route card and peek). */
  aside?: React.ReactNode;
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  lede?: React.ReactNode;
  /** Buttons or links under the lede. */
  children?: React.ReactNode;
  className?: string;
}) {
  const copy = (
    <>
      <div className="eyebrow">{eyebrow}</div>
      <h1 className="h1">{title}</h1>
      {lede && <p className="lede">{lede}</p>}
      {children && <div className="btns">{children}</div>}
    </>
  );
  return (
    <Coast as="section" seed={seed} palette={palette} size="hero" image={image} video={video} className={"page-hero ph-photo has-contours" + (className ? " " + className : "")}>
      <i className="tick tick-tl" aria-hidden="true" />
      <i className="tick tick-tr" aria-hidden="true" />
      <i className="tick tick-bl" aria-hidden="true" />
      <i className="tick tick-br" aria-hidden="true" />
      <div className="wrap" style={{ width: "100%" }}>
        {aside ? (
          <div className="ph-grid">
            <div className="ph-copy">{copy}</div>
            <aside className="ph-aside">{aside}</aside>
          </div>
        ) : copy}
      </div>
    </Coast>
  );
}
