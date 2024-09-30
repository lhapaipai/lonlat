import { CustomRenderMethod } from "maplibre-gl";

class CustomLayer implements CustomLayerInterface {
  id: string;
  type: "custom";
  declare program: WebGLProgram;
  declare aPos: GLint;
  declare buffer: WebGLBuffer;

  constructor() {
    this.id = "null-island";
    this.type = "custom";
  }

  onAdd(map: Map, gl: WebGL2RenderingContext) {
    const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vertexShader, vs);
    gl.compileShader(vertexShader);

    // create a fragment shader
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fragmentShader, fs);
    gl.compileShader(fragmentShader);

    // link the two shaders into a WebGL program
    this.program = gl.createProgram()!;
    gl.attachShader(this.program, vertexShader);
    gl.attachShader(this.program, fragmentShader);
    gl.linkProgram(this.program);

    this.aPos = gl.getAttribLocation(this.program, "a_pos");

    const marignier = MercatorCoordinate.fromLngLat({
      lng: 6.498,
      lat: 46.089,
    });
    const cluses = MercatorCoordinate.fromLngLat({
      lng: 6.5759,
      lat: 46.0642,
    });
    const mtSax = MercatorCoordinate.fromLngLat({
      lng: 6.4885,
      lat: 46.0502,
    });

    this.buffer = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        marignier.x,
        marignier.y,
        mtSax.x,
        mtSax.y,
        cluses.x,
        cluses.y,
      ]),
      gl.STATIC_DRAW,
    );
  }
  render: CustomRenderMethod = (gl, matrix) => {
    gl.useProgram(this.program);
    gl.uniformMatrix4fv(
      gl.getUniformLocation(this.program, "u_matrix"),
      false,
      matrix,
    );
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.enableVertexAttribArray(this.aPos);
    gl.vertexAttribPointer(this.aPos, 2, gl.FLOAT, false, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);
  };
}
