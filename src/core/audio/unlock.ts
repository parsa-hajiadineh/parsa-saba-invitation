/**
 * Audio unlock covenant (CREATIVE_LOCK.md §7): the first gesture is what earns the
 * right to play sound. Nothing autoplays before it.
 *
 * No audio exists yet — O-08 (music sourcing) is OPEN. This holds the gesture
 * contract open so the composition can be dropped in without touching any beat,
 * and the visual experience never depends on it (silent-safe).
 */

export type AudioUnlockState = 'waiting' | 'unlocked' | 'refused';

type ContextConstructor = typeof AudioContext;

interface WebkitWindow {
  webkitAudioContext?: ContextConstructor;
}

export interface AudioUnlock {
  state: AudioUnlockState;
  context: AudioContext | null;
  dispose(): void;
}

const GESTURES: readonly (keyof WindowEventMap)[] = [
  'pointerdown',
  'touchstart',
  'wheel',
  'keydown',
];

export function armAudioUnlock(onChange?: (state: AudioUnlockState) => void): AudioUnlock {
  const handle: AudioUnlock = {
    state: 'waiting',
    context: null,
    dispose: () => {
      for (const type of GESTURES) window.removeEventListener(type, onGesture);
    },
  };

  function setState(state: AudioUnlockState): void {
    handle.state = state;
    onChange?.(state);
  }

  function onGesture(): void {
    handle.dispose();

    const Ctor =
      window.AudioContext ?? (window as unknown as WebkitWindow).webkitAudioContext;
    if (!Ctor) {
      setState('refused');
      return;
    }

    try {
      const context = new Ctor();
      handle.context = context;
      void context.resume().then(
        () => setState('unlocked'),
        () => setState('refused'),
      );
    } catch {
      setState('refused');
    }
  }

  for (const type of GESTURES) {
    window.addEventListener(type, onGesture, { once: true, passive: true });
  }

  return handle;
}
