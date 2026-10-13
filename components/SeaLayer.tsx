"use client";
/*
  <SeaLayer />: mounted once in the root layout. Installs the touch layer (lib/sea.ts):
  ripples where you press and sparkles on [data-sparkle]. Renders nothing.
*/
import { useEffect } from "react";
import { installSea } from "@/lib/sea";

export default function SeaLayer() {
  useEffect(() => installSea(), []);
  return null;
}
