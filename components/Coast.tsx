"use client";
/*
  <Coast>: a box with a realistic ocean photo behind its children (the site's one art system).
  It shows its own `image` if given; otherwise the library photo for its palette, chosen by its
  seed (lib/sea-photos.ts), so every card, band and panel stays in the same photographic style.
  `video` fades a looping clip of that photo in over the still; skipped under reduced motion.
  It replaced the painted coast on 2026-10-13. The old painting props (`water`, `glints`, `alive`,
  `scene`, `size`) are still accepted so call sites don't change, but nothing reads them now.
*/
import { createElement, useEffect, useState } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { seaPhoto } from "@/lib/sea-photos";
import type { Palette, Scene, Size } from "@/lib/sea-photos";

type CoastProps = {
  as?: "div" | "section" | "article" | "a" | "figure" | "aside" | "span";
  seed: string;
  /** Which part of the photo library to draw from: technical (cool), mindset (warm), dusk, hero (bright). */
  palette?: Palette;
  size?: Size;
  scene?: Scene;
  water?: boolean;
  glints?: boolean;
  alive?: boolean;
  /** A looping clip of the photo (an .mp4 under public/). It fades in over the still once playing. */
  video?: string;
  /** A specific photo (under public/) in place of the library pick. */
  image?: string;
  className?: string;
  children?: ReactNode;
} & Omit<HTMLAttributes<HTMLElement>, "className" | "children"> & { href?: string; target?: string; rel?: string; [dataAttr: `data-${string}`]: string | undefined };

export default function Coast({ as = "div", seed, palette = "hero", size: _size, scene: _scene, water: _water, glints: _glints, alive: _alive, video, image, className, children, ...rest }: CoastProps) {
  const photo = image || seaPhoto(palette, seed);
  const [motion, setMotion] = useState(false);

  // Clips play only for people who haven't asked for reduced motion.
  useEffect(() => {
    if (!video || typeof matchMedia === "undefined") return;
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setMotion(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [video]);

  const layer = (
    <div className="coast-layer" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="coast-img coast-photo" alt="" src={photo} loading={as === "section" ? undefined : "lazy"} />
      {video && motion && (
        <video className="coast-video" autoPlay muted loop playsInline preload="auto" aria-hidden="true"
          src={video} onPlaying={(e) => e.currentTarget.classList.add("on")} />
      )}
    </div>
  );

  return createElement(as, { ...rest, className: "coast" + (className ? " " + className : "") }, layer, children);
}
