import { useEffect, useRef } from "react";
import * as maplibre from "maplibre-gl";
import { LLMarker } from "maplibre-components";
import "maplibre-gl/dist/maplibre-gl.css";

const meta = {
  title: "Maplibre-ext/LLMarker",
};
export default meta;

export const Graphics = () => (
  <div>
    <div className="storybook-icon-grid">
      <div>
        <div
          className="ll-marker"
          style={{
            background: "var(--marker-color)",
          }}
        ></div>
        <div>--marker-color</div>
      </div>
      <div>
        <div
          className="ll-marker"
          style={{
            background: "var(--marker-color-dark)",
          }}
        ></div>
        <div>--marker-color-dark</div>
      </div>
      <div>
        <div
          className="ll-marker"
          style={{
            background: "var(--ovale-color-hover)",
          }}
        ></div>
        <div>--ovale-color-hover</div>
      </div>
    </div>
    <div className="storybook-icon-grid">
      <div>
        <div
          className="ll-marker"
          style={{
            backgroundImage: "var(--marker-color-gradient)",
            backgroundSize: "var(--marker-height)",
            backgroundPosition: -15,
          }}
        ></div>
        <div>--marker-color-gradient</div>
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
        <div>--marker-color-gradient hover</div>
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
        <div>--marker-color-gradient selected</div>
      </div>
    </div>

    <div className="storybook-icon-grid">
      <div>
        <div className="ll-marker">
          {/* i is wrapped so we can apply transform when active */}
          <div>
            <div className="ovale"></div>
            <i className="fe-star"></i>
          </div>
          <div className="target"></div>
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
          <div className="target"></div>
        </div>
      </div>
      <div>
        <div className="ll-marker selected">
          <div>
            <div className="ovale"></div>
            <i className="fe-heart"></i>
          </div>
          <div className="target"></div>
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
          <div className="target"></div>
        </div>
      </div>
      <div>
        <div className="ll-marker" style={{ "--marker-color": "#9ed24d" }}>
          <div>
            <div className="ovale"></div>
            <i className="fe-heart"></i>
          </div>
          <div className="target"></div>
        </div>
      </div>
      <div>
        <div className="ll-marker" style={{ "--marker-color": "#5fbcff" }}>
          <div>
            <div className="ovale"></div>
            <i className="fe-heart"></i>
          </div>
          <div className="target"></div>
        </div>
      </div>
      <div>
        <div className="ll-marker" style={{ "--marker-color": "#ffa33d" }}>
          <div>
            <div className="ovale"></div>
            <i className="fe-heart"></i>
          </div>
          <div className="target"></div>
        </div>
      </div>
      <div>
        <div className="ll-marker" style={{ "--marker-color": "#ff4d4d" }}>
          <div>
            <div className="ovale"></div>
            <i className="fe-heart"></i>
          </div>
          <div className="target"></div>
        </div>
      </div>
      <div>
        <div className="ll-marker" style={{ "--marker-color": "#c0c0c0" }}>
          <div>
            <div className="ovale"></div>
            <i className="fe-heart"></i>
          </div>
          <div className="target"></div>
        </div>
      </div>
    </div>

    <div className="storybook-icon-grid">
      <div>
        <div className="ll-marker">
          <div>
            <div className="ovale"></div>
            <div className="text">5</div>
          </div>
          <div className="target"></div>
        </div>
      </div>
      <div>
        <div className="ll-marker">
          <div>
            <div className="ovale"></div>
            <div className="text">15</div>
          </div>
          <div className="target"></div>
        </div>
      </div>
      <div>
        <div className="ll-marker">
          <div>
            <div className="ovale"></div>
            <div className="text">105</div>
          </div>
          <div className="target"></div>
        </div>
      </div>
    </div>

    <div className="storybook-icon-grid">
      <div>
        <div className="ll-marker disabled">
          <div>
            <div className="ovale"></div>
            <i className="fe-housenumber"></i>
          </div>
          <div className="target"></div>
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
          <div className="target"></div>
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
          <div className="target"></div>
        </div>
        <pre>--marker-size: 30px</pre>
      </div>
      <div>
        <div className="ll-marker" style={{ "--marker-size": "50px" }}>
          <div>
            <div className="ovale"></div>
            <i className="fe-municipality"></i>
          </div>
          <div className="target"></div>
        </div>
        <pre>--marker-size: 50px</pre>
      </div>
      <div>
        <div className="ll-marker" style={{ "--marker-size": "70px" }}>
          <div>
            <div className="ovale"></div>
            <i className="fe-home"></i>
          </div>
          <div className="target"></div>
        </div>
        <pre>--marker-size: 70px</pre>
      </div>
      <div>
        <div className="ll-marker" style={{ "--marker-size": "90px" }}>
          <div>
            <div className="ovale"></div>
            <i className="fe-climbing-outdoor"></i>
          </div>
          <div className="target"></div>
        </div>
        <pre>--marker-size: 90px</pre>
      </div>
    </div>

    <div className="storybook-icon-grid">
      <div>
        <div className="ll-marker small-text" style={{ "--marker-size": "30px" }}>
          <div>
            <div className="ovale"></div>
            <div className="text">5</div>
          </div>
          <div className="target"></div>
        </div>
        <pre>--marker-size: 30px</pre>
      </div>
      <div>
        <div className="ll-marker" style={{ "--marker-size": "50px" }}>
          <div>
            <div className="ovale"></div>
            <div className="text">12</div>
          </div>
          <div className="target"></div>
        </div>
        <pre>--marker-size: 50px</pre>
      </div>
      <div>
        <div className="ll-marker" style={{ "--marker-size": "70px" }}>
          <div>
            <div className="ovale"></div>
            <div className="text">105</div>
          </div>
          <div className="target"></div>
        </div>
        <pre>--marker-size: 70px</pre>
      </div>
      <div>
        <div className="ll-marker" style={{ "--marker-size": "90px" }}>
          <div>
            <div className="ovale"></div>
            <div className="text">130</div>
          </div>
          <div className="target"></div>
        </div>
        <pre>--marker-size: 90px</pre>
      </div>
    </div>
  </div>
);

export const Basic = () => {
  useEffect(() => {
    document.body.classList.remove("sb-main-padded");
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const map = new maplibre.Map({
      container: containerRef.current!,
      style: "https://demotiles.maplibre.org/style.json", // style URL
      center: [5, 45],
      zoom: 4,
    });
    map.on("click", (e) => console.log(e.lngLat));
    new LLMarker().setLngLat({ lng: -4.492187500001222, lat: 48.43306399776475 }).addTo(map);

    new LLMarker({ color: "green" })
      .setLngLat({ lng: 3.154296874998977, lat: 42.65440425112374 })
      .addTo(map);
    new LLMarker({ text: "5" })
      .setLngLat({ lng: -1.679687500000881, lat: 43.4890366431398 })
      .addTo(map);
    new LLMarker({ scale: 0.5 })
      .setLngLat({ lng: 6.274414062498977, lat: 43.10523413827215 })
      .addTo(map);
    new LLMarker({ draggable: true, icon: "fe-braille" })
      .setLngLat({ lng: 8.295898437499488, lat: 49.099264690742416 })
      .addTo(map);
    new LLMarker({ text: "125", scale: 2 })
      .setLngLat({ lng: 6.325788442409362, lat: 46.242459297071804 })
      .addTo(map);

    // new maplibre.Marker().setLngLat([-1.1344, 44.698]).addTo(map);
  }, []);
  return <div ref={containerRef} style={{ height: "100vh" }}></div>;
};
