import {
  bindAttribute,
  bindFramebuffer,
  bindTextureUnit,
  createBuffer,
  createProgramInfos,
  createTexture,
  ProgramInfos,
  resizeCanvasToDisplaySize,
} from "./webgl-utils";

import drawVert from "./shaders/draw.vert";
import drawFrag from "./shaders/draw.frag";

import squareVert from "./shaders/square.vert";

import updateFrag from "./shaders/update.frag";
import screenFrag from "./shaders/screen.frag";

import { WindData } from "./types";
import { Map, MercatorCoordinate } from "maplibre-gl";

export default class WindMap {
  id: string;
  type: "custom";

  public fadeOpacity = 0.975;
  public speedFactor = 0.87;
  private _numParticles = 0;

  public dropRate = 0.003;
  public dropRateBump = 0.01;

  private declare canvas: HTMLCanvasElement;
  private declare gl: WebGL2RenderingContext;

  private frameBuffer: WebGLFramebuffer;

  private declare particlePositionCurrent: WebGLTexture;
  private declare particlePositionNext: WebGLTexture;
  private declare particleIndexBuffer: WebGLBuffer;

  private windTexture: WebGLTexture;
  private colorRampTexture: WebGLTexture;
  private gl: WebGL2RenderingContext;

  private declare previousScreenTexture: WebGLTexture;
  private declare screenTexture: WebGLTexture;

  private draw: ProgramInfos;
  private update: ProgramInfos;
  private screen: ProgramInfos;

  private square: {
    position: WebGLBuffer;
    uv: WebGLBuffer;
  };

  constructor(
    public windData: WindData,
    public windImage: HTMLImageElement,
    public windSpeedRampColor: Record<number, string>,
  ) {
    this.id = "wind-map";
    this.type = "custom";
  }

  onAdd(map: Map, gl: WebGL2RenderingContext) {
    this.gl = gl;
    this.canvas = gl.canvas as HTMLCanvasElement;

    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.STENCIL_TEST);
    gl.enable(gl.CULL_FACE);

    this.gl = gl;
    this.frameBuffer = gl.createFramebuffer()!;

    this.windTexture = createTexture(gl, gl.LINEAR, this.windImage);
    bindTextureUnit(gl, this.windTexture, 0);

    this.colorRampTexture = createTexture(
      gl,
      gl.LINEAR,
      getColorRamp(this.windSpeedRampColor),
      256,
      1,
    );
    bindTextureUnit(gl, this.colorRampTexture, 1);

    this.draw = createProgramInfos(gl, drawVert, drawFrag);
    this.update = createProgramInfos(gl, squareVert, updateFrag);
    this.screen = createProgramInfos(gl, squareVert, screenFrag);

    // prettier-ignore
    this.square = {
      position: createBuffer(gl, new Float32Array(this.getBufferPosition(this.windData.bbox))),
      // la texture utilisée est issue du frame buffer qui a une origine en bas à gauche.
      // on doit donc faire un flipY
      uv: createBuffer(gl, new Float32Array([
        0, 1, 0, 0, 1, 1,
        1, 1, 0, 0, 1, 0
      ])),
    };

    /**
     * cette assignation va initialiser
     *  - _numParticles
     *  - particlePositionCurrent
     *  - particleIndexBuffer
     */
    this.numParticles = 53824;

    this.initTextures();
    map.on("resize", this.initTextures);
  }

  getBufferPosition(bbox: number[]) {
    const sw = MercatorCoordinate.fromLngLat([bbox[0], bbox[1]]);
    const ne = MercatorCoordinate.fromLngLat([bbox[2], bbox[3]]);
    return [
      sw.x,
      ne.y,
      sw.x,
      sw.y,
      ne.x,
      ne.y,
      ne.x,
      ne.y,
      sw.x,
      sw.y,
      ne.x,
      sw.y,
    ];
  }

  set numParticles(rawVal: number) {
    const { gl } = this;
    // les particules sont stockées dans une texture carrée. on altère la valeur
    // afin d'avoir un compte rond
    const texSide = Math.floor(Math.sqrt(rawVal));

    this._numParticles = texSide * texSide;
    const data = new Uint8Array(this._numParticles * 4);
    for (let i = 0; i < data.length; i++) {
      data[i] = Math.floor(Math.random() * 256);
    }

    this.particlePositionCurrent = createTexture(
      gl,
      gl.NEAREST,
      data,
      texSide,
      texSide,
    );
    bindTextureUnit(gl, this.particlePositionCurrent, 2);

    this.particlePositionNext = createTexture(
      gl,
      gl.NEAREST,
      data,
      texSide,
      texSide,
    );
    bindTextureUnit(gl, this.particlePositionNext, 3);

    // on va définir un attribut qui contient l'indice de notre particule. cela nous permettra
    // d'itérer du nombre de particules dans notre Vertex Shader
    const indexArr = new Float32Array(this._numParticles);
    for (let i = 0; i < indexArr.length; i++) {
      indexArr[i] = i;
    }
    this.particleIndexBuffer = createBuffer(gl, indexArr);
  }

  get numParticles() {
    return this._numParticles;
  }

  initTextures = () => {
    console.log("initTextures");
    const { gl } = this;
    const { width, height } = gl.canvas;
    const emptyPixels = new Uint8Array(width * height * 4);

    this.previousScreenTexture = createTexture(
      gl,
      gl.NEAREST,
      emptyPixels,
      width,
      height,
    );
    this.screenTexture = createTexture(
      gl,
      gl.NEAREST,
      emptyPixels,
      width,
      height,
    );
  };

  prerender(gl: WebGL2RenderingContext, matrix: Float32Array) {
    bindFramebuffer(gl, this.frameBuffer, this.screenTexture);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    this.drawScreen(this.previousScreenTexture, this.fadeOpacity, matrix);
    this.drawParticles();
    this.updateParticles(matrix);

    bindFramebuffer(gl, null);
  }

  render(gl: WebGL2RenderingContext, matrix: Float32Array) {
    // gl.enable(gl.BLEND);
    // gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    this.drawScreen(this.screenTexture, 1, matrix);

    // gl.disable(gl.BLEND);

    let temp = this.previousScreenTexture;
    this.previousScreenTexture = this.screenTexture;
    this.screenTexture = temp;

    temp = this.particlePositionCurrent;
    this.particlePositionCurrent = this.particlePositionNext;
    this.particlePositionNext = temp;
  }

  drawScreen(texture: WebGLTexture, opacity: number, matrix: Float32Array) {
    const { gl } = this;
    const { program, locations } = this.screen;
    gl.useProgram(program);

    bindAttribute(gl, this.square.position, locations.a_position, 2);
    bindAttribute(gl, this.square.uv, locations.a_uv, 2);

    bindTextureUnit(gl, texture, 4);
    gl.uniform1i(locations.u_screen, 4);
    gl.uniform1f(locations.u_opacity, opacity);
    gl.uniformMatrix4fv(
      gl.getUniformLocation(program, "u_matrix"),
      false,
      matrix,
    );

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  drawParticles() {
    const { gl } = this;
    const { program, locations } = this.draw;
    gl.useProgram(program);

    bindAttribute(gl, this.particleIndexBuffer, locations.a_index, 1);

    bindTextureUnit(gl, this.windTexture, 0);
    gl.uniform1i(locations.u_wind, 0);
    bindTextureUnit(gl, this.colorRampTexture, 1);
    gl.uniform1i(locations.u_color_ramp, 1);
    bindTextureUnit(gl, this.particlePositionCurrent, 2);
    gl.uniform1i(locations.u_particle_position_current, 2);

    gl.uniform1f(locations.u_tex_width, Math.sqrt(this._numParticles));

    gl.drawArrays(gl.POINTS, 0, this._numParticles);
  }

  updateParticles(matrix: Float32Array) {
    const { gl } = this;
    const res = Math.sqrt(this._numParticles);

    bindFramebuffer(gl, this.frameBuffer, this.particlePositionNext);
    gl.viewport(0, 0, res, res);

    const { program, locations } = this.update;
    gl.useProgram(program);

    bindAttribute(gl, this.square.position, locations.a_position, 2);
    bindAttribute(gl, this.square.uv, locations.a_uv, 2);
    gl.uniformMatrix4fv(
      gl.getUniformLocation(program, "u_matrix"),
      false,
      matrix,
    );

    bindTextureUnit(gl, this.windTexture, 0);
    gl.uniform1i(locations.u_wind, 0);
    bindTextureUnit(gl, this.particlePositionCurrent, 2);
    gl.uniform1i(locations.u_particle_position_current, 2);

    gl.uniform2f(
      locations.u_wind_res,
      this.windData.width,
      this.windData.height,
    );
    gl.uniform4fv(locations.u_bbox, this.windData.bbox);
    gl.uniform1f(locations.u_speed_factor, this.speedFactor);

    /** todo:begin */
    gl.uniform1f(locations.u_rand_seed, Math.random());
    gl.uniform1f(locations.u_drop_rate, this.dropRate);
    gl.uniform1f(locations.u_drop_rate_bump, this.dropRateBump);

    /** todo:end */

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }
}

function getColorRamp(colors: Record<number, string>) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;

  canvas.width = 256;
  canvas.height = 1;

  const maxSpeed = 120;

  const gradient = ctx.createLinearGradient(0, 0, 256, 0);
  for (const speed in colors) {
    const stop = parseInt(speed) / maxSpeed;
    gradient.addColorStop(stop, colors[speed]);
  }

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 1);
  return new Uint8Array(ctx.getImageData(0, 0, 256, 1).data);
}
