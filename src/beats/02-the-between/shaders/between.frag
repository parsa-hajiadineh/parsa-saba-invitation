precision highp float;

varying vec2 vUv;

uniform vec2  uResolution;
uniform float uTime;
uniform float uFade;
uniform float uGold;
uniform float uQuality;

uniform vec2  uParsaPos;
uniform vec2  uSabaPos;
uniform float uParsaSize;
uniform float uSabaSize;
uniform float uParsaBright;
uniform float uSabaBright;
uniform float uTrailLenP;
uniform float uTrailLenS;
uniform float uBondLen;
uniform vec2  uGoldPos;

uniform vec2 uParsaTrail[24];
uniform vec2 uSabaTrail[24];
uniform vec2 uBondTrail[32];

uniform vec3 uObsidian;
uniform vec3 uParsaDeep;
uniform vec3 uParsaCore;
uniform vec3 uSabaDeep;
uniform vec3 uSabaCore;
uniform vec3 uGoldDeep;
uniform vec3 uGoldMid;
uniform vec3 uGoldHigh;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

// Circular in pixels. q is screen-centred fractions; +y up.
float glow(vec2 q, vec2 pos, float size, float aspect) {
  vec2 d = vec2((q.x - pos.x) * aspect, q.y - pos.y);
  float r = length(d);
  float core = exp(-pow(r / max(size, 1e-5), 2.0));
  float halo = exp(-r / max(size * 5.5, 1e-5)) * 0.32;
  return core * 1.35 + halo;
}

void main() {
  vec2 q = vUv - 0.5;
  float aspect = uResolution.x / uResolution.y;
  float breathP = 1.0 + 0.035 * sin(uTime * 1.53);
  float breathS = 1.0 + 0.055 * sin(uTime * 1.91 + 1.2);

  vec3 col = vec3(0.0);

  // Trails first, dimmer than the living point. Age: 0 = origin, 1 = now.
  float lenP = uQuality > 0.5 ? uTrailLenP : min(uTrailLenP, 12.0);
  for (int i = 0; i < 24; i++) {
    if (float(i) < lenP) {
      float age = float(i) / max(lenP - 1.0, 1.0);
      float g = glow(q, uParsaTrail[i], uParsaSize * mix(0.22, 0.55, age), aspect);
      col += mix(uParsaDeep, uParsaCore, age) * g * uParsaBright * age * 0.38;
    }
  }

  float lenS = uQuality > 0.5 ? uTrailLenS : min(uTrailLenS, 12.0);
  for (int i = 0; i < 24; i++) {
    if (float(i) < lenS) {
      float age = float(i) / max(lenS - 1.0, 1.0);
      float g = glow(q, uSabaTrail[i], uSabaSize * mix(0.24, 0.58, age), aspect);
      col += mix(uSabaDeep, uSabaCore, age * 0.7 + 0.3) * g * uSabaBright * age * 0.36;
    }
  }

  float pCore = glow(q, uParsaPos, uParsaSize * breathP, aspect);
  col += mix(uParsaDeep, uParsaCore, 0.82) * pCore * uParsaBright;

  float sCore = glow(q, uSabaPos, uSabaSize * breathS, aspect);
  col += mix(uSabaDeep, uSabaCore, 0.9) * sCore * uSabaBright;

  float lenB = uQuality > 0.5 ? uBondLen : min(uBondLen, 16.0);
  for (int i = 0; i < 32; i++) {
    if (float(i) < lenB) {
      float along = float(i) / max(lenB - 1.0, 1.0);
      float g = glow(q, uBondTrail[i], mix(uParsaSize, uSabaSize, 0.5) * 0.42, aspect);
      vec3 tone = mix(uParsaDeep, uSabaDeep, along);
      vec3 precious = mix(uGoldDeep, mix(uGoldMid, uGoldHigh, along), uGold);
      col += mix(tone, precious, uGold) * g * (0.28 + 0.55 * uGold);
    }
  }

  if (uGold > 0.02 && lenB > 4.0) {
    float glint = glow(q, uGoldPos, mix(uParsaSize, uSabaSize, 0.5) * 0.7, aspect);
    col += uGoldHigh * glint * uGold * 0.55;
  }

  col = col / (1.0 + col * 0.55);
  col *= uFade;
  col += uObsidian;

  float vignette = 1.0 - 0.38 * pow(clamp(length(q * vec2(1.12, 1.0)) * 1.35, 0.0, 1.0), 2.4);
  col *= vignette;
  col += (hash(gl_FragCoord.xy) - 0.5) * 0.008;

  gl_FragColor = vec4(max(col, 0.0), 1.0);
}
