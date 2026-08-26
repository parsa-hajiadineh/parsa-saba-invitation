/**
 * PROVISIONAL design tokens.
 *
 * O-11 (colour tokens, type scale, easing) and O-09 (typeface) are still OPEN in
 * CREATIVE_LOCK.md §9. Nothing here is locked. This module is the single place
 * every value is defined so that resolving O-11 / O-09 is a one-file change.
 *
 * Base obsidian follows the provisional value in CREATIVE_LOCK.md §8.3 (#0A0A0B).
 */

export interface Rgb {
  r: number;
  g: number;
  b: number;
}

const rgb = (r: number, g: number, b: number): Rgb => ({ r, g, b });

export const palette = {
  obsidian: rgb(0.039, 0.039, 0.043),

  /** Parsa — deep violet, controlled. Deep body / luminous nucleus. */
  parsaDeep: rgb(0.17, 0.06, 0.5),
  parsaCore: rgb(0.5, 0.36, 1.0),

  /** Saba — rose-pearl, fluid. Rose body / pearl nucleus. */
  sabaDeep: rgb(0.7, 0.2, 0.3),
  sabaCore: rgb(1.0, 0.78, 0.76),

  /** Gold — a reflected-metal ramp, never a flat yellow. */
  goldDeep: rgb(0.34, 0.18, 0.04),
  goldMid: rgb(0.85, 0.6, 0.22),
  goldHigh: rgb(1.0, 0.95, 0.81),
} as const;

export const asVec3 = (c: Rgb): [number, number, number] => [c.r, c.g, c.b];

export const css = {
  obsidian: '#0A0A0B',
  textPrimary: 'rgba(255, 246, 233, 0.94)',
  goldGlow: 'rgba(212, 160, 76, 0.30)',
  goldGlowFar: 'rgba(212, 160, 76, 0.15)',
} as const;

/** Motion: slow, 3–6s cycles, cubic ease in/out (CREATIVE_LOCK.md §8.3). */
export const motion = {
  easeCinematic: 'cubic-bezier(0.33, 0.0, 0.20, 1.0)',
  breathParsaSeconds: 3.9,
  breathSabaSeconds: 3.2,
} as const;
