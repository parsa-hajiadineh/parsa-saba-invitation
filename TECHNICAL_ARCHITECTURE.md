# TECHNICAL_ARCHITECTURE.md — PARSA & SABA

> **AUTHORITY RANK 3.**
> Technical decisions. Subordinate to `CREATIVE_DNA.md` and `CREATIVE_LOCK.md`.
> **Status: PROPOSED, not yet approved.** No stack has been installed. See §12 for what must be approved before implementation begins.

---

## 1. Guiding technical principles

1. **Choose the lightest technology capable of producing the intended emotional effect.** (`CREATIVE_DNA.md` Law 2)
2. **WebGL is reserved for high-value moments only.** (`CREATIVE_LOCK.md` L-19) It is not the default rendering layer for the whole piece.
3. **Performance is a creative requirement.** (L-21) A dropped-frame stutter during Beat 2 destroys the Signature Moment more thoroughly than any aesthetic mistake.
4. **Graceful degradation is mandatory.** (L-20) A device that cannot run WebGL must still receive a complete, coherent invitation.
5. **Beats must be independently developable and replaceable.** Changing Beat 3 must not require touching Beat 5.
6. Do not add a dependency because it is popular. Add it because a specific requirement demands it.

---

## 2. Proposed stack

| Layer | Proposal | Rationale | Status |
|---|---|---|---|
| Language | **TypeScript** | Non-negotiable for multi-session maintainability | Recommended |
| Framework | **React** | Beat modules map naturally to components; required by R3F | Recommended |
| Build / host | **Vite + static hosting** *(alternative: Next.js static export)* | The site is a single page with one small write endpoint. Next.js adds routing/SSR we do not need. | **OPEN — O-04** |
| Timeline / motion | **GSAP** (with ScrollTrigger) | Proven scroll-driven cinematic timelines on mobile Safari | Recommended |
| 3D / WebGL | **Three.js via React Three Fiber**, mounted only for Beats 2, 3, 6, 7 | Component model matches beat isolation | **OPEN — O-04** |
| Shaders | **GLSL**, hand-written, minimal | Gold-in-the-gap and light fields cannot be done convincingly in CSS | Recommended |
| State | **Zustand** | Small global store: active beat, progress, tier, audio state, RSVP draft | Recommended |
| Audio | **Web Audio API** (thin wrapper, or Howler if it earns its weight) | Stem-layer crossfades synced to beat progress | Recommended |
| RSVP backend | Google Apps Script → Sheet, **or** a serverless function | Lightweight; low traffic; no user accounts | **OPEN — O-05** |

**Deliberately excluded unless a concrete need appears:** a CSS framework, a component library, a state machine library, an animation library beyond GSAP, any analytics SDK, any font-loading service that blocks first paint.

---

## 3. Rendering strategy — hybrid, not WebGL-everywhere

| Beat | Renderer | Justification |
|---|---|---|
| 1 ورود | CSS/Canvas 2D light fields (WebGL only if quality demands it) | Slow drifting mist is achievable without a GL context |
| 2 میانِ ما | **WebGL — required** | The gold-in-the-gap shader is the Signature Moment |
| 3 کهکشانِ یاد | **WebGL** | Depth-separated fragments, illumination falloff |
| 4 اکنونِ ما | WebGL **or** CSS 2.5D layers | Decide after seeing the actual photograph |
| 5 دعوت | **DOM + CSS only** | It is typography. Text belongs in the DOM. |
| 6 پس‌نور | **WebGL** (instanced points) | Many drifting light points |
| 7 هدیهٔ نور | DOM form controls **over** the Beat 6 WebGL field | Native input for typing; GL only for the light field |

### Hard rule: text lives in the DOM

Guest-facing text is **never** rendered inside a shader or canvas. It must remain selectable-adjacent, accessible, correctly shaped for Persian RTL, and legible at any DPR. WebGL provides the light *behind* the text, never the text itself.

---

## 4. Beat module contract

Every beat is a self-contained module exposing the same interface, so beats can be reordered, replaced, or developed in isolation.

```
beats/<beat-id>/
  index.ts              # exports the BeatModule
  <Beat>.tsx            # the component
  config.ts             # duration, tuning constants, tier variants
  assets.manifest.ts    # what must be preloaded
  shaders/              # GLSL, if any
  README.md             # what this beat is for, in one paragraph
```

Conceptual interface:

```
BeatModule {
  id
  order
  estimatedDuration
  preload(tier)            // returns a promise; resolves when ready to render
  Component                // receives { progress: 0..1, tier, active }
  variants: { full, reduced, static }
  dispose()                // release GPU resources on exit
}
```

Rules:

- A beat receives its **normalised progress (0→1)** from the orchestrator. A beat never reads the scroll position directly.
- A beat never imports another beat.
- A beat never mutates global state except through the defined store actions.
- Every beat must implement all three tier variants. A missing `static` variant is a build failure, not a TODO.

### Beat registry

The orchestrator reads an ordered array of beat modules. Reordering the experience means reordering that array — nothing else.

Dev affordance: `?beat=<id>` loads a single beat full-screen in isolation. `?tier=static` forces a tier. These are development tools and must be inert in production builds.

---

## 5. Proposed project structure

```
/                         # reference docs (this file and siblings)
src/
  app/                    # entry, single page composition
  core/
    orchestrator/         # scroll → timeline → per-beat progress
    audio/                # stem layers, gesture unlock, silent-safe fallback
    performance/          # capability detection, tier selection, DPR cap
    tokens/               # colours, type scale, motion curves
  beats/
    01-threshold/
    02-the-between/
    03-constellation/
    04-us-now/
    05-invitation/
    06-afterglow/
    07-rsvp/
  webgl/
    shared/               # shared materials, post-processing, LUT
  components/             # typography primitives, RSVP inputs
  services/               # RSVP client
public/
  photos/                 # processed image derivatives
  audio/                  # stems
```

---

## 6. Orchestrator

- Scroll position maps to a **normalised global timeline**, not to document height.
- The page is a fixed-height virtual scroll surface; beats are full-viewport and stacked in time, not in document flow.
- Soft snapping between beats; never hard scroll-jacking that fights the user's finger.
- The orchestrator owns: active beat, per-beat progress, preloading of beat N+1, disposal of beat N−1, and audio stem levels.
- Reduced-motion and static tiers use the **same orchestrator and the same beat order**, with cut transitions instead of continuous interpolation.

---

## 7. Performance tiers

Detected once on first load, before the first render commits.

| Signal | Use |
|---|---|
| WebGL2 context availability | Hard gate for Full/Reduced |
| `navigator.hardwareConcurrency` | Coarse CPU capability |
| `navigator.deviceMemory` (where available) | Coarse memory capability |
| `devicePixelRatio` and viewport size | DPR cap |
| `prefers-reduced-motion` | Forces at least Reduced |
| A single-frame render cost probe | Final tie-breaker |

| Tier | Behaviour |
|---|---|
| **Full** | All beats as specified. DPR capped at 1.5–2. Bloom enabled. Particle counts capped (order of ~5k, never 50k). Target 60fps on iPhone 12 / mid-range Android and above. |
| **Reduced** | DPR 1. Simplified shaders. No particle reconstruction — dissolve becomes a light crossfade. Some WebGL beats fall back to CSS. |
| **Static** | **No WebGL at all.** The same 7 beats, same order, same copy, delivered with DOM, graded images, and CSS transitions. RSVP fully functional. |

**Absolute rule:** a blank screen is never an acceptable outcome. If tier detection itself fails, fall back to Static.

A runtime frame-rate watchdog may demote a session from Full to Reduced. It must **never** promote mid-session, and it must never demote during Beat 2 — a visible downgrade during the Signature Moment is worse than a few dropped frames.

---

## 8. Asset pipeline

### Photographs

- Curation and grading happen **offline**, before build. The runtime never colour-corrects a photograph from scratch.
- A single shared LUT/grade is applied to all fragments for visual unity.
- Depth separation for 2.5D uses **pre-authored depth maps or pre-cut layers**, generated offline. No runtime depth estimation.
- Delivered as AVIF with WebP fallback, in 2–3 responsive sizes.
- Total image payload budget: see §9.

### Audio

- One composed piece, exported as 3–4 stems.
- Compressed for mobile; loaded after the first user gesture, never before.
- Must be seekable and loopable at the tail so a slow reader in Beat 7 does not hit silence-by-accident.

### Fonts

- Subset aggressively. Persian subsetting must preserve required glyph coverage — verify visually, not just by byte count.
- Self-hosted. No blocking third-party font requests.

---

## 9. Budgets

These are gates, not aspirations. Exceeding one requires an entry in `DECISIONS.md` explaining why.

| Budget | Target |
|---|---|
| Time to first meaningful frame (4G, mid-range phone) | **< 2.5s** |
| Initial payload before Beat 1 renders | **< 600 KB** |
| Total experience payload (all beats, all assets) | **< 6 MB** |
| Frame rate, Full tier, Beat 2 | **60fps sustained** |
| Frame rate, Full tier, any beat | **≥ 50fps**, never below 30 |
| Audio start latency after gesture | **< 300ms** |
| Memory: GPU resources released on beat exit | mandatory |

Beats after the first are lazy-loaded; Beat N+1 preloads during Beat N.

---

## 10. RSVP backend

Requirements:

- Accept: attendance (yes/no), message text, timestamp, generated light coordinates.
- Extremely low traffic (order of hundreds of submissions total).
- No accounts, no auth, no PII beyond what the guest volunteers.
- Must not block or break the experience if it fails — a failed submission still shows the guest their point of light, queues locally, and retries.
- Basic abuse protection: length cap, simple rate limiting, no HTML rendering of guest text ever.

**Options under consideration (O-05):** Google Apps Script writing to a Sheet (simplest, owner-readable) versus a small serverless function with a hosted store (more robust, more setup).

**Not yet decided (O-07):** whether the Afterglow field displays real guest messages live. If yes, moderation and privacy must be designed before implementation — a public link means anyone with the QR can write into the couple's sky.

---

## 11. Accessibility and resilience

- `prefers-reduced-motion` is honoured, mapping to Reduced or Static.
- Persian RTL text must be correct at the DOM level, including mixed Persian/Latin runs.
- Contrast: light text on obsidian black is favourable, but thin weights at small sizes are a real risk on phones in daylight. Verify on a real device outdoors.
- The experience must survive: WebGL unavailable, audio blocked, slow 3G, an interrupted scroll, an incoming call, and a mid-experience tab backgrounding.
- No feature may be required that depends on device orientation (L-18).

---

## 12. What must be approved, and when

Two separate gates. Do not conflate them.

### Gate A — before the Phase 5 Signature prototype may start

| Item | Why it blocks |
|---|---|
| **O-04** — Vite vs Next.js; R3F vs raw Three.js | Nothing can be scaffolded without it |
| **O-01** — final Persian wording of the core thesis | Beat 2 *is* that text in the gap; prototyping it against placeholder wording tests the wrong thing |
| **O-11** — design tokens (obsidian, violet, rose, gold) | The gold-in-the-gap shader is meaningless without the actual gold |
| **O-09** — Persian typeface | The thesis typography must be evaluated in its real face, on a real phone |

### Gate B — before full implementation (Phase 6 onward)

| Item | Blocks |
|---|---|
| **O-05** — RSVP backend | Beat 7 |
| **O-06** — hosting, domain, QR target | Launch |
| **O-07** — live guest messages and moderation | Beat 6 |
| **O-02** — event details | Beat 5 |
| **O-03** — photographs | Beats 3 and 4 |
| **O-08** — music | Audio integration and final pacing |

Gate B items do **not** block the Beat 2 prototype. Beats 3 and 4 may be built against placeholders that match the final grade and aspect ratios, but they are not *done* until the real photographs are in place.

---

_Last updated: 2026-08-26 · Status: PROPOSED_
