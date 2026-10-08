/*
 * Ported from the live oceancrest.ai (contours.js, the hero "survey chart") on 2026-10-06,
 * then to TypeScript for the Next.js app. The <Contours> component starts and stops it.
 * Ink colours are options:
 *   navy  = the original: navy hairlines with one blue isoline (for white or pale grounds)
 *   white = white hairlines with one lagoon isoline (for laying over the painted coast)
 *   sea   = deep-sea hairlines with one lagoon isoline (for pastel tinted sections)
 * The canvas fills its positioned parent; give it class="contours".
 *
 * OceanCrest AI — hero survey-chart engine.
 * Draws drifting bathymetric isolines: marching squares over hash-based
 * value noise, quantized to LEVELS depth thresholds. Navy hairlines on
 * paper, with one emphasized blue isoline. The field drifts slowly in
 * time; the frame steps at ~20fps while the page runs at full rate.
 * Pauses offscreen and in hidden tabs. Under reduced motion, renders a
 * single static frame.
 */
const CELL_PX = 16;          // field sample spacing, CSS px
const STEP_MS = 50;          // ~20fps field updates
const LEVELS = [0.34, 0.42, 0.48, 0.53, 0.58, 0.64, 0.72];
const BLUE_LEVEL = 3;        // index into LEVELS drawn in blue
const NOISE_SCALE = 0.055;   // field frequency per grid unit
const DRIFT_X = 0.012;       // field translation per second
const DRIFT_Y = 0.007;
const RIPPLE_R = 7;          // pointer perturbation radius, grid units
const RIPPLE_AMP = 0.045;
const INK_NAVY = "rgba(22, 32, 46, 0.16)";
const INK_BLUE = "rgba(37, 99, 235, 0.38)";
const SEED = 7;

export type ContourInk = "navy" | "white" | "sea";

export interface ContourOptions {
  reduced?: boolean;
  ink?: string;
  accent?: string;
  width?: number;
}

export interface ContourEngine {
  resize(): void;
  pause(): void;
  resume(): void;
  destroy(): void;
}

export const INKS: Record<ContourInk, Omit<ContourOptions, "reduced">> = {
  navy: { ink: INK_NAVY, accent: INK_BLUE },
  white: { ink: "rgba(255, 255, 255, 0.42)", accent: "rgba(255, 255, 255, 0.85)", width: 1.2 },
  sea: { ink: "rgba(31, 78, 112, 0.13)", accent: "rgba(74, 143, 184, 0.5)" }
};

function hash(ix: number, iy: number): number {
  let h = (ix * 374761393 + iy * 668265263 + SEED * 144665) | 0;
  h = ((h ^ (h >>> 13)) * 1274126177) | 0;
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

function smooth(t: number): number { return t * t * (3 - 2 * t); }

function noise(x: number, y: number): number {
  const ix = Math.floor(x), iy = Math.floor(y);
  const fx = smooth(x - ix), fy = smooth(y - iy);
  const a = hash(ix, iy), b = hash(ix + 1, iy);
  const c = hash(ix, iy + 1), d = hash(ix + 1, iy + 1);
  return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy;
}

export function init(canvas: HTMLCanvasElement, opts: ContourOptions = {}): ContourEngine | null {
  const ctx = canvas.getContext("2d");
  const host = canvas.parentElement;
  if (!ctx || !host) return null;
  const reduced = !!opts.reduced;
  const finePointer = matchMedia("(pointer: fine)").matches;

  let gw = 0, gh = 0, cw = 0, ch = 0, dpr = 1;
  let field: Float32Array | null = null;
  let t = 0;                 // drift time, seconds
  let acc = 0;               // ms accumulator for stepping
  let running = false;
  let destroyed = false;
  let inView = true;
  const mouse = { x: -1e6, y: -1e6 };

  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    dpr = Math.min(2, window.devicePixelRatio || 1);
    cw = w; ch = h;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    gw = Math.ceil(w / CELL_PX) + 1;
    gh = Math.ceil(h / CELL_PX) + 1;
    field = new Float32Array(gw * gh);
    render();
  }

  function sample(gx: number, gy: number): number {
    let v =
      noise(gx * NOISE_SCALE * CELL_PX * 0.06 + t * DRIFT_X * 60, gy * NOISE_SCALE * CELL_PX * 0.06 + t * DRIFT_Y * 60) * 0.6 +
      noise(gx * NOISE_SCALE * CELL_PX * 0.12 + t * DRIFT_X * 96, gy * NOISE_SCALE * CELL_PX * 0.12 + t * DRIFT_Y * 96) * 0.28 +
      noise(gx * NOISE_SCALE * CELL_PX * 0.24 + t * DRIFT_X * 150, gy * NOISE_SCALE * CELL_PX * 0.24 + t * DRIFT_Y * 150) * 0.12;
    if (finePointer && mouse.x > -1e5) {
      const dx = gx - mouse.x, dy = gy - mouse.y;
      const d2 = dx * dx + dy * dy;
      if (d2 < RIPPLE_R * RIPPLE_R) {
        v += RIPPLE_AMP * (1 - Math.sqrt(d2) / RIPPLE_R);
      }
    }
    return v;
  }

  function computeField(fl: Float32Array) {
    let i = 0;
    for (let gy = 0; gy < gh; gy++) {
      for (let gx = 0; gx < gw; gx++) {
        fl[i++] = sample(gx, gy);
      }
    }
  }

  /* Marching squares: stroke every segment of one iso level. */
  function traceLevel(c: CanvasRenderingContext2D, fl: Float32Array, level: number) {
    c.beginPath();
    for (let gy = 0; gy < gh - 1; gy++) {
      const row = gy * gw, next = row + gw;
      const y0 = gy * CELL_PX, y1 = y0 + CELL_PX;
      for (let gx = 0; gx < gw - 1; gx++) {
        const tl = fl[row + gx], tr = fl[row + gx + 1];
        const bl = fl[next + gx], br = fl[next + gx + 1];
        let code = 0;
        if (tl > level) code |= 8;
        if (tr > level) code |= 4;
        if (br > level) code |= 2;
        if (bl > level) code |= 1;
        if (code === 0 || code === 15) continue;
        const x0 = gx * CELL_PX, x1 = x0 + CELL_PX;
        // interpolated edge crossings
        const top = x0 + CELL_PX * ((level - tl) / (tr - tl));
        const bottom = x0 + CELL_PX * ((level - bl) / (br - bl));
        const left = y0 + CELL_PX * ((level - tl) / (bl - tl));
        const right = y0 + CELL_PX * ((level - tr) / (br - tr));
        switch (code) {
          case 1: case 14: c.moveTo(x0, left); c.lineTo(bottom, y1); break;
          case 2: case 13: c.moveTo(bottom, y1); c.lineTo(x1, right); break;
          case 3: case 12: c.moveTo(x0, left); c.lineTo(x1, right); break;
          case 4: case 11: c.moveTo(top, y0); c.lineTo(x1, right); break;
          case 5:  c.moveTo(x0, left); c.lineTo(top, y0); c.moveTo(bottom, y1); c.lineTo(x1, right); break;
          case 6: case 9: c.moveTo(top, y0); c.lineTo(bottom, y1); break;
          case 7: case 8: c.moveTo(x0, left); c.lineTo(top, y0); break;
          case 10: c.moveTo(top, y0); c.lineTo(x1, right); c.moveTo(x0, left); c.lineTo(bottom, y1); break;
        }
      }
    }
    c.stroke();
  }

  const inkLine = opts.ink || INK_NAVY, inkAccent = opts.accent || INK_BLUE;
  function render() {
    if (!field || !ctx) return;
    computeField(field);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cw, ch);
    ctx.lineWidth = opts.width || 1;
    for (let li = 0; li < LEVELS.length; li++) {
      ctx.strokeStyle = li === BLUE_LEVEL ? inkAccent : inkLine;
      traceLevel(ctx, field, LEVELS[li]);
    }
  }

  function tick(deltaMS: number) {
    if (!running) return;
    acc += deltaMS;
    if (acc < STEP_MS) return;
    t += acc / 1000;
    acc = 0;
    render();
  }

  // One rAF loop per canvas (the live site's optional gsap ticker isn't loaded here).
  let rafId = 0, lastRaf = 0;
  function rafLoop(now: number) {
    if (destroyed) return;
    tick(now - (lastRaf || now));
    lastRaf = now;
    rafId = requestAnimationFrame(rafLoop);
  }

  function updateRunning() {
    const should = !reduced && !destroyed && inView && !document.hidden;
    if (should === running) return;
    running = should;
    canvas.style.willChange = running ? "contents" : "";
  }

  const io = new IntersectionObserver((entries) => {
    inView = entries[0].isIntersecting;
    updateRunning();
  });
  io.observe(canvas);

  const onVis = () => updateRunning();
  document.addEventListener("visibilitychange", onVis);

  const onPointer = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect();
    mouse.x = (e.clientX - r.left) / CELL_PX;
    mouse.y = (e.clientY - r.top) / CELL_PX;
  };
  const onPointerLeave = () => { mouse.x = -1e6; mouse.y = -1e6; };
  if (finePointer && !reduced) {
    host.addEventListener("pointermove", onPointer);
    host.addEventListener("pointerleave", onPointerLeave);
  }

  let resizeTimer: ReturnType<typeof setTimeout> | undefined;
  const ro = new ResizeObserver(() => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 120);
  });
  ro.observe(host);

  resize();
  if (!reduced) {
    rafId = requestAnimationFrame(rafLoop);
    updateRunning();
  }

  return {
    resize,
    pause() { running = false; },
    resume() { updateRunning(); },
    destroy() {
      destroyed = true;
      running = false;
      io.disconnect();
      ro.disconnect();
      clearTimeout(resizeTimer);
      document.removeEventListener("visibilitychange", onVis);
      if (finePointer && !reduced) {
        host.removeEventListener("pointermove", onPointer);
        host.removeEventListener("pointerleave", onPointerLeave);
      }
      if (rafId) cancelAnimationFrame(rafId);
    },
  };
}

/** Start the engine on a canvas with one of the named inks, honouring reduced motion. */
export function start(canvas: HTMLCanvasElement, ink: ContourInk = "navy"): ContourEngine | null {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  return init(canvas, { reduced, ...(INKS[ink] || INKS.navy) });
}
