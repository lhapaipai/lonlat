import "./main.css";

let panel = null;
let rotation = 0;
let altitude = 0;
let fov = 45;
let elevation = 0;

document.getElementById("rotation-button")?.addEventListener("click", () => {
  rotation = (rotation + 90) % 360;
  panel.azimut(rotation, 0.5);
  document.getElementById("rotation-value")!.innerText = rotation.toString();
});

document.getElementById("altitude-up-button")?.addEventListener("click", () => {
  altitude = altitude + 10;
  panel.altitude(altitude, 0.5);
  document.getElementById("altitude-value")!.innerText = altitude.toString();
});
document
  .getElementById("altitude-down-button")
  ?.addEventListener("click", () => {
    altitude = altitude - 10;
    panel.altitude(altitude, 0.5);
    document.getElementById("altitude-value")!.innerText = altitude.toString();
  });

document.getElementById("fov-up-button")?.addEventListener("click", () => {
  fov = fov + 5;
  panel.fieldofview(fov, 0.5);
  document.getElementById("fov-value")!.innerText = fov.toString();
});
document.getElementById("fov-down-button")?.addEventListener("click", () => {
  fov = fov - 5;
  panel.fieldofview(fov, 0.5);
  document.getElementById("fov-value")!.innerText = fov.toString();
});

document
  .getElementById("elevation-up-button")
  ?.addEventListener("click", () => {
    elevation = elevation + 100;
    panel.elevationOffset(elevation, 0.5);
    document.getElementById("elevation-value")!.innerText =
      elevation.toString();
  });
document
  .getElementById("elevation-down-button")
  ?.addEventListener("click", () => {
    elevation = elevation - 100;
    panel.elevationOffset(elevation, 0.5);
    document.getElementById("elevation-value")!.innerText =
      elevation.toString();
  });

document
  .getElementById("viewpoint-chamonix-button")
  ?.addEventListener("click", () => {
    panel.loadViewpoint(45.924, 6.8692, "Chamonix");
  });
document
  .getElementById("viewpoint-mole-button")
  ?.addEventListener("click", () => {
    panel.loadViewpoint(46.1067, 6.4547, "Le môle");
  });
function onload() {
  const PeakFinder = window.PeakFinder;

  const $canvas = document.getElementById("pfcanvas");
  $canvas?.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });

  if (PeakFinder.utils.caniuse()) {
    panel = new PeakFinder.PanoramaPanel({
      canvasid: "pfcanvas",
      locale: "fr",
      bgcolor: "#e0f2fe",
      debug: true,
    });

    panel.init(function () {
      console.log("init");
      // 0: metric 1: imperial
      panel.settings.distanceUnit(0);
      panel.loadViewpoint(46.1067, 6.4547, "Le môle");

      // définit un azimut de 209 degré dans une animation durant 2 secondes.
      panel.azimut(0, 2.0);
      panel.altitude(0, 1.0);
      panel.fieldofview(45.0, 2.0);
    });

    panel.registerCommandsCallback(function (cmd) {
      console.log(cmd);
    });
  }
}

window.addEventListener("DOMContentLoaded", onload);

// setTimeout(() => {
//   onload();
// }, 1000);
