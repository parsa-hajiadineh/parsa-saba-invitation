# BEAT 2 — میانِ ما / The Between ★ SIGNATURE MOMENT

Two presences — Parsa as deep violet controlled light, Saba as rose-pearl fluid light —
approach each other across obsidian black and **stop**. They never merge. Gold is not
drawn into the gap between them: in the shader it is literally the product of both
presences' outer light, so it can only exist where both of them reach and it is masked
off either of them, which means it appears as a consequence of their proximity and
cannot leak before they are close. The couple's own words are then revealed inside that
space, and the beat closes with two asymmetric arcs of light touching tangentially
off-centre, one controlled gold flash, and a dissolve. This is the emotional and visual
thesis of the whole piece — union without the disappearance of identity — delivered as
one image.

## Files

| File | Role |
|---|---|
| `config.ts` | The beat's whole timeline and all tuning constants. Start here. |
| `copy.ts` | The thesis text and its reveal timing. **Provisional wording — O-01.** |
| `shaders/between.frag` | The presences, the gold, and the bond tail. |
| `TheBetween.tsx` | Full and Reduced tiers: canvas, uniforms, DPR watchdog. |
| `TheBetweenStatic.tsx` | Static tier: the same beat with no WebGL. |
| `ThesisText.tsx` | The text, in the DOM, never in the canvas. |

## Notes for whoever touches this next

- **Tune pacing in `config.ts`, nothing else.** `SCROLL_VIEWPORTS` and
  `SCROLL_SMOOTHING` decide how the moment feels under a real thumb, and they have not
  yet been tuned on a real phone.
- **The seam must never be on screen at the same time as the text.** A bright
  horizontal line behind words reads as a divider on a wedding card. Its life is over
  before the first line arrives, and that ordering is deliberate.
- Horizontal extents in the shader are derived from the aspect ratio so the
  composition holds its proportions in pixels on any viewport. Vertical extents are
  fractions of viewport height. Do not make either axis a raw fraction of the other.
- `HALF_GAP_NEAR` is a floor. It is set so the presences stop close enough that
  the gap feels like a held breath, not a poster with lights in the header and
  footer. Lowering it far enough to let them overlap breaks L-25 and also
  destroys the gold, since gold is their product.
- Grain is spatial only, never time-varying (`CREATIVE_LOCK.md` §8.3).

## Not done

- Never opened on a physical phone. Frame rate on real mobile hardware is unverified.
- No audio. The gesture unlock is armed; there is nothing to play (O-08).
- Wording, colour tokens, and typeface are all provisional (O-01, O-11, O-09).
