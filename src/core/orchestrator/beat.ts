/**
 * Beat module contract (TECHNICAL_ARCHITECTURE.md §4), reduced to what the
 * Signature prototype actually needs. It exists so Beats 1 and 3–7 can be added
 * without reworking the orchestrator, not as a general plugin framework.
 */

import type { ComponentType } from 'react';
import type { Tier } from '../performance/tier';
import type { Timeline } from './timeline';

export interface BeatComponentProps {
  tier: Tier;
  /**
   * The beat subscribes for per-frame progress. It never reads scroll position and
   * never causes a React render per frame.
   */
  timeline: Timeline;
}

export interface BeatModule {
  id: string;
  order: number;
  /** Seconds the beat is intended to take on the linear path. */
  estimatedDuration: number;
  /**
   * How many viewport heights of scroll the beat occupies. Scroll length is what
   * turns intent into pacing, so it lives with the beat, not in the orchestrator.
   */
  scrollViewports: number;
  Component: ComponentType<BeatComponentProps>;
  /**
   * The no-WebGL variant. Not optional: a beat without a working static variant is
   * a build failure, not a TODO (DEVELOPMENT_RULES.md §2).
   */
  StaticComponent: ComponentType<BeatComponentProps>;
}
