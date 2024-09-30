#version 300 es

uniform mat4 u_matrix;
in vec2 a_pos;

void main() {
  gl_Position = u_matrix*vec4(a_pos, 0., 1.);
}
