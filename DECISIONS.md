# DECISIONS.md — PARSA & SABA

> **AUTHORITY RANK 6.**
> Every meaningful decision and the reasoning behind it. Append-only.

---

## How to use this file

- **Append only.** Never delete or rewrite a past decision. If a decision is reversed, add a **new** entry that supersedes it and mark the old one `SUPERSEDED BY D-xxx`.
- Sequential IDs: `D-001`, `D-002`, …
- Record the reasoning, not just the outcome. In six weeks the reasoning is the part nobody remembers.
- Record **rejected alternatives** too. Half the value of this file is preventing a future agent from re-proposing something already thought through and discarded.

### Template

```
## D-XXX — <short title>
**Date:** YYYY-MM-DD
**Type:** Creative | Technical | Process | Asset
**Status:** Active | Superseded by D-XXX
**Decided by:** Owner | Agent proposal, owner approved

**Decision:**
<what was decided, in one or two sentences>

**Reasoning:**
<why>

**Alternatives rejected:**
<what else was considered, and why it lost>

**Consequences:**
<what this now forces or forbids, and which files were updated>
```

---

## D-001 — The experience is an interactive artwork, not a website
**Date:** 2026-08-26 · **Type:** Creative · **Status:** Active · **Decided by:** Owner

**Decision:** The deliverable is a short interactive cinematic artwork that contains an invitation, not a wedding invitation website.

**Reasoning:** The intended guest reaction is *"I have never received an invitation like this before."* Any structure that reads as a website — navbar, sections, cards, footer — collapses that reaction into familiarity.

**Consequences:** No conventional web UI patterns anywhere. Governs every subsequent visual decision. Recorded in `CREATIVE_DNA.md`.

---

## D-002 — Gold is earned, never decorative
**Date:** 2026-08-26 · **Type:** Creative · **Status:** Active · **Decided by:** Owner

**Decision:** Gold represents what Parsa and Saba create together. It does not appear as a primary visual identity before Convergence, and never as a generic decorative wedding colour.

**Reasoning:** If gold appears early, the Convergence has nothing left to reveal, and the piece becomes indistinguishable from every gold-on-black wedding template.

**Consequences:** Beats 1 and 3 contain no gold identity. Beat 5 uses gold only as a micro-accent. Recorded as `CREATIVE_LOCK.md` L-22, L-23.

---

## D-003 — 11 scenes reduced to 7 beats
**Date:** 2026-08-26 · **Type:** Creative · **Status:** Active · **Decided by:** Agent proposal, owner approved

**Decision:** The original 11-scene storyboard becomes 7 beats.

**Reasoning:** The target duration is 90–150 seconds on the main path. Eleven scenes across that budget gives each roughly 10 seconds — not enough for anything to breathe, on a device where attention is fragile. Fewer beats, each with room, serves restraint better than more beats each rushed.

**Alternatives rejected:** Keeping 11 scenes and extending the duration to 4–5 minutes — rejected because mobile abandonment risk on a QR-scanned link is high and the piece would lose its density.

**Consequences:** Threshold and Two Presences merged into Beat 1; The Journey merged into Beat 5; The Ring reduced to a tail of Beat 2. Recorded as `CREATIVE_LOCK.md` L-24.

---

## D-004 — "The Between / میانِ ما" is the Signature Moment
**Date:** 2026-08-26 · **Type:** Creative · **Status:** Active · **Decided by:** Agent proposal, owner approved

**Decision:** Beat 2 is the Signature Moment. Two light presences approach but do not merge; gold emerges in the space between them, where the core emotional thesis is revealed.

**Reasoning:** It is the only proposed moment that delivers the visual DNA (violet + rose → gold) and the emotional thesis (*«ما باهم، ولی برای هم»* — union without the disappearance of identity) simultaneously, in one image. Its memorability comes from **counter-expectation**: the guest expects a merge, and the merge deliberately never happens.

**Alternatives rejected:**
- *"Recall by Light"* — a moving beam illuminating photo fragments. Strong, but it belongs to the memory section rather than serving as the thesis of the whole piece. Its logic survives inside Beat 3.
- *"The Bond Phenomenon"* — two arcs of light touching tangentially. Beautiful but purely visual, with no textual or thesis payload. Retained as the 8–10s tail of Beat 2.

**Consequences:** Beat 2 carries the project's highest creative and technical risk and is therefore prototyped first, in Phase 5, before any other beat. Recorded as `CREATIVE_LOCK.md` L-25, L-26.

---

## D-005 — Memory is a constellation, not a timeline
**Date:** 2026-08-26 · **Type:** Creative · **Status:** Active · **Decided by:** Owner

**Decision:** Roughly ten years of photographs are presented as 8–12 curated fragments of light in a dark field, illuminated by scroll. No chronology, no carousel, no cards, no frames, no dates.

**Reasoning:** Real memory is fragmentary, associative, and non-linear. A chronological timeline turns a relationship into a CV. The original scene title *"A Decade in Fragments"* was itself pulling toward chronology through the word "decade".

**Alternatives rejected:**
- *Depth Drift* — one full-bleed photo morphing into the next. Too linear; effectively a slideshow with better transitions.
- *Layered Glass* — photos revealed by dragging a finger across obsidian glass. Touch-heavy, and risks feeling like a game, which violates the interaction brief.

**Consequences:** Photos are curated for emotional diversity, not decade coverage. Recorded as `CREATIVE_LOCK.md` L-14, L-27, L-28.

---

## D-006 — RSVP is an offering of light
**Date:** 2026-08-26 · **Type:** Creative · **Status:** Active · **Decided by:** Owner

**Decision:** The RSVP is framed as leaving something in the couple's sky. Attendance is chosen by touching a region of light rather than a button; the message is written into darkness; on submit it dissolves into particles and becomes a new point of light in the shared field.

**Reasoning:** A conventional form at the end would break the spell in the final ten seconds, which is exactly where the impression is sealed. Making the guest's message *join the artwork* also makes the Afterglow field accumulate meaning as more guests respond.

**Alternatives rejected:** *"Reflection"* — the message appearing inside the gold gap from Beat 2. More poetic per-guest, but private and one-time; later guests would never see it. A wedding benefits from the collective field.

**Consequences:** Guests who decline also produce a point of light, treated with equal dignity. No red, no guilt state. Recorded as `CREATIVE_LOCK.md` L-15, L-16, L-29 and §6.

---

## D-007 — Audio is instrumental only; the "international vocal music" instruction is overridden
**Date:** 2026-08-26 · **Type:** Creative · **Status:** Active · **Decided by:** Agent proposal, owner approved

**Decision:** No vocals in any language. One continuous composed neo-classical ambient piece of roughly 2:30, implemented as stem layers, starting only after the first user gesture.

**Reasoning:** The original brief allowed international / non-Iranian music. For a Persian-first audience of family and relatives, English or other foreign vocals sitting under an intensely personal Persian text creates a cultural seam the guest can feel. Removing vocals entirely removes the seam. The "international" quality is then carried by sound design and production values rather than by language — which is more consistent with how the visual system achieves the same thing.

**Alternatives rejected:** Licensed international vocal track — rejected for the cultural mismatch above, and additionally for lyric content risk and licensing cost.

**Consequences:** Recorded as `CREATIVE_LOCK.md` L-05. Sourcing options remain open as **O-08**.

---

## D-008 — Persian-first copy
**Date:** 2026-08-26 · **Type:** Creative · **Status:** Active · **Decided by:** Owner

**Decision:** All emotional and practical copy is Persian. `Parsa & Saba` may remain in Latin script. English is permitted only for micro-UI such as a calendar link.

**Reasoning:** The audience is primarily Persian-speaking family. The luxury and international feel must come from typographic quality, spacing, and restraint — not from writing in English, which for this audience would read as borrowed rather than sophisticated.

**Consequences:** The core thesis is never rendered in English translation. Persian RTL correctness becomes a hard technical requirement. Recorded as `CREATIVE_LOCK.md` L-06 and §8.1.

---

## D-009 — Device-orientation interaction excluded from v1
**Date:** 2026-08-26 · **Type:** Creative / Technical · **Status:** Active · **Decided by:** Agent proposal, owner approved

**Decision:** No gyroscope or device-orientation-driven parallax in v1.

**Reasoning:** iOS requires a permission prompt for motion sensors, which would interrupt the experience with a system dialog at exactly the moment immersion is being established. The emotional return is small; the cost is a broken spell plus an additional degradation path to maintain.

**Consequences:** Scroll is the sole progression input, with tap as bounded optional interaction. Recorded as `CREATIVE_LOCK.md` L-17, L-18.

---

## D-010 — WebGL reserved for high-value moments; hybrid rendering
**Date:** 2026-08-26 · **Type:** Technical · **Status:** Active · **Decided by:** Owner

**Decision:** WebGL is used only where it is genuinely necessary — Beats 2, 3, 6, and the Beat 7 field. Beat 5 is DOM and CSS only. Guest-facing text is never rendered inside a shader or canvas.

**Reasoning:** A single full-screen GL context running for the entire experience costs battery, thermal headroom, and frame rate, and buys nothing in beats that are fundamentally typography. Keeping text in the DOM also protects Persian RTL shaping, legibility at any DPR, and accessibility.

**Consequences:** A hybrid renderer per beat, defined in `TECHNICAL_ARCHITECTURE.md` §3. Recorded as `CREATIVE_LOCK.md` L-19.

---

## D-011 — Three performance tiers with mandatory Static fallback
**Date:** 2026-08-26 · **Type:** Technical · **Status:** Active · **Decided by:** Owner

**Decision:** Full / Reduced / Static tiers, detected on load. The Static tier delivers the same 7 beats, same order, same copy, with no WebGL at all, and a fully functional RSVP. A blank screen is never an acceptable outcome.

**Reasoning:** The link is public and will be opened on devices nobody can predict, including old phones and in-app browsers. Performance is a creative requirement: a stuttering Signature Moment is a creative failure, not a technical footnote.

**Consequences:** Every beat must ship all three variants; a missing Static variant is a build failure. A runtime watchdog may demote Full → Reduced, but never during Beat 2. Recorded as `CREATIVE_LOCK.md` L-20, L-21 and `TECHNICAL_ARCHITECTURE.md` §7.

---

## D-012 — Beat 2 is prototyped before any other beat
**Date:** 2026-08-26 · **Type:** Process · **Status:** Active · **Decided by:** Agent proposal, owner approved

**Decision:** Implementation begins with the orchestrator skeleton plus a Beat 2 prototype, not with Beat 1.

**Reasoning:** Beat 2 carries all the concentrated risk — the shader, the 60fps requirement, and the entire emotional thesis. If it cannot be made to feel right, the structure must be reconsidered. That discovery is cheap in week one and catastrophic in week four.

**Consequences:** Phase 5 exists as a dedicated gate with a go/no-go review on a real phone. Recorded in `ROADMAP.md`.

---

## D-013 — Reference documents are the project's memory
**Date:** 2026-08-26 · **Type:** Process · **Status:** Active · **Decided by:** Owner

**Decision:** Eight reference documents at the project root are the source of truth, with the authority hierarchy defined in `PROJECT.md` §6. Contradictions are reported to the owner, never resolved unilaterally by an agent.

**Reasoning:** The project spans multiple sessions and context windows. Knowledge that lives only in a conversation is knowledge that will be lost, and a future agent with an empty context would otherwise rebuild the concept from scratch — badly.

**Consequences:** Every decision must be written down here. Session handoff requirements are defined in `DEVELOPMENT_RULES.md` §11.

---

## D-014 — Documents are written in English structure with Persian content preserved verbatim
**Date:** 2026-08-26 · **Type:** Process · **Status:** Active · **Decided by:** Agent

**Decision:** Reference documents use English for structure, rules, and technical language, while every piece of guest-facing copy is quoted in Persian exactly as written. Conversation with the owner remains in Persian.

**Reasoning:** These documents are read primarily by AI agents and potentially by other developers, where English structure is unambiguous. Persian copy is quoted rather than described so that no agent ever paraphrases, re-translates, or "improves" the couple's own words.

**Consequences:** Any agent adding copy to these files must quote it in Persian, never translate it into the surrounding English.

---

## D-015 — Stack: Vite + React + TypeScript, with hand-written WebGL instead of Three.js/R3F
**Date:** 2026-08-26 · **Type:** Technical · **Status:** Active · **Decided by:** Agent, on the owner's explicit instruction to choose the best stack for Beat 2's real needs

**Decision:** Resolves **O-04**. The build is **Vite + React + TypeScript (strict)**. The
Signature Moment renders through a small hand-written **WebGL** layer — one fragment
shader on one fullscreen triangle — rather than Three.js via React Three Fiber. GSAP and
Zustand are **not** installed.

**Reasoning:**

- *Vite over Next.js:* the piece is a single page with, eventually, one small write
  endpoint. Next.js contributes routing and rendering strategies that would go unused.
- *Raw WebGL over Three.js/R3F for this beat:* Beat 2 has no geometry, no camera, no
  lights, and no scene graph. It is two analytic light fields, a product term, and two
  arcs — all in one fragment shader. Three.js would add roughly 170 KB gzipped to serve
  none of that, against a 600 KB initial budget, and `TECHNICAL_ARCHITECTURE.md` §1 says
  to choose the lightest technology that produces the intended effect. The result is
  ~68 KB gzipped of JavaScript for the entire prototype.
- *No GSAP:* scroll drives a normalised timeline that beats read as progress. That is an
  exponential smoothing step and a set of envelope functions — around eighty lines,
  fully under our control. ScrollTrigger is built for animating documents, and this is
  explicitly not a document.
- *No Zustand:* per-frame progress must never pass through React state or the Signature
  Moment re-renders sixty times a second. The timeline is an imperative publisher and
  subscribers write to the canvas and to DOM styles directly.

**Alternatives rejected:**

- *Next.js static export* — no requirement it satisfies that Vite does not.
- *Three.js + R3F now* — cost with no return at this beat. Explicitly **not** ruled out
  later: Beats 3, 6, and 7 need instanced points and textures, and if hand-written GL
  stops paying for itself there, Three.js can be introduced and lazily loaded for those
  beats without touching this one. The beat registry exists so that is a local change.
- *Dropping React* — tempting at this size, but `TECHNICAL_ARCHITECTURE.md` §2 recommends
  it and later beats (RSVP inputs, the invitation's typography) genuinely want a
  component model. Removing it would be a deviation with no urgency behind it.

**Consequences:** `TECHNICAL_ARCHITECTURE.md` §2 updated and its status moved from
PROPOSED to ACTIVE. **O-04 removed from `CREATIVE_LOCK.md` §9.** Three dependencies
ship: `react`, `react-dom`, and a provisional typeface (D-016). If a later beat needs
Three.js, that is a new decision, not an assumption.

---

## D-016 — Beat 2 prototyped against provisional wording, tokens, and typeface
**Date:** 2026-08-26 · **Type:** Process · **Status:** Active · **Decided by:** Agent, on the owner's explicit instruction to begin Phase 5

**Decision:** The Signature prototype was built with **O-01, O-11, and O-09 still open**,
using clearly-marked provisional values, each isolated to a single file so that resolving
the open item is a one-file change:

| Open item | Provisional value | Lives in |
|---|---|---|
| O-01 thesis wording | quoted verbatim from `CREATIVE_DNA.md` §6 | `src/beats/02-the-between/copy.ts` |
| O-11 colour tokens | obsidian `#0A0A0B`, violet, rose-pearl, three-step gold ramp | `src/core/tokens/tokens.ts` |
| O-09 typeface | Vazirmatn Variable, OFL-1.1, self-hosted, subset-gated | `src/core/tokens/tokens.css` |

**Reasoning:** `TECHNICAL_ARCHITECTURE.md` §12 makes all four Gate A items prerequisites
for this phase, and argues specifically that prototyping Beat 2 against placeholder
wording "tests the wrong thing". The owner instructed the agent to proceed and to use the
provisional wording. That instruction is the owner exercising final creative authority,
which outranks the gate. Recording it here rather than quietly relaxing the gate.

The typeface is the weakest part of this. O-09 asks for a *selection and licensing*
decision; Vazirmatn is a defensible provisional choice — free, OFL, self-hosted, real
Persian design, light weights available — but it was chosen by an agent for the sake of
having something credible to judge the typography against, not selected on merit against
alternatives. **It is not a resolution of O-09.**

**Alternatives rejected:** Stopping and reporting Gate A as a blocker — the owner had
already answered that. A system font stack — Persian system faces vary enough between iOS,
Android, and Windows that the owner would have been judging a different typeface on every
device he tested.

**Consequences:** O-01, O-09, and O-11 remain **OPEN** in `CREATIVE_LOCK.md` §9. The
prototype must not be treated as a typography or colour approval. Whatever the owner
decides for these three, none of them requires touching render code.

---

## D-017 — Beat 2's internal timing restructured; the thesis is delivered in three reveals
**Date:** 2026-08-26 · **Type:** Creative · **Status:** Active · **Decided by:** Agent, during implementation

**Decision:** Two refinements to the Beat 2 working specification in `CREATIVE_LOCK.md` §4,
both within the "internal execution details may be refined during implementation" latitude
that section grants:

1. The thesis is revealed as **three successive reveals** (2 lines, 1 line, 2 lines) with
   earlier lines releasing, rather than five lines accumulating on screen.
2. Gold's **filament and the text never coexist.** The seam forms as the presences stop
   closing, then softens to almost nothing before the first line appears.

**Reasoning:** Both were found by looking at the rendered frames, not by reasoning.

The gap between two presences that never merge is narrow by definition. Five simultaneous
lines need roughly twice that height, so the presences would have had to separate to make
room — the composition serving the typography instead of the reverse.

The second is more serious. With the seam still lit behind the text, the frame read as
*text with a gold rule under it* — which is precisely the wedding-invitation divider the
whole project exists to avoid. It failed the template test on sight.

A consequence: the beat's estimated duration moves to ~36s, just past the provisional
28–35s band, so that the bond tail keeps its specified 8–10s and «ولی برای هم.» still gets
to rest on screen. §3 permits per-beat tuning while the 90–150s total holds, and it holds.

**Consequences:** `CREATIVE_LOCK.md` §4 is unchanged — this is execution detail, not a
lock change. If the owner wants all five lines held together, the gap must widen and the
approach will read as less close; that is a real trade and his call.

---

## D-018 — Held-breath gap; bond as a single off-centre flash
**Date:** 2026-08-26 · **Type:** Creative · **Status:** Active · **Decided by:** Agent, during quality review of the Beat 2 prototype

**Decision:** Two execution refinements to Beat 2, within the same latitude as D-017:

1. `HALF_GAP_NEAR` moves from 0.255 to 0.205 so the presences stop close enough that
   the remaining space reads as a held breath, not as lights in a header and footer
   with copy in the middle.
2. The bond tail's flash becomes the event: arcs recede as a single off-centre point
   ignites. They must not read as an S-flourish or as two tips connected by a curve.

**Reasoning:** Reviewed on a 390×844 viewport. At 0.255 the composition failed the
template test — two distant orbs with centred Persian type is a poster, which is the
layout every wedding template already owns. The Signature Moment is *proximity without
collapse*; that only reads if they have almost met.

The previous bond read as two golden points joined by a wave. That is a decorative
flourish, not "two asymmetric arcs touching tangentially." One point of light, off-centre,
is the meeting.

**Alternatives rejected:** Leaving the gap wide so five lines could someday fit — D-017
already chose three successive reveals for that reason. Brightening the flash into a
lens flare — that is an effect, not an event.

**Consequences:** `CREATIVE_LOCK.md` §4 is unchanged. Tune `HALF_GAP_NEAR` in
`src/beats/02-the-between/config.ts` if the owner wants them closer still or further
apart. Do not lower it far enough that the cores overlap.

---

## OPEN DECISIONS

Items awaiting a decision are tracked in `CREATIVE_LOCK.md` §9 and the blocking subset is listed in `ROADMAP.md`. When one is resolved, add a `D-xxx` entry here and remove it from the open list.

**Resolved so far:** O-04 → D-015.

---

_Last updated: 2026-08-26_
