/**
 * Minimal fullscreen-shader renderer.
 *
 * Beat 2 is one fragment shader over one quad: no scene graph, no camera, no
 * geometry, no post-processing pass. This is the whole GL surface it needs.
 * Later beats that genuinely need instancing or textures can extend this or
 * introduce a library at that point (see D-015).
 */

export type UniformValue = number | readonly number[] | Float32Array;

export interface FullscreenRenderer {
  render(uniforms: Readonly<Record<string, UniformValue>>): void;
  /** Sizes the drawing buffer to the element box at the given pixel ratio. */
  resize(cssWidth: number, cssHeight: number, dpr: number): void;
  readonly lost: boolean;
  readonly drawingBufferSize: readonly [number, number];
  dispose(): void;
}

const QUAD = new Float32Array([-1, -1, 3, -1, -1, 3]);

export function createFullscreenRenderer(
  canvas: HTMLCanvasElement,
  vertexSource: string,
  fragmentSource: string,
  onContextLost?: () => void,
): FullscreenRenderer | null {
  const attributes: WebGLContextAttributes = {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    premultipliedAlpha: false,
    preserveDrawingBuffer: false,
    powerPreference: 'high-performance',
    failIfMajorPerformanceCaveat: false,
  };

  const gl = (canvas.getContext('webgl2', attributes) ??
    canvas.getContext('webgl', attributes)) as WebGL2RenderingContext | null;
  if (!gl) return null;

  const program = buildProgram(gl, vertexSource, fragmentSource);
  if (!program) return null;

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, QUAD, gl.STATIC_DRAW);

  const positionLocation = gl.getAttribLocation(program, 'aPosition');
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  gl.useProgram(program);
  gl.disable(gl.DEPTH_TEST);
  gl.disable(gl.BLEND);
  gl.clearColor(0, 0, 0, 1);

  const locations = new Map<string, WebGLUniformLocation | null>();
  const size: [number, number] = [canvas.width, canvas.height];
  let lost = false;

  const handleLost = (event: Event) => {
    event.preventDefault();
    lost = true;
    onContextLost?.();
  };
  canvas.addEventListener('webglcontextlost', handleLost);

  function locate(name: string): WebGLUniformLocation | null {
    if (!locations.has(name)) locations.set(name, gl!.getUniformLocation(program!, name));
    return locations.get(name) ?? null;
  }

  return {
    get lost() {
      return lost;
    },
    get drawingBufferSize() {
      return size;
    },

    resize(cssWidth: number, cssHeight: number, dpr: number) {
      if (lost) return;
      const width = Math.max(1, Math.round(cssWidth * dpr));
      const height = Math.max(1, Math.round(cssHeight * dpr));
      if (canvas.width === width && canvas.height === height) return;
      canvas.width = width;
      canvas.height = height;
      size[0] = width;
      size[1] = height;
      gl.viewport(0, 0, width, height);
    },

    render(uniforms) {
      if (lost) return;
      gl.useProgram(program);
      for (const name in uniforms) {
        const value = uniforms[name]!;
        if (value instanceof Float32Array) {
          const arrayLoc = locate(`${name}[0]`) ?? locate(name);
          if (arrayLoc) gl.uniform2fv(arrayLoc, value);
          continue;
        }
        const location = locate(name);
        if (!location) continue;
        if (typeof value === 'number') {
          gl.uniform1f(location, value);
        } else if (value.length === 2) {
          gl.uniform2f(location, value[0]!, value[1]!);
        } else if (value.length === 3) {
          gl.uniform3f(location, value[0]!, value[1]!, value[2]!);
        } else if (value.length === 4) {
          gl.uniform4f(location, value[0]!, value[1]!, value[2]!, value[3]!);
        }
      }
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },

    // Deliberately does not force a context loss. A canvas hands out one context for
    // its lifetime, so losing it would poison the element for every later mount —
    // which silently drops the beat to its static variant on re-entry. The context
    // dies with the canvas; releasing the objects we made is our part.
    dispose() {
      canvas.removeEventListener('webglcontextlost', handleLost);
      if (lost) return;
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    },
  };
}

function buildProgram(
  gl: WebGL2RenderingContext,
  vertexSource: string,
  fragmentSource: string,
): WebGLProgram | null {
  const vertex = compile(gl, gl.VERTEX_SHADER, vertexSource);
  const fragment = compile(gl, gl.FRAGMENT_SHADER, fragmentSource);
  if (!vertex || !fragment) return null;

  const program = gl.createProgram();
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    if (import.meta.env.DEV) console.error(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

function compile(
  gl: WebGL2RenderingContext,
  type: number,
  source: string,
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    if (import.meta.env.DEV) console.error(gl.getShaderInfoLog(shader), source);
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}
