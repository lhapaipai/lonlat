import { Map } from "maplibre-gl";

interface FrameRateControlOptions {
  background: string;
  barWidth: number;
  color: string;
  font: string;
  graphHeight: number;
  graphWidth: number;
  graphTop: number;
  graphRight: number;
  width: number;
}

class FrameRateControl {
  frames: number;
  totalTime: number;
  totalFrames: number;
  options: FrameRateControlOptions;
  enabled: boolean;
  map: Map | null = null;
  declare container: HTMLDivElement;
  declare readOutput: HTMLDivElement;
  declare canvas: HTMLCanvasElement;
  declare button: HTMLButtonElement;
  declare time: number;

  constructor(options?: Partial<FrameRateControlOptions>) {
    const dpr = window.devicePixelRatio;
    const defaultOptions = {
      background: "rgba(0,0,0,0.9)",
      barWidth: 4 * dpr,
      color: "#ffe64b",
      font: "Monaco, Consolas, Courier, monospace",
      graphHeight: 60 * dpr,
      graphWidth: 90 * dpr,
      graphTop: 0,
      graphRight: 5 * dpr,
      width: 100 * dpr,
    };

    this.frames = 0;
    this.totalTime = 0;
    this.totalFrames = 0;
    this.options = { ...options, ...defaultOptions };
    this.enabled = false;
  }

  onAdd = (map: Map) => {
    this.map = map;

    const dpr = window.devicePixelRatio;
    const { width, graphHeight, color, background, font } = this.options;

    const el = (this.container = document.createElement("div"));
    el.className = "maplibregl-ctrl maplibregl-ctrl-fps";

    el.style.backgroundColor = background;
    el.style.borderRadius = "6px";

    this.readOutput = document.createElement("div");
    this.readOutput.style.color = color;
    this.readOutput.style.fontFamily = font;
    this.readOutput.style.padding = "0 5px 5px";
    this.readOutput.style.fontSize = "9px";
    this.readOutput.style.fontWeight = "bold";
    this.readOutput.textContent = "Waiting…";

    this.canvas = document.createElement("canvas");
    this.canvas.className = "maplibregl-ctrl-canvas";
    this.canvas.width = width;
    this.canvas.height = graphHeight;
    this.canvas.style.cssText = `width: ${width / dpr}px; height: ${graphHeight / dpr}px;`;

    this.button = document.createElement("button");
    this.button.style.display = "block";
    this.button.style.color = color;
    this.button.style.fontFamily = font;
    this.button.style.padding = "0 5px 5px";
    this.button.style.fontSize = "9px";
    this.button.style.fontWeight = "bold";
    this.button.innerText = "Enable";

    this.button.addEventListener("click", this.toggle);
    el.appendChild(this.readOutput);
    el.appendChild(this.canvas);
    el.appendChild(this.button);

    return this.container;
  };

  toggle = () => {
    this.enabled ? this.disable() : this.enable();
  };

  enable = () => {
    this.enabled = true;
    this.frames = 0;
    this.time = performance.now();
    this.button.innerText = "Disable";

    if (!this.map) {
      return;
    }
    this.map.on("render", this.onRender);
    this.map.repaint = true;
  };

  disable = () => {
    this.enabled = false;
    this.button.innerText = "Enable";
    if (!this.map) {
      return;
    }

    this.map.repaint = false;
    this.map.off("render", this.onRender);
  };

  onRender = () => {
    this.frames++;
    const now = performance.now();
    if (now >= this.time + 1e3) {
      this.updateGraph(this.getFPS(now));
      this.frames = 0;
      this.time = now;
    }
  };

  getFPS = (now: number) => {
    (this.totalTime += now - this.time), (this.totalFrames += this.frames);
    return Math.round((1e3 * this.frames) / (now - this.time)) || 0;
  };

  updateGraph = (fpsNow: number) => {
    const { barWidth, graphRight, graphTop, graphWidth, graphHeight, background, color } =
      this.options;

    const context = this.canvas.getContext("2d");
    if (!context) {
      throw new Error("Unable to find CanvasContext");
    }
    const fps = Math.round((1e3 * this.totalFrames) / this.totalTime) || 0;
    const rect = barWidth;

    context.fillStyle = background;
    context.globalAlpha = 1;
    context.fillRect(0, 0, graphWidth, graphTop);
    context.fillStyle = color;

    this.readOutput.textContent = `${fpsNow} FPS (${fps} Avg)`;
    context.drawImage(
      this.canvas,
      graphRight + rect,
      graphTop,
      graphWidth - rect,
      graphHeight,
      graphRight,
      graphTop,
      graphWidth - rect,
      graphHeight,
    );
    context.fillRect(graphRight + graphWidth - rect, graphTop, rect, graphHeight);
    context.fillStyle = background;
    context.globalAlpha = 0.75;
    context.fillRect(
      graphRight + graphWidth - rect,
      graphTop,
      rect,
      (1 - fpsNow / 100) * graphHeight,
    );
  };

  onRemove = () => {
    if (!this.map) {
      return this;
    }
    this.button.removeEventListener("click", this.toggle);

    this.disable();
    this.container.parentNode?.removeChild(this.container);
    this.map = null;
    return this;
  };
}

export default FrameRateControl;
