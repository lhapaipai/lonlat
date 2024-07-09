import { useEffect, useRef } from "react";
import * as maplibre from "maplibre-gl";
import { Pegman } from "./Pegman";

const meta = {
  title: "pentatrion-geo/MapLibre/Pegman",
};
export default meta;

export const Graphics = () => (
  <div>
    <div className="sb-icon-grid">
      <div>
        <div
          data-shape="pin"
          data-interactive
          className="maplibregl-pegman zone-0"
        >
          <div className="image"></div>
          <div className="target"></div>
        </div>
        <pre>0 deg.</pre>
      </div>
      <div>
        <div className="maplibregl-pegman zone-1">
          <div className="image"></div>
          <div className="target"></div>
        </div>
        <pre>22.5 deg.</pre>
      </div>
      <div>
        <div className="maplibregl-pegman zone-2">
          <div className="image"></div>
          <div className="target"></div>
        </div>
        <pre>45 deg.</pre>
      </div>
      <div>
        <div className="maplibregl-pegman zone-3">
          <div className="image"></div>
          <div className="target"></div>
        </div>
        <pre>67.5 deg.</pre>
      </div>
      <div>
        <div className="maplibregl-pegman zone-4">
          <div className="image"></div>
          <div className="target"></div>
        </div>
        <pre>90 deg.</pre>
      </div>
      <div>
        <div className="maplibregl-pegman zone-5">
          <div className="image"></div>
          <div className="target"></div>
        </div>
        <pre>112.5 deg.</pre>
      </div>
      <div>
        <div className="maplibregl-pegman zone-6">
          <div className="image"></div>
          <div className="target"></div>
        </div>
        <pre>135 deg.</pre>
      </div>
      <div>
        <div className="maplibregl-pegman zone-7">
          <div className="image"></div>
          <div className="target"></div>
        </div>
        <pre>157.5 deg.</pre>
      </div>
      <div>
        <div className="maplibregl-pegman zone-8">
          <div className="image"></div>
          <div className="target"></div>
        </div>
        <pre>180 deg.</pre>
      </div>
      <div>
        <div className="maplibregl-pegman zone-9">
          <div className="image"></div>
          <div className="target"></div>
        </div>
        <pre>202.5 deg.</pre>
      </div>
      <div>
        <div className="maplibregl-pegman zone-10">
          <div className="image"></div>
          <div className="target"></div>
        </div>
        <pre>225 deg.</pre>
      </div>
      <div>
        <div className="maplibregl-pegman zone-11">
          <div className="image"></div>
          <div className="target"></div>
        </div>
        <pre>247.5 deg.</pre>
      </div>
      <div>
        <div className="maplibregl-pegman zone-12">
          <div className="image"></div>
          <div className="target"></div>
        </div>
        <pre>270 deg.</pre>
      </div>
      <div>
        <div className="maplibregl-pegman zone-13">
          <div className="image"></div>
          <div className="target"></div>
        </div>
        <pre>292.5 deg.</pre>
      </div>
      <div>
        <div className="maplibregl-pegman zone-14">
          <div className="image"></div>
          <div className="target"></div>
        </div>
        <pre>315 deg.</pre>
      </div>
      <div>
        <div className="maplibregl-pegman zone-15">
          <div className="image"></div>
          <div className="target"></div>
        </div>
        <pre>337.5 deg.</pre>
      </div>
    </div>
  </div>
);

export const Basic = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const map = new maplibre.Map({
      container: containerRef.current!,
      style: "https://demotiles.maplibre.org/style.json", // style URL
      center: [5, 45],
      zoom: 4,
    });
    map.on("click", (e) => console.log(e.lngLat));

    new Pegman()
      .setLngLat({ lng: -4.492187500001222, lat: 48.43306399776475 })
      .setDraggable(true)
      .addTo(map);
  }, []);
  return <div ref={containerRef} style={{ height: "100vh" }}></div>;
};

Basic.parameters = {
  layout: "fullscreen",
};
