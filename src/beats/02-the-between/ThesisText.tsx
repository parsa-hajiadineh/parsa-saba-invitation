import { useEffect, useRef } from 'react';

import type { Timeline } from '../../core/orchestrator/timeline';
import { LINE_STAGGER, STAGE_IN, STAGE_OUT, THESIS_STAGES } from './copy';

interface LineHandle {
  element: HTMLElement;
  from: number;
  to: number;
}

/**
 * The thesis, in the DOM, inside the gap.
 *
 * Text is never rendered into the canvas (TECHNICAL_ARCHITECTURE.md §3): Persian
 * shaping, RTL, and legibility at any DPR all depend on the browser doing it.
 * The light behind the words comes from the shader; the words do not.
 *
 * Only opacity and transform are written per frame, so nothing here can trigger
 * layout during the Signature Moment.
 */
export function ThesisText({ timeline }: { timeline: Timeline }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = root.current;
    if (!container) return;

    const handles: LineHandle[] = Array.from(
      container.querySelectorAll<HTMLElement>('.thesis__line'),
    ).map((element) => ({
      element,
      from: Number(element.dataset.from),
      to: Number(element.dataset.to),
    }));

    return timeline.subscribe(({ progress }) => {
      for (const { element, from, to } of handles) {
        const appear = smoothstep(from, from + STAGE_IN, progress);
        const depart = smoothstep(to - STAGE_OUT, to, progress);
        const opacity = appear * (1 - depart);

        element.style.opacity = opacity.toFixed(3);
        element.style.visibility = opacity < 0.002 ? 'hidden' : 'visible';
        element.style.transform = `translate3d(0, ${((1 - appear) * 9).toFixed(2)}px, 0)`;
      }
    });
  }, [timeline]);

  return (
    <div className="thesis" ref={root}>
      {THESIS_STAGES.map((stage) => (
        <p className="thesis__stage" key={stage.from} lang="fa" dir="rtl">
          {stage.lines.map((line, lineIndex) => (
            <span
              className="thesis__line"
              key={line}
              data-from={stage.from + lineIndex * LINE_STAGGER}
              data-to={stage.to}
            >
              {line}
            </span>
          ))}
        </p>
      ))}
    </div>
  );
}

function smoothstep(a: number, b: number, x: number): number {
  const t = Math.min(Math.max((x - a) / (b - a), 0), 1);
  return t * t * (3 - 2 * t);
}
