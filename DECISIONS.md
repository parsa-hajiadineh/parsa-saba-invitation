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

## OPEN DECISIONS

Items awaiting a decision are tracked in `CREATIVE_LOCK.md` §9 (**O-01** … **O-15**) and the blocking subset is listed in `ROADMAP.md`. When one is resolved, add a `D-xxx` entry here and remove it from the open list.

---

_Last updated: 2026-08-26_
