import quadVert from "./shaders/quad.vert";
import screenFrag from "./shaders/screen.frag";
import drawVert from "./shaders/draw.vert";
import drawFrag from "./shaders/draw.frag";
import updateFrag from "./shaders/update.frag";

import {
  bindAttribute,
  bindFramebuffer,
  bindTexture,
  createBuffer,
  createProgramInfos,
  createTexture,
  ProgramInfos,
  resizeCanvasToDisplaySize,
} from "./webgl-utils.v2";
import { WindData } from "./types";
import { Map, MercatorCoordinate } from "maplibre-gl";

const defaultRampColors = {
  0.0: "#3288bd",
  0.1: "#66c2a5",
  0.2: "#abdda4",
  0.3: "#e6f598",
  0.4: "#fee08b",
  0.5: "#fdae61",
  0.6: "#f46d43",
  1.0: "#d53e4f",
};

export default class WindGL {
  id: string;
  type: "custom";

  public fadeOpacity = 0.996;
  public speedFactor = 0.25;
  public dropRate = 0.003;
  public dropRateBump = 0.01;

  declare gl: WebGL2RenderingContext;
  public declare draw: ProgramInfos;
  public declare screen: ProgramInfos;
  public declare update: ProgramInfos;

  declare image: HTMLImageElement;
  public declare windData: WindData;
  public declare windTexture: WebGLTexture;

  public declare quadBuffer: WebGLBuffer;
  public declare uvBuffer: WebGLBuffer;
  public declare framebuffer: WebGLFramebuffer;
  public declare colorRampTexture: WebGLTexture;

  public declare backgroundTexture: WebGLTexture;
  public declare screenTexture: WebGLTexture;

  public declare particleIndexBuffer: WebGLBuffer;
  public declare particlePositionTexture0: WebGLTexture;
  public declare particlePositionTexture1: WebGLTexture;

  private _numParticles = 0;
  // largeur ou hauteur de la texture carré qui contient la position des particules
  private particlePositionResolution: number = 0;

  constructor() {
    this.id = "null-island";
    this.type = "custom";
  }

  onAdd(map: Map, gl: WebGL2RenderingContext) {
    this.gl = gl;

    this.draw = createProgramInfos(gl, drawVert, drawFrag);
    this.screen = createProgramInfos(gl, quadVert, screenFrag);
    this.update = createProgramInfos(gl, quadVert, updateFrag);

    this.windTexture = createTexture(this.gl, this.gl.LINEAR, this.image);

    const sw = MercatorCoordinate.fromLngLat([6.4825, 46.0679]);
    const se = MercatorCoordinate.fromLngLat([6.4825, 46.1195]);
    const nw = MercatorCoordinate.fromLngLat([6.5749, 46.0619]);
    const ne = MercatorCoordinate.fromLngLat([6.5864, 46.1119]);
    // prettier-ignore
    this.quadBuffer = createBuffer(gl, new Float32Array([
      sw.x, sw.y,
      se.x, se.y,
      nw.x, nw.y,

      nw.x, nw.y,
      se.x, se.y,
      ne.x, ne.y
    ]));
    this.uvBuffer = createBuffer(
      gl,
      new Float32Array([
        0, 0, 1, 0, 0, 1,

        0, 1, 1, 0, 1, 1,
      ]),
    );
    this.framebuffer = gl.createFramebuffer()!;

    this.setColorRamp(defaultRampColors);

    this.numParticles = 65536;
    this.resize();
  }

  resize = () => {
    console.log("resize");
    const { gl } = this;

    const emptyPixels = new Uint8Array(gl.canvas.width * gl.canvas.height * 4);

    this.backgroundTexture = createTexture(
      gl,
      gl.NEAREST,
      emptyPixels,
      gl.canvas.width,
      gl.canvas.height,
    );
    this.screenTexture = createTexture(
      gl,
      gl.NEAREST,
      emptyPixels,
      gl.canvas.width,
      gl.canvas.height,
    );
  };

  setColorRamp(colors: Record<number, string>) {
    this.colorRampTexture = createTexture(
      this.gl,
      this.gl.LINEAR,
      getColorRamp(colors),
      16,
      16,
    );
  }

  set numParticles(numParticles: number) {
    const gl = this.gl;

    const particleRes = (this.particlePositionResolution = Math.ceil(
      Math.sqrt(numParticles),
    ));
    this._numParticles = particleRes * particleRes;

    const particlePosition = new Uint8Array(this._numParticles * 4);
    for (let i = 0; i < particlePosition.length; i++) {
      particlePosition[i] = Math.floor(Math.random() * 256);
    }

    this.particlePositionTexture0 = createTexture(
      gl,
      gl.NEAREST,
      particlePosition,
      particleRes,
      particleRes,
    );
    this.particlePositionTexture1 = createTexture(
      gl,
      gl.NEAREST,
      particlePosition,
      particleRes,
      particleRes,
    );

    // on va définir un attribut qui contient l'indice de notre particule. cela nous permettra
    // d'itérer du nombre de particules dans notre Vertex Shader
    const particleIndices = new Float32Array(this._numParticles);
    for (let i = 0; i < this._numParticles; i++) {
      particleIndices[i] = i;
    }

    this.particleIndexBuffer = createBuffer(gl, particleIndices);
  }

  get numParticles() {
    return this._numParticles;
  }

  setWind(windData: WindData, image: HTMLImageElement) {
    this.windData = windData;
    this.image = image;
  }

  prerender(gl: WebGL2RenderingContext, matrix) {
    if (!this.windData || !this.windTexture) {
      return;
    }

    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.STENCIL_TEST);

    bindTexture(gl, this.windTexture, 0);
    bindTexture(gl, this.particlePositionTexture0, 1);

    bindFramebuffer(gl, this.framebuffer, this.screenTexture);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    this.drawTexture(this.backgroundTexture, this.fadeOpacity, matrix);
    this.drawParticles();

    bindFramebuffer(gl, null);
  }

  render(gl: WebGL2RenderingContext, matrix) {
    if (!this.windData || !this.windTexture) {
      return;
    }

    // gl.clearColor(0, 0, 0, 0);
    // gl.clear(gl.COLOR_BUFFER_BIT);

    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.STENCIL_TEST);

    bindTexture(gl, this.windTexture, 0);
    bindTexture(gl, this.particlePositionTexture0, 1);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    this.drawTexture(this.screenTexture, 1, matrix);
    gl.disable(gl.BLEND);

    const temp = this.backgroundTexture;
    this.backgroundTexture = this.screenTexture;
    this.screenTexture = temp;

    // this.updateParticles();
  }

  drawTexture(texture: WebGLTexture, opacity: number, matrix: any) {
    const gl = this.gl;
    const { program, locations } = this.screen;
    gl.useProgram(program);

    gl.uniformMatrix4fv(
      gl.getUniformLocation(program, "u_matrix"),
      false,
      matrix,
    );
    bindAttribute(gl, this.quadBuffer, locations.a_pos, 2);
    bindAttribute(gl, this.uvBuffer, locations.a_uv, 2);
    bindTexture(gl, texture, 2);
    gl.uniform1i(locations.u_screen, 2);
    gl.uniform1f(locations.u_opacity, opacity);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  drawParticles() {
    const gl = this.gl;
    const { program, locations } = this.draw;
    gl.useProgram(program);

    bindAttribute(gl, this.particleIndexBuffer, locations.a_index, 1);
    bindTexture(gl, this.colorRampTexture, 2);

    gl.uniform1i(locations.u_wind, 0);
    gl.uniform1i(locations.u_particle_position0, 1);
    gl.uniform1i(locations.u_color_ramp, 2);

    gl.uniform1f(locations.u_particles_res, this.particlePositionResolution);
    gl.uniform2f(locations.u_wind_min, this.windData.uMin, this.windData.vMin);
    gl.uniform2f(locations.u_wind_max, this.windData.uMax, this.windData.vMax);

    gl.drawArrays(gl.POINTS, 0, this._numParticles);
  }

  updateParticles() {
    const gl = this.gl;
    bindFramebuffer(gl, this.framebuffer, this.particlePositionTexture1);
    gl.viewport(
      0,
      0,
      this.particlePositionResolution,
      this.particlePositionResolution,
    );

    const { program, locations } = this.update;
    gl.useProgram(program);

    bindAttribute(gl, this.quadBuffer, locations.a_pos, 2);
    bindAttribute(gl, this.uvBuffer, locations.a_uv, 2);

    gl.uniform1i(locations.u_wind, 0);
    gl.uniform1i(locations.u_particle_position0, 1);

    gl.uniform1f(locations.u_rand_seed, Math.random());
    gl.uniform2f(
      locations.u_wind_res,
      this.windData.width,
      this.windData.height,
    );
    gl.uniform2f(locations.u_wind_min, this.windData.uMin, this.windData.vMin);
    gl.uniform2f(locations.u_wind_max, this.windData.uMax, this.windData.vMax);
    gl.uniform1f(locations.u_speed_factor, this.speedFactor);
    gl.uniform1f(locations.u_drop_rate, this.dropRate);
    gl.uniform1f(locations.u_drop_rate_bump, this.dropRateBump);

    gl.drawArrays(gl.TRIANGLES, 0, 6);

    const temp = this.particlePositionTexture0;
    this.particlePositionTexture0 = this.particlePositionTexture1;
    this.particlePositionTexture1 = temp;
  }
}

function getColorRamp(colors: Record<number, string>) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;

  canvas.width = 256;
  canvas.height = 1;
  const gradient = ctx.createLinearGradient(0, 0, 256, 0);
  for (const stop in colors) {
    gradient.addColorStop(+stop, colors[stop]);
  }

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 1);
  return new Uint8Array(ctx.getImageData(0, 0, 256, 1).data);
}
