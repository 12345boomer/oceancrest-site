/*
  Sea: the sound and touch layer. Ported from assets/js/sea.js.
  - Soft UI sounds, synthesised with Web Audio (no audio files): a water drop on press,
    a rising pentatonic note on filter chips, a chime when something is finished,
    a small wash when switching tabs, and an optional ambient sea.
  - Ripples where you press, and a burst of light when something is finished.
  - The sound control (components/SeaLayer.tsx) reads and sets the prefs here. Choices are remembered per browser.

  Hooks for page markup:
    data-sound="chime|wash|none"   override the default press sound
    data-sparkle                    also throw a burst of light on click

  Nothing runs at import: every browser API is touched only inside a call, so this is safe on the server.
*/

export type SoundName = "drop" | "note" | "blip" | "chime" | "wash";
export type PrefKey = "fx" | "sea";
export interface SeaPrefs { fx: boolean; sea: boolean }

const isBrowser = typeof window !== "undefined";
function reduced(): boolean { return isBrowser && !!window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches; }
function load(k: string, d: string): string { try { const v = localStorage.getItem(k); return v == null ? d : v; } catch { return d; } }
function save(k: string, v: string) { try { localStorage.setItem(k, v); } catch { /* storage blocked: the choice lasts this visit */ } }

// Read lazily: on the server there is no storage, and the defaults (sounds on, sea off) apply.
let prefs: SeaPrefs | null = null;
function P(): SeaPrefs {
  if (!prefs) prefs = isBrowser ? { fx: load("oc-sound", "on") === "on", sea: load("oc-sea", "off") === "on" } : { fx: true, sea: false };
  return prefs;
}
export function getPrefs(): SeaPrefs { return { ...P() }; }

let ctx: AudioContext | null = null, master: GainNode | null = null;
let seaNodes: { s: AudioBufferSourceNode; g: GainNode; lfo: OscillatorNode; lfo2: OscillatorNode } | null = null;

type AudioCtor = typeof AudioContext;
function audio(): AudioContext | null {
  if (!isBrowser) return null;
  if (!ctx) {
    const AC: AudioCtor | undefined = window.AudioContext || (window as Window & { webkitAudioContext?: AudioCtor }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain(); master.gain.value = 0.7;
    const comp = ctx.createDynamicsCompressor();
    master.connect(comp); comp.connect(ctx.destination);
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function tone(freq: number, start: number, dur: number, gain: number, type?: OscillatorType, glideTo?: number) {
  const a = audio(); if (!a || !master) return;
  const o = a.createOscillator(), g = a.createGain(), t = a.currentTime + start;
  o.type = type || "sine";
  o.frequency.setValueAtTime(freq, t);
  if (glideTo) o.frequency.exponentialRampToValueAtTime(glideTo, t + Math.min(dur, 0.12));
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(gain, t + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g); g.connect(master);
  o.start(t); o.stop(t + dur + 0.05);
}

let noiseBuf: AudioBuffer | null = null;
function noise(): AudioBufferSourceNode | null {
  const a = audio(); if (!a) return null;
  if (!noiseBuf) {
    noiseBuf = a.createBuffer(1, a.sampleRate * 4, a.sampleRate);
    const d = noiseBuf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < d.length; i++) { const w = Math.random() * 2 - 1; last = (last + 0.02 * w) / 1.02; d[i] = last * 3.5; }
  }
  const s = a.createBufferSource(); s.buffer = noiseBuf; return s;
}

const PENTA = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66, 1318.51];
const S: Record<SoundName, (arg?: number) => void> = {
  drop() {
    const f0 = 480 + Math.random() * 120;
    tone(f0 * 2, 0, 0.22, 0.09, "sine", f0 * 0.85);
    tone(f0 * 3.01, 0.01, 0.12, 0.018, "sine", f0 * 1.6);
  },
  note(i = 0) {
    const f0 = PENTA[i % PENTA.length];
    tone(f0, 0, 0.5, 0.06, "sine");
    tone(f0 * 2, 0, 0.25, 0.012, "triangle");
  },
  blip() { tone(1400, 0, 0.06, 0.016, "sine", 1100); },
  chime() {
    [0, 2, 4, 5].forEach((n, i) => { tone(PENTA[n], i * 0.075, 1.4, 0.055, "sine"); tone(PENTA[n] * 2, i * 0.075, 0.6, 0.01, "triangle"); });
  },
  wash() {
    const a = audio(), s = noise(); if (!a || !s || !master) return;
    const bp = a.createBiquadFilter(), g = a.createGain(), t = a.currentTime;
    bp.type = "bandpass"; bp.Q.value = 0.7;
    bp.frequency.setValueAtTime(300, t); bp.frequency.exponentialRampToValueAtTime(1500, t + 0.35); bp.frequency.exponentialRampToValueAtTime(400, t + 0.9);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.12, t + 0.3); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.95);
    s.connect(bp); bp.connect(g); g.connect(master); s.start(t, Math.random() * 2); s.stop(t + 1);
  }
};
function isSound(n: string): n is SoundName { return Object.prototype.hasOwnProperty.call(S, n); }

/** Play a UI sound, if interface sounds are on. `arg` is the note index for "note". */
export function playSound(name: SoundName, arg?: number) { if (isBrowser && P().fx && S[name]) S[name](arg); }

// Ambient sea: brown noise through a low-pass, with slow swells like waves on a beach.
function seaOn() {
  const a = audio(), s = noise(); if (!a || !s || !master || seaNodes) return;
  s.loop = true;
  const lp = a.createBiquadFilter(), g = a.createGain(), lfo = a.createOscillator(), depth = a.createGain(), lfo2 = a.createOscillator(), depth2 = a.createGain();
  lp.type = "lowpass"; lp.frequency.value = 700;
  g.gain.value = 0.0001; g.gain.setTargetAtTime(0.11, a.currentTime, 1.2);
  lfo.frequency.value = 0.11; depth.gain.value = 0.07; lfo.connect(depth); depth.connect(g.gain);
  lfo2.frequency.value = 0.07; depth2.gain.value = 260; lfo2.connect(depth2); depth2.connect(lp.frequency);
  s.connect(lp); lp.connect(g); g.connect(master);
  s.start(); lfo.start(); lfo2.start();
  seaNodes = { s, g, lfo, lfo2 };
}
function seaOff() {
  if (!seaNodes || !ctx) return;
  const n = seaNodes; seaNodes = null;
  n.g.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.4);
  setTimeout(() => { try { n.s.stop(); n.lfo.stop(); n.lfo2.stop(); } catch { /* already stopped */ } }, 1600);
}

/** Set a pref from the sound control: remembers it, and starts or stops sound to match. */
export function setPref(k: PrefKey, on: boolean): SeaPrefs {
  const p = P();
  p[k] = on;
  save(k === "fx" ? "oc-sound" : "oc-sea", on ? "on" : "off");
  if (k === "fx" && p.fx) { audio(); S.drop(); }
  if (k === "sea") { if (p.sea) seaOn(); else seaOff(); }
  return getPrefs();
}

// ---- Ripples and light ----
const RIPPLE = ".btn, .cc, a.card, .chip, .chips button, .switch button, .seg button, .tabs button, .site-nav > a, .site-nav .dd > button, .dd-panel a, .final .alt a, .opt, .soundbar button";
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

function soundFor(el: Element): string {
  const explicit = el.closest("[data-sound]");
  if (explicit) return explicit.getAttribute("data-sound") || "";
  if (el.closest(".chips button, .finder .chip, .chip")) return "note";
  if (el.closest(".tabs button, .seg button, .switch button")) return "wash";
  if (el.closest(".opt")) return "note";
  return "drop";
}
function pressed(target: Element, x: number, y: number, keyboard: boolean) {
  const el = target.closest(RIPPLE + ", a, button, summary");
  if (!el || el.closest(".soundbar")) return;
  const kind = soundFor(el);
  if (kind === "note") {
    const group = el.parentNode ? Array.prototype.indexOf.call(el.parentNode.children, el) : 0;
    playSound("note", group);
  } else if (kind === "chime") {
    playSound("chime");
  } else if (kind !== "none" && isSound(kind)) {
    playSound(kind);
  }
  if (el.matches(RIPPLE)) {
    if (keyboard) { const b = el.getBoundingClientRect(); x = b.left + b.width / 2; y = b.top + b.height / 2; }
    ripple(el, x, y);
  }
}

/**
 * Install the document-level listeners: press sounds and ripples, click sparkles,
 * the hover blip on course cards, and the first gesture that unlocks audio.
 * Returns a cleanup that removes them all.
 */
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
  let lastBlip = 0;
  const onOver = (e: PointerEvent) => {
    if (e.pointerType !== "mouse" || !ctx) return;
    const card = asEl(e.target)?.closest(".cc");
    const rel = e.relatedTarget instanceof Node ? e.relatedTarget : null;
    if (!card || card.contains(rel)) return;
    const now = Date.now(); if (now - lastBlip < 90) return; lastBlip = now;
    playSound("blip");
  };

  // Browsers only allow audio after a gesture: resume the sea on the first one.
  let gestured = false;
  const firstGesture = () => {
    if (gestured) return;
    gestured = true;
    document.removeEventListener("pointerdown", firstGesture, true);
    document.removeEventListener("keydown", firstGesture, true);
    const p = P();
    if (p.fx || p.sea) audio();
    if (p.sea) seaOn();
  };

  document.addEventListener("pointerdown", onDown);
  document.addEventListener("click", onClick);
  document.addEventListener("pointerover", onOver);
  document.addEventListener("pointerdown", firstGesture, true);
  document.addEventListener("keydown", firstGesture, true);
  return () => {
    document.removeEventListener("pointerdown", onDown);
    document.removeEventListener("click", onClick);
    document.removeEventListener("pointerover", onOver);
    document.removeEventListener("pointerdown", firstGesture, true);
    document.removeEventListener("keydown", firstGesture, true);
  };
}
