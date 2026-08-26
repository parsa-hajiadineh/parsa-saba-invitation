# TECHNICAL_ARCHITECTURE.md — PARSA & SABA

> **AUTHORITY RANK 3.**
> Technical decisions. Subordinate to `CREATIVE_DNA.md` and `CREATIVE_LOCK.md`.
> **Status: ACTIVE.** The stack is decided (**D-015**) and installed, and the Beat 2
> prototype is built against it. Sections marked OPEN below are still open.

---

## 1. Guiding technical principles

1. **Choose the lightest technology capable of producing the intended emotional effect.** (`CREATIVE_DNA.md` Law 2)
2. **WebGL is reserved for high-value moments only.** (`CREATIVE_LOCK.md` L-19) It is not the default rendering layer for the whole piece.
3. **Performance is a creative requirement.** (L-21) A dropped-frame stutter during Beat 2 destroys the Signature Moment more thoroughly than any aesthetic mistake.
4. **Graceful degradation is mandatory.** (L-20) A device that cannot run WebGL must still receive a complete, coherent invitation.
5. **Beats must be independently developable and replaceable.** Changing Beat 3 must not require touching Beat 5.
6. Do not add a dependency because it is popular. Add it because a specific requirement demands it.

---

## 2. Stack

Decided in **D-015**. Reasoning and rejected alternatives live there.

| Layer | Decision | Status |
|---|---|---|
| Language | **TypeScript**, strict | Installed |
| Framework | **React** | Installed |
| Build / host | **Vite** + static hosting | Installed |
| Timeline / motion | **Hand-written**: scroll → normalised timeline → per-beat envelopes | Built |
| WebGL | **Hand-written**, one fragment shader per light-based beat. No Three.js, no R3F. | Built |
| Shaders | **GLSL ES 1.00**, hand-written, minimal | Built |
| State | **None.** Per-frame progress is published imperatively; React never renders per frame. | Built |
| Audio | **Web Audio API**, thin wrapper. Gesture unlock armed; no content yet. | Partial |
| Typeface | **Vazirmatn Variable**, OFL-1.1, self-hosted — **provisional, see D-016** | Installed |
| RSVP backend | Google Apps Script → Sheet, **or** a serverless function | **OPEN — O-05** |

**Not installed, and each would need its own decision:** GSAP, Zustand, Three.js, React
Three Fiber, a CSS framework, a component library, any analytics SDK, any font service
that blocks first paint.

Three.js is **deferred, not rejected.** Beats 3, 6, and 7 need instanced points and
textures; if hand-written GL stops paying for itself there, it can be introduced and
lazily loaded for those beats alone. The beat registry exists to make that a local change.

### Actual payload, Beat 2 prototype

| | Measured | Budget (§9) |
|---|---|---|
| JavaScript | 68 KB gzipped | — |
| CSS | 2 KB gzipped | — |
| Persian subset of the typeface | 46 KB woff2 | — |
| **Total before first frame** | **~116 KB** | < 600 KB |

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

## 5. Project structure

Directories marked *planned* do not exist yet. Only Beat 2 has been built.

```
/                         # reference docs (this file and siblings)
src/
  main.tsx                # entry: fonts, tokens, styles, mount
  app/                    # single page composition, scroll surface
  core/
    orchestrator/         # scroll → normalised timeline; beat module contract
    audio/                # gesture unlock; silent-safe by construction
    performance/          # capability detection, tier selection, DPR cap
    tokens/               # colours and motion (provisional — O-11, O-09)
  beats/
    registry.ts           # the experience, as an ordered array
    02-the-between/       # ★ built
    01-threshold/         # planned
    03-constellation/     # planned
    04-us-now/            # planned
    05-invitation/        # planned
    06-afterglow/         # planned
    07-rsvp/              # planned
  webgl/
    core/                 # fullscreen shader renderer, shared by light-based beats
  components/             # planned: typography primitives, RSVP inputs
  services/               # planned: RSVP client
public/                   # planned: processed photographs, audio stems
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

**Superseded by the owner on 2026-08-26.** The prototype was built with O-01, O-09, and
O-11 still open, against provisional values — see **D-016**. Kept here because the
reasoning still applies to *approval*: the prototype cannot be signed off as final until
these three are decided and the real values are in place.

| Item | Why it blocks | Status |
|---|---|---|
| **O-04** — Vite vs Next.js; R3F vs raw Three.js | Nothing can be scaffolded without it | **Resolved — D-015** |
| **O-01** — final Persian wording of the core thesis | Beat 2 *is* that text in the gap; prototyping it against placeholder wording tests the wrong thing | Open; provisional in use |
| **O-11** — design tokens (obsidian, violet, rose, gold) | The gold-in-the-gap shader is meaningless without the actual gold | Open; provisional in use |
| **O-09** — Persian typeface | The thesis typography must be evaluated in its real face, on a real phone | Open; provisional in use |

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

_Last updated: 2026-08-26 · Status: ACTIVE_
