"use client";
/*
  <Enhancers />: mounted once in the root layout. The small page interactions from site.js:
  reveal-on-scroll, animated counters and bars, marquee pause, segmented switches, the hero
  word rotator and the course line. They run over the DOM after each route renders, and the
  previous route's observers, listeners and timers are torn down first.
*/
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { playSound } from "@/lib/sea";

type Cleanup = () => void;
const REVEAL = ".reveal, [data-count], .bar[data-to]";

function prefersReduced(): boolean { return !!window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches; }

// Reveal on scroll, and count numbers up when they first appear: <b data-count="80" data-suffix="%+">
function reveal(reduce: boolean): Cleanup {
  let alive = true;
  function show(el: Element) {
    el.classList.add("in");
    if (el.hasAttribute("data-count")) {
      const to = parseFloat(el.getAttribute("data-count") || "0"), pre = el.getAttribute("data-prefix") || "", suf = el.getAttribute("data-suffix") || "";
      const dec = (String(to).split(".")[1] || "").length;
      if (reduce) { el.textContent = pre + to.toFixed(dec) + suf; return; }
      const t0 = performance.now(), dur = 1400;
      const tick = (t: number) => {
        if (!alive) return;
        const p = Math.min(1, (t - t0) / dur), v = to * (1 - Math.pow(1 - p, 3));
        el.textContent = pre + v.toFixed(dec) + suf;
        if (p < 1) requestAnimationFrame(tick);
      };
      tick(t0);
    }
    if (el.matches(".bar[data-to]")) { const i = el.querySelector("i"); if (i) i.style.width = el.getAttribute("data-to") + "%"; }
  }

  const seen = new WeakSet<Element>();
  let io: IntersectionObserver | null = null;
  if ("IntersectionObserver" in window) {
    io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { show(e.target); io?.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
  }
  function watch(el: Element) {
    if (seen.has(el)) return;
    seen.add(el);
    if (io) io.observe(el); else show(el);
  }
  document.querySelectorAll(REVEAL).forEach(watch);

  // Some pages render cards after mount: pick those up too.
  const mo = new MutationObserver((records) => {
    records.forEach((r) => r.addedNodes.forEach((n) => {
      if (!(n instanceof Element)) return;
      if (n.matches(REVEAL)) watch(n);
      n.querySelectorAll(REVEAL).forEach(watch);
    }));
  });
  mo.observe(document.body, { childList: true, subtree: true });

  return () => { alive = false; io?.disconnect(); mo.disconnect(); };
}

// Marquee pause button: <div class="marquee"> ... <button class="marquee-toggle">
function marquees(): Cleanup {
  const offs: Cleanup[] = [];
  document.querySelectorAll(".marquee").forEach((m) => {
    const b = m.querySelector<HTMLElement>(".marquee-toggle") || (m.parentElement && m.parentElement.querySelector<HTMLElement>(".marquee-toggle"));
    if (!b) return;
    const onClick = () => {
      const p = m.classList.toggle("paused");
      b.textContent = p ? "Play" : "Pause";
      b.setAttribute("aria-pressed", String(p));
    };
    b.addEventListener("click", onClick);
    offs.push(() => b.removeEventListener("click", onClick));
  });
  return () => offs.forEach((off) => off());
}

// Segmented switch: <div class="switch" data-switch="name"><button data-val="a">...  and panels [data-panel="name:a"]
function switches(): Cleanup {
  const offs: Cleanup[] = [];
  document.querySelectorAll("[data-switch]").forEach((sw) => {
    const name = sw.getAttribute("data-switch") || "";
    const onClick = (e: Event) => {
      const b = e.target instanceof Element ? e.target.closest("button[data-val]") : null; if (!b) return;
      const v = b.getAttribute("data-val") || "";
      sw.querySelectorAll("button[data-val]").forEach((x) => { x.setAttribute("aria-selected", String(x === b)); });
      sw.setAttribute("data-on", v);
      document.querySelectorAll<HTMLElement>('[data-panel^="' + name + ':"]').forEach((p) => {
        const on = p.getAttribute("data-panel") === name + ":" + v;
        p.hidden = !on;
        if (on) p.querySelectorAll(".reveal").forEach((r) => { r.classList.add("in"); });
      });
    };
    sw.addEventListener("click", onClick);
    offs.push(() => sw.removeEventListener("click", onClick));
  });
  return () => offs.forEach((off) => off());
}

// Hero word rotator, ported from the live site: the highlighted word runs through the parts of a
// business we transform, then settles on the word in the markup. Wide screens only, once per page view.
function rotator(reduce: boolean): Cleanup {
  const rot = document.querySelector<HTMLElement>(".rotator"), slot = rot && rot.querySelector<HTMLElement>(".rotator-slot");
  if (!rot || !slot || reduce || !matchMedia("(min-width: 760px)").matches) return () => {};
  const finalWord = slot.textContent || "";
  const CANDIDATES = (rot.getAttribute("data-words") || "back office,forecasting,reporting,service desk,pipeline,scheduling,paperwork,quoting").split(",");
  const probe = document.createElement("span");
  probe.setAttribute("aria-hidden", "true");
  probe.style.cssText = "position:absolute;left:-9999px;top:0;visibility:hidden;white-space:nowrap;";
  rot.appendChild(probe);
  // Keep only words that fit the first line without rewrapping (as on the live site).
  const h = rot.closest("h1, h2") || rot.parentElement || rot;
  probe.textContent = "Your ,";
  const avail = h.clientWidth - probe.getBoundingClientRect().width - 8;
  const widths: number[] = [], words = CANDIDATES.filter((w) => {
    probe.textContent = w;
    const wd = probe.getBoundingClientRect().width;
    if (wd <= avail) { widths.push(wd); return true; }
    return false;
  });
  if (words.length < 3) { probe.remove(); return () => {}; }
  probe.textContent = finalWord; words.push(finalWord); widths.push(probe.getBoundingClientRect().width);

  let alive = true, i = 0;
  const timers = new Set<ReturnType<typeof setTimeout>>();
  const later = (fn: () => void, ms: number) => { const id = setTimeout(() => { timers.delete(id); if (alive) fn(); }, ms); timers.add(id); };
  function delay(n: number) { return Math.max(90, Math.round(620 * Math.pow(0.82, n))); }
  function swap() {
    if (!alive || !rot || !slot) return;
    if (document.hidden) { document.addEventListener("visibilitychange", swap, { once: true }); return; }
    slot.textContent = words[i]; rot.style.width = widths[i] + "px";
    const d = delay(i);
    if (d > 180 && slot.animate) slot.animate([{ opacity: 0, transform: "translateY(0.25em)" }, { opacity: 1, transform: "none" }], { duration: Math.min(160, d - 20), easing: "cubic-bezier(0.23,1,0.32,1)" });
    if (d > 200) playSound("blip");
    i++;
    if (i < words.length) later(swap, d); else later(finish, 900);
  }
  function finish() {
    if (!rot) return;
    rot.classList.add("is-done"); rot.classList.remove("is-live");
    later(() => { rot.classList.remove("is-done"); rot.style.width = ""; probe.remove(); }, 380);
  }
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => {
    later(() => { rot.classList.add("is-live"); rot.style.width = widths[widths.length - 1] + "px"; later(swap, 60); }, 1500);
  });

  // Leaving mid-run: stop, and put the markup's word back.
  return () => {
    alive = false;
    timers.forEach((id) => clearTimeout(id));
    document.removeEventListener("visibilitychange", swap);
    if (i > 0 || rot.classList.contains("is-live")) slot.textContent = finalWord;
    rot.classList.remove("is-live", "is-done"); rot.style.width = ""; probe.remove();
  };
}

// Course line: each .course-rule draws down as its section scrolls through the viewport.
function courseLanes(reduce: boolean): Cleanup {
  const rules = Array.from(document.querySelectorAll<HTMLElement>(".course-rule"));
  if (!rules.length) return () => {};
  if (reduce) return () => {};
  let ticking = false, raf = 0;
  function update() {
    ticking = false;
    const vh = innerHeight;
    rules.forEach((r) => {
      const hostEl = r.parentElement?.parentElement;
      if (!hostEl) return;
      const host = hostEl.getBoundingClientRect();
      const start = vh * 0.75, end = vh * 0.55;
      const p = (start - host.top) / Math.max(1, host.height - (start - end));
      r.style.setProperty("--drawn", Math.max(0, Math.min(1, p)).toFixed(3));
    });
  }
  const onScroll = () => { if (!ticking) { ticking = true; raf = requestAnimationFrame(update); } };
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", update);
  update();
  return () => {
    removeEventListener("scroll", onScroll);
    removeEventListener("resize", update);
    cancelAnimationFrame(raf);
  };
}

export default function Enhancers() {
  const pathname = usePathname();
  useEffect(() => {
    let cleanups: Cleanup[] = [];
    // Wait a frame so the new route's DOM is in place before scanning it.
    const raf = requestAnimationFrame(() => {
      const reduce = prefersReduced();
      cleanups = [reveal(reduce), marquees(), switches(), rotator(reduce), courseLanes(reduce)];
    });
    return () => {
      cancelAnimationFrame(raf);
      cleanups.forEach((c) => c());
    };
  }, [pathname]);
  return null;
}
