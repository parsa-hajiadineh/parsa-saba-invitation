/**
 * The core emotional thesis, as spoken by the couple.
 *
 * ⚠ PROVISIONAL WORDING. O-01 (final Persian wording and line breaks) is still OPEN
 * in CREATIVE_LOCK.md §9. The text below is quoted verbatim from CREATIVE_DNA.md §6
 * and is not to be paraphrased, translated, softened, or "improved" by an agent.
 * When O-01 is decided, this file is the only place that changes.
 *
 * The thesis is delivered as three successive reveals rather than one accumulating
 * block. The space between two presences that never merge is narrow by definition,
 * and five simultaneous lines would force them apart to make room for typography —
 * the composition would start serving the text instead of the other way round.
 */

export interface ThesisStage {
  lines: readonly string[];
  /** Beat progress at which the stage begins to appear. */
  from: number;
  /** Beat progress at which the stage has fully gone. */
  to: number;
}

export const THESIS_STAGES: readonly ThesisStage[] = [
  { lines: ['خیلی سخت بود،', 'خیلی سخت‌تر هم خواهد بود،'], from: 0.455, to: 0.585 },
  { lines: ['اما ما قوی‌تریم و مهربان‌تریم.'], from: 0.595, to: 0.68 },
  { lines: ['ما باهم،', 'ولی برای هم.'], from: 0.69, to: 0.815 },
];

/**
 * How far each line lags behind the one above it, in beat progress. Small on
 * purpose: a stage's lines must finish arriving well before the stage starts to
 * leave, or the closing couplet never stands complete.
 */
export const LINE_STAGGER = 0.014;

/** How much of a stage's window is spent fading in, and fading out. */
export const STAGE_IN = 0.028;
export const STAGE_OUT = 0.032;
