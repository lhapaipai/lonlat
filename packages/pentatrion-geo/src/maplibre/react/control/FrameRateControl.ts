import clsx from "clsx";
import { Map } from "maplibre-gl";
import { buttonVariants } from "~design";

interface FrameRateControlOptions {
  barWidth: number;
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
      barWidth: 4 * dpr,
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
    const { width, graphHeight } = this.options;

    const el = (this.container = document.createElement("div"));
    el.className = "maplibregl-ctrl maplibregl-ctrl-group grid gap-2 grid-cols-1";

    this.readOutput = document.createElement("div");
    this.readOutput.classList.add("text-xs");
    this.readOutput.textContent = "Waiting…";

    this.canvas = document.createElement("canvas");
    this.canvas.className = "maplibregl-ctrl-canvas";
    this.canvas.width = width;
    this.canvas.height = graphHeight;
    this.canvas.style.cssText = `width: ${width / dpr}px; height: ${graphHeight / dpr}px;`;

    this.button = document.createElement("button");
    this.button.className = clsx(
      "text-xs px-2 rounded-2xl cursor-pointer relative overflow-clip focus-visible:outline focus-visible:outline-2 no-underline border-0 inline-flex items-center justify-center transition-color-shadow duration-300 leading-5",
      buttonVariants.variant.contained("yellow"),
    );
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
    const { barWidth, graphRight, graphTop, graphWidth, graphHeight } = this.options;

    const context = this.canvas.getContext("2d");
    if (!context) {
      throw new Error("Unable to find CanvasContext");
    }
    const fps = Math.round((1e3 * this.totalFrames) / this.totalTime) || 0;
    const rect = barWidth;

    context.fillStyle = "white";
    context.globalAlpha = 1;
    context.fillRect(0, 0, graphWidth, graphTop);
    context.fillStyle = "#ffe822";

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
    context.fillStyle = "white";
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
