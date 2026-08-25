# ROADMAP.md — PARSA & SABA

> **AUTHORITY RANK 5.**
> Where the project is, and what happens next.
> This file must be updated at the end of every working session. If it is stale, everything downstream is wrong.

---

## CURRENT STATUS

```
PHASE:        3 — Project Memory & Creative Lock        [COMPLETE]
NEXT PHASE:   4 — Pre-production                        [NOT STARTED]
CODE:         none written
DEPENDENCIES: none installed
BLOCKED ON:   Gate A — O-04, O-01, O-11, O-09 (see §Blockers)
```

**As of 2026-08-26.**

---

## THE NEXT STEP

> **Phase 4, Step 4.1 — clear Gate A so the Signature prototype can begin.**
>
> Gate A is the minimum set required before any code is written. It is defined in `TECHNICAL_ARCHITECTURE.md` §12:
>
> 1. **O-04** — stack approval: Vite vs Next.js, React Three Fiber vs raw Three.js
> 2. **O-01** — the final Persian wording and line breaks for the Beat 2 core thesis
> 3. **O-11** — design tokens: the actual obsidian, violet, rose, and gold values
> 4. **O-09** — Persian typeface selection
>
> In parallel, and not blocking Gate A, the owner should begin collecting:
> **O-02** event details · **O-03** the photographs · **O-08** music direction and budget
>
> **No production code is written until all four Gate A items are resolved.**

The first thing to be built once approved is **not** Beat 1. It is the **orchestrator skeleton plus a Beat 2 prototype**, because Beat 2 is the Signature Moment and carries all the technical and creative risk. If Beat 2 cannot be made to feel right, the entire structure must be reconsidered — and that must be discovered in week one, not week four.

---

## PHASES

### Phase 1 — Creative analysis · COMPLETE

Deep critique of the original brief. Contradictions, weaknesses, and missing decisions identified. Ten creative improvements proposed. Preserve/open boundaries defined.

### Phase 2 — Creative development · COMPLETE

Experience rebuilt from 11 scenes to 7 beats. Signature Moment identified and selected. Memory treatment, RSVP treatment, audio direction, language policy, and interaction model proposed.

### Phase 3 — Project memory & creative lock · COMPLETE

Eight reference documents created. Source-of-truth hierarchy established. Creative Lock v1.0 recorded.

### Phase 4 — Pre-production · NOT STARTED ← **WE ARE HERE**

**Exit criteria for moving to Phase 5:** Gate A cleared (O-04, O-01, O-11, O-09).
**Exit criteria for completing Phase 4:** Gate B also cleared and all assets in hand.

| Step | Work | Gate | Depends on |
|---|---|---|---|
| 4.1 | Stack approval — Vite vs Next.js, R3F vs raw Three.js (O-04) | **A** | Owner |
| 4.2 | Final Persian wording of the core thesis (O-01) | **A** | Owner |
| 4.3 | Design tokens: obsidian, violet, rose, gold, type scale, easing (O-11) | **A** | Agent proposal → owner |
| 4.4 | Select and license typefaces; verify Persian glyph coverage (O-09) | **A** | Agent proposal → owner |
| 4.5 | Event details: date, time, venue, address, dress code (O-02) | B | Owner |
| 4.6 | Curate and grade the 8–12 photographs; author depth layers (O-03) | B | Owner supplies |
| 4.7 | Source or commission the audio; export stems (O-08) | B | Owner |
| 4.8 | Decide RSVP backend and Afterglow moderation policy (O-05, O-07) | B | Owner |
| 4.9 | Decide hosting, domain, QR target (O-06) | B | Owner |

Steps 4.5–4.9 run **in parallel** with Phase 5. They do not block the prototype.

### Phase 5 — Signature prototype · NOT STARTED

**Entry criteria:** Gate A cleared. **This is the first phase in which code is written.**
**Exit criteria:** Beat 2 runs at 60fps on a real iPhone and is judged emotionally correct by the owner, on a phone.

| Step | Work |
|---|---|
| 5.1 | Project scaffold, TypeScript, chosen build tool |
| 5.2 | Orchestrator skeleton: scroll → normalised timeline → per-beat progress |
| 5.3 | Performance tier detection |
| 5.4 | **Beat 2 prototype** — dual light fields, gold-in-the-gap shader |
| 5.5 | Core thesis typography in the gap, Persian, RTL, real device |
| 5.6 | Bond tail (asymmetric arcs, off-centre touch) |
| 5.7 | Real-device review; go / no-go on the Signature Moment |

**This is the project's highest-risk gate.** Everything after it is comparatively routine.

### Phase 6 — Beat build-out · NOT STARTED

Built in this order, for a reason:

| Order | Beat | Why this order |
|---|---|---|
| 1 | Beat 1 ورود | Establishes the entry and audio unlock, both of which every later beat depends on |
| 2 | Beat 6 پس‌نور | The light field it introduces is reused by Beat 7 |
| 3 | Beat 7 هدیهٔ نور | RSVP is the second-highest-risk piece and needs backend time |
| 4 | Beat 5 دعوت | Pure typography, low risk, but the invitation must be correct |
| 5 | Beat 3 کهکشانِ یاد | Needs the photographs to exist first |
| 6 | Beat 4 اکنونِ ما | Needs the contemporary photograph |

### Phase 7 — Integration and pacing · NOT STARTED

The whole arc assembled end to end. Timing, transitions, and audio sync tuned against the 90–150s target. This is where the piece either breathes or feels rushed — reserve real time for it.

### Phase 8 — Degradation and hardening · NOT STARTED

Reduced and Static tiers completed for all beats. Full device matrix. Audio-blocked path. Slow-network path. RSVP failure and retry path. Outdoor daylight legibility check.

### Phase 9 — Launch · NOT STARTED

Deploy, generate and test the QR code on multiple phones, verify the RSVP write path end to end with a real submission, and confirm the owner can read responses.

### Phase 10 — Live period · NOT STARTED

Monitor submissions. If the Afterglow field shows live guest messages, watch moderation. Be ready to hotfix during the days the invitation is actually circulating — that window is short and unforgiving.

---

## BLOCKERS

| ID | Blocker | Gate | Blocks | Owner |
|---|---|---|---|---|
| O-04 | Stack approval | **A** | All implementation | Parsa |
| O-01 | Final Persian wording of the core thesis | **A** | Beat 2 | Parsa |
| O-11 | Design tokens | **A** | All visual work | Agent proposal → owner |
| O-09 | Typefaces and licensing | **A** | Design tokens, all typography | Agent proposal → owner |
| O-02 | Event details (date, time, venue) | B | Beat 5, launch | Parsa |
| O-03 | The photographs | B | Beats 3 and 4 | Parsa |
| O-05 | RSVP backend choice | B | Beat 7 | Parsa |
| O-06 | Hosting, domain, QR target | B | Launch | Parsa |
| O-07 | Live guest messages + moderation policy | B | Beat 6 | Parsa |
| O-08 | Music sourcing and budget | B | Audio, pacing | Parsa |

Gate A blocks the start of Phase 5. Gate B blocks Phase 6 onward. Definitions: `TECHNICAL_ARCHITECTURE.md` §12.

Full list including non-blocking open items: `CREATIVE_LOCK.md` §9.

---

## RISK REGISTER

| Risk | Impact | Mitigation |
|---|---|---|
| Beat 2 does not feel emotionally right | Fatal to the concept | Prototype it first, in Phase 5, before anything else |
| Photographs arrive late or are unusable | Beats 3–4 stall | Build those beats against placeholders with the correct grade and aspect ratios |
| Performance on older iPhones | Signature Moment stutters | Tier system; Beat 2 is never demoted mid-session |
| Scope creep into "more effects" | Violates restraint principle | The four tests in `DEVELOPMENT_RULES.md` §4 |
| Event date arrives before the piece is ready | Project fails by definition | Once **O-02** is known, work backwards and set a hard freeze date |
| Guest confusion — people not knowing to scroll | Invitation never read | Test with a non-technical family member early, on their own phone |
| Public link abuse in the Afterglow field | Distressing for the couple | Resolve **O-07** before Beat 6 ships |

---

## WHAT IS DELIBERATELY NOT ON THIS ROADMAP

- Multi-language toggle
- Per-guest personalised links (v1 is a public link, L-03)
- Photo gallery / "view all photos" mode
- Guestbook browsing UI
- Any admin dashboard beyond the owner reading the raw responses
- Device-orientation interaction (L-18)

If any of these are wanted, they are a **v2 conversation**, and must go through the decision process — not be absorbed quietly into the current build.

---

_Last updated: 2026-08-26_
