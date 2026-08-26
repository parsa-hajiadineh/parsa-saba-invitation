# ROADMAP.md — PARSA & SABA

> **AUTHORITY RANK 5.**
> Where the project is, and what happens next.
> This file must be updated at the end of every working session. If it is stale, everything downstream is wrong.

---

## CURRENT STATUS

```
PHASE:        5 — Signature prototype                   [5.1–5.6 BUILT · 5.7 NOT DONE]
CODE:         Beat 2 prototype runs. Orchestrator, tier system, three tier variants.
DEPENDENCIES: react, react-dom, @fontsource-variable/vazirmatn (provisional)
              dev only: vite, typescript, @vitejs/plugin-react, type packages
DECIDED:      O-04 → D-015 (Vite + React + TS, hand-written WebGL)
              D-018 — closer held-breath gap; bond as a single off-centre flash
BLOCKED ON:   nothing, to keep reviewing Beat 2
              O-01 / O-09 / O-11 before Beat 2 can be signed off as final
              real-device review before Beat 2 can be called done at all
```

**As of 2026-08-26.**

---

## THE NEXT STEP

> **Phase 5, Step 5.7 — open the prototype on a real phone and make the go / no-go call.**
>
> Everything below this line is unverified until that happens. `DEVELOPMENT_RULES.md` §5
> is explicit: a beat that looks correct in a phone-sized desktop viewport but has never
> been opened on a physical phone is **not done**. What can only be learned there:
>
> 1. **Does it feel right?** The go / no-go on the Signature Moment. Owner's call, on a phone.
> 2. **Frame rate.** Never measured on real GPU hardware. Beat 2's budget is 60fps sustained.
> 3. **Scroll feel.** `SCROLL_VIEWPORTS` and `SCROLL_SMOOTHING` in the beat's `config.ts`
>    were chosen by reasoning, not by thumb. Momentum and touch latency cannot be emulated.
> 4. **Outdoor legibility.** Thin light type on obsidian, in daylight, one-handed.
> 5. **Safari's address bar** resizing the viewport mid-scroll.
>
> In parallel, and not blocking: **O-01** the final wording · **O-11** colour tokens ·
> **O-09** typeface · and Gate B collection — **O-02** event details · **O-03** photographs ·
> **O-08** music.

Beat 2 was built before Beat 1 deliberately (**D-012**): it carries all the concentrated
risk, so if it cannot be made to feel right the structure must be reconsidered now rather
than in week four. That question is still open until step 5.7 happens on a phone.

---

## PHASES

### Phase 1 — Creative analysis · COMPLETE

Deep critique of the original brief. Contradictions, weaknesses, and missing decisions identified. Ten creative improvements proposed. Preserve/open boundaries defined.

### Phase 2 — Creative development · COMPLETE

Experience rebuilt from 11 scenes to 7 beats. Signature Moment identified and selected. Memory treatment, RSVP treatment, audio direction, language policy, and interaction model proposed.

### Phase 3 — Project memory & creative lock · COMPLETE

Eight reference documents created. Source-of-truth hierarchy established. Creative Lock v1.0 recorded.

### Phase 4 — Pre-production · PARTIAL

**Status:** The owner instructed Phase 5 to begin with Gate A incomplete (**D-016**). O-04 is resolved. O-01, O-11, and O-09 remain open and are prototyped against provisional values. Gate B is untouched.

**Exit criteria for completing Phase 4:** remaining Gate A items decided, Gate B cleared, and all assets in hand. This no longer blocks the Beat 2 prototype.

| Step | Work | Gate | Depends on |
|---|---|---|---|
| 4.1 | Stack approval — Vite vs Next.js, R3F vs raw Three.js (O-04) | **A** | **Done — D-015** |
| 4.2 | Final Persian wording of the core thesis (O-01) | **A** | Owner |
| 4.3 | Design tokens: obsidian, violet, rose, gold, type scale, easing (O-11) | **A** | Agent proposal → owner |
| 4.4 | Select and license typefaces; verify Persian glyph coverage (O-09) | **A** | Agent proposal → owner |
| 4.5 | Event details: date, time, venue, address, dress code (O-02) | B | Owner |
| 4.6 | Curate and grade the 8–12 photographs; author depth layers (O-03) | B | Owner supplies |
| 4.7 | Source or commission the audio; export stems (O-08) | B | Owner |
| 4.8 | Decide RSVP backend and Afterglow moderation policy (O-05, O-07) | B | Owner |
| 4.9 | Decide hosting, domain, QR target (O-06) | B | Owner |

Steps 4.5–4.9 run **in parallel** with Phase 5. They do not block the prototype.

### Phase 5 — Signature prototype · IN PROGRESS

**Entry criteria:** originally Gate A cleared. Started under **D-016** with O-01 / O-09 / O-11 still open.
**Exit criteria:** Beat 2 runs at 60fps on a real iPhone and is judged emotionally correct by the owner, on a phone.

| Step | Work | Status |
|---|---|---|
| 5.1 | Project scaffold, TypeScript, chosen build tool | Done |
| 5.2 | Orchestrator skeleton: scroll → normalised timeline → per-beat progress | Done |
| 5.3 | Performance tier detection | Done |
| 5.4 | **Beat 2 prototype** — dual light fields, gold-in-the-gap shader | Done |
| 5.5 | Core thesis typography in the gap, Persian, RTL | Done on desktop; **real device is 5.7** |
| 5.6 | Bond tail (asymmetric arcs, off-centre touch) | Done |
| 5.7 | Real-device review; go / no-go on the Signature Moment | **Not done** |

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
| O-04 | Stack approval | **A** | ~~All implementation~~ | **Resolved — D-015** |
| O-01 | Final Persian wording of the core thesis | **A** | Beat 2 sign-off (not the prototype itself) | Parsa |
| O-11 | Design tokens | **A** | Beat 2 sign-off (provisional values in use) | Agent proposal → owner |
| O-09 | Typefaces and licensing | **A** | Beat 2 sign-off (Vazirmatn is provisional) | Agent proposal → owner |
| O-02 | Event details (date, time, venue) | B | Beat 5, launch | Parsa |
| O-03 | The photographs | B | Beats 3 and 4 | Parsa |
| O-05 | RSVP backend choice | B | Beat 7 | Parsa |
| O-06 | Hosting, domain, QR target | B | Launch | Parsa |
| O-07 | Live guest messages + moderation policy | B | Beat 6 | Parsa |
| O-08 | Music sourcing and budget | B | Audio, pacing | Parsa |

Gate A no longer blocks the Beat 2 prototype (**D-016**). O-01 / O-09 / O-11 still block treating Beat 2 as final. Gate B blocks Phase 6 onward. Definitions: `TECHNICAL_ARCHITECTURE.md` §12.

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
