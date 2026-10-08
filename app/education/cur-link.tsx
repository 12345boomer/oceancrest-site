"use client";
/*
  A link into the "Module by module" section that also opens that course's tab. The tabs are a
  global [data-switch] switch, so this presses its button rather than holding any state itself.
*/
import type { ReactNode } from "react";

export default function CurLink({ open, className, children }: { open: string; className?: string; children: ReactNode }) {
  return (
    <a className={className} href="#curriculum" data-open={open}
      onClick={() => document.querySelector<HTMLButtonElement>(`#cur-switch button[data-val="${open}"]`)?.click()}>
      {children}
    </a>
  );
}
