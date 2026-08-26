import { useEffect, useRef } from 'react';

import type { Timeline } from '../../core/orchestrator/timeline';
import { stateAt, toCss } from './config';
import { PRESENCE_NAMES } from './copy';

/**
 * The two names, in the DOM, after the visual event.
 *
 * They follow the lights. They are not a heading over an animation, and they
 * carry no gold glow — gold belongs to the bond, which has already happened.
 */
export function PresenceNames({ timeline }: { timeline: Timeline }) {
  const parsaRef = useRef<HTMLSpanElement>(null);
  const sabaRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const parsaEl = parsaRef.current;
    const sabaEl = sabaRef.current;
    if (!parsaEl || !sabaEl) return;

    return timeline.subscribe(({ progress, awakened }) => {
      if (!awakened) {
        parsaEl.style.opacity = '0';
        sabaEl.style.opacity = '0';
        return;
      }

      const state = stateAt(progress);
      const parsaCss = toCss(state.parsa.pos);
      const sabaCss = toCss(state.saba.pos);

      parsaEl.style.left = parsaCss.left;
      parsaEl.style.top = parsaCss.top;
      parsaEl.style.opacity = state.names.toFixed(3);
      parsaEl.style.visibility = state.names < 0.01 ? 'hidden' : 'visible';

      sabaEl.style.left = sabaCss.left;
      sabaEl.style.top = sabaCss.top;
      sabaEl.style.opacity = state.names.toFixed(3);
      sabaEl.style.visibility = state.names < 0.01 ? 'hidden' : 'visible';
    });
  }, [timeline]);

  return (
    <div className="names" aria-hidden="false">
      <span className="names__mark names__mark--parsa" ref={parsaRef}>
        {PRESENCE_NAMES.parsa}
      </span>
      <span className="names__mark names__mark--saba" ref={sabaRef}>
        {PRESENCE_NAMES.saba}
      </span>
    </div>
  );
}
