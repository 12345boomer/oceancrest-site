"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LOGIN_URL, MENUS, isExternal, type MenuItem } from "@/lib/site";

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
  const nav = useRef<HTMLElement>(null);
  const canHover = () => matchMedia("(hover:hover)").matches;

  // A new page closes whatever was open.
  useEffect(() => { setOpen(null); setMobile(false); }, [path]);

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
                onMouseEnter={() => { if (canHover()) setOpen(m.label); }}
                onMouseLeave={() => { if (canHover()) setOpen(null); }}>
                <button type="button" aria-expanded={isOpen} aria-haspopup="true"
                  onClick={(e) => { e.stopPropagation(); setOpen(isOpen ? null : m.label); }}>
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
          <a className="login" href={LOGIN_URL}>Log in</a>
          <Link className="btn ghost sm" href="/diagnostic">Take the diagnostic</Link>
          <Link className="btn primary sm" href="/book">Book now</Link>
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
        <a href={LOGIN_URL}>Log in</a>
        <div className="btns">
          <Link className="btn primary" href="/book">Book now</Link>
          <Link className="btn" href="/diagnostic">Take the diagnostic</Link>
        </div>
      </nav>
    </header>
  );
}
