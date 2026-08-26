import type { BeatModule } from '../../core/orchestrator/beat';
import { ESTIMATED_DURATION_SECONDS, SCROLL_VIEWPORTS } from './config';
import { TheBetween } from './TheBetween';
import { TheBetweenStatic } from './TheBetweenStatic';

export const theBetween: BeatModule = {
  id: 'the-between',
  order: 2,
  estimatedDuration: ESTIMATED_DURATION_SECONDS,
  scrollViewports: SCROLL_VIEWPORTS,
  Component: TheBetween,
  StaticComponent: TheBetweenStatic,
};
