import "../../main.css";
import "~/shared/main.css";
import "maplibre-theme/dist/core.css";
import "maplibre-theme/dist/default.css";
import "maplibre-react-components/dist/mrc.css";
import {
  CustomLayerInterface,
  LngLatLike,
  Map,
  MercatorCoordinate,
} from "maplibre-gl";

const $map = document.getElementById("map")!;

const berlin: LngLatLike = {
  lng: 13.403,
  lat: 52.562,
};

const map = new Map({
  container: $map,
  center: berlin,
  zoom: 3,
  style: "/assets/styles/ign/PLAN.IGN/standard.json",
});

// @ts-ignore
const highlightLayer: CustomLayerInterface & {
  program: WebGLProgram | null;
  aPos?: number;
} = {
  id: "highlight",
  type: "custom",
  onAdd(_, gl) {
    const vertexSource = `#version 300 es
    uniform mat4 u_matrix;
    in vec2 a_pos;

    void main() {
      gl_Position = u_matrix * vec4(a_pos, 0.0, 1.0);
    }`;

    const fragmentSource = `#version 300 es

    out highp vec4 fragColor;
    void main() {
      fragColor = vec4(1.0, 0.0, 0.0, 0.5);
    }`;

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    // @ts-ignore
    gl.shaderSource(vertexShader, vertexSource);
    // @ts-ignore
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    // @ts-ignore
    gl.shaderSource(fragmentShader, fragmentSource);
    // @ts-ignore
    gl.compileShader(fragmentShader);

    this.program = gl.createProgram();
    if (!this.program) {
      throw new Error("gl fail");
    }
    // @ts-ignore
    gl.attachShader(this.program, vertexShader);
    // @ts-ignore
    gl.attachShader(this.program, fragmentShader);
    gl.linkProgram(this.program);

    this.aPos = gl.getAttribLocation(this.program, "a_pos");

    const helsinki = MercatorCoordinate.fromLngLat({
      lng: 25.004,
      lat: 60.239,
    });
    const berlin = MercatorCoordinate.fromLngLat({
      lng: 13.403,
      lat: 52.562,
    });
    const kyiv = MercatorCoordinate.fromLngLat({
      lng: 30.498,
      lat: 50.541,
    });

    // @ts-ignore
    this.buffer = gl.createBuffer();
    // @ts-ignore
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        helsinki.x,
        helsinki.y,
        berlin.x,
        berlin.y,
        kyiv.x,
        kyiv.y,
      ]),
      gl.STATIC_DRAW,
    );
  },

  render(gl, matrix) {
    gl.useProgram(this.program);
    // @ts-ignore
    gl.uniformMatrix4fv(
      // @ts-ignore
      gl.getUniformLocation(this.program, "u_matrix"),
      false,
      matrix,
    );
    // @ts-ignore
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    // @ts-ignore
    gl.enableVertexAttribArray(this.aPos);
    // @ts-ignore
    gl.vertexAttribPointer(this.aPos, 2, gl.FLOAT, false, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);
  },
};

map.on("load", () => {
  map.addLayer(highlightLayer);
});
