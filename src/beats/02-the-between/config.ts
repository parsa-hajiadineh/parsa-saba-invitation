/**
 * BEAT 2 — میانِ ما / The Between. Tuning constants and the beat's timeline.
 *
 * Everything about the pacing of this beat is here. The shader receives finished
 * envelope values rather than deriving them from progress, so this file is the
 * single place the moment is timed, and per-pixel work stays cheap.
 *
 * Spec: CREATIVE_LOCK.md §4, Beat 2.
 */

/**
 * Viewport heights of scroll the beat occupies, and how heavily the timeline lags
 * the finger. Together these two numbers are the pacing of the Signature Moment,
 * and they are the first thing to tune on a real phone: a flick covers far more
 * ground than a deliberate drag, so the drag is what makes a fast gesture resolve
 * slowly instead of skipping the moment.
 */
export const SCROLL_VIEWPORTS = 8.2;
export const SCROLL_SMOOTHING = 3.5;

/**
 * CREATIVE_LOCK.md §4 gives a provisional 28–35s for this beat, with the bond tail
 * as its final 8–10s. Holding both of those and still letting «ولی برای هم.» rest
 * on screen needs a little more room, so the estimate sits just past the band. §3
 * permits per-beat tuning while the 90–150s total holds, and it does. The number is
 * an estimate at a natural scroll rate, not a fixed duration — the guest decides.
 */
export const ESTIMATED_DURATION_SECONDS = 36;

/**
 * Half the vertical distance between the two presences, in units where the
 * viewport is 1.0 tall. NEAR is a floor, not a suggestion: the two presences
 * approach and stop. They never reach each other and they never merge (L-25).
 */
export const HALF_GAP_FAR = 0.46;
export const HALF_GAP_NEAR = 0.205;

/**
 * Phase boundaries in normalised beat progress.
 *
 * The order matters more than the numbers. Gold arrives as a brief, precise event —
 * a filament at the midline, at the exact moment the two presences stop closing —
 * and then softens into the broad field the thesis is read inside. The seam is gone
 * before the first line appears: a bright horizontal rule behind text reads as a
 * divider on a wedding card, which is the one thing this moment cannot be.
 */
const PHASE = {
  fadeIn: [0.0, 0.02],
  approach: [0.05, 0.36],
  seamIn: [0.275, 0.375],
  seamOut: [0.385, 0.445],
  auraIn: [0.365, 0.465],
  auraOut: [0.8, 0.885],
  tail: [0.785, 1.0],
  presenceDim: [0.785, 0.855],
  fadeOut: [0.965, 1.0],
} as const;

/** Where the bond flash sits inside the tail's own 0..1 progress. */
const FLASH = [0.5, 0.575, 0.6, 0.76] as const;

/** How far the presences dim during the bond tail, so the arcs can be read. */
const PRESENCE_TAIL_LEVEL = 0.4;

export interface BetweenEnvelope {
  /** 0 = far apart, 1 = at the closest they ever come. */
  approach: number;
  /** The thin gold filament at the midline. */
  goldSeam: number;
  /** The broad warm glow the thesis is read inside. */
  goldAura: number;
  /** Brightness multiplier for both presences. */
  presence: number;
  /** The bond tail's own 0..1 progress. */
  tail: number;
  /** The single controlled flash at the tangential touch. */
  flash: number;
  /** Master fade, covering entry and dissolve. */
  fade: number;
}

export function envelopeAt(progress: number): BetweenEnvelope {
  const approach = ease(span(progress, PHASE.approach));
  const tail = span(progress, PHASE.tail);

  return {
    approach,
    goldSeam: span(progress, PHASE.seamIn) * (1 - span(progress, PHASE.seamOut)),
    goldAura: span(progress, PHASE.auraIn) * (1 - span(progress, PHASE.auraOut)),
    presence: 1 - (1 - PRESENCE_TAIL_LEVEL) * span(progress, PHASE.presenceDim),
    tail,
    flash: span(tail, [FLASH[0], FLASH[1]]) * (1 - span(tail, [FLASH[2], FLASH[3]])),
    fade: span(progress, PHASE.fadeIn) * (1 - span(progress, PHASE.fadeOut)),
  };
}

function span(x: number, [a, b]: readonly [number, number]): number {
  const t = (x - a) / (b - a);
  return t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t);
}

function ease(x: number): number {
  return x * x * (3 - 2 * x);
}
