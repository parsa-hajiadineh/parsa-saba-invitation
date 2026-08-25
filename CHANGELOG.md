# CHANGELOG.md — PARSA & SABA

> **AUTHORITY RANK 7.**
> History of what changed, when, and why. Newest first.

---

## How to use this file

- Add an entry at the **end of every working session**, even if the only output was a decision or a conversation.
- Newest entries go at the top.
- Reference decision IDs (`D-xxx`), open item IDs (`O-xx`), and lock items (`L-xx`) rather than restating them.
- Keep entries short. Reasoning belongs in `DECISIONS.md`; this file answers *"what happened and when"*.

### Categories

`Added` · `Changed` · `Decided` · `Locked` · `Unlocked` · `Removed` · `Blocked` · `Fixed`

### Entry format

```
## YYYY-MM-DD — <session summary>
**Phase:** <phase at end of session>

### Added
- ...

### Decided
- D-xxx: ...

### Blocked
- O-xx: ...

**Next step at time of writing:** <one sentence>
```

---

## 2026-08-26 — Phase 3: project memory and Creative Lock v1.0
**Phase at end of session:** 3 complete, 4 not started

### Added
- `PROJECT.md` — entry point, source-of-truth hierarchy, contradiction protocol, current phase
- `CREATIVE_DNA.md` — immutable artistic identity, two governing laws, blacklist, anti-cliché tests, deviation protocol
- `CREATIVE_LOCK.md` — Creative Lock v1.0: 30 locked items, 7-beat specification, memory / RSVP / audio / language / interaction / visual specs, 15 open items
- `TECHNICAL_ARCHITECTURE.md` — proposed stack, hybrid rendering strategy, beat module contract, performance tiers, asset pipeline, budgets
- `DEVELOPMENT_RULES.md` — prohibitions, stop-and-ask triggers, the four tests, definition of done, real-device testing matrix, handoff rules
- `ROADMAP.md` — phases 1–10, current status, blockers, risk register, explicit non-goals
- `DECISIONS.md` — D-001 to D-014 with reasoning and rejected alternatives
- `CHANGELOG.md` — this file

### Locked
- Creative Lock **v1.0** — L-01 through L-30
- 7-beat structure: ورود · میانِ ما ★ · کهکشانِ یاد · اکنونِ ما · دعوت · پس‌نور · هدیهٔ نور
- Duration budget: 90–150s main path, ~2–2.5 minutes full

### Decided
- D-003: 11 scenes reduced to 7 beats
- D-004: "میانِ ما / The Between" selected as the Signature Moment
- D-005: Constellation of Memory replaces any chronological timeline
- D-006: RSVP as an offering of light
- D-007: instrumental-only audio — overrides the original allowance for international vocal music
- D-010: WebGL reserved for high-value moments; hybrid rendering per beat
- D-012: Beat 2 is prototyped before any other beat

### Blocked
- **Gate A** (blocks any code): O-04 stack · O-01 core thesis wording · O-11 design tokens · O-09 typefaces
- **Gate B** (blocks Phase 6 onward): O-02 event details · O-03 photographs · O-05 RSVP backend · O-06 hosting and QR target · O-07 live messages and moderation · O-08 music sourcing

### Fixed
- Read-back review of all eight documents found and corrected six internal contradictions: an inverted authority-hierarchy statement in `PROJECT.md`; a phase-numbering mismatch between `PROJECT.md` and `ROADMAP.md`; conflicting implementation prerequisites between `TECHNICAL_ARCHITECTURE.md` §12 and `ROADMAP.md`, resolved by splitting them into Gate A and Gate B; the term "gate" used for two different concepts; a `scenes/` vs `beats/` folder-naming inconsistency; and a stale section reference in `CREATIVE_DNA.md`
- Clarified that "excessive particles" on the blacklist does not forbid the narratively justified RSVP dissolve
- Added an audio tail requirement, since a guest-controlled Beat 7 can outlast the ~2:30 composition

### Not done, deliberately
- No production code written
- No dependencies installed
- No project scaffold created

**Next step at time of writing:** Phase 4, Step 4.1 — clear Gate A. No code until O-04, O-01, O-11, and O-09 are resolved.

---

## 2026-08-26 — Phase 2: creative development
**Phase at end of session:** 2 complete

### Changed
- Experience rebuilt from the original 11 scenes to 7 beats with full per-beat specifications
- "The Journey" absorbed into The Invitation
- "The Ring" reduced from a standalone scene to an abstract tail of the Signature Moment
- "A Decade in Fragments" replaced by Constellation of Memory

### Added
- Three Signature Moment candidates proposed and evaluated; "The Between" selected
- Three memory treatments proposed; Constellation selected
- RSVP experience designed as "هدیهٔ نور / Offering of Light"
- Full audio direction: genre, tempo, instrumentation per beat, emotional progression, deliberate silences
- Language policy: Persian-first hybrid, restrained
- Interaction model: scroll-primary, bounded optional tap

### Decided
- Instrumental-only audio recommended over international vocal music (later recorded as D-007)
- Device-orientation interaction recommended for exclusion from v1 (later recorded as D-009)

---

## 2026-08-26 — Phase 1: creative analysis
**Phase at end of session:** 1 complete

### Added
- Deep critique of the original brief
- Contradictions identified: restraint vs WebGL ambition; gold-as-identity vs gold-as-decoration; Persian audience vs foreign-language music; multiple interaction modalities without hierarchy
- Missing decisions surfaced: total duration, language, audio unlock flow, personalisation, accessibility, link privacy
- Ten creative improvements proposed
- MUST PRESERVE / SHOULD PRESERVE / OPEN boundaries defined
- High-level architecture, beat-module isolation strategy, and performance-tier approach proposed

---

_Last updated: 2026-08-26_
