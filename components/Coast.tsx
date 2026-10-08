"use client";
/*
  <Coast>: a box with a painted coast behind its children. Ported from coast.js mount().
  The painting is computed after mount (never during SSR): it is expensive and its data URLs
  are large. Until then the layer renders empty, so the box keeps its size and CSS ground.
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
  className?: string;
  children?: ReactNode;
} & Omit<HTMLAttributes<HTMLElement>, "className" | "children"> & { href?: string; target?: string; rel?: string; [dataAttr: `data-${string}`]: string | undefined };

// Where object-position puts the box inside the free space (percent or px; default centred).
function pos(v: string, free: number): number { return /%$/.test(v) ? parseFloat(v) / 100 * free : parseFloat(v) || free / 2; }

export default function Coast({ as = "div", seed, palette = "hero", size = "card", scene, water = false, glints = false, className, children, ...rest }: CoastProps) {
  const hostRef = useRef<HTMLElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const [p, setP] = useState<Art | null>(null);
  const sceneKey = scene || "";
  const marks = useMemo(() => (p && glints ? glintMarks(p, seed || "oceancrest") : []), [p, glints, seed]);

  // Paint on the client only.
  useEffect(() => {
    setP(art(seed || "oceancrest", palette, size, sceneKey, water));
  }, [seed, palette, size, sceneKey, water]);

  // The water box matches the painting's object-fit: cover crop, so the moving strips line up with it.
  useEffect(() => {
    const layer = layerRef.current;
    if (!water || !p || !layer) return;
    const img = layer.querySelector<HTMLImageElement>(".coast-img"), box = layer.querySelector<HTMLDivElement>(".coast-water");
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
  }, [water, p]);

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
      {p && <img className="coast-img" alt="" src={p.url} />}
      {p && water && p.waveUrls && (
        <div className="coast-water">
          {p.waveUrls.map((u, i) => (
            <div key={i} className={"wv wv" + (i + 1)}><div className="wv-strip" style={{ backgroundImage: 'url("' + u + '")' }} /></div>
          ))}
          <img className="wv-refl" alt="" src={p.reflUrl} />
          <img className="wv-front" alt="" src={p.frontUrl} />
        </div>
      )}
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
