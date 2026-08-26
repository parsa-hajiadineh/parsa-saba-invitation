/**
 * Performance tier detection (TECHNICAL_ARCHITECTURE.md §7).
 *
 * Detected once, before the first render commits. If detection itself fails the
 * answer is 'static' — a blank screen is never an acceptable outcome.
 */

export type Tier = 'full' | 'reduced' | 'static';

export interface Capabilities {
  tier: Tier;
  /** Device pixel ratio cap for this tier. */
  maxDpr: number;
  webgl2: boolean;
  reducedMotion: boolean;
  forced: boolean;
}

const TIERS: readonly Tier[] = ['full', 'reduced', 'static'];

function forcedTier(): Tier | null {
  if (!import.meta.env.DEV) return null;
  const requested = new URLSearchParams(window.location.search).get('tier');
  return TIERS.includes(requested as Tier) ? (requested as Tier) : null;
}

function probeWebgl(): { available: boolean; webgl2: boolean } {
  try {
    const canvas = document.createElement('canvas');
    const gl2 = canvas.getContext('webgl2');
    if (gl2) {
      gl2.getExtension('WEBGL_lose_context')?.loseContext();
      return { available: true, webgl2: true };
    }
    const gl1 = canvas.getContext('webgl');
    if (gl1) {
      gl1.getExtension('WEBGL_lose_context')?.loseContext();
      return { available: true, webgl2: false };
    }
  } catch {
    return { available: false, webgl2: false };
  }
  return { available: false, webgl2: false };
}

export function detectCapabilities(): Capabilities {
  let reducedMotion = false;
  try {
    reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    reducedMotion = false;
  }

  const override = forcedTier();
  const probe = probeWebgl();

  if (override) {
    return {
      tier: override,
      maxDpr: override === 'full' ? fullTierDpr() : 1,
      webgl2: probe.webgl2,
      reducedMotion,
      forced: true,
    };
  }

  // A guest who has asked the OS for less motion gets the calmest variant we have.
  if (!probe.available || reducedMotion) {
    return { tier: 'static', maxDpr: 1, webgl2: false, reducedMotion, forced: false };
  }

  const cores = navigator.hardwareConcurrency ?? 4;
  const memory = (navigator as { deviceMemory?: number }).deviceMemory ?? 4;
  const weak = cores <= 4 || memory <= 2;

  return {
    tier: weak ? 'reduced' : 'full',
    maxDpr: weak ? 1 : fullTierDpr(),
    webgl2: probe.webgl2,
    reducedMotion,
    forced: false,
  };
}

/**
 * The whole frame is soft light, which hides resolution well, so a cap below the
 * device ratio costs almost nothing visually and buys the 60fps that Beat 2 needs.
 */
function fullTierDpr(): number {
  return Math.min(window.devicePixelRatio || 1, 1.75);
}
