import "~/shared/tailwind.css";
import "~/shared/ml-overlay.css";
import "maplibre-theme/classic.css";
import "maplibre-react-components/style.css";
import vs from "./shader.vert";
import fs from "./shader.frag";

import {
  CustomLayerInterface,
  CustomRenderMethod,
  LngLatLike,
  Map,
  MercatorCoordinate,
} from "maplibre-gl";

const $map = document.getElementById("map")!;

const marignier: LngLatLike = [6.498, 46.089];

const map = new Map({
  container: $map,
  // style: "https://api.maptiler.com/maps/basic-v2/style.json?key=5MBwnNxTfGUDJh3LabgI",
  // center: marignier,
  // zoom: 15,
  // style: "https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL",
  // zoom: 0.3,
  // center: [0, 20],
  center: marignier,
  zoom: 14,
  style: "/assets/styles/ign/PLAN.IGN/standard.json",
});

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
    console.log("render");
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

map.on("load", () => {
  map.addLayer(new CustomLayer());

  // map.addSource("terrarium", {
  //   tiles: [
  //     "https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png",
  //   ],
  //   encoding: "terrarium",
  //   tileSize: 256,
  //   type: "raster-dem",
  // });

  // map.setTerrain({
  //   source: "terrarium",
  //   exaggeration: 1.3,
  // });
});
