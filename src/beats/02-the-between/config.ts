/**
 * BEAT 2 — میانِ ما / The Between.
 *
 * The whole cinematic is authored here as two independent trajectories, a bond
 * that is a consequence of their meeting, and envelopes for ignition / gold / names.
 * The shader only draws what this file has already decided.
 */

export const SCROLL_VIEWPORTS = 7.4;
export const SCROLL_SMOOTHING = 3.2;
export const ESTIMATED_DURATION_SECONDS = 34;

export const TRAIL_COUNT = 24;
export const BOND_COUNT = 32;

export interface Vec2 {
  x: number;
  y: number;
}

export interface PresenceState {
  pos: Vec2;
  size: number;
  bright: number;
  trail: Float32Array;
  trailLen: number;
}

export interface BetweenState {
  parsa: PresenceState;
  saba: PresenceState;
  bond: Float32Array;
  bondLen: number;
  gold: number;
  goldPos: Vec2;
  names: number;
  fade: number;
}

/**
 * Parsa — few waypoints, long deliberate arcs. He does not wander.
 * Screen fractions, origin at centre, +y up.
 */
const PARSA_WAYPOINTS: readonly Vec2[] = [
  { x: -0.40, y: 0.40 },
  { x: -0.47, y: 0.17 },
  { x: -0.22, y: 0.27 },
  { x: 0.05, y: 0.15 },
  { x: -0.16, y: 0.07 },
  { x: -0.086, y: 0.03 },
];

/**
 * Saba — more waypoints, a loop that is hers alone. She is not his mirror.
 */
const SABA_WAYPOINTS: readonly Vec2[] = [
  { x: 0.43, y: -0.42 },
  { x: 0.34, y: -0.20 },
  { x: 0.06, y: -0.31 },
  { x: 0.24, y: 0.10 },
  { x: 0.08, y: 0.16 },
  { x: 0.20, y: -0.02 },
  { x: 0.094, y: -0.034 },
];

export function stateAt(progress: number): BetweenState {
  const p = clamp01(progress);
  const ignite = span(p, 0.0, 0.08);
  const pathT = span(p, 0.05, 0.76);
  const settle = span(p, 0.72, 0.88);
  const bondAmt = span(p, 0.66, 0.84);
  const gold = span(p, 0.74, 0.88) * (1 - span(p, 0.96, 1) * 0.25);
  const names = span(p, 0.84, 0.93);

  const parsaPos = displace(pathThrough(PARSA_WAYPOINTS, pathT), pathT, 0.0035, 2.1, 0.4);
  const sabaPos = displace(pathThrough(SABA_WAYPOINTS, pathT), pathT, 0.021, 3.4, 1.1);

  const parsaDepth = 0.22 + 0.78 * ease(pathT);
  const sabaDepth = 0.16 + 0.84 * ease(pathT);

  const parsa: PresenceState = {
    pos: parsaPos,
    size: 0.0055 + 0.012 * parsaDepth,
    bright: ignite * (0.75 + 0.45 * parsaDepth),
    trail: new Float32Array(TRAIL_COUNT * 2),
    trailLen: 0,
  };
  const saba: PresenceState = {
    pos: sabaPos,
    size: 0.0065 + 0.014 * sabaDepth,
    bright: ignite * (0.7 + 0.5 * sabaDepth),
    trail: new Float32Array(TRAIL_COUNT * 2),
    trailLen: 0,
  };

  fillTrail(
    parsa.trail,
    (t) => displace(pathThrough(PARSA_WAYPOINTS, t), t, 0.0035, 2.1, 0.4),
    pathT * settle * 0.85,
    Math.max(pathT, 0.001),
  );
  fillTrail(
    saba.trail,
    (t) => displace(pathThrough(SABA_WAYPOINTS, t), t, 0.021, 3.4, 1.1),
    pathT * settle * 0.85,
    Math.max(pathT, 0.001),
  );
  parsa.trailLen = pathT < 0.03 ? 0 : TRAIL_COUNT;
  saba.trailLen = pathT < 0.03 ? 0 : TRAIL_COUNT;

  const bond = sampleBond(parsaPos, sabaPos, bondAmt);

  const goldIndex = Math.max(0, Math.min(BOND_COUNT - 1, Math.round((bond.len - 1) * 0.62)));
  const goldPos: Vec2 = {
    x: bond.points[goldIndex * 2] ?? 0,
    y: bond.points[goldIndex * 2 + 1] ?? 0,
  };

  return {
    parsa,
    saba,
    bond: bond.points,
    bondLen: bond.len,
    gold: gold * ignite,
    goldPos,
    names: names * ignite,
    fade: ignite,
  };
}

function fillTrail(out: Float32Array, at: (t: number) => Vec2, from: number, to: number): void {
  const n = TRAIL_COUNT;
  for (let i = 0; i < n; i++) {
    const t = from + (to - from) * (i / (n - 1));
    const p = at(t);
    out[i * 2] = p.x;
    out[i * 2 + 1] = p.y;
  }
}

function sampleBond(parsa: Vec2, saba: Vec2, amount: number): { points: Float32Array; len: number } {
  const points = new Float32Array(BOND_COUNT * 2);
  if (amount <= 0.001) return { points, len: 0 };

  const cx = parsa.x * 0.46 + saba.x * 0.54 + 0.01;
  const cy = parsa.y * 0.56 + saba.y * 0.44 - 0.006;
  const dx = saba.x - parsa.x;
  const dy = saba.y - parsa.y;
  const dist = Math.hypot(dx, dy);
  const rx = dist * 0.92 + 0.018;
  const ry = dist * 0.5 + 0.01;
  // Twist off the joining line so this cannot close into a ring on their axis.
  const rot = Math.atan2(dy, dx) + 0.62;
  const cos = Math.cos(rot);
  const sin = Math.sin(rot);
  const arc = amount * Math.PI * 1.62;
  const a0 = -0.42;
  const len = Math.max(2, Math.round(amount * (BOND_COUNT - 1)));

  for (let i = 0; i < BOND_COUNT; i++) {
    const a = a0 + (i / (BOND_COUNT - 1)) * arc;
    const ex = Math.cos(a) * rx;
    const ey = Math.sin(a) * ry;
    points[i * 2] = cx + ex * cos - ey * sin;
    points[i * 2 + 1] = cy + ex * sin + ey * cos;
  }
  return { points, len };
}

function pathThrough(points: readonly Vec2[], t: number): Vec2 {
  const n = points.length - 1;
  const x = clamp01(t) * n;
  const i = Math.min(Math.floor(x), n - 1);
  const f = x - i;
  const p0 = points[Math.max(0, i - 1)]!;
  const p1 = points[i]!;
  const p2 = points[i + 1]!;
  const p3 = points[Math.min(points.length - 1, i + 2)]!;
  return catmullRom(p0, p1, p2, p3, f);
}

function catmullRom(p0: Vec2, p1: Vec2, p2: Vec2, p3: Vec2, t: number): Vec2 {
  const t2 = t * t;
  const t3 = t2 * t;
  return {
    x:
      0.5 *
      (2 * p1.x +
        (-p0.x + p2.x) * t +
        (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
        (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
    y:
      0.5 *
      (2 * p1.y +
        (-p0.y + p2.y) * t +
        (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
        (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3),
  };
}

function displace(p: Vec2, t: number, amp: number, freq: number, phase: number): Vec2 {
  const envelope = Math.sin(t * Math.PI) * (1 - span(t, 0.72, 1));
  const a = amp * envelope;
  return {
    x: p.x + Math.sin(t * Math.PI * freq + phase) * a,
    y: p.y + Math.cos(t * Math.PI * (freq * 0.73) + phase * 1.4) * a * 0.65,
  };
}

function span(x: number, a: number, b: number): number {
  const t = (x - a) / (b - a);
  return t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t);
}

function ease(x: number): number {
  return x * x * (3 - 2 * x);
}

function clamp01(v: number): number {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

/** CSS % from centre for a q-space point. */
export function toCss(pos: Vec2): { left: string; top: string } {
  return {
    left: `${((pos.x + 0.5) * 100).toFixed(2)}%`,
    top: `${((0.5 - pos.y) * 100).toFixed(2)}%`,
  };
}
