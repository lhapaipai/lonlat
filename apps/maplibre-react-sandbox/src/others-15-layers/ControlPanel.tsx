import { Dispatch, SetStateAction, useEffect, useState } from "react";

import ignStyle from "./standard-geopf.json";
import { fromJS } from "immutable";
import { MapStyle } from "react-map-gl/maplibre";

const categories = ["labels", "roads", "buildings", "parks", "water", "background"] as const;
type Categories = (typeof categories)[number];

const defaultMapStyle = fromJS<MapStyle>(ignStyle as MapStyle);
const defaultLayers = defaultMapStyle.get("layers");

const layerSelector = {
  background: /background/,
  water: /hydro/,
  parks: /park/,
  buildings: /bati/,
  roads: /Routier|réseau|Chemin/,
  labels: /label|place|poi/,
};

const colorClass = {
  line: "line-color",
  fill: "fill-color",
  background: "background-color",
  symbol: "text-color",
};

function getMapStyle({ visibility, color }: { visibility: boolean; color: string }) {
  const layers = defaultLayers
    .filter((layer) => {
      const id = layer.get("id");

      if (id === "marignier") {
        console.log("oui !!");
      }

      const result = categories.every((name) => {
        // si la case est décoché alors le layer sera affiché si son id ne vérifie pas
        // l'expression régulière
        return visibility[name] || !layerSelector[name].test(id);
      });

      return result;
    })
    .map((layer) => {
      const id = layer.get("id");
      const type = layer.get("type") as keyof typeof colorClass;

      // est-ce que l'id de l'élément vérifie l'une des expressions régulière associée aux catégories ?
      // dans ce cas retourner le nom de la catégorie sinon false.
      const category = categories.find((name) => layerSelector[name].test(id));
      if (category && colorClass[type]) {
        return layer.setIn(["paint", colorClass[type]], color[category]);
      }
      return layer;
    });

  return defaultMapStyle.set("layers", layers);
}

interface Props {
  onChange: Dispatch<SetStateAction<unknown>>;
}
export default function ControlPanel({ onChange }: Props) {
  const [visibility, setVisibility] = useState<{ [key in Categories]: boolean }>({
    water: true,
    parks: true,
    buildings: true,
    roads: true,
    labels: true,
    background: true,
  });
  const [color, setColor] = useState<{ [key in Categories]: string }>({
    water: "#DBE2E6",
    parks: "#E6EAE9",
    buildings: "#c0c0c8",
    roads: "#ffffff",
    labels: "#78888a",
    background: "#EBF0F0",
  });

  useEffect(() => {
    onChange(getMapStyle({ visibility, color }));
  }, [visibility, color]);

  const handleColorChange = (name: string, value: string) => {
    setColor({ ...color, [name]: value });
  };
  const handleVisibilityChange = (name: string, value: boolean) => {
    setVisibility({ ...visibility, [name]: value });
  };

  return (
    <div className="control-panel">
      <h3>Dynamic Styling</h3>
      <p>Dynamically show/hide map layers and change color with Immutable map style.</p>
      <hr />
      {categories.map((name) => (
        <div key={name} className="input">
          <label>{name}</label>
          <input
            type="checkbox"
            checked={visibility[name]}
            onChange={(evt) => handleVisibilityChange(name, evt.target.checked)}
          />
          <input
            type="color"
            value={color[name]}
            disabled={!visibility[name]}
            onChange={(evt) => handleColorChange(name, evt.target.value)}
          />
        </div>
      ))}
    </div>
  );
}
