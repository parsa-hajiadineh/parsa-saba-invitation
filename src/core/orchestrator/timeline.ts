/**
 * Cinematic timeline.
 *
 * Before the first pointer, progress is held at 0 (black). The first touch
 * awakens the piece and a slow autoplay begins. After that, scroll may take
 * over as the progression control — it does not start the experience.
 *
 * A beat never reads the scroll position (TECHNICAL_ARCHITECTURE.md §4).
 */

export interface TimelineFrame {
  /** Smoothed progress through the timeline, 0..1. */
  progress: number;
  /** Unsmoothed target progress, 0..1. */
  target: number;
  /** d(progress)/dt, in progress units per second. */
  velocity: number;
  /** Rises toward 1 while the guest holds still. Discovered, never instructed. */
  stillness: number;
  /** Seconds since the timeline started. */
  elapsed: number;
  /** Seconds since the previous frame, clamped. */
  dt: number;
  /** False until the first pointer. The beat must render black until then. */
  awakened: boolean;
}

export type TimelineListener = (frame: TimelineFrame) => void;

export interface TimelineOptions {
  /** Higher converges on the target faster. */
  smoothing: number;
  stillnessDelay: number;
  stillnessRise: number;
  /** Seconds for autoplay to run 0 → 1 after first touch, if the guest does not scroll. */
  autoplaySeconds: number;
}

const DEFAULTS: TimelineOptions = {
  smoothing: 3.2,
  stillnessDelay: 0.55,
  stillnessRise: 1.2,
  autoplaySeconds: 34,
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

  private awakened = false;
  private autoProgress = 0;
  private scrollTakenOver = false;
  private scrollAtAwaken = 0;
  private hold: number | null = null;

  private readonly frame: TimelineFrame = {
    progress: 0,
    target: 0,
    velocity: 0,
    stillness: 0,
    elapsed: 0,
    dt: 0,
    awakened: false,
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

  awaken(): void {
    if (this.awakened) return;
    this.awakened = true;
    this.scrollAtAwaken = readScrollProgress();
    this.autoProgress = 0;
  }

  /**
   * Dev-only: pin the timeline to a progress value so frames can be inspected.
   * Also awakens, because a held frame is a frame of the experience.
   */
  debugHold(progress: number): void {
    this.awaken();
    this.hold = clamp01(progress);
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    this.lastStamp = 0;
    this.startStamp = 0;
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

    const dt = Math.min((stamp - this.lastStamp) / 1000, 0.05);
    this.lastStamp = stamp;

    const previousProgress = this.frame.progress;
    let target = 0;

    const debugAt = readDebugHold();
    if (debugAt !== null) {
      this.awakened = true;
      this.hold = debugAt;
    }

    if (this.hold !== null) {
      target = this.hold;
    } else if (this.awakened) {
      const scroll = readScrollProgress();
      if (!this.scrollTakenOver && Math.abs(scroll - this.scrollAtAwaken) > 0.012) {
        this.scrollTakenOver = true;
      }
      if (this.scrollTakenOver) {
        target = scroll;
      } else {
        this.autoProgress = Math.min(1, this.autoProgress + dt / this.options.autoplaySeconds);
        target = this.autoProgress;
      }
    }

    const k = 1 - Math.exp(-this.options.smoothing * dt);
    let progress = previousProgress + (target - previousProgress) * k;
    if (this.hold !== null || Math.abs(target - progress) < 0.0002) progress = target;

    const targetMoved = Math.abs(target - this.previousTarget) > 0.0004;
    this.previousTarget = target;
    this.stillSeconds = targetMoved ? 0 : this.stillSeconds + dt;

    const stillRamp =
      (this.stillSeconds - this.options.stillnessDelay) / this.options.stillnessRise;

    const f = this.frame;
    f.dt = dt;
    f.elapsed = (stamp - this.startStamp) / 1000;
    f.target = target;
    f.progress = this.awakened ? progress : 0;
    f.velocity = dt > 0 ? (f.progress - previousProgress) / dt : 0;
    f.stillness = smoothstep01(clamp01(stillRamp));
    f.awakened = this.awakened;

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

function readDebugHold(): number | null {
  if (!import.meta.env.DEV) return null;
  const raw = new URLSearchParams(window.location.search).get('at');
  if (raw === null) return null;
  const value = Number(raw);
  return Number.isFinite(value) ? clamp01(value) : null;
}
