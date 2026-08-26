import { useEffect, useRef } from 'react';

import type { BeatComponentProps } from '../../core/orchestrator/beat';
import { stateAt, toCss } from './config';
import { PresenceNames } from './PresenceNames';

/**
 * Static tier — the same trajectories, without WebGL.
 *
 * Two point-lights still travel their authored paths. The bond is a thin
 * incomplete ellipse rather than a sampled loop. Gold is a single glint.
 */
export function TheBetweenStatic({ timeline }: BeatComponentProps) {
  const parsa = useRef<HTMLDivElement>(null);
  const saba = useRef<HTMLDivElement>(null);
  const bond = useRef<HTMLDivElement>(null);
  const glint = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const p = parsa.current;
    const s = saba.current;
    const b = bond.current;
    const g = glint.current;
    if (!p || !s || !b || !g) return;

    return timeline.subscribe(({ progress, awakened }) => {
      if (!awakened) {
        p.style.opacity = '0';
        s.style.opacity = '0';
        b.style.opacity = '0';
        g.style.opacity = '0';
        return;
      }

      const state = stateAt(progress);
      const parsaCss = toCss(state.parsa.pos);
      const sabaCss = toCss(state.saba.pos);
      const goldCss = toCss(state.goldPos);

      p.style.left = parsaCss.left;
      p.style.top = parsaCss.top;
      p.style.opacity = (state.fade * state.parsa.bright).toFixed(3);
      p.style.transform = `translate(-50%, -50%) scale(${(0.55 + state.parsa.size * 28).toFixed(3)})`;

      s.style.left = sabaCss.left;
      s.style.top = sabaCss.top;
      s.style.opacity = (state.fade * state.saba.bright).toFixed(3);
      s.style.transform = `translate(-50%, -50%) scale(${(0.55 + state.saba.size * 28).toFixed(3)})`;

      b.style.opacity = (state.bondLen > 2 ? state.fade * 0.45 : 0).toFixed(3);
      g.style.left = goldCss.left;
      g.style.top = goldCss.top;
      g.style.opacity = (state.gold * state.fade).toFixed(3);
    });
  }, [timeline]);

  return (
    <div className="between between--static">
      <div className="static-field" aria-hidden="true">
        <div className="static-bond-orbit" ref={bond} />
        <div className="static-point static-point--parsa" ref={parsa} />
        <div className="static-point static-point--saba" ref={saba} />
        <div className="static-glint" ref={glint} />
      </div>
      <PresenceNames timeline={timeline} />
    </div>
  );
}
