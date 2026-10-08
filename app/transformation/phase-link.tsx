"use client";
/*
  The three "you hold" links in the hero: each jumps to #phases and opens the matching phase tab.
  The tabs are a global [data-switch] switch, so this presses its button.
*/
import type { ReactNode } from "react";

export default function PhaseLink({ phase, children }: { phase: string; children: ReactNode }) {
  return (
    <a href="#phases" data-phase={phase}
      onClick={() => document.querySelector<HTMLButtonElement>(`[data-switch="phase"] button[data-val="${phase}"]`)?.click()}>
      {children}
    </a>
  );
}
