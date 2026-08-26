import { useEffect, useRef } from 'react';

import type { BeatComponentProps } from '../../core/orchestrator/beat';
import { envelopeAt } from './config';
import { ThesisText } from './ThesisText';

/**
 * Static tier — the same beat with no WebGL at all.
 *
 * It is not a placeholder. Two presences still approach and stop, gold still appears
 * only between them and only once they are close, the thesis is the same text on the
 * same timing, and the bond still resolves in a single off-centre flash. What is lost
 * is the phenomenon: no fluid turbulence in Saba, and the bond is a flash rather than
 * two tangential arcs. Only composited properties are written, so this path also
 * carries devices that could not survive the shader.
 */
export function TheBetweenStatic({ timeline }: BeatComponentProps) {
  const parsa = useRef<HTMLDivElement>(null);
  const saba = useRef<HTMLDivElement>(null);
  const aura = useRef<HTMLDivElement>(null);
  const seam = useRef<HTMLDivElement>(null);
  const bond = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = {
      parsa: parsa.current,
      saba: saba.current,
      aura: aura.current,
      seam: seam.current,
      bond: bond.current,
    };
    if (Object.values(elements).some((element) => !element)) return;

    return timeline.subscribe(({ progress }) => {
      const envelope = envelopeAt(progress);
      const travel = envelope.approach * 24;

      elements.parsa!.style.transform = `translate3d(0, ${travel.toFixed(2)}%, 0)`;
      elements.parsa!.style.opacity = (envelope.fade * envelope.presence).toFixed(3);

      elements.saba!.style.transform = `translate3d(0, ${(-travel).toFixed(2)}%, 0)`;
      elements.saba!.style.opacity = (envelope.fade * envelope.presence).toFixed(3);

      elements.aura!.style.opacity = (envelope.goldAura * envelope.fade * 0.3).toFixed(3);
      elements.seam!.style.opacity = (envelope.goldSeam * envelope.fade * 0.85).toFixed(3);
      elements.seam!.style.transform = `scaleX(${(0.35 + 0.65 * envelope.goldSeam).toFixed(3)})`;
      elements.bond!.style.opacity = (envelope.flash * envelope.fade).toFixed(3);
    });
  }, [timeline]);

  return (
    <div className="between between--static">
      <div className="static-field" aria-hidden="true">
        <div className="static-presence static-presence--parsa" ref={parsa} />
        <div className="static-presence static-presence--saba" ref={saba} />
        <div className="static-aura" ref={aura} />
        <div className="static-seam" ref={seam} />
        <div className="static-bond" ref={bond} />
      </div>
      <ThesisText timeline={timeline} />
    </div>
  );
}
