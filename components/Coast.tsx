"use client";
/*
  <Coast>: a box with a painted coast behind its children. Ported from coast.js mount().
  The painting is computed after mount (never during SSR): it is expensive and its data URLs
  are large. Until then the layer renders empty, so the box keeps its size and CSS ground.
  `alive` (hero banners): the boat drifts, gulls cross now and then, the sun sinks a little as
  the banner scrolls away, and the cursor rings the water. Off under reduced motion.
*/
import { createElement, useEffect, useMemo, useRef, useState } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { art, glintMarks } from "@/lib/coast";
import type { Art, Palette, Scene, Size } from "@/lib/coast";

type CoastProps = {
  as?: "div" | "section" | "article" | "a" | "figure" | "aside" | "span";
  seed: string;
  palette?: Palette;
  size?: Size;
  scene?: Scene;
  water?: boolean;
  glints?: boolean;
  /** Move the painting's parts, lightly: boat, gulls, sinking sun, cursor ripples. */
  alive?: boolean;
  /** A looping clip of this painting (an .mp4 under public/). It fades in over the still once playing and replaces the drifting water. */
  video?: string;
  /** A finished picture (under public/) in place of the generated painting, e.g. a Higgsfield still. Turns off water, alive and glints. */
  image?: string;
  className?: string;
  children?: ReactNode;
} & Omit<HTMLAttributes<HTMLElement>, "className" | "children"> & { href?: string; target?: string; rel?: string; [dataAttr: `data-${string}`]: string | undefined };

// Where object-position puts the box inside the free space (percent or px; default centred).
function pos(v: string, free: number): number { return /%$/.test(v) ? parseFloat(v) / 100 * free : parseFloat(v) || free / 2; }

// Three gulls, drawn at the left edge of the sky; the whole flock flies across in CSS.
function Gull({ x, y, s }: { x: number; y: number; s: number }) {
  return <path className="gull" d={`M${x - s} ${y}q${s / 2} ${-s / 2} ${s} 0q${s / 2} ${-s / 2} ${s} 0`} />;
}

export default function Coast({ as = "div", seed, palette = "hero", size = "card", scene, water = false, glints = false, alive: aliveProp = false, video, image, className, children, ...rest }: CoastProps) {
  const alive = aliveProp && !image;
  const hostRef = useRef<HTMLElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const ripplesRef = useRef<SVGGElement>(null);
  const [still, setStill] = useState(false);
  const [p, setP] = useState<Art | null>(null);
  const [motion, setMotion] = useState(false);
  const sceneKey = scene || "";
  const marks = useMemo(() => (p && glints ? glintMarks(p, seed || "oceancrest") : []), [p, glints, seed]);

  // Paint on the client only (not needed when a finished picture stands in).
  useEffect(() => {
    if (image) return;
    setP(art(seed || "oceancrest", palette, size, sceneKey, water, alive));
  }, [seed, palette, size, sceneKey, water, alive, image]);

  // Alive parts stay put for people who have asked for reduced motion.
  useEffect(() => {
    if (!alive || typeof matchMedia === "undefined") return;
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setStill(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [alive]);

  // Clips play only for people who haven't asked for reduced motion.
  useEffect(() => {
    if (!video || typeof matchMedia === "undefined") return;
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setMotion(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [video]);
  const clip = !!video && motion;
  const live = alive && !clip && !!p?.alive && !!p.aliveUrls;

  // The water and alive boxes match the painting's object-fit: cover crop, so their layers line up with it.
  useEffect(() => {
    const layer = layerRef.current;
    if (!(water || live) || clip || !p || !layer) return;
    const img = layer.querySelector<HTMLImageElement>(".coast-img"), box = layer.querySelector<HTMLDivElement>(".coast-water, .coast-alive");
    if (!img || !box) return;
    const W = p.W, H = p.H;
    function fit() {
      if (!layer || !img || !box) return;
      const cw = layer.clientWidth, ch = layer.clientHeight;
      if (!cw || !ch) return;
      const sc = Math.max(cw / W, ch / H), w = W * sc, h = H * sc;
      const op = getComputedStyle(img).objectPosition.split(" ");
      box.style.width = w + "px"; box.style.height = h + "px";
      box.style.left = pos(op[0] || "50%", cw - w) + "px"; box.style.top = pos(op[1] || "50%", ch - h) + "px";
    }
    fit();
    if (typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(fit);
      ro.observe(layer);
      return () => ro.disconnect();
    }
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [water, live, clip, p]);

  // The sun sinks a little as the banner scrolls away (--sink runs 0 to 1).
  useEffect(() => {
    const el = hostRef.current;
    if (!live || still || !el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const b = el.getBoundingClientRect();
      el.style.setProperty("--sink", Math.min(1, Math.max(0, -b.top / Math.max(1, b.height * 0.8))).toFixed(3));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); el.style.removeProperty("--sink"); };
  }, [live, still]);

  // Small rings where the cursor crosses the water. The land mask keeps them off the shore.
  useEffect(() => {
    const el = hostRef.current, g = ripplesRef.current, a = p?.alive;
    if (!live || still || !el || !g || !a || !p) return;
    const box = el.querySelector<HTMLDivElement>(".coast-alive");
    const W = p.W, H = p.H, k = Math.sqrt((W * H) / (1600 * 900));
    let last = 0, lx = 0, ly = 0;
    const move = (e: PointerEvent) => {
      if (!box || e.pointerType === "touch") return;
      const r = box.getBoundingClientRect(), x = (e.clientX - r.left) / r.width * W, y = (e.clientY - r.top) / r.height * H;
      const now = performance.now();
      if (y < a.hy + 6 || now - last < 90 || Math.hypot(e.clientX - lx, e.clientY - ly) < 14 || g.childElementCount > 14) return;
      last = now; lx = e.clientX; ly = e.clientY;
      const ring = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
      const rx = 26 * k * (0.6 + (y - a.hy) / (H - a.hy));
      ring.setAttribute("cx", x.toFixed(1)); ring.setAttribute("cy", y.toFixed(1));
      ring.setAttribute("rx", rx.toFixed(1)); ring.setAttribute("ry", (rx * 0.32).toFixed(1));
      ring.setAttribute("class", "rp");
      ring.addEventListener("animationend", () => ring.remove());
      g.appendChild(ring);
    };
    el.addEventListener("pointermove", move);
    return () => { el.removeEventListener("pointermove", move); g.replaceChildren(); };
  }, [live, still, p]);

  // Glints follow the pointer with a soft glow (--mx/--my, .lit).
  useEffect(() => {
    const el = hostRef.current;
    if (!glints || !el) return;
    const move = (e: PointerEvent) => {
      const b = el.getBoundingClientRect();
      el.style.setProperty("--mx", ((e.clientX - b.left) / b.width * 100).toFixed(1) + "%");
      el.style.setProperty("--my", ((e.clientY - b.top) / b.height * 100).toFixed(1) + "%");
      el.classList.add("lit");
    };
    const leave = () => { el.classList.remove("lit"); };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      el.classList.remove("lit");
    };
  }, [glints]);

  const layer = (
    <div className="coast-layer" aria-hidden="true" ref={layerRef}>
      {image ? <img className="coast-img coast-photo" alt="" src={image} /> : p && <img className="coast-img" alt="" src={p.url} />}
      {clip && (
        <video className="coast-video" autoPlay muted loop playsInline preload="auto" aria-hidden="true"
          src={video} onPlaying={(e) => e.currentTarget.classList.add("on")} />
      )}
      {p && water && !clip && p.waveUrls && (
        <div className="coast-water">
          {p.waveUrls.map((u, i) => (
            <div key={i} className={"wv wv" + (i + 1)}><div className="wv-strip" style={{ backgroundImage: 'url("' + u + '")' }} /></div>
          ))}
          <img className="wv-refl" alt="" src={p.reflUrl} />
          <img className="wv-front" alt="" src={p.frontUrl} />
        </div>
      )}
      {live && p && p.alive && p.aliveUrls && (() => {
        const a = p.alive, u = p.aliveUrls, W = p.W, H = p.H, mask = "m-" + (seed || "oceancrest").replace(/[^a-z0-9-]/gi, "");
        const gy = a.hy * 0.3, gs = 10 * Math.sqrt((W * H) / (1600 * 900));
        return (
          <div className={"coast-alive" + (still ? " still" : "")}
            style={{ "--sink-max": ((a.sunPos.r * 1.2) / H * 100).toFixed(2) + "%", "--drift": (a.landSide < 0 ? 9 : -9) + "%" }}>
            <img className="al-sky" alt="" src={u.sky} />
            <img className="al-sun" alt="" src={u.sun} />
            <img className="al-scene" alt="" src={u.scene} />
            {u.boat && a.boatPos && (
              <img className="al-boat" alt="" src={u.boat} style={{ transformOrigin: `${(a.boatPos.x / W * 100).toFixed(2)}% ${(a.boatPos.y / H * 100).toFixed(2)}%` }} />
            )}
            {!still && (
              <svg className="al-gulls" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
                <Gull x={W * 0.02} y={gy} s={gs} /><Gull x={W * 0.05} y={gy + gs * 1.6} s={gs * 0.85} /><Gull x={W * 0.075} y={gy - gs * 0.9} s={gs * 0.7} />
              </svg>
            )}
            <svg className="al-ripples" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
              <defs>
                <mask id={mask} maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
                  <rect x="0" y={a.hy} width={W} height={H - a.hy} fill="#fff" />
                  {a.land.map((d, i) => <path key={i} d={d} fill="#000" />)}
                </mask>
              </defs>
              <g ref={ripplesRef} mask={`url(#${mask})`} />
            </svg>
          </div>
        );
      })()}
      {p && glints && (
        <>
          <svg className="coast-glints" viewBox={"0 0 " + p.W + " " + p.H} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            {marks.map((g, i) => (
              <rect key={i} className="gl" x={g.x} y={g.y} width={g.width} height={g.height} rx={g.rx}
                style={{ animationDuration: g.dur + "s", animationDelay: g.delay + "s" }} />
            ))}
          </svg>
          <div className="coast-glow" />
        </>
      )}
    </div>
  );

  return createElement(as, { ...rest, ref: hostRef, className: "coast" + (className ? " " + className : "") }, layer, children);
}
