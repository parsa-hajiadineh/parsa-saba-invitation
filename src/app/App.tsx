import { useEffect, useRef, useState } from 'react';

import { BEATS } from '../beats/registry';
import { ESTIMATED_DURATION_SECONDS, SCROLL_SMOOTHING } from '../beats/02-the-between/config';
import { armAudioUnlock } from '../core/audio/unlock';
import { Timeline } from '../core/orchestrator/timeline';
import { detectCapabilities } from '../core/performance/tier';

function debugHoldProgress(): number | null {
  if (!import.meta.env.DEV) return null;
  const raw = new URLSearchParams(window.location.search).get('at');
  if (raw === null) return null;
  const value = Number(raw);
  return Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : null;
}

export function App() {
  const [capabilities] = useState(detectCapabilities);
  const timelineRef = useRef<Timeline | null>(null);
  const spacerRef = useRef<HTMLDivElement>(null);

  timelineRef.current ??= new Timeline({
    smoothing: SCROLL_SMOOTHING,
    autoplaySeconds: ESTIMATED_DURATION_SECONDS,
  });
  const timeline = timelineRef.current;

  const beat = BEATS[0]!;
  const scrollViewports = beat.scrollViewports;

  useEffect(() => {
    let lastWidth = window.innerWidth;

    const applyHeight = () => {
      const spacer = spacerRef.current;
      if (!spacer) return;
      spacer.style.height = `${Math.round(window.innerHeight * scrollViewports)}px`;
    };

    const onResize = () => {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      applyHeight();
    };

    applyHeight();
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', applyHeight);

    document.documentElement.style.overflow = 'hidden';

    const hold = debugHoldProgress();
    if (hold !== null) {
      document.documentElement.style.overflow = '';
      timeline.debugHold(hold);
    }

    const onFirstPointer = () => {
      timeline.awaken();
      document.documentElement.style.overflow = '';
    };
    window.addEventListener('pointerdown', onFirstPointer, { once: true, passive: true });

    const audio = armAudioUnlock();
    timeline.start();

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', applyHeight);
      window.removeEventListener('pointerdown', onFirstPointer);
      document.documentElement.style.overflow = '';
      timeline.stop();
      audio.dispose();
    };
  }, [timeline, scrollViewports]);

  const Beat = capabilities.tier === 'static' ? beat.StaticComponent : beat.Component;

  return (
    <>
      <div className="stage">
        <Beat tier={capabilities.tier} timeline={timeline} />
      </div>
      <div className="scroll-surface" ref={spacerRef} />
    </>
  );
}
