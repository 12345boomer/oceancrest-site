"use client";
/*
  <Contours ink="white|sea|navy" />: the live site's drifting depth contours on a canvas.
  Place it inside a positioned box (.has-contours); the canvas fills it.
*/
import { useEffect, useRef } from "react";
import { start } from "@/lib/contours";
import type { ContourInk } from "@/lib/contours";

export default function Contours({ ink = "navy" }: { ink?: ContourInk }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const engine = start(c, ink);
    return () => engine?.destroy();
  }, [ink]);
  return <canvas ref={ref} className="contours" aria-hidden="true" />;
}
