precision highp float;

varying vec2 vUv;

uniform vec2  uResolution;
uniform float uTime;

// Timeline envelopes, all computed in config.ts.
uniform float uApproach;
uniform float uGoldSeam;
uniform float uGoldAura;
uniform float uPresence;
uniform float uTail;
uniform float uFlash;
uniform float uFade;
uniform float uStillness;
uniform float uQuality;

uniform float uHalfGapFar;
uniform float uHalfGapNear;

uniform vec3 uObsidian;
uniform vec3 uParsaDeep;
uniform vec3 uParsaCore;
uniform vec3 uSabaDeep;
uniform vec3 uSabaCore;
uniform vec3 uGoldDeep;
uniform vec3 uGoldMid;
uniform vec3 uGoldHigh;

// Geometry is defined in screen fractions, not aspect-corrected units: the
// composition is authored for a portrait phone and stretches on wider viewports
// rather than shrinking away from the edges.

// The bond tail. The two arcs are externally tangent at TOUCH with very different
// radii, so the pair can never close into a ring, and TOUCH is off-centre and above
// the midline so the meeting is never a symmetrical centrepiece. Arc geometry is
// solved in aspect-true space, otherwise a circle becomes a tall ellipse on a phone
// and the stroke sweeps out of the gap and across Parsa.
// Same-side kiss, not an S and not a ring: both strokes share a tangent and
// stop at TOUCH. Radii stay far apart so the pair cannot close.
const vec2  TOUCH   = vec2(0.152, 0.042);
const vec2  AXIS    = vec2(0.58, 0.815);
const float ARC_A_R = 0.225;
const float ARC_B_R = 0.068;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

// Two octaves is the whole budget. A third adds detail finer than a field this soft
// can show, and noise is the most expensive thing in the frame. The branch is on a
// uniform, so it is coherent across the draw and genuinely saves work.
float fbm(vec2 p) {
  float s = vnoise(p) * 0.62;
  if (uQuality > 0.5) s += vnoise(p * 2.07) * 0.31;
  return s;
}

float cross2(vec2 a, vec2 b) {
  return a.x * b.y - a.y * b.x;
}

// A stroke of light travelling along a circle toward its tangent point. The tip is
// the brightest part, so the arc reads as being drawn rather than switched on.
float arcStroke(
  vec2 p, vec2 centre, float radius, float thickness,
  vec2 toTouch, float sideSign, float lead, float span
) {
  vec2 d = p - centre;
  float r = length(d);
  vec2 u = d / max(r, 1e-4);
  float angle = acos(clamp(dot(u, toTouch), -1.0, 1.0));
  float side = smoothstep(0.0, 0.09, cross2(u, toTouch) * sideSign);
  float offset = abs(r - radius);
  // A filament plus its spill, so the stroke is light rather than a drawn line.
  float radial = exp(-pow(offset / thickness, 1.7))
               + exp(-pow(offset / (thickness * 8.0), 1.4)) * 0.16;
  float head = span * (1.0 - lead);
  float body = smoothstep(head - 0.02, head + 0.07, angle)
             * (1.0 - smoothstep(span * 0.70, span, angle));
  float tip = exp(-pow(abs(angle - head) / 0.085, 2.0));
  return radial * side * (body * 0.40 + tip);
}

void main() {
  vec2 q = vUv - 0.5;
  float aspect = uResolution.x / uResolution.y;
  vec2 n = vec2(q.x * aspect, q.y);

  // Vertical extents are fractions of viewport height; horizontal ones are derived
  // so that every shape keeps the same proportions in *pixels* whatever the viewport
  // is. The composition is authored for a portrait phone, and a landscape window
  // shows the same image rather than the same fractions stretched into bars. The
  // constants are the phone values multiplied by the phone aspect.
  float wide = 1.0 / max(aspect, 0.05);
  float sigmaParsaX = clamp(0.126 * wide, 0.078, 0.40);
  float sigmaSabaX = clamp(0.158 * wide, 0.096, 0.48);
  float seamSpanX = clamp(0.096 * wide, 0.060, 0.30);

  float halfGap = mix(uHalfGapFar, uHalfGapNear, uApproach);

  // Different breathing periods: they stay two beings rather than one pulse.
  float breathP = 1.0 + 0.040 * sin(uTime * 1.611);
  float breathS = 1.0 + 0.058 * sin(uTime * 1.963 + 1.7);

  // Extents are wider than they are tall in screen fractions because a portrait
  // viewport is not square: these are lenses of light lying across the frame, not
  // circles. Editing either number changes the shape of the presence.

  // PARSA — deep violet, controlled. Super-Gaussian falloff for a defined edge,
  // stable striations, no turbulence.
  vec2 rp = vec2(q.x, q.y - halfGap) / (vec2(sigmaParsaX, 0.076) * breathP);
  float rP = length(rp);
  float coreP = exp(-pow(rP, 2.85) * 0.96);
  float haloP = exp(-rP * 1.18) * 0.13;
  // Concentric lamination rather than a directional pattern: faint interference
  // shells read as contained, precise energy without printing a stripe on him.
  float striaeP = 0.92 + 0.08 * cos(rP * 7.0);

  // SABA — rose-pearl, fluid. Domain-warped, so the field flows instead of sitting.
  vec2 rs = vec2(q.x, q.y + halfGap) / (vec2(sigmaSabaX, 0.098) * breathS);
  vec2 flow = vec2(
    fbm(n * 9.4 + vec2(0.0, uTime * 0.062)),
    fbm(n * 9.4 + vec2(4.7, -uTime * 0.048))
  ) - 0.5;
  float rS = length(rs + flow * (0.50 - 0.18 * uStillness));
  float coreS = exp(-rS * rS * 0.88);
  float haloS = exp(-rS * 0.92) * 0.20;

  // THE BETWEEN. Gold is the product of both presences' outer light, so it can only
  // exist where both of them reach, and the core mask keeps it off either of them.
  // It is not painted into the gap; it is what the gap contains.
  float tailP = exp(-rP * rP * 0.16);
  float tailS = exp(-rS * rS * 0.15);
  float coreMask = 1.0 - smoothstep(0.10, 0.55, max(coreP, coreS));
  float between = tailP * tailS * coreMask * 7.4;

  float still = uStillness;
  float seamHalf = mix(0.030, 0.0075, uGoldSeam) * (1.0 - 0.20 * still);
  // A filament, not a rule: the line undulates slightly so it never reads as a border.
  float wobble = 0.0;
  if (uGoldSeam > 0.001) {
    wobble = (vnoise(vec2(n.x * 7.0, uTime * 0.05)) - 0.5) * 0.020;
  }
  float seam = exp(-pow(abs(q.y - wobble) / seamHalf, 1.7))
             * exp(-pow(abs(q.x) / seamSpanX, 2.6));
  // What remains after the filament blooms is deliberately almost nothing: enough
  // that the space between them is warm rather than neutral, never enough to become
  // a field of gold behind the words. During the thesis, the text is the light.
  float aura = exp(-pow(abs(q.x) / sigmaParsaX, 2.2))
             * exp(-pow(abs(q.y) / 0.115, 2.0));

  float gold = between * (seam * 2.6 * uGoldSeam + aura * 0.11 * uGoldAura);
  gold *= 1.0 + 0.30 * still;

  // BOND TAIL.
  vec2 touch = vec2(TOUCH.x * aspect, TOUCH.y);
  float arcEnv = smoothstep(0.0, 0.16, uTail) * (1.0 - smoothstep(0.70, 0.97, uTail));
  float leadA = smoothstep(0.03, 0.50, uTail);
  float leadB = smoothstep(0.12, 0.50, uTail);
  float arcs = 0.0;
  if (arcEnv > 0.001) {
    arcs += arcStroke(n, touch + ARC_A_R * AXIS, ARC_A_R, 0.0026, -AXIS, -1.0, leadA, 0.72);
    arcs += arcStroke(n, touch - ARC_B_R * AXIS, ARC_B_R, 0.0017,  AXIS, -1.0, leadB, 0.62);
  }
  // The flash is the event. Arcs recede so the meeting is one point of light,
  // not two tips connected by a flourish.
  arcs *= arcEnv * (1.0 - 0.72 * uFlash);

  float flashR = length(n - touch);
  float flashCore = exp(-pow(flashR / (0.007 + 0.016 * uFlash), 2.0)) * uFlash;
  float flashSpill = exp(-pow(flashR / 0.048, 2.0)) * uFlash * 0.11;

  vec3 col = vec3(0.0);

  // The pale nucleus is small on purpose. Most of each presence stays its deep
  // colour, so they read as light with a source rather than as filled gradients.
  vec3 parsaCol = mix(uParsaDeep, uParsaCore, smoothstep(0.70, 0.985, coreP));
  col += parsaCol * (coreP * striaeP + haloP) * 0.88 * uPresence;

  vec3 sabaCol = mix(uSabaDeep, uSabaCore, smoothstep(0.86, 0.999, coreS));
  col += sabaCol * (coreS + haloS) * 0.70 * uPresence;

  vec3 goldCol = mix(uGoldDeep, uGoldMid, smoothstep(0.02, 0.30, gold));
  goldCol = mix(goldCol, uGoldHigh, smoothstep(0.40, 1.00, gold));
  col += goldCol * gold;

  col += mix(uGoldMid, uGoldHigh, smoothstep(0.30, 1.20, arcs)) * arcs * 0.95;
  col += uGoldHigh * flashCore + uGoldMid * flashSpill;

  // Physical rolloff instead of a bloom pass: highlights compress, nothing clips.
  col = col / (1.0 + col * 0.42);
  col *= uFade;
  col += uObsidian;

  float vignette = 1.0 - 0.30 * pow(clamp(length(q * vec2(1.15, 1.0)) * 1.42, 0.0, 1.0), 2.2);
  col *= vignette;

  // Static grain: dithers the dark gradients and gives the black a surface.
  // Never time-varying (CREATIVE_LOCK.md §8.3).
  col += (hash(gl_FragCoord.xy) - 0.5) * 0.010;

  gl_FragColor = vec4(max(col, 0.0), 1.0);
}
