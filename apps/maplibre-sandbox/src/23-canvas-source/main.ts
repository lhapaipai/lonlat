import "pentatrion-design/styles/default.scss";
import "~/shared/main.scss";
import "maplibre-gl/dist/maplibre-gl.css";
import { LngLatLike, Map } from "maplibre-gl";

const $map = document.getElementById("map")!;

const marignier: LngLatLike = [6.498, 46.089];

const canvas = document.getElementById("canvasID") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
canvas.style.display = "none";
const circles: Circle[] = [];
const radius = 20;

class Circle {
  constructor(
    private x: number,
    private y: number,
    private dx: number,
    private dy: number,
    private radius: number,
    private color: string,
  ) {}

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.strokeStyle = this.color;
    ctx.stroke();
  }

  update() {
    if (this.x + this.radius > 400 || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > 400 || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
}

for (let i = 0; i < 5; i++) {
  const color = `#${(0x1000000 + Math.random() * 0xffffff).toString(16).substring(1, 6)}`;
  const x = Math.random() * (400 - radius * 2) + radius;
  const y = Math.random() * (400 - radius * 2) + radius;

  const dx = (Math.random() - 0.5) * 2;
  const dy = (Math.random() - 0.5) * 2;

  circles.push(new Circle(x, y, dx, dy, radius, color));
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, 400, 400);

  for (let r = 0; r < 5; r++) {
    circles[r].update();
  }
}

animate();

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

console.log(map.unproject([100, 100]), map.unproject([500, 500]));

map.on("load", () => {
  map.addSource("canvas-source", {
    type: "canvas",
    canvas: "canvasID",
    coordinates: [
      [6.477658126831017, 46.09420836908339],
      [6.494824264525818, 46.09420836908339],
      [6.494824264525818, 46.08230280274134],
      [6.477658126831017, 46.08230280274134],
    ],
    animate: true,
  });

  map.addLayer({
    id: "canvas-layer",
    type: "raster",
    source: "canvas-source",
  });
});
