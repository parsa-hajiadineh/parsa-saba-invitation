import { useEffect, useRef, useState } from 'react';

import type { BeatComponentProps } from '../../core/orchestrator/beat';
import { asVec3, palette } from '../../core/tokens/tokens';
import { createFullscreenRenderer } from '../../webgl/core/fullscreenRenderer';
import { stateAt } from './config';
import { PresenceNames } from './PresenceNames';
import { TheBetweenStatic } from './TheBetweenStatic';
import fragmentSource from './shaders/between.frag?raw';
import vertexSource from './shaders/fullscreen.vert?raw';

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

    const uniforms: Record<string, number | readonly number[] | Float32Array> = {
      uResolution: renderer.drawingBufferSize,
      uTime: 0,
      uFade: 0,
      uGold: 0,
      uQuality: tier === 'full' ? 1 : 0,
      uParsaPos: [0, 0],
      uSabaPos: [0, 0],
      uGoldPos: [0, 0],
      uParsaSize: 0,
      uSabaSize: 0,
      uParsaBright: 0,
      uSabaBright: 0,
      uTrailLenP: 0,
      uTrailLenS: 0,
      uBondLen: 0,
      uParsaTrail: new Float32Array(48),
      uSabaTrail: new Float32Array(48),
      uBondTrail: new Float32Array(64),
      uObsidian: asVec3(palette.obsidian),
      uParsaDeep: asVec3(palette.parsaDeep),
      uParsaCore: asVec3(palette.parsaCore),
      uSabaDeep: asVec3(palette.sabaDeep),
      uSabaCore: asVec3(palette.sabaCore),
      uGoldDeep: asVec3(palette.goldDeep),
      uGoldMid: asVec3(palette.goldMid),
      uGoldHigh: asVec3(palette.goldHigh),
    };

    const unsubscribe = timeline.subscribe(({ progress, elapsed, dt, awakened }) => {
      if (import.meta.env.DEV) {
        document.documentElement.dataset.progress = progress.toFixed(3);
        document.documentElement.dataset.awakened = awakened ? '1' : '0';
      }

      const state = awakened ? stateAt(progress) : stateAt(0);

      uniforms.uTime = elapsed;
      uniforms.uFade = awakened ? state.fade : 0;
      uniforms.uGold = state.gold;
      uniforms.uParsaPos = [state.parsa.pos.x, state.parsa.pos.y];
      uniforms.uSabaPos = [state.saba.pos.x, state.saba.pos.y];
      uniforms.uGoldPos = [state.goldPos.x, state.goldPos.y];
      uniforms.uParsaSize = state.parsa.size;
      uniforms.uSabaSize = state.saba.size;
      uniforms.uParsaBright = state.parsa.bright;
      uniforms.uSabaBright = state.saba.bright;
      uniforms.uTrailLenP = state.parsa.trailLen;
      uniforms.uTrailLenS = state.saba.trailLen;
      uniforms.uBondLen = state.bondLen;
      uniforms.uParsaTrail = state.parsa.trail;
      uniforms.uSabaTrail = state.saba.trail;
      uniforms.uBondTrail = state.bond;

      renderer.render(uniforms);

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
      <PresenceNames timeline={timeline} />
    </div>
  );
}
