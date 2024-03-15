import "pentatrion-design/styles/default.scss";
import "~/shared/main.scss";
import "maplibre-gl/dist/maplibre-gl.css";
import { CustomLayerInterface, LngLatLike, Map, MercatorCoordinate } from "maplibre-gl";

const $map = document.getElementById("map")!;

const berlin: LngLatLike = {
  lng: 13.403,
  lat: 52.562,
};

const map = new Map({
  container: $map,
  // style: "https://api.maptiler.com/maps/basic-v2/style.json?key=5MBwnNxTfGUDJh3LabgI",
  // center: berlin,
  // zoom: 15,
  // style: "https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL",
  // zoom: 0.3,
  // center: [0, 20],
  center: berlin,
  zoom: 3,
  style: "/styles/ign/PLAN.IGN/standard.json",
});

const highlightLayer: CustomLayerInterface & {
  program: WebGLProgram | null;
  aPos?: number;
} = {
  id: "highlight",
  type: "custom",
  onAdd(map, gl) {
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
    gl.shaderSource(vertexShader, vertexSource);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentSource);
    gl.compileShader(fragmentShader);

    this.program = gl.createProgram();
    if (!this.program) {
      throw new Error("gl fail");
    }
    gl.attachShader(this.program, vertexShader);
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

    this.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([helsinki.x, helsinki.y, berlin.x, berlin.y, kyiv.x, kyiv.y]),
      gl.STATIC_DRAW,
    );
  },

  render(gl, matrix) {
    gl.useProgram(this.program);
    gl.uniformMatrix4fv(gl.getUniformLocation(this.program, "u_matrix"), false, matrix);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.enableVertexAttribArray(this.aPos);
    gl.vertexAttribPointer(this.aPos, 2, gl.FLOAT, false, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);
  },
};

map.on("load", () => {
  map.addLayer(highlightLayer);
});
