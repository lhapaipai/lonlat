// App.tsx
import {
  CSSProperties,
  useState
} from "react";
import {
  LayerSwitcherControl,
  type StyleID
} from "./LayerSwitcherControl";

// some code unchanged

const mapCSS: CSSProperties = {
  minHeight: 500,
};

function App() {
  const [
    style,
    setStyle
  ] = useState<StyleID>("OSM Bright");

  // some code unchanged

  return (
    <RMap
      /* some props unchanged */
      mapStyle={styles[style]}
    >
      <LayerSwitcherControl
        style={style}
        setStyle={setStyle}
      />
      {/* some code unchanged */}
    </RMap>
  );
}

export default App;

