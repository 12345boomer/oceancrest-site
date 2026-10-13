/*
  The photo library behind <Coast> (components/Coast.tsx). Every page uses realistic ocean photography
  (Ben, 2026-10-13: one consistent theme, no painted art). A Coast with its own `image` shows that;
  otherwise it takes a photo from the pool for its palette, chosen by its seed, so the same spot always
  shows the same picture. All are Higgsfield stills in one soft, high-key style; see CLAUDE.md.
*/

/** Colour family of a spot: technical = cool blues, mindset = warm dawn, dusk = closing bands, hero = bright mix. */
export type Palette = "hero" | "technical" | "mindset" | "dusk";
/** Box proportions (cards, wide bands, tall panels, page heroes). Photos crop to fit with object-fit: cover. */
export type Size = "hero" | "wide" | "card" | "tall";
/** Kept so older call sites still type-check; photos are chosen by palette and seed. */
export type Scene = "cove" | "headland" | "beach" | "open";

const at = (names: string[]) => names.map((n) => `/assets/img/sea/${n}.jpg`);

const COOL = at(["lagoon", "underwater-light", "depth-gradient", "reef-break", "open-swell", "reef-lines", "deep-sail", "wave-face"]);
const WARM = at(["sunrise-shore", "sunrise-foam", "rock-pool", "sunrise-beach", "foam-macro", "sun-path", "backlit-lip", "wet-sand", "dawn-sail"]);
const DUSK = at(["dusk-wave", "dusk-sail", "twilight-rocks", "dusk-shoreline"]);
// Bright and light enough to sit behind text: no deep-blue or dark shots.
const BRIGHT = at(["lagoon", "depth-gradient", "reef-lines", "wave-face", "sunrise-shore", "sunrise-beach", "sun-path", "wet-sand", "dawn-sail"]);

const POOLS: Record<Palette, string[]> = { technical: COOL, mindset: WARM, dusk: DUSK, hero: BRIGHT };

// FNV-1a: a small, stable string hash, so a seed always maps to the same photo.
function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

/** The library photo for a spot: same palette and seed, same picture. */
export function seaPhoto(palette: Palette, seed: string): string {
  const pool = POOLS[palette] || BRIGHT;
  return pool[hash(seed || "oceancrest") % pool.length];
}
