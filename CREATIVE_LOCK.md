# CREATIVE_LOCK.md — PARSA & SABA

> **AUTHORITY RANK 2.**
> Locked creative decisions. Subordinate only to `CREATIVE_DNA.md`.
> Items marked **LOCKED** may not be changed by an agent. Items marked **OPEN** are still to be decided.

**Lock version:** `v1.0` · **Locked on:** 2026-08-26

---

## 1. Unlock protocol

To change a LOCKED item:

1. The **project owner must explicitly request or approve** the change. An agent may propose, never decide.
2. The proposal must use the deviation protocol in `CREATIVE_DNA.md` §10 (7 points).
3. Once approved: update this file, bump the lock version, add an entry to `DECISIONS.md`, add a line to `CHANGELOG.md`.
4. Check downstream impact on `TECHNICAL_ARCHITECTURE.md` and `ROADMAP.md`.

An agent that finds a LOCKED item inconvenient must **report the problem**, not route around it.

---

## 2. LOCKED — foundational decisions

| # | Decision | Status |
|---|---|---|
| L-01 | Mobile-first is an absolute principle | LOCKED |
| L-02 | Accessed via QR code | LOCKED |
| L-03 | Public link (no per-guest tokens in v1) | LOCKED |
| L-04 | No voice-over, anywhere | LOCKED |
| L-05 | Instrumental cinematic audio only — no vocals in any language | LOCKED |
| L-06 | Persian-first copy | LOCKED |
| L-07 | No wedding SaaS aesthetics | LOCKED |
| L-08 | No generic wedding effects | LOCKED |
| L-09 | No hearts | LOCKED |
| L-10 | No confetti | LOCKED |
| L-11 | No decorative gold overload | LOCKED |
| L-12 | No literal fire or water imagery | LOCKED |
| L-13 | No 3D wedding ring cliché | LOCKED |
| L-14 | Memory is fragmented, not chronological | LOCKED |
| L-15 | RSVP is experiential, not a conventional form | LOCKED |
| L-16 | Guest message becomes a point of light | LOCKED |
| L-17 | Scroll is the primary progression input | LOCKED |
| L-18 | Device-orientation interaction is excluded from v1 | LOCKED |
| L-19 | WebGL is reserved for high-value moments only | LOCKED |
| L-20 | Graceful degradation is mandatory | LOCKED |
| L-21 | Performance is a **creative** requirement, not only a technical one | LOCKED |
| L-22 | Gold does not appear as a primary visual identity before Convergence | LOCKED |
| L-23 | Gold must be the result of Parsa + Saba connecting | LOCKED |
| L-24 | 7 beats, in the order listed in §4 | LOCKED |
| L-25 | Signature Moment is "میانِ ما / The Between" | LOCKED |
| L-26 | Bond/Ring exists only as a short abstract tail of the Signature Moment | LOCKED |
| L-27 | Memory treatment is "Constellation of Memory" | LOCKED |
| L-28 | 8–12 carefully selected photographs | LOCKED |
| L-29 | RSVP captures attendance (yes/no) **and** a short message | LOCKED |
| L-30 | Optional exploration must never be required to understand the invitation | LOCKED |

---

## 3. LOCKED — duration budget

| Segment | Target |
|---|---|
| Main experience (linear path, no optional interaction, no RSVP) | **~90–150 seconds** |
| Full experience including optional interaction and RSVP | **~2–2.5 minutes** |

RSVP may extend the experience naturally beyond this; the guest controls how long they spend writing.

Per-beat durations in §4 are **provisional targets** used for planning. They may be tuned during implementation **as long as the totals above hold**.

---

## 4. LOCKED — beat list

The **names, order, and count** are LOCKED. The internal execution details below are the working specification and may be refined during implementation without an unlock, provided they do not violate `CREATIVE_DNA.md` or any L-item above.

| # | Beat | Provisional duration | Technical intensity |
|---|---|---|---|
| 1 | **ورود** / Threshold & Presence | 18–22s | Medium |
| 2 | **میانِ ما** / The Between ★ **SIGNATURE** | 28–35s | High |
| 3 | **کهکشانِ یاد** / Constellation of Memory | 22–28s (+ up to 20s optional) | Medium |
| 4 | **اکنونِ ما** / Us — Now | 12–16s | Low–Medium |
| 5 | **دعوت** / The Invitation | 18–22s | Low |
| 6 | **پس‌نور** / Afterglow | 10–14s | Low |
| 7 | **هدیهٔ نور** / RSVP | 35–60s (guest-controlled) | Low–Medium |

Linear sum of beats 1–6: **108–137s** → inside the 90–150s target.

---

### BEAT 1 — ورود / Threshold & Presence

| | |
|---|---|
| **Narrative purpose** | Cross from darkness into the presence of two distinct beings. |
| **Intended feeling** | Anticipation, intimacy, calm awe. |
| **Visual language** | Obsidian black. Violet mist enters from one side, rose breath from the other. No characters, no icons, no logo animation. |
| **Motion** | Very slow drift. A breathing scale cycle of roughly 3–4 seconds. |
| **Interaction** | Scroll begins the awakening. The **first scroll or touch is the audio unlock covenant**. |
| **Typography / copy** | Only `Parsa & Saba`, small, lower third, wide letter-spacing. Disappears after ~3s. |
| **Audio** | ~0.5s of silence on black, then a single low note / room tone emerges on first input. |
| **Transition out** | The two lights begin moving toward each other; cut into Beat 2. |
| **Why this beat is necessary** | Threshold and "Two Presences" are merged here deliberately. A QR arrival must become emotional immediately — it must never feel like a loading screen or a landing page. |

---

### BEAT 2 — میانِ ما / The Between ★ SIGNATURE MOMENT

| | |
|---|---|
| **Narrative purpose** | The true convergence: gold emerges in the conscious space between two identities that do not dissolve into each other. |
| **Intended feeling** | Restrained awe → recognition → quiet overwhelm. |
| **Visual language** | Two abstract light fields (violet, rose) approach. They **never merge**. A subtle gold halo forms **only in the gap between them**. Never on either presence. |
| **Motion** | Scroll controls the distance between the presences. Slower scrolling yields more readable gold. |
| **Interaction** | Scroll is primary. Optional discovery: pausing for ~1s lets the gold stabilise. This is discovered, never instructed. |
| **Typography / copy** | The core emotional thesis, revealed line by line in the gap. Text emits light; it is never placed on a card or panel. **Exact wording and line breaks: OPEN — see §9.** |
| **Audio** | Strings / synth pad swell, peaking on the final line, then a partial fade. |
| **Transition out** | Gold dissolves upward into scattered points, which become the constellation of Beat 3. |
| **Bond tail** | The final ~8–10s of this beat: two asymmetric arcs of light touch tangentially, producing a single controlled gold flash. Abstract phenomenon only. **Not a ring. Not symmetrical. Touch point off-centre.** |
| **Why this beat is necessary** | It is the emotional and visual thesis of the entire piece, delivered in one moment. |

**Failure conditions for this beat — any of these means it must be rebuilt:**
- The gap reads as a heart shape
- It reads as generic gold particles
- It reads as a wedding ring animation
- It reads as a flashy shader demo
- Gold leaks visibly before the apex

---

### BEAT 3 — کهکشانِ یاد / Constellation of Memory

| | |
|---|---|
| **Narrative purpose** | Convey roughly ten years together **without** a timeline. Memory as it actually works: fragmentary, non-linear, emotional. |
| **Intended feeling** | Nostalgia without sentimentality. Distant warmth. |
| **Visual language** | 8–12 photographs as points of light in a dark void, desaturated until illuminated. **No frames. No cards. No carousel. No captions. No dates. No years.** |
| **Motion** | Scroll pans the constellation. Fragments pulse into focus for ~1.5–2s each, then release. |
| **Interaction** | Core path is scroll only. Optional bounded interaction: tap-and-hold a fragment for ~3s of deeper parallax. Bounded — never free roaming. |
| **Typography / copy** | None, or at most one floating word, dismissed quickly. |
| **Audio** | Music thins out. Sparse single piano notes with silence between them. |
| **Transition out** | Fragments collapse toward one present moment → Beat 4. |
| **Why this beat is necessary** | It is the proof of a shared life. Without it the piece is beautiful but unearned. |

**Photo curation rule:** select for **emotional diversity**, not for decade coverage. It is correct for three photos to come from the same year and none from another.

---

### BEAT 4 — اکنونِ ما / Us — Now

| | |
|---|---|
| **Narrative purpose** | Shift from past tense to present tense. "We are still here." |
| **Intended feeling** | Grounded intimacy. Confidence. |
| **Visual language** | A single contemporary photograph, cinematically graded, with subtle 2.5D depth separation. |
| **Motion** | Barely perceptible drift — a living portrait, not an animation. |
| **Interaction** | Scroll continues. No tap required. |
| **Typography / copy** | Minimal or none. **OPEN.** |
| **Audio** | Music returns gently with a fuller texture. |
| **Transition out** | The photograph recedes into black; practical information emerges. |
| **Why this beat is necessary** | It is the pivot from memory to invitation. Without it, Beat 5 arrives as an abrupt administrative interruption. |

---

### BEAT 5 — دعوت / The Invitation

| | |
|---|---|
| **Narrative purpose** | Deliver the practical invitation with honour. The "Journey" idea is absorbed here rather than existing as its own beat. |
| **Intended feeling** | Clarity, honour, welcome. |
| **Visual language** | Editorial layout on black. Gold used **only as a micro-accent** — a single divider or the date. Nothing else gold. |
| **Motion** | Staggered fades, roughly 200ms apart. No slide-ins. Nothing that reads as "website animation". |
| **Interaction** | Scroll. Optionally, tapping the date opens a calendar deep link. |
| **Typography / copy** | Persian primary. Date, venue, time. **Actual event details: NOT YET PROVIDED — see §9.** |
| **Audio** | Stable, warm bed. Not a climax. |
| **Transition out** | Text fades; a field of faint lights appears. |
| **Why this beat is necessary** | The guest must leave knowing when and where. This is non-negotiable utility and outranks any aesthetic preference. |

---

### BEAT 6 — پس‌نور / Afterglow

| | |
|---|---|
| **Narrative purpose** | Emotional decompression before being asked for something. |
| **Intended feeling** | Peace, openness, belonging. |
| **Visual language** | A field of existing points of light. Where a live backend is available these represent previous guests' messages; otherwise abstract placeholders. |
| **Motion** | Slow drift. Breathing. Nearly stationary. |
| **Interaction** | Scroll slows almost to rest. |
| **Typography / copy** | A soft invitation toward the RSVP. |
| **Audio** | Fades to near-silence over the last ~5s. |
| **Transition out** | One light pulses gently at centre → Beat 7. |
| **Why this beat is necessary** | The RSVP must feel like a continuation of the artwork, not a form appearing out of nowhere. |

---

### BEAT 7 — هدیهٔ نور / RSVP

Full specification in §6.

---

## 5. LOCKED — Memory treatment

**Chosen approach: Constellation of Memory.**

Photographs behave as fragments of memory / points of light in a dark field. Scroll illuminates them. Optional bounded interaction allows deeper exploration of a single fragment.

**Explicitly rejected alternatives** (do not reintroduce without an unlock):
- *Depth Drift* — one full-bleed photo morphing to the next. Rejected as too linear.
- *Layered Glass* — photos revealed by moving a finger over obsidian glass. Rejected as too touch-heavy; risks feeling like a game.

**Constraints:**
- 8–12 photographs, curated
- No chronology, no carousel, no cards, no frames, no white borders, ever
- Unified colour grade (single LUT) across all fragments
- Maximum ~2s of full visibility per fragment on the linear path
- Black dominates the frame at all times

---

## 6. LOCKED — RSVP treatment: "هدیهٔ نور / Offering of Light"

**Principle:** the RSVP is an act of leaving something in their sky. It is not data entry.

### Step 1 — Presence question (~8s)

- Screen: the Afterglow field continues.
- Copy: **«در این روز کنار ما خواهید بود؟»**
- Two answers, positioned as regions rather than buttons:
  - **«می‌آیم»** — violet-leaning side; selection produces a warm violet pulse
  - **«نمی‌توانم»** — rose-leaning side; selection produces a soft rose dim
- **No button shapes.** The text itself is the touch target, with a generous hit area.
- Declining is treated with the same dignity as accepting. **No red. No sad state. No guilt.**

### Step 2 — The message

- Copy: **«یک جمله برایمان بنویسید — هر چیز کوچکی که بماند.»**
- A full-width, chrome-less text field. No visible box, no border, no label.
- Caret is a thin gold line, blinking slowly.
- Background darkens further; the constellation dims — the guest is writing in the dark.
- Characters appear as faint light while typing, previewing the transformation to come.
- Suggested maximum ~120 characters. Brevity is part of the luxury.

### Step 3 — Submit (~5s)

- Action word: **«بفرست»** — never "Submit".
- Sequence:
  1. Text dissolves letter by letter into particles (~0.8s)
  2. Particles coalesce into **one new point of light** in the field (~1.2s)
  3. The point pulses gold once, then settles to a violet or rose tint depending on the yes/no path
  4. Closing line — provisional: **«نورتان ماند.»** (subject to refinement)
- **Full silence** during this animation. The guest's message is the sound.

### Data

Each submission stores at minimum: attendance (yes/no), message text, timestamp, and a light position/brightness mapping so the point can be reproduced.

Messages from guests who decline **also** become points of light, perhaps softer.

### Rejected alternative (do not reintroduce without unlock)

*"Reflection"* — the message appearing as a faint reflection inside the gold gap from Beat 2. Poetic, but one-time and private; later guests never see it. The collective field is the better fit for a wedding.

---

## 7. LOCKED — Audio direction

| Aspect | Decision |
|---|---|
| **Vocals** | None, in any language. Instrumental only. |
| **Voice-over** | None. |
| **Genre** | Neo-classical ambient / cinematic minimal. |
| **Tempo feel** | ~55–70 BPM equivalent. No pulse-driven rhythm. Rubato permitted. |
| **Structure** | **One continuous composed piece (~2:30)** with internal dynamics. Not a playlist, not stitched tracks. |
| **Implementation** | Composed as stem layers (strings / piano / pad / texture) that are faded per beat, so audio stays in sync with a scroll-driven timeline. |
| **Start** | On the first scroll or touch in Beat 1. **Never autoplay before a gesture.** |
| **Silent-safe** | If audio is refused or blocked, the visual experience must remain complete and coherent. |
| **Tail** | Beats 1–6 run 108–137s against a ~2:30 piece, but Beat 7 is guest-controlled and can outlast it. The final section must sustain or loop seamlessly so a slow writer never hits an abrupt end. |

### Emotional progression

```
Mystery → Recognition → Tenderness → Nostalgia → Presence → Welcome → Peace → Offering
```

### Instrumentation by beat

| Beat | Texture |
|---|---|
| 1 ورود | Sub bass + room tone + a single piano note or processed cello harmonic |
| 2 میانِ ما | Layered legato strings building to a subtle pad. **Never a triumphant wedding march.** |
| 3 کهکشانِ یاد | Stripped back to piano with deliberate silence between notes |
| 4 اکنونِ ما | Warmer, fuller return |
| 5 دعوت | Stable warm bed, 2–3 instruments maximum |
| 6 پس‌نور | Dissolving to a single sustained tone |
| 7 هدیهٔ نور | Sustained tone → silence |

### Deliberate silences

- ~0.5s before the first note
- ~1s after the Signature text completes
- 2–3s gaps between memory fragments
- The entire post-submit RSVP animation

---

## 8. LOCKED — language, interaction, and visual system

### 8.1 Language: Persian-first hybrid, restrained

| Layer | Language |
|---|---|
| Emotional core (Beat 2) | **Persian only** |
| Invitation details (Beat 5) | **Persian primary**; numerals may be international |
| The names `Parsa & Saba` | Latin script acceptable — functions as the couple's mark |
| RSVP | **Persian** |
| Micro UI (e.g. calendar link) | English acceptable |

**Forbidden copy patterns:** literal English translation of the core thesis; wedding-card phrases such as "forever", "the best day of our lives", "save the date" styling; anything that reads as translated marketing copy.

The international, luxurious feeling must come from **typographic quality, spacing and restraint** — not from using English.

### 8.2 Interaction model

| Layer | Role |
|---|---|
| **Scroll** | Primary progression / time control. Full-viewport beats with gentle soft-snap. |
| **First scroll or touch** | Audio unlock. |
| **Tap** | Optional only: Constellation hold, and RSVP choices. |
| **Typing** | RSVP message only. |
| **Device orientation** | **Excluded from v1.** |

**Anti-website rules:** no navbar, no footer, no cards, no scroll indicator arrows bouncing, no infinite content page. Scroll is mapped to a cinematic timeline, not to document height.

**Comprehension rule:** the invitation must be fully understandable using scroll alone, with no instructions and no optional interaction.

### 8.3 Visual system

| Element | Rule |
|---|---|
| **Base** | Obsidian black, deep rather than pure `#000` (provisional value ≈ `#0A0A0B`, **not locked**) |
| **Parsa** | Deep violet, as illumination |
| **Saba** | Rose-pearl, as fluid light |
| **Gold** | Post-convergence only; environment reflection plus micro-accents in Beat 5 |
| **Negative space** | 60%+ of every frame |
| **Photography** | Full-bleed or distant points of light. Never a framed thumbnail. |
| **Motion** | Slow, 3–6s cycles, cubic ease in/out |
| **Post-processing** | Bloom kept low; subtle static grain, never animated noise |

Exact hex values, type scale, and easing curves are **OPEN** and to be defined in the design-token pass.

---

## 9. OPEN — not yet decided

An agent must **not** invent answers to any of these. If work is blocked by one, stop and ask.

| # | Open item | Blocks |
|---|---|---|
| O-01 | **Final Persian wording and line breaks of the core thesis in Beat 2** | Beat 2 implementation |
| O-02 | **Event details: date, time, venue, address, dress code** — not yet supplied | Beat 5 |
| O-03 | **The photographs themselves** — not yet supplied | Beats 3, 4 |
| O-05 | Backend for RSVP (Google Apps Script vs serverless vs other) | Beat 7 |
| O-06 | Hosting, domain, and QR target URL | Deployment |
| O-07 | Whether the Afterglow field shows **real** guest messages live, and if so how moderation works | Beat 6 |
| O-08 | Music: composed, licensed, or sourced — and licensing budget | Audio production |
| O-09 | Persian and Latin typeface selection and licensing | Design tokens |
| O-10 | Whether URL-based personalisation (`?to=…`) is used at all | Beat 1 / Beat 5 |
| O-11 | Exact colour tokens, type scale, easing curves | Design tokens |
| O-12 | Closing RSVP phrase — «نورتان ماند.» is provisional | Beat 7 |
| O-13 | Analytics: whether any is used, and privacy stance | Architecture |
| O-14 | Post-RSVP state: can a guest return, re-enter, or edit? | Beat 7 |
| O-15 | Copy for Beat 4 and Beat 6 | Beats 4, 6 |

**Resolved:** O-04 (stack) → `DECISIONS.md` D-015.

**O-01, O-09, and O-11 are still open even though the Beat 2 prototype now exists.** It
was built against provisional values on the owner's instruction — see D-016. The
prototype is not an approval of its wording, its colours, or its typeface.

---

## 10. Deliberately rejected ideas

Recorded so they are not accidentally reintroduced. See `DECISIONS.md` for reasoning.

| Rejected | Replaced by |
|---|---|
| 11 separate scenes | 7 beats |
| "The Journey" as its own scene | Merged into Beat 5 |
| "The Ring" as a standalone heavy scene | 8–10s abstract tail of Beat 2 |
| Chronological "A Decade in Fragments" timeline | Constellation of Memory |
| International vocal music | Instrumental only |
| Device-orientation parallax | Excluded from v1 |
| Free-roam exploration | Bounded tap-and-hold in Beat 3 only |
| English wedding-card RSVP copy | Persian inscription framing |
| Photo carousel / cards / Ken Burns treatment | Constellation fragments |

---

_Last updated: 2026-08-26 · Lock version v1.0_
