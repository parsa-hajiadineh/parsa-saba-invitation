import type { BeatModule } from '../core/orchestrator/beat';
import { theBetween } from './02-the-between';

/**
 * The experience is this array, in this order. Reordering the piece means
 * reordering here and nothing else (TECHNICAL_ARCHITECTURE.md §4).
 *
 * Only the Signature Moment exists so far. Beats 1 and 3–7 are deliberately absent.
 */
export const BEATS: readonly BeatModule[] = [theBetween];
