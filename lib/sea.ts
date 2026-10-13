/*
  Sea: the touch layer. Ported from assets/js/sea.js (its sounds were removed on 2026-10-12, at Ben's request).
  - Ripples where you press, and a burst of light when something is finished.

  Hook for page markup:
    data-sparkle    also throw a burst of light on click

  Nothing runs at import: every browser API is touched only inside a call, so this is safe on the server.
*/

const isBrowser = typeof window !== "undefined";
function reduced(): boolean { return isBrowser && !!window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches; }

// ---- Ripples and light ----
const RIPPLE = ".btn, .cc, a.card, .chip, .chips button, .switch button, .seg button, .tabs button, .site-nav > a, .site-nav .dd > button, .dd-panel a, .final .alt a, .opt";
function ripple(el: Element, x: number, y: number) {
  if (reduced()) return;
  const b = el.getBoundingClientRect(), size = Math.max(b.width, b.height) * 2.2;
  const s = document.createElement("span");
  s.className = "ripple";
  s.style.width = s.style.height = size + "px";
  s.style.left = (x - b.left - size / 2) + "px";
  s.style.top = (y - b.top - size / 2) + "px";
  el.appendChild(s);
  setTimeout(() => { s.remove(); }, 700);
}

/** A burst of light from the centre of an element (for when something is finished). */
export function sparkle(el: Element) {
  if (!isBrowser || reduced()) return;
  const b = el.getBoundingClientRect(), cx = b.left + b.width / 2, cy = b.top + b.height / 2;
  const colors = ["#fde9b8", "#a7dbe2", "#ffffff", "#7fc4d8", "#f4b8a2"];
  for (let i = 0; i < 16; i++) {
    const p = document.createElement("i"), ang = Math.random() * Math.PI * 2, dist = 40 + Math.random() * 70;
    p.className = "spark";
    p.style.left = cx + "px"; p.style.top = cy + "px";
    p.style.background = colors[i % colors.length];
    p.style.setProperty("--dx", Math.cos(ang) * dist + "px");
    p.style.setProperty("--dy", Math.sin(ang) * dist - 20 + "px");
    p.style.animationDelay = (Math.random() * 0.08).toFixed(2) + "s";
    document.body.appendChild(p);
    setTimeout(() => { p.remove(); }, 1100);
  }
}

function pressed(target: Element, x: number, y: number, keyboard: boolean) {
  const el = target.closest(RIPPLE);
  if (!el) return;
  if (keyboard) { const b = el.getBoundingClientRect(); x = b.left + b.width / 2; y = b.top + b.height / 2; }
  ripple(el, x, y);
}

/** Install the document-level listeners: press ripples and click sparkles. Returns a cleanup that removes them. */
export function installSea(): () => void {
  if (!isBrowser) return () => {};
  const asEl = (t: EventTarget | null): Element | null => (t instanceof Element ? t : null);

  const onDown = (e: PointerEvent) => { const t = asEl(e.target); if (t && e.button === 0) pressed(t, e.clientX, e.clientY, false); };
  const onClick = (e: MouseEvent) => {
    const t = asEl(e.target); if (!t) return;
    if (e.detail === 0) pressed(t, 0, 0, true);
    const sp = t.closest("[data-sparkle]");
    if (sp) sparkle(sp);
  };

  document.addEventListener("pointerdown", onDown);
  document.addEventListener("click", onClick);
  return () => {
    document.removeEventListener("pointerdown", onDown);
    document.removeEventListener("click", onClick);
  };
}
