import "maplibre-theme/modern.css";
import "maplibre-react-components/dist/mrc.css";
import { RMap, useRControl } from "maplibre-react-components";
import { Dispatch, SetStateAction, useState } from "react";
import { createPortal } from "react-dom";

// some code unchanged

const styles = {
  "osm-bright":
    "https://openmaptiles.geo.data.gouv.fr/styles/osm-bright/style.json",
  demotiles: "https://demotiles.maplibre.org/style.json",
};
type StyleID = keyof typeof styles;

interface LayerSwitcherControlProps {
  style: StyleID;
  setStyle: Dispatch<SetStateAction<StyleID>>;
}
function LayerSwitcherControl({ style, setStyle }: LayerSwitcherControlProps) {
  const { container } = useRControl({
    position: "top-right",
  });

  return createPortal(
    <div>
      <label>
        <input
          type="radio"
          name="base-layer"
          checked={style === "osm-bright"}
          onChange={() => setStyle("osm-bright")}
        />
        OSM Bright
      </label>
      <label>
        <input
          type="radio"
          name="base-layer"
          checked={style === "demotiles"}
          onChange={() => setStyle("demotiles")}
        />
        Demo tiles
      </label>
    </div>,
    container,
  );
}

function App() {
  const [style, setStyle] = useState<StyleID>("osm-bright");

  // some code unchanged

  return (
    <RMap
      /* some props unchanged */
      mapStyle={styles[style]}
    >
      <LayerSwitcherControl style={style} setStyle={setStyle} />
      {/* some code unchanged */}
    </RMap>
  );
}

export default App;
