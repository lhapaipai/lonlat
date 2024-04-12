import {
  BaseLayerId,
  BaseLayerInfos,
  BaseLayers,
  OptionalLayerId,
  baseLayers,
  baseLayersById,
  countryLabels,
  optionalLayersById,
} from "../layers";
import { useAppDispatch, useAppSelector } from "../store";
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

  const currentBaseLayerId = useAppSelector(selectBaseLayer);
  const currentOptionalLayers = useAppSelector(selectOptionalLayers);
  const currentTerrain = useAppSelector(selectTerrain);
  const currentHillshade = useAppSelector(selectHillshade);
  const currentStreetView = useAppSelector(selectStreetView);

  return createPortal(
    <>
      <ButtonGroup direction="vertical" className="filters">
        {(Object.keys(baseLayers) as (keyof BaseLayers)[]).map((countryId) => (
          <Button
            key={countryId}
            className="text-sm"
            variant="text"
            color="weak"
            selected={countryFilter === countryId}
            onClick={() => setCountryFilter(countryId)}
          >
            {countryLabels[countryId]}
          </Button>
        ))}
      </ButtonGroup>

      {baseLayers[countryFilter].map((id) => {
        const layerId = id as BaseLayerId;
        const layer = baseLayersById[layerId];
        return (
          <div
            className={cn("layer", "base", layerId === currentBaseLayerId && "active")}
            key={layerId}
            onClick={() => dispatch(baseLayerChanged(layerId))}
          >
            <div className="type">
              <i className={`fe-${layer.type}`}></i>
            </div>
            <img
              className="preview"
              src="/graphics/sprites/layers-1x.jpg"
              srcSet="/graphics/sprites/layers-1x.jpg 1x, /graphics/sprites/layers-2x.jpg 2x"
              style={{ objectPosition: `0px ${layer.offsetY}px` }}
            />
            <div className="legend text-sm">{layer.label}</div>
          </div>
        );
      })}

      <div className="separator"></div>

      {currentBaseLayerId &&
        (baseLayersById[currentBaseLayerId] as BaseLayerInfos).optionalLayers.map(({ id }) => {
          const layerId = id as OptionalLayerId;
          const layer = optionalLayersById[layerId];

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
              <img
                className="preview"
                src="/graphics/sprites/layers-1x.jpg"
                srcSet="/graphics/sprites/layers-1x.jpg 1x, /graphics/sprites/layers-2x.jpg 2x"
                style={{ objectPosition: `0px ${layer.offsetY}px` }}
              />
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
        <img
          className="preview"
          src="/graphics/sprites/layers-1x.jpg"
          srcSet="/graphics/sprites/layers-1x.jpg 1x, /graphics/sprites/layers-2x.jpg 2x"
          style={{ objectPosition: `0px ${optionalLayersById["terrain"].offsetY}px` }}
        />
        <div className="legend text-sm">Relief</div>
      </div>

      <div
        className={cn("layer", "base", currentHillshade && "active")}
        key="hillshade"
        onClick={() => dispatch(hillshadeToggled())}
      >
        <img
          className="preview"
          src="/graphics/sprites/layers-1x.jpg"
          srcSet="/graphics/sprites/layers-1x.jpg 1x, /graphics/sprites/layers-2x.jpg 2x"
          style={{ objectPosition: `0px ${optionalLayersById["hillshade"].offsetY}px` }}
        />
        <div className="legend text-sm">Relief ombré</div>
      </div>

      <div
        className={cn("layer", "base", currentStreetView && "active")}
        key="street-view"
        onClick={() => dispatch(streetViewToggled())}
      >
        <img
          className="preview"
          src="/graphics/sprites/layers-1x.jpg"
          srcSet="/graphics/sprites/layers-1x.jpg 1x, /graphics/sprites/layers-2x.jpg 2x"
          style={{ objectPosition: `0px ${optionalLayersById["street-view"].offsetY}px` }}
        />
        <div className="legend text-sm">Street View</div>
      </div>
    </>,
    container,
  );
}
