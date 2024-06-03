map.on("mousemove", (e) => {
  const features = map.queryRenderedFeatures(e.point);
  const displayProperties = ["type", "properties", "id", "layer", "source", "sourceLayer", "state"];

  let displayFeatures = [];
  const compact = true;

  if (compact) {
    displayFeatures = features.map((f) => f.layer.id);
  } else {
    displayFeatures = features.map((f) =>
      Object.fromEntries(displayProperties.map((prop) => [prop, f[prop]])),
    );
  }

  document.getElementById("features")!.innerHTML = JSON.stringify(displayFeatures, null, 2);
});
