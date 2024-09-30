#version 300 es

uniform mat4 u_matrix;
in vec2 a_position;
in vec2 a_uv;

out vec2 v_uv;

void main() {
  // vec2 clipSpace = vec2(1., -1.) * (a_position * 2. - 1.);
  // gl_Position = vec4(clipSpace, 0., 1.);
  gl_Position = u_matrix*vec4(a_position, 0., 1.);
  v_uv = a_uv;
}
