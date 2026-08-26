import { useEffect, useRef, useState } from 'react';

import { BEATS } from '../beats/registry';
import { armAudioUnlock } from '../core/audio/unlock';
import { Timeline } from '../core/orchestrator/timeline';
import { detectCapabilities } from '../core/performance/tier';
import { SCROLL_SMOOTHING } from '../beats/02-the-between/config';

export function App() {
  const [capabilities] = useState(detectCapabilities);
  const timelineRef = useRef<Timeline | null>(null);
  const spacerRef = useRef<HTMLDivElement>(null);

  timelineRef.current ??= new Timeline({ smoothing: SCROLL_SMOOTHING });
  const timeline = timelineRef.current;

  const beat = BEATS[0]!;
  const scrollViewports = beat.scrollViewports;

  useEffect(() => {
    // The scroll surface is a fixed number of viewport heights, not document flow.
    // It is deliberately not recalculated when only the height changes: on iOS the
    // address bar collapsing would otherwise move the timeline under the guest.
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

    const audio = armAudioUnlock();
    timeline.start();

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', applyHeight);
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
