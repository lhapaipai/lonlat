import { useEffect, useRef } from "react";
import * as maplibre from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Marker } from "./Marker";

const meta = {
  title: "pentatrion-geo/MapLibre/LLMarker",
};
export default meta;

const iconGrid =
  "grid grid-cols-repeat-fill-160 gap-4 mt-4 *:border *:border-gray-1 *:flex *:flex-col *:items-center *:justify-center *:p-2 [&_i]:text-[2.5rem] [&_.ll-marker]:relative [&_pre]:text-xs";

export const Graphics = () => (
  <div>
    <div className={iconGrid}>
      <div>
        <div
          className="ll-marker"
          style={{
            background: "var(--marker-color)",
          }}
        ></div>
        <pre>--marker-color</pre>
      </div>
      <div>
        <div
          className="ll-marker"
          style={{
            background: "var(--marker-color-dark)",
          }}
        ></div>
        <pre>--marker-color-dark</pre>
      </div>
      <div>
        <div
          className="ll-marker"
          style={{
            background: "var(--ovale-color-hover)",
          }}
        ></div>
        <pre>--ovale-color-hover</pre>
      </div>
    </div>
    <div className={iconGrid}>
      <div>
        <div
          className="ll-marker"
          style={{
            backgroundImage: "var(--marker-color-gradient)",
            backgroundSize: "var(--marker-height)",
            backgroundPosition: -15,
          }}
        ></div>
        <pre>--marker-color-gradient</pre>
      </div>
      <div>
        <div
          className="ll-marker"
          style={{
            backgroundImage: "var(--marker-color-gradient)",
            backgroundSize: "var(--marker-height)",
            backgroundPosition: 0,
          }}
        ></div>
        <pre>--marker-color-gradient hover</pre>
      </div>
      <div>
        <div
          className="ll-marker"
          style={{
            backgroundImage: "var(--marker-color-gradient)",
            backgroundSize: "var(--marker-height)",
            backgroundPosition: 0,
          }}
        ></div>
        <pre>--marker-color-gradient selected</pre>
      </div>
    </div>

    <div className={iconGrid}>
      <div>
        <div className="ll-marker">
          {/* i is wrapped so we can apply transform when active */}
          <div className="marker">
            <div className="ovale"></div>
            <i className="fe-star"></i>
          </div>
          <div className="target"></div>
        </div>
      </div>
    </div>

    <div className={iconGrid}>
      <div>
        <div className="ll-marker">
          <div className="marker">
            <div className="ovale"></div>
            <i className="fe-heart"></i>
          </div>
          <div className="target"></div>
        </div>
      </div>
      <div>
        <div className="ll-marker selected">
          <div className="marker">
            <div className="ovale"></div>
            <i className="fe-heart"></i>
          </div>
          <div className="target"></div>
        </div>
        <pre>.selected</pre>
      </div>
      <div>
        <div className="ll-marker draggable">
          <div className="marker">
            <div className="ovale"></div>
            <i className="fe-heart"></i>
          </div>
          <div className="target"></div>
        </div>
        <pre>.draggable</pre>
      </div>
    </div>

    <div className={iconGrid}>
      <div>
        <div className="ll-marker">
          <div className="marker">
            <div className="ovale"></div>
            <i className="fe-heart"></i>
          </div>
          <div className="target"></div>
        </div>
      </div>
      <div>
        <div className="ll-marker" style={{ "--marker-color": "#9ed24d" }}>
          <div className="marker">
            <div className="ovale"></div>
            <i className="fe-heart"></i>
          </div>
          <div className="target"></div>
        </div>
      </div>
      <div>
        <div className="ll-marker" style={{ "--marker-color": "#5fbcff" }}>
          <div className="marker">
            <div className="ovale"></div>
            <i className="fe-heart"></i>
          </div>
          <div className="target"></div>
        </div>
      </div>
      <div>
        <div className="ll-marker" style={{ "--marker-color": "#ffa33d" }}>
          <div className="marker">
            <div className="ovale"></div>
            <i className="fe-heart"></i>
          </div>
          <div className="target"></div>
        </div>
      </div>
      <div>
        <div className="ll-marker" style={{ "--marker-color": "#ff4d4d" }}>
          <div className="marker">
            <div className="ovale"></div>
            <i className="fe-heart"></i>
          </div>
          <div className="target"></div>
        </div>
      </div>
      <div>
        <div className="ll-marker" style={{ "--marker-color": "#c0c0c0" }}>
          <div className="marker">
            <div className="ovale"></div>
            <i className="fe-heart"></i>
          </div>
          <div className="target"></div>
        </div>
      </div>
    </div>

    <div className={iconGrid}>
      <div>
        <div className="ll-marker">
          <div className="marker">
            <div className="ovale"></div>
            <div className="text">A</div>
          </div>
          <div className="target"></div>
        </div>
      </div>
      <div>
        <div className="ll-marker">
          <div className="marker">
            <div className="ovale"></div>
            <div className="text">5</div>
          </div>
          <div className="target"></div>
        </div>
      </div>
      <div>
        <div className="ll-marker">
          <div className="marker">
            <div className="ovale"></div>
            <div className="text">15</div>
          </div>
          <div className="target"></div>
        </div>
      </div>
      <div>
        <div className="ll-marker">
          <div className="marker">
            <div className="ovale"></div>
            <div className="text">105</div>
          </div>
          <div className="target"></div>
        </div>
      </div>
    </div>

    <div className={iconGrid}>
      <div>
        <div className="ll-marker disabled">
          <div className="marker">
            <div className="ovale"></div>
            <i className="fe-housenumber"></i>
          </div>
          <div className="target"></div>
        </div>
        <pre>.disabled</pre>
      </div>
      <div>
        <div className="ll-marker">
          <div className="marker">
            <div className="ovale"></div>
            <i className="fe-town"></i>
            <div className="inactive"></div>
          </div>
          <div className="target"></div>
        </div>
        <pre>.inactive</pre>
      </div>
      <div>
        <div className="ll-marker geolocation">
          <div className="marker">
            <div className="ovale"></div>
            <i className="fe-locate"></i>
          </div>
          <div className="target"></div>
        </div>
        <pre>.geolocation</pre>
      </div>
    </div>

    <div className={iconGrid}>
      <div>
        <div className="ll-marker" style={{ "--marker-size": "30px" }}>
          <div className="marker">
            <div className="ovale"></div>
            <i className="fe-route"></i>
          </div>
          <div className="target"></div>
        </div>
        <pre>--marker-size: 30px</pre>
      </div>
      <div>
        <div className="ll-marker" style={{ "--marker-size": "50px" }}>
          <div className="marker">
            <div className="ovale"></div>
            <i className="fe-municipality"></i>
          </div>
          <div className="target"></div>
        </div>
        <pre>--marker-size: 50px</pre>
      </div>
      <div>
        <div className="ll-marker" style={{ "--marker-size": "70px" }}>
          <div className="marker">
            <div className="ovale"></div>
            <i className="fe-globe"></i>
          </div>
          <div className="target"></div>
        </div>
        <pre>--marker-size: 70px</pre>
      </div>
      <div>
        <div className="ll-marker" style={{ "--marker-size": "90px" }}>
          <div className="marker">
            <div className="ovale"></div>
            <i className="fe-climbing-outdoor"></i>
          </div>
          <div className="target"></div>
        </div>
        <pre>--marker-size: 90px</pre>
      </div>
    </div>

    <div className={iconGrid}>
      <div>
        <div className="ll-marker small-text" style={{ "--marker-size": "30px" }}>
          <div className="marker">
            <div className="ovale"></div>
            <div className="text">5</div>
          </div>
          <div className="target"></div>
        </div>
        <pre>--marker-size: 30px</pre>
      </div>
      <div>
        <div className="ll-marker" style={{ "--marker-size": "50px" }}>
          <div className="marker">
            <div className="ovale"></div>
            <div className="text">12</div>
          </div>
          <div className="target"></div>
        </div>
        <pre>--marker-size: 50px</pre>
      </div>
      <div>
        <div className="ll-marker" style={{ "--marker-size": "70px" }}>
          <div className="marker">
            <div className="ovale"></div>
            <div className="text">105</div>
          </div>
          <div className="target"></div>
        </div>
        <pre>--marker-size: 70px</pre>
      </div>
      <div>
        <div className="ll-marker" style={{ "--marker-size": "90px" }}>
          <div className="marker">
            <div className="ovale"></div>
            <div className="text">130</div>
          </div>
          <div className="target"></div>
        </div>
        <pre>--marker-size: 90px</pre>
      </div>
    </div>

    <div className={iconGrid}>
      <div>
        <div className="ll-marker pegman zone-0">
          <div className="image"></div>
          <div className="target"></div>
        </div>
        <pre>0 deg.</pre>
      </div>
      <div>
        <div className="ll-marker pegman zone-1">
          <div className="image"></div>
          <div className="target"></div>
        </div>
        <pre>22.5 deg.</pre>
      </div>
      <div>
        <div className="ll-marker pegman zone-2">
          <div className="image"></div>
          <div className="target"></div>
        </div>
        <pre>45 deg.</pre>
      </div>
      <div>
        <div className="ll-marker pegman zone-3">
          <div className="image"></div>
          <div className="target"></div>
        </div>
        <pre>67.5 deg.</pre>
      </div>
      <div>
        <div className="ll-marker pegman zone-4">
          <div className="image"></div>
          <div className="target"></div>
        </div>
        <pre>90 deg.</pre>
      </div>
      <div>
        <div className="ll-marker pegman zone-5">
          <div className="image"></div>
          <div className="target"></div>
        </div>
        <pre>112.5 deg.</pre>
      </div>
      <div>
        <div className="ll-marker pegman zone-6">
          <div className="image"></div>
          <div className="target"></div>
        </div>
        <pre>135 deg.</pre>
      </div>
      <div>
        <div className="ll-marker pegman zone-7">
          <div className="image"></div>
          <div className="target"></div>
        </div>
        <pre>157.5 deg.</pre>
      </div>
      <div>
        <div className="ll-marker pegman zone-8">
          <div className="image"></div>
          <div className="target"></div>
        </div>
        <pre>180 deg.</pre>
      </div>
      <div>
        <div className="ll-marker pegman zone-9">
          <div className="image"></div>
          <div className="target"></div>
        </div>
        <pre>202.5 deg.</pre>
      </div>
      <div>
        <div className="ll-marker pegman zone-10">
          <div className="image"></div>
          <div className="target"></div>
        </div>
        <pre>225 deg.</pre>
      </div>
      <div>
        <div className="ll-marker pegman zone-11">
          <div className="image"></div>
          <div className="target"></div>
        </div>
        <pre>247.5 deg.</pre>
      </div>
      <div>
        <div className="ll-marker pegman zone-12">
          <div className="image"></div>
          <div className="target"></div>
        </div>
        <pre>270 deg.</pre>
      </div>
      <div>
        <div className="ll-marker pegman zone-13">
          <div className="image"></div>
          <div className="target"></div>
        </div>
        <pre>292.5 deg.</pre>
      </div>
      <div>
        <div className="ll-marker pegman zone-14">
          <div className="image"></div>
          <div className="target"></div>
        </div>
        <pre>315 deg.</pre>
      </div>
      <div>
        <div className="ll-marker pegman zone-15">
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

    new Marker().setLngLat({ lng: -4.492187500001222, lat: 48.43306399776475 }).addTo(map);
    new Marker({ color: "green" })
      .setLngLat({ lng: 3.154296874998977, lat: 42.65440425112374 })
      .addTo(map);
    new Marker({ text: "5" })
      .setLngLat({ lng: -1.679687500000881, lat: 43.4890366431398 })
      .addTo(map);
    new Marker({ scale: 0.5 })
      .setLngLat({ lng: 6.274414062498977, lat: 43.10523413827215 })
      .addTo(map);
    new Marker({ draggable: true, icon: "fe-braille" })
      .setLngLat({ lng: 8.295898437499488, lat: 49.099264690742416 })
      .addTo(map);
    new Marker({ text: "125", scale: 2 })
      .setLngLat({ lng: 6.325788442409362, lat: 46.242459297071804 })
      .addTo(map);
  }, []);
  return <div ref={containerRef} style={{ height: "100vh" }}></div>;
};

Basic.parameters = {
  layout: "fullscreen",
};
