export const starVertexShader = /* glsl */ `
  attribute float size;
  attribute float phase;
  attribute vec3 color;
  uniform float time;
  varying float vOpacity;
  varying vec3 vColor;

  void main() {
    vOpacity = 0.5 + 0.5 * sin(time + phase);
    vColor = color;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const starFragmentShader = /* glsl */ `
  varying float vOpacity;
  uniform float opacity;
  varying vec3 vColor;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5, 0.5));
    if (d > 0.5) discard;

    // Soft outer halo plus a near-white hot core. The core is what the
    // bloom pass latches onto, so each star reads as a point of light with
    // a glow rather than a flat tinted dot.
    float halo = 1.0 - smoothstep(0.1, 0.5, d);
    float core = 1.0 - smoothstep(0.0, 0.12, d);
    vec3 color = vColor + vec3(core) * 0.7;

    gl_FragColor = vec4(color, halo * vOpacity * opacity);
  }
`;
