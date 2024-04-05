import { useSelector } from "react-redux";
import { BaseLayers, LayerId, baseLayers, countryLabels, layersById } from "../layers";
import { useAppDispatch } from "../store";
import {
  baseLayerChanged,
  terrainToggled,
  optionalLayerToggled,
  hillshadeToggled,
  streetViewToggled,
  selectBaseLayer,
  selectOptionalLayers,
  selectTerrain,
  selectHillshade,
  selectStreetView,
} from "../store/layerSlice";
import cn from "classnames";
import { createPortal } from "react-dom";
import { useRControl } from "maplibre-react-components";
import { useState } from "react";
import { Button, ButtonGroup } from "pentatrion-design";

export default function BaseLayerControl() {
  const container = useRControl("bottom", "ll-layer-switcher");
  const [countryFilter, setCountryFilter] = useState<keyof BaseLayers>("fr");
  const dispatch = useAppDispatch();

  const currentBaseLayerId = useSelector(selectBaseLayer);
  const currentOptionalLayers = useSelector(selectOptionalLayers);
  const currentTerrain = useSelector(selectTerrain);
  const currentHillshade = useSelector(selectHillshade);
  const currentStreetView = useSelector(selectStreetView);

  return createPortal(
    <>
      <ButtonGroup direction="vertical" className="filters">
        {(Object.keys(baseLayers) as (keyof BaseLayers)[]).map((countryId) => (
          <Button
            key={countryId}
            className="text-sm"
            shape="ghost"
            color="weak"
            selected={countryFilter === countryId}
            onClick={() => setCountryFilter(countryId)}
          >
            {countryLabels[countryId]}
          </Button>
        ))}
      </ButtonGroup>

      {baseLayers[countryFilter].map((id) => {
        const layerId = id as LayerId;
        const layer = layersById[layerId];
        return (
          <div
            className={cn("layer", "base", layerId === currentBaseLayerId && "active")}
            key={layerId}
            onClick={() => dispatch(baseLayerChanged(layerId))}
          >
            <div className="type">
              <i className={`fe-${layer.type}`}></i>
            </div>
            <img className="preview" src={layer.thumbnail} />
            <div className="legend text-sm">{layer.label}</div>
          </div>
        );
      })}

      <div className="separator"></div>

      {currentBaseLayerId &&
        layersById[currentBaseLayerId].layers.map((id) => {
          const layerId = id as LayerId;
          const layer = layersById[layerId];

          return (
            <div
              className={cn(
                "layer",
                "optional",
                currentOptionalLayers.includes(layerId) && "active",
              )}
              key={layerId}
              onClick={() => dispatch(optionalLayerToggled(layerId))}
            >
              <div className="type">
                <i className={`fe-${layer.type}`}></i>
              </div>
              <img className="preview" src={layer.thumbnail} />
              <div className="legend text-sm">{layer.label}</div>
            </div>
          );
        })}

      <div className="separator"></div>

      <div
        className={cn("layer", "base", currentTerrain && "active")}
        key="terrain"
        onClick={() => dispatch(terrainToggled())}
      >
        <img className="preview" src="/thumbnail/terrain.jpg" />
        <div className="legend text-sm">Relief</div>
      </div>

      <div
        className={cn("layer", "base", currentHillshade && "active")}
        key="hillshade"
        onClick={() => dispatch(hillshadeToggled())}
      >
        <img className="preview" src="/thumbnail/terrarium.jpg" />
        <div className="legend text-sm">Relief ombré</div>
      </div>

      <div
        className={cn("layer", "base", currentStreetView && "active")}
        key="street-view"
        onClick={() => dispatch(streetViewToggled())}
      >
        <img className="preview" src="/thumbnail/pegman.png" />
        <div className="legend text-sm">Street View</div>
      </div>
    </>,
    container,
  );
}
