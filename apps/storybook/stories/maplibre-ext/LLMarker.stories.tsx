import { useEffect, useRef } from "react";
import * as maplibre from "maplibre-gl";
import { LLMarker } from "@lonlat/maplibre-ext";
import "maplibre-gl/dist/maplibre-gl.css";

const meta = {
  title: "Maplibre-ext/LLMarker",
};
export default meta;

export const Graphics = () => (
  <div>
    <div className="storybook-icon-grid">
      <div>
        <div className="ll-marker">
          {/* i is wrapped so we can apply transform when active */}
          <div>
            <div className="ovale"></div>
            <i className="fe-star"></i>
          </div>
        </div>
      </div>
    </div>

    <div className="storybook-icon-grid">
      <div>
        <div className="ll-marker">
          <div>
            <div className="ovale"></div>
            <i className="fe-road"></i>
          </div>
        </div>
      </div>
      <div>
        <div className="ll-marker selected">
          <div>
            <div className="ovale"></div>
            <i className="fe-heart"></i>
          </div>
        </div>
        <pre>.selected</pre>
      </div>
    </div>

    <div className="storybook-icon-grid">
      <div>
        <div className="ll-marker">
          <div>
            <div className="ovale"></div>
            <i className="fe-heart"></i>
          </div>
        </div>
      </div>
      <div>
        <div className="ll-marker" style={{ "--marker-color": "#9ed24d" }}>
          <div>
            <div className="ovale"></div>
            <i className="fe-heart"></i>
          </div>
        </div>
      </div>
      <div>
        <div className="ll-marker" style={{ "--marker-color": "#5fbcff" }}>
          <div>
            <div className="ovale"></div>
            <i className="fe-heart"></i>
          </div>
        </div>
      </div>
      <div>
        <div className="ll-marker" style={{ "--marker-color": "#ffa33d" }}>
          <div>
            <div className="ovale"></div>
            <i className="fe-heart"></i>
          </div>
        </div>
      </div>
      <div>
        <div className="ll-marker" style={{ "--marker-color": "#ff4d4d" }}>
          <div>
            <div className="ovale"></div>
            <i className="fe-heart"></i>
          </div>
        </div>
      </div>
      <div>
        <div className="ll-marker" style={{ "--marker-color": "#c0c0c0" }}>
          <div>
            <div className="ovale"></div>
            <i className="fe-heart"></i>
          </div>
        </div>
      </div>
    </div>

    {/* <div className="storybook-icon-grid">
      <div className="ll-marker marker-cluster">
        <div>
          <i className="fe-cluster-station-hyd"></i>
          <div className="text">5</div>
        </div>
      </div>
      <div className="ll-marker marker-cluster">
        <div>
          <i className="fe-cluster-station-cam"></i>
          <div className="text">15</div>
        </div>
      </div>
      <div className="ll-marker marker-cluster">
        <div>
          <i className="fe-cluster-station-met"></i>
          <div className="text">25</div>
        </div>
      </div>
      <div className="ll-marker marker-cluster">
        <div>
          <i className="fe-cluster-station-nph"></i>
          <div className="text">105</div>
        </div>
      </div>
      <div className="ll-marker marker-cluster">
        <div>
          <i className="fe-cluster-station-mf"></i>
          <div className="text">225</div>
        </div>
      </div>
    </div> */}

    <div className="storybook-icon-grid">
      <div>
        <div className="ll-marker disabled">
          <div>
            <div className="ovale"></div>
            <i className="fe-housenumber"></i>
          </div>
        </div>
        <pre>.disabled</pre>
      </div>
      <div>
        <div className="ll-marker">
          <div>
            <div className="ovale"></div>
            <i className="fe-town"></i>
            <div className="inactive"></div>
          </div>
        </div>
        <pre>.inactive</pre>
      </div>
    </div>

    <div className="storybook-icon-grid">
      <div>
        <div className="ll-marker" style={{ "--marker-size": "30px" }}>
          <div>
            <div className="ovale"></div>
            <i className="fe-route"></i>
          </div>
        </div>
        <pre>--marker-size: 30px</pre>
      </div>
      <div>
        <div className="ll-marker" style={{ "--marker-size": "50px" }}>
          <div>
            <div className="ovale"></div>
            <i className="fe-municipality"></i>
          </div>
        </div>
        <pre>--marker-size: 50px</pre>
      </div>
      <div>
        <div className="ll-marker" style={{ "--marker-size": "70px" }}>
          <div>
            <div className="ovale"></div>
            <i className="fe-home"></i>
          </div>
        </div>
        <pre>--marker-size: 70px</pre>
      </div>
      <div>
        <div className="ll-marker" style={{ "--marker-size": "90px" }}>
          <div>
            <div className="ovale"></div>
            <i className="fe-climbing-outdoor"></i>
          </div>
        </div>
        <pre>--marker-size: 90px</pre>
      </div>
    </div>

    {/* <div className="storybook-icon-grid">
      <div className="ll-marker marker-cluster" style={{ "--marker-size": "44px" }}>
        <div>
          <i className="fe-cluster-station-met"></i>
          <div className="text">25</div>
        </div>
      </div>
      <div className="ll-marker marker-cluster" style={{ "--marker-size": "60px" }}>
        <div>
          <i className="fe-cluster-station-nph"></i>
          <div className="text">105</div>
        </div>
      </div>
      <div className="ll-marker marker-cluster" style={{ "--marker-size": "80px" }}>
        <div>
          <i className="fe-cluster-station-mf"></i>
          <div className="text">225</div>
        </div>
      </div>
    </div> */}
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

    new LLMarker().setLngLat([-1.1344, 44.698]).addTo(map);

    new LLMarker({ color: "green" }).setLngLat([-4, 44.698]).addTo(map);
    new LLMarker({ color: "green", rotation: 180, anchor: "top" })
      .setLngLat([-4, 44.698])
      .addTo(map);
    new LLMarker({ scale: 0.5 }).setLngLat([-6.293, 49.92]).addTo(map);
    new LLMarker({ draggable: true }).setLngLat([-8, 44.698]).addTo(map);

    // new maplibre.Marker().setLngLat([-1.1344, 44.698]).addTo(map);
  }, []);
  return (
    <div ref={containerRef} style={{ height: "var(--storybook-preview-viewport-height)" }}></div>
  );
};
