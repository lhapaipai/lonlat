const PF_WASMVERSION = "4.7.13";
var PeakFinder = PeakFinder || {};

PeakFinder.PanoramaPanel = function (options = null) {
  this.options = options;
  this.settings = new PeakFinder.Settings(this);
  this.viewpoint = new PeakFinder.Viewpoint(this);
  this.astro = new PeakFinder.Astro(this);
  this.telescope = new PeakFinder.Telescope(this);
  this.canvasId = "canvas";
  this.baseUrl = "https://www.peakfinder.com";
  this.locale = "en";
  this.backgroundColor = "#ffffff";
  this.debugMode = false;

  if (options) {
    if (options.canvasId) this.canvasId = options.canvasId;
    if (options.baseUrl) this.baseUrl = options.baseUrl;
    if (options.locale) this.locale = options.locale;
    if (options.backgroundColor) this.backgroundColor = options.backgroundColor;
    if (options.debugMode) this.debugMode = options.debugMode;
  }
};

PeakFinder.PanoramaPanel.prototype.sleep = function (seconds) {
  return seconds > 0
    ? new Promise((resolve) => {
        setTimeout(resolve, 1000 * seconds);
      })
    : null;
};

PeakFinder.PanoramaPanel.prototype.registerCommandsCallback = function (
  callback,
) {
  this.commands = callback;
};

PeakFinder.PanoramaPanel.prototype.init = function (callback) {
  if (!PeakFinder.utils.canUseWebAssembly()) {
    console.log(
      "This browser does not support loading the PeakFinder.PanoramaPanel.",
    );
    return;
  }

  console.log("env: 4.7.13");
  let scriptElement = document.createElement("script");
  scriptElement.setAttribute(
    "src",
    this.baseUrl +
      "/wasm/peakfinder" +
      (this.debugMode ? "dev" : "") +
      ".4.7.13.js",
  );
  scriptElement.setAttribute("async", "");
  scriptElement.setAttribute("defer", "");
  scriptElement.onload = () => {
    var self = this;
    var config = {
      query: window.location.search,
      style: this.options.style,
      locale: this.locale,
      touch: PeakFinder.utils.isTouchDevice(),
      debug: this.options.debug,
      canvasId: self.canvasId,
      backgroundColor: self.backgroundColor,
    };
    var canvasElement = document.getElementById(self.canvasId);

    window
      .pfModule({
        canvas: canvasElement,
        arguments: [JSON.stringify(config)],
        INITIAL_MEMORY: 33554432,
        onRuntimeInitialized: function () {
          const progressElement = document.getElementById(
            self.canvasId + "progress",
          );
          if (progressElement != null) {
            progressElement.style.display = "none";
          }
        },
        locateFile: function (fileName, path) {
          return fileName.endsWith("4.7.13.wasm") ||
            fileName.endsWith("4.7.13.wasm.map") ||
            fileName.endsWith("4.7.13.data") ||
            fileName.endsWith("4.7.13.worker.js")
            ? self.baseUrl + "/wasm/" + fileName
            : "../" + fileName;
        },
        monitorRunDependencies: function (left) {},
      })
      .then((moduleInstance) => {
        self.wasmInstance = moduleInstance;
        window.pfHandleCommand = function (command) {
          if (self.commands) self.commands(command);
        };
        if (callback) callback();
      });
  };
  document.head.appendChild(scriptElement);
};

PeakFinder.PanoramaPanel.prototype.asyncInit = async function () {
  return new Promise((resolve, reject) => {
    this.init(() => {
      resolve();
    });
  });
};

PeakFinder.PanoramaPanel.prototype.loadViewpoint = function (
  latitude,
  longitude,
  name = "",
) {
  this.wasmInstance.cwrap("startLoadingViewpoint", "", [
    "number",
    "number",
    "string",
  ])(latitude, longitude, name);
};

PeakFinder.PanoramaPanel.prototype.setAzimuth = function (angle, delay) {
  return angle === undefined
    ? this.wasmInstance._getAzimut()
    : (this.wasmInstance._setAzimut(angle, delay === undefined ? 0 : delay),
      this.sleep(delay));
};

PeakFinder.PanoramaPanel.prototype.setAltitude = function (angle, delay) {
  return angle === undefined
    ? this.wasmInstance._getAltitude()
    : (this.wasmInstance._setAltitude(angle, delay === undefined ? 0 : delay),
      this.sleep(delay));
};

PeakFinder.PanoramaPanel.prototype.setFieldOfView = function (angle, delay) {
  return angle === undefined
    ? this.wasmInstance._getFieldOfView()
    : (this.wasmInstance._setFieldOfView(
        angle,
        delay === undefined ? 0 : delay,
      ),
      this.sleep(delay));
};

PeakFinder.PanoramaPanel.prototype.setElevationOffset = function (
  offset,
  delay,
) {
  return offset === undefined
    ? this.wasmInstance._getElevationOffset()
    : (this.wasmInstance._setElevationOffset(
        offset,
        delay === undefined ? 0 : delay,
      ),
      this.sleep(delay));
};

PeakFinder.Settings = function (panel) {
  this.panel = panel;
};

PeakFinder.Settings.prototype.setTheme = function (theme) {
  return theme === undefined
    ? this.panel.wasmInstance._getTheme()
    : (this.panel.wasmInstance._setTheme(theme), this);
};

PeakFinder.Settings.prototype.setDistanceUnit = function (unit) {
  return unit === undefined
    ? this.panel.wasmInstance._getDistanceUnit()
    : (this.panel.wasmInstance._setDistanceUnit(unit), this);
};

PeakFinder.Settings.prototype.setCoordsFormat = function (format) {
  return format === undefined
    ? this.panel.wasmInstance._getCoordsFormat()
    : (this.panel.wasmInstance._setCoordsFormat(format), this);
};

PeakFinder.Settings.prototype.setProjection = function (projection) {
  return projection === undefined
    ? this.panel.wasmInstance._getProjection()
    : (this.panel.wasmInstance._setProjection(projection), this);
};

PeakFinder.Settings.prototype.setShowSun = function (show) {
  return show === undefined
    ? this.panel.wasmInstance._getShowSun()
    : (this.panel.wasmInstance._setShowSun(show), this);
};

PeakFinder.Settings.prototype.setShowMoon = function (show) {
  return show === undefined
    ? this.panel.wasmInstance._getShowMoon()
    : (this.panel.wasmInstance._setShowMoon(show), this);
};

PeakFinder.Settings.prototype.setShowGrid = function (show) {
  return show === undefined
    ? this.panel.wasmInstance._getShowGrid()
    : (this.panel.wasmInstance._setShowGrid(show), this);
};

PeakFinder.Settings.prototype.setVisibilityRange = function (range) {
  return range === undefined
    ? this.panel.wasmInstance._getVisibilityRange()
    : (this.panel.wasmInstance._setVisibilityRange(range), this);
};

PeakFinder.Settings.prototype.setMinimalElevation = function (elevation) {
  return elevation === undefined
    ? this.panel.wasmInstance._getMinimalElevation()
    : (this.panel.wasmInstance._setMinimalElevation(elevation), this);
};

PeakFinder.Viewpoint = function (panel) {
  this.panel = panel;
};

PeakFinder.Viewpoint.prototype.getName = function () {
  return this.panel.wasmInstance.cwrap("getViewpointName", "string")();
};

PeakFinder.Viewpoint.prototype.getCoordsDecimal = function () {
  return this.panel.wasmInstance.cwrap("getViewpointCoordsDecimal", "string")();
};

PeakFinder.Viewpoint.prototype.getCoordsDegree = function () {
  return this.panel.wasmInstance.cwrap("getViewpointCoordsDegree", "string")();
};

PeakFinder.Viewpoint.prototype.getElevation = function () {
  return this.panel.wasmInstance.cwrap("getViewpointElevation", "number")();
};

PeakFinder.Astro = function (panel) {
  this.panel = panel;
};

PeakFinder.Astro.prototype.setCurrentDateTime = function (
  year,
  month,
  day,
  hour,
  minute,
) {
  return this.panel.wasmInstance.cwrap("setAstroDateTime", "", [
    "number",
    "number",
    "number",
    "number",
    "number",
  ])(year, month, day, hour, minute);
};

PeakFinder.Astro.prototype.setCurrentDateTimeNow = function () {
  return this.panel.wasmInstance.cwrap("setAstroDateTime", "")();
};

PeakFinder.Astro.prototype.getSunTimes = function () {
  return this.panel.wasmInstance.cwrap("getAstroSunTimes", "string")();
};

PeakFinder.Astro.prototype.getMoonTimes = function () {
  return this.panel.wasmInstance.cwrap("getAstroMoonTimes", "string")();
};

PeakFinder.Telescope = function (panel) {
  this.panel = panel;
};

PeakFinder.Telescope.prototype.show = function () {
  this.panel.wasmInstance._showBinoculars();
};

PeakFinder.Telescope.prototype.hide = function () {
  this.panel.wasmInstance._hideBinoculars();
};

PeakFinder.Telescope.prototype.getCenterAzimuth = function () {
  return this.panel.wasmInstance._getBinocularsCenterAzimut();
};

PeakFinder.Telescope.prototype.getCenterAltitude = function () {
  return this.panel.wasmInstance._getBinocularsCenterAltitude();
};

PeakFinder.Telescope.prototype.getCenterDistance = function () {
  return this.panel.wasmInstance._getBinocularsCenterDistance();
};

PeakFinder.Telescope.prototype.getCenterElevation = function () {
  return this.panel.wasmInstance._getBinocularsCenterElevation();
};

PeakFinder.utils = {
  canUseWebAssembly: function () {
    try {
      if (
        typeof WebAssembly === "object" &&
        typeof WebAssembly.instantiate === "function"
      ) {
        const testModule = new WebAssembly.Module(
          Uint8Array.of(0, 97, 115, 109, 1, 0, 0, 0),
        );
        if (testModule instanceof WebAssembly.Module) {
          return (
            new WebAssembly.Instance(testModule) instanceof WebAssembly.Instance
          );
        }
      }
    } catch (e) {}
    return false;
  },
  isTouchDevice: function () {
    return (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  },
  sleep: function (seconds) {
    return new Promise((resolve) => {
      setTimeout(resolve, 1000 * seconds);
    });
  },
};
