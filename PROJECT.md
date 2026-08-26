# PROJECT.md — PARSA & SABA

> **START HERE.** This is the entry point for any human or AI agent joining this project.
> Read this file completely before doing anything else.

---

## 0. Document language policy

These reference documents are written in **English structure with Persian content preserved verbatim**.

- Structure, headings, rules, and technical notes: **English** (agent-readable, unambiguous).
- Any text that will appear on screen for the guest: **Persian, quoted exactly as-is**, never paraphrased or translated inside these documents.

Conversation with the project owner (Parsa) happens in **Persian**.

---

## 1. What this project is

A **bespoke digital engagement invitation** for **PARSA & SABA**.

It is accessed primarily by **scanning a QR code on a mobile phone**.

It is **not** a wedding website. It is a **short interactive cinematic artwork** that happens to contain an invitation.

If at any point the output starts to resemble a conventional wedding invitation site, a template, or a technology demo, the project has failed its brief.

---

## 2. North Star

> **CINEMATIC LUXURY × FUTURISTIC ROMANCE**

Two governing principles:

1. **Technology exists to serve emotion.**
2. **Luxury comes from restraint.**

---

## 3. Visual arc

```
OBSIDIAN BLACK
  → VIOLET / ROSE
    → CONVERGENCE
      → GOLD
```

| Identity | Meaning |
|---|---|
| **PARSA** | deep violet — controlled energy, strength, precision |
| **SABA** | rose-pearl — fluidity, softness, calm, light |
| **TOGETHER** | **gold** |

Gold represents **what they create together**.
Therefore gold must never be used as a generic decorative wedding color.

---

## 4. Core emotional thesis

```
«خیلی سخت بود،
خیلی سخت‌تر هم خواهد بود،
اما ما قوی‌تریم و مهربان‌تریم.
ما باهم،
ولی برای هم.»
```

The final typography and exact wording may still be refined.
**Its meaning is fundamental and may not be changed.**

---

## 5. Final goal

Ship a mobile-first, QR-accessed, publicly linkable experience that:

- runs for roughly **90–150 seconds** on its main path
- reaches roughly **2–2.5 minutes** including optional interaction and RSVP
- communicates **when and where** the event is, unambiguously
- captures **RSVP (yes / no) + a short guest message**
- leaves the guest thinking: *"I have never received an invitation like this before."*

---

## 6. Source of Truth hierarchy

When two documents disagree, the file **higher in this list wins** — rank 1 has the greatest authority, rank 7 the least.

| Rank | File | Authority over |
|---|---|---|
| 1 | **CREATIVE_DNA.md** | Artistic identity and purpose. Highest authority. |
| 2 | **CREATIVE_LOCK.md** | Locked creative decisions. |
| 3 | **TECHNICAL_ARCHITECTURE.md** | Technical decisions. |
| 4 | **DEVELOPMENT_RULES.md** | Execution rules for the project. |
| 5 | **ROADMAP.md** | Current development path. |
| 6 | **DECISIONS.md** | Decisions and their reasoning. |
| 7 | **CHANGELOG.md** | History of changes. |

### Contradiction protocol — MANDATORY

If an agent finds a contradiction between two files:

1. **Do not guess.** Do not silently pick one.
2. **Do not edit either file to resolve it.**
3. Follow the higher-ranked file **only to the extent needed to avoid being blocked**.
4. **Report the contradiction to the project owner explicitly**, quoting both sources.
5. Once resolved by the owner, record it in `DECISIONS.md` and update the affected file(s), then log it in `CHANGELOG.md`.

`PROJECT.md` itself is orientation, not authority. If `PROJECT.md` disagrees with `CREATIVE_DNA.md` or `CREATIVE_LOCK.md`, those files win and `PROJECT.md` must be corrected.

---

## 7. Reading order for a new agent

1. `PROJECT.md` (this file) — orientation
2. `CREATIVE_DNA.md` — what must never change
3. `CREATIVE_LOCK.md` — what has been decided
4. `ROADMAP.md` — where we are and what's next
5. `DEVELOPMENT_RULES.md` — how to work here
6. `TECHNICAL_ARCHITECTURE.md` — how it is built
7. `DECISIONS.md` — why things are the way they are
8. `CHANGELOG.md` — what happened recently

Reading all eight takes a few minutes and is **required** before proposing or writing anything.

---

## 8. Current phase

**PHASE 5 — SIGNATURE PROTOTYPE — IN PROGRESS**

- Phase 1 — Creative analysis and critique: complete
- Phase 2 — Creative development, beat rebuild, Signature Moment: complete
- Phase 3 — Reference documents / project memory: complete
- Phase 4 — Pre-production: **partial.** Stack (O-04) is decided (**D-015**). Remaining Gate A items — wording, tokens, typeface — are still open; the prototype uses provisional values (**D-016**). Gate B items are still open and do not block this phase.
- Phase 5 — Beat 2 prototype **runs** (steps 5.1–5.6). Step 5.7, real-phone review, is **not done**.
- Phases 6–10 — implementation of remaining beats through launch: **NOT STARTED**

`ROADMAP.md` holds the authoritative phase definitions, current status, and the exact next step. If this summary and `ROADMAP.md` ever disagree, `ROADMAP.md` is correct.

---

## 9. What an agent must NOT do

- Do **not** write production code until `ROADMAP.md` marks Phase 4 as complete **and** the project owner has explicitly approved starting Phase 5. *(Phase 5 was started under **D-016**, with the owner's explicit instruction to proceed while O-01 / O-09 / O-11 remain open.)*
- Do **not** install dependencies without an approved stack decision recorded in `DECISIONS.md`.
- Do **not** invent photographs, event dates, venues, or guest names. These are supplied by the owner. If missing, say so and stop.
- Do **not** override anything in `CREATIVE_DNA.md`. Ever.
- Do **not** change anything in `CREATIVE_LOCK.md` without following the unlock protocol in that file.
- Do **not** add visual effects that lack a narrative or emotional justification.
- Do **not** resolve contradictions unilaterally. See §6.

Full rule set: `DEVELOPMENT_RULES.md`.

---

## 10. How to record new decisions

Every meaningful decision — creative or technical — is recorded as a numbered entry in `DECISIONS.md` using the template at the top of that file.

Then:

- If it locks or unlocks a creative choice → also update `CREATIVE_LOCK.md`.
- If it changes the stack or architecture → also update `TECHNICAL_ARCHITECTURE.md`.
- If it changes the plan or phase status → also update `ROADMAP.md`.
- Always add a line to `CHANGELOG.md`.

Never let a decision exist only in a chat conversation. **Chat is not memory. These files are memory.**

---

## 11. Project owner

**Parsa Haji Adineh** — project owner and final creative authority.
The agent is a **creative collaborator, not an autonomous art director.**

---

_Last updated: 2026-08-26_
