import { useEffect, useRef, useState } from 'react';

import type { BeatComponentProps } from '../../core/orchestrator/beat';
import { asVec3, palette } from '../../core/tokens/tokens';
import { createFullscreenRenderer } from '../../webgl/core/fullscreenRenderer';
import { HALF_GAP_FAR, HALF_GAP_NEAR, envelopeAt } from './config';
import { TheBetweenStatic } from './TheBetweenStatic';
import { ThesisText } from './ThesisText';
import fragmentSource from './shaders/between.frag?raw';
import vertexSource from './shaders/fullscreen.vert?raw';

/** Frame time above which the session is genuinely struggling, in milliseconds. */
const STRUGGLE_MS = 24;
const WATCHDOG_WINDOW = 60;
const MAX_DPR_STEPS = 2;

export function TheBetween({ tier, timeline }: BeatComponentProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [glFailed, setGlFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = createFullscreenRenderer(canvas, vertexSource, fragmentSource, () =>
      setGlFailed(true),
    );
    if (!renderer) {
      setGlFailed(true);
      return;
    }

    let dpr = tier === 'full' ? Math.min(window.devicePixelRatio || 1, 1.75) : 1;
    let dprSteps = 0;
    let frames = 0;
    let accumulated = 0;

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      renderer.resize(width, height, dpr);
    };
    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    const uniforms: Record<string, number | readonly number[]> = {
      uResolution: renderer.drawingBufferSize,
      uTime: 0,
      uApproach: 0,
      uGoldSeam: 0,
      uGoldAura: 0,
      uPresence: 1,
      uTail: 0,
      uFlash: 0,
      uFade: 0,
      uStillness: 0,
      uQuality: tier === 'full' ? 1 : 0,
      uHalfGapFar: HALF_GAP_FAR,
      uHalfGapNear: HALF_GAP_NEAR,
      uObsidian: asVec3(palette.obsidian),
      uParsaDeep: asVec3(palette.parsaDeep),
      uParsaCore: asVec3(palette.parsaCore),
      uSabaDeep: asVec3(palette.sabaDeep),
      uSabaCore: asVec3(palette.sabaCore),
      uGoldDeep: asVec3(palette.goldDeep),
      uGoldMid: asVec3(palette.goldMid),
      uGoldHigh: asVec3(palette.goldHigh),
    };

    const unsubscribe = timeline.subscribe(({ progress, elapsed, stillness, dt }) => {
      const envelope = envelopeAt(progress);

      uniforms.uTime = elapsed;
      uniforms.uApproach = envelope.approach;
      uniforms.uGoldSeam = envelope.goldSeam;
      uniforms.uGoldAura = envelope.goldAura;
      uniforms.uPresence = envelope.presence;
      uniforms.uTail = envelope.tail;
      uniforms.uFlash = envelope.flash;
      uniforms.uFade = envelope.fade;
      uniforms.uStillness = stillness;

      renderer.render(uniforms);

      // Resolution may drop, but the tier never does: a visible downgrade during the
      // Signature Moment is worse than a few dropped frames (TECHNICAL_ARCHITECTURE §7).
      if (dprSteps >= MAX_DPR_STEPS || dpr <= 1) return;
      accumulated += dt * 1000;
      if (++frames < WATCHDOG_WINDOW) return;
      if (accumulated / frames > STRUGGLE_MS) {
        dpr = Math.max(1, dpr - 0.25);
        dprSteps += 1;
        resize();
      }
      frames = 0;
      accumulated = 0;
    });

    return () => {
      unsubscribe();
      observer.disconnect();
      renderer.dispose();
    };
  }, [tier, timeline]);

  if (glFailed) return <TheBetweenStatic tier="static" timeline={timeline} />;

  return (
    <div className="between">
      <canvas className="between__canvas" ref={canvasRef} aria-hidden="true" />
      <ThesisText timeline={timeline} />
    </div>
  );
}
