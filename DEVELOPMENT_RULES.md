# DEVELOPMENT_RULES.md — PARSA & SABA

> **AUTHORITY RANK 4.**
> How work is done on this project. Applies to every agent and every human contributor.

---

## 1. Before you touch anything

1. Read all eight reference documents in the order given in `PROJECT.md` §7.
2. Check `ROADMAP.md` for the current phase and the exact next step.
3. Check `CREATIVE_LOCK.md` §9 for open items that might block what you are about to do.
4. If what you are about to do is not the current next step in `ROADMAP.md`, **ask before proceeding.**

---

## 2. Hard prohibitions

An agent must **never**:

1. Write production code while `ROADMAP.md` says implementation has not been approved.
2. Install a dependency that is not recorded as an approved decision in `DECISIONS.md`.
3. Change anything in `CREATIVE_DNA.md`.
4. Change a LOCKED item in `CREATIVE_LOCK.md` without the unlock protocol.
5. Invent content: photographs, dates, venues, addresses, guest names, or the couple's words.
6. Silently resolve a contradiction between documents. Report it.
7. Add a visual effect with no narrative or emotional justification.
8. Introduce anything on the `CREATIVE_DNA.md` §8 blacklist.
9. Render guest-facing text inside a shader or canvas.
10. Ship a beat without its `static` tier variant.
11. Leave a decision recorded only in a chat conversation.
12. Rewrite these reference documents wholesale. Amend them surgically and log the amendment.

---

## 3. When to stop and ask

Stop and ask the project owner when:

- An open item from `CREATIVE_LOCK.md` §9 blocks progress
- You believe a locked decision is wrong
- You find a contradiction between documents
- A required asset is missing
- A performance budget in `TECHNICAL_ARCHITECTURE.md` §9 cannot be met
- You want to make a significant creative deviation → use the 7-point protocol in `CREATIVE_DNA.md` §10
- The work would take a materially different shape than what `ROADMAP.md` describes

**Asking is cheap. Guessing on this project is expensive**, because the output is judged emotionally, not functionally.

---

## 4. The four tests for any visual work

> Not to be confused with **Gate A / Gate B** in `TECHNICAL_ARCHITECTURE.md` §12, which are approval gates for starting a phase. These four are a per-element quality test.

Every visual element must pass all four before it is considered done. These are from `CREATIVE_DNA.md` §9 and are restated here because they are the daily working tool.

1. **Template test** — Could this appear on a generic wedding invitation site? → reject
2. **Narrative test** — Which emotional beat does this serve? → if "it looks good" is the only answer, reject
3. **Restraint test** — Would removing 30% improve it? → then remove it
4. **Silence test** — Could this work with less motion, less sound, less light? → then do that

---

## 5. Definition of done — per beat

A beat is not done until **all** of the following are true:

- [ ] It matches its specification in `CREATIVE_LOCK.md` §4
- [ ] Full, Reduced, and Static tier variants all exist and all work
- [ ] It holds ≥50fps on the Full tier on a mid-range phone, and 60fps if it is Beat 2
- [ ] It disposes its GPU resources on exit, verified with no memory growth across repeated entry/exit
- [ ] It passes the four tests in §4
- [ ] It works with audio blocked
- [ ] It works with `prefers-reduced-motion` enabled
- [ ] Persian text renders correctly, RTL, on iOS Safari and Android Chrome
- [ ] It was reviewed **on a real phone**, not only in a desktop browser at a phone-sized viewport
- [ ] Its `README.md` explains in one paragraph what the beat is for

A beat that looks correct in Chrome DevTools device emulation but has not been opened on a physical phone is **not done**.

---

## 6. Testing reality

Emulators lie about: scroll physics, momentum, Safari address-bar viewport resizing, GPU throttling, thermal behaviour, audio unlock, and touch latency. All of these matter here.

**Minimum real-device matrix before any beat is accepted:**

- One iPhone on Safari (the primary target)
- One mid-range Android on Chrome
- One deliberately weak or older device, to validate the Reduced/Static path

**Also verify:** the experience opened by scanning an actual QR code, outdoors, in daylight, one-handed. That is the real usage context.

---

## 7. Code conventions

- TypeScript, strict mode. No `any` to escape a problem you have not understood.
- Beats are isolated. A beat never imports another beat.
- Tuning constants live in the beat's `config.ts`, never scattered inline, so the piece can be tuned without hunting through render code.
- Shaders are commented only where the maths is non-obvious. No narration comments.
- No comment explains a change, a history, or why the code is correct. Comments state constraints the code cannot express.
- Naming uses the project's own vocabulary: `theBetween`, `constellation`, `afterglow` — not `scene2`, `photoGallery`, `finalSection`.
- Dead code and disabled experiments are deleted, not commented out.

---

## 8. Performance discipline

Performance is a creative requirement (`CREATIVE_LOCK.md` L-21).

- Measure before optimising, and measure on a phone.
- A stutter during Beat 2 is a **creative failure**, not a technical nitpick. Treat it with that severity.
- Prefer fewer, better effects over more, cheaper ones.
- Every particle count, every post-processing pass, and every texture resolution must be justifiable against the budgets in `TECHNICAL_ARCHITECTURE.md` §9.

---

## 9. Asset handling

- Never invent, generate, or substitute a photograph of the couple.
- Never fabricate event details. If the venue is unknown, the beat stays unimplemented and the blocker is reported.
- Photographs are the couple's private material. Do not upload them to third-party services for processing without explicit permission.
- Guest RSVP messages are private. They are never rendered as HTML, never logged verbosely, never exposed publicly without an explicit decision on moderation (open item **O-07**).

---

## 10. How to record a decision

Every meaningful decision gets an entry in `DECISIONS.md` using the template at the top of that file, with a sequential ID.

Then propagate:

| If the decision… | Also update |
|---|---|
| locks or unlocks a creative choice | `CREATIVE_LOCK.md` (and bump lock version) |
| changes stack or architecture | `TECHNICAL_ARCHITECTURE.md` |
| changes the plan or phase status | `ROADMAP.md` |
| resolves an open item | remove it from `CREATIVE_LOCK.md` §9 |
| **anything** | `CHANGELOG.md` |

**Chat is not memory. These files are memory.** A decision that exists only in a conversation is a decision that will be lost.

---

## 11. Session handoff

At the end of a working session, an agent must leave the project in a state where a fresh agent with an empty context window can continue:

1. `ROADMAP.md` reflects the true current status and the true next step
2. New decisions are in `DECISIONS.md`
3. New blockers are in `CREATIVE_LOCK.md` §9 or `ROADMAP.md`
4. `CHANGELOG.md` has an entry for the session
5. No half-finished work is left without a note explaining its state

---

## 12. Tone when reporting to the owner

The owner has explicitly asked for critique, not agreement.

- Do not flatter the concept.
- State problems plainly, with the specific reason.
- When you disagree with a decision, say so directly and propose the alternative.
- Distinguish clearly between what is done, what is untested, and what is assumed.
- Never claim something works on mobile if it has only been checked on desktop.

---

_Last updated: 2026-08-26_
