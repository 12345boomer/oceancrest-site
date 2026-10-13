"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ACCOUNT_URL, ASSESS_LABEL, LOGIN_URL, MENUS, READINESS, isExternal, type MenuItem } from "@/lib/site";
import { readAccess } from "@/components/CourseAccess";

const Chev = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M3 4.5l3 3 3-3" /></svg>
);

// Internal links route client-side; links that leave the site open in a new tab.
function ItemLink({ item, className, children }: { item: MenuItem; className?: string; children: React.ReactNode }) {
  return isExternal(item.href)
    ? <a className={className} href={item.href} target="_blank" rel="noopener">{children}</a>
    : <Link className={className} href={item.href}>{children}</Link>;
}

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const nav = useRef<HTMLElement>(null);
  const canHover = () => matchMedia("(hover:hover)").matches;
  // Hover menus close after a short grace period, so a pointer that drifts off on its way to the panel doesn't lose it.
  const closeTimer = useRef<number | undefined>(undefined);
  const hoverOpen = (label: string) => { window.clearTimeout(closeTimer.current); if (canHover()) setOpen(label); };
  const hoverClose = () => { window.clearTimeout(closeTimer.current); if (canHover()) closeTimer.current = window.setTimeout(() => setOpen(null), 220); };

  // A new page closes whatever was open.
  useEffect(() => { setOpen(null); setMobile(false); setSignedIn(readAccess() !== "anon"); }, [path]);
  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const onClick = (e: MouseEvent) => { if (!(e.target as Element).closest?.(".dd")) setOpen(null); };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const btn = nav.current?.querySelector<HTMLButtonElement>(".dd.open > button");
      setOpen(null);
      btn?.focus();
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <header className={"site-head" + (scrolled ? " scrolled" : "")}>
      <a className="skip" href="#main">Skip to content</a>
      <div className="wrap">
        <Link className="logo" href="/" aria-label="OceanCrest AI home">
          <img src="/assets/img/logos/oceancrest-ai-lockup-rgb-fullcolor.svg" alt="OceanCrest AI" width={216} height={25} />
        </Link>
        <nav className="site-nav" aria-label="Main" ref={nav}>
          {MENUS.map((m) => {
            const isOpen = open === m.label;
            const cur = m.paths.some((p) => path === p || path.startsWith(p + "/"));
            return (
              <div key={m.label} className={"dd" + (cur ? " cur" : "") + (isOpen ? " open" : "")}
                onMouseEnter={() => hoverOpen(m.label)}
                onMouseLeave={hoverClose}>
                <button type="button" aria-expanded={isOpen} aria-haspopup="true"
                  onClick={(e) => {
                    e.stopPropagation();
                    // With a mouse, hovering already opened it: a click keeps it open instead of toggling it shut.
                    setOpen(isOpen && !(canHover() && e.detail > 0) ? null : m.label);
                  }}>
                  {m.label} <Chev />
                </button>
                <div className="dd-panel">
                  {m.items.map((it) => (
                    <ItemLink key={it.title} item={it}>
                      <b>{it.title}{isExternal(it.href) ? " ↗" : ""}</b><span>{it.note}</span>
                    </ItemLink>
                  ))}
                </div>
              </div>
            );
          })}
        </nav>
        <div className="head-actions">
          <Link className="login" href={signedIn ? ACCOUNT_URL : LOGIN_URL}>{signedIn ? "My account" : "Log in"}</Link>
          <a className="btn ghost sm" href={READINESS} target="_blank" rel="noopener">{ASSESS_LABEL}</a>
          <Link className="btn primary sm" href="/book">Book a meeting</Link>
          <button type="button" className="menu-btn" aria-expanded={mobile} aria-controls="mobile-nav" aria-label="Menu" onClick={() => setMobile(!mobile)}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M2 5h14M2 9h14M2 13h14" /></svg>
          </button>
        </div>
      </div>
      <nav className={"mobile-nav" + (mobile ? " open" : "")} id="mobile-nav" aria-label="Main">
        {MENUS.map((m) => (
          <div key={m.label} style={{ display: "contents" }}>
            <span className="mn-h">{m.label}</span>
            {m.items.map((it) => <ItemLink key={it.title} item={it} className="sub">{it.title}</ItemLink>)}
          </div>
        ))}
        <Link href={signedIn ? ACCOUNT_URL : LOGIN_URL}>{signedIn ? "My account" : "Log in"}</Link>
        <div className="btns">
          <Link className="btn primary" href="/book">Book a meeting</Link>
          <a className="btn" href={READINESS} target="_blank" rel="noopener">{ASSESS_LABEL} ↗</a>
        </div>
      </nav>
    </header>
  );
}
