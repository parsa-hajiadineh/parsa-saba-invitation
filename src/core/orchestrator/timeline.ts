/**
 * Scroll → normalised cinematic timeline.
 *
 * A beat never reads the scroll position (TECHNICAL_ARCHITECTURE.md §4). It receives
 * a normalised progress from here. One requestAnimationFrame loop drives everything;
 * subscribers write to canvases and DOM styles imperatively so that React never
 * re-renders per frame.
 */

export interface TimelineFrame {
  /** Smoothed progress through the timeline, 0..1. */
  progress: number;
  /** Unsmoothed scroll-derived progress, 0..1. */
  target: number;
  /** d(progress)/dt, in progress units per second. */
  velocity: number;
  /** Rises toward 1 while the guest holds still. Discovered, never instructed. */
  stillness: number;
  /** Seconds since the timeline started. */
  elapsed: number;
  /** Seconds since the previous frame, clamped. */
  dt: number;
}

export type TimelineListener = (frame: TimelineFrame) => void;

export interface TimelineOptions {
  /** Higher converges on the scroll position faster. ~6 reads as cinematic drag. */
  smoothing: number;
  /** Seconds of no scroll input before stillness starts to rise. */
  stillnessDelay: number;
  /** Seconds for stillness to travel 0 → 1 once it starts rising. */
  stillnessRise: number;
}

const DEFAULTS: TimelineOptions = {
  smoothing: 6,
  stillnessDelay: 0.55,
  stillnessRise: 1.2,
};

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

export class Timeline {
  private readonly options: TimelineOptions;
  private readonly listeners = new Set<TimelineListener>();

  private rafId = 0;
  private running = false;
  private lastStamp = 0;
  private startStamp = 0;
  private stillSeconds = 0;
  private previousTarget = 0;

  private readonly frame: TimelineFrame = {
    progress: 0,
    target: 0,
    velocity: 0,
    stillness: 0,
    elapsed: 0,
    dt: 0,
  };

  constructor(options: Partial<TimelineOptions> = {}) {
    this.options = { ...DEFAULTS, ...options };
  }

  subscribe(listener: TimelineListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    this.lastStamp = 0;
    this.startStamp = 0;
    const initial = readScrollProgress();
    this.frame.progress = initial;
    this.frame.target = initial;
    this.previousTarget = initial;
    this.rafId = requestAnimationFrame(this.tick);
  }

  stop(): void {
    this.running = false;
    cancelAnimationFrame(this.rafId);
  }

  private readonly tick = (stamp: number): void => {
    if (!this.running) return;
    this.rafId = requestAnimationFrame(this.tick);

    if (this.startStamp === 0) {
      this.startStamp = stamp;
      this.lastStamp = stamp;
    }

    // A backgrounded tab or an incoming call produces a huge gap. Clamp it so the
    // timeline resumes rather than jumping.
    const dt = Math.min((stamp - this.lastStamp) / 1000, 0.05);
    this.lastStamp = stamp;

    const target = readScrollProgress();
    const previousProgress = this.frame.progress;

    const k = 1 - Math.exp(-this.options.smoothing * dt);
    let progress = previousProgress + (target - previousProgress) * k;
    if (Math.abs(target - progress) < 0.0002) progress = target;

    const scrollMoved = Math.abs(target - this.previousTarget) > 0.0004;
    this.previousTarget = target;
    this.stillSeconds = scrollMoved ? 0 : this.stillSeconds + dt;

    const stillRamp =
      (this.stillSeconds - this.options.stillnessDelay) / this.options.stillnessRise;

    const f = this.frame;
    f.dt = dt;
    f.elapsed = (stamp - this.startStamp) / 1000;
    f.target = target;
    f.progress = progress;
    f.velocity = dt > 0 ? (progress - previousProgress) / dt : 0;
    f.stillness = smoothstep01(clamp01(stillRamp));

    for (const listener of this.listeners) listener(f);
  };
}

function smoothstep01(x: number): number {
  return x * x * (3 - 2 * x);
}

function readScrollProgress(): number {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  if (scrollable <= 0) return 0;
  return clamp01(window.scrollY / scrollable);
}
