import {
  BaseLayerId,
  BaseLayerInfos,
  BaseLayers,
  OptionalLayerId,
  baseLayers,
  baseLayersById,
  optionalLayersById,
} from "./layers";
import { useAppDispatch, useAppSelector } from "../store";
import {
  baseLayerChanged,
  terrainToggled,
  optionalLayerToggled,
  streetViewToggled,
  selectBaseLayer,
  selectOptionalLayers,
  selectTerrain,
  selectStreetView,
} from "./layerSlice";
import cn from "classnames";
import { createPortal } from "react-dom";
import { useMap, useRControl } from "maplibre-react-components";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, useOnClickOutside } from "pentatrion-design";
import { coordsChanged } from "../street-view/streetViewSlice";
import { selectDistractionFree } from "~/store/mapSlice";
import "./LayerSwitcherControl.scss";
import { useT } from "talkr";

export default function LayerSwitcherControl() {
  const [collapsed, setCollapsed] = useState(true);
  const distractionFree = useAppSelector(selectDistractionFree);
  const { T } = useT();

  const container = useRControl({
    position: "bottom",
    className: cn("ll-layer-switcher", distractionFree && "distraction-free"),
  });

  function handleClickOutside() {
    if (collapsed) {
      return;
    }
    setCollapsed(true);
  }

  useEffect(() => {
    document.documentElement.classList.toggle("ll-layer-switcher-expanded", !collapsed);
  }, [collapsed]);

  const eventName = window.matchMedia("(pointer: coarse)").matches ? "touchstart" : "mousedown";
  useOnClickOutside({ current: container }, handleClickOutside, eventName);

  const [countryFilter, setCountryFilter] = useState<keyof BaseLayers>("fr");
  const dispatch = useAppDispatch();

  const map = useMap();

  const currentBaseLayerId = useAppSelector(selectBaseLayer);
  const currentOptionalLayers = useAppSelector(selectOptionalLayers);
  const currentTerrain = useAppSelector(selectTerrain);
  const currentStreetView = useAppSelector(selectStreetView);

  const currentLayer = baseLayersById[currentBaseLayerId];

  return createPortal(
    collapsed ? (
      <Button
        className={cn("layer", "base", "principal")}
        key="current-layer"
        onClick={() => setCollapsed(false)}
      >
        <div className="type">
          <i className={`fe-${currentLayer.type}`}></i>
        </div>
        <div className="preview-container">
          <img
            className="preview"
            src="/assets/graphics/sprites/layers-1x.jpg"
            srcSet="/assets/graphics/sprites/layers-1x.jpg 1x, /assets/graphics/sprites/layers-2x.jpg 2x"
            style={{ objectPosition: `0px ${currentLayer.offsetY}px` }}
          />
        </div>
        <div className="legend text-sm">{currentLayer.label}</div>
      </Button>
    ) : (
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
              {T(`countries.${countryId}`)}
            </Button>
          ))}
        </ButtonGroup>

        {baseLayers[countryFilter].map((id) => {
          const layerId = id as BaseLayerId;
          const layer = baseLayersById[layerId];
          return (
            <Button
              className={cn("layer", "base", layerId === currentBaseLayerId && "active")}
              key={layerId}
              onClick={() => dispatch(baseLayerChanged(layerId))}
            >
              <div className="type">
                <i className={`fe-${layer.type}`}></i>
              </div>
              <img
                className="preview"
                src="/assets/graphics/sprites/layers-1x.jpg"
                srcSet="/assets/graphics/sprites/layers-1x.jpg 1x, /assets/graphics/sprites/layers-2x.jpg 2x"
                style={{ objectPosition: `0px ${layer.offsetY}px` }}
              />
              <div className="legend text-sm">{layer.label}</div>
            </Button>
          );
        })}

        <div className="separator"></div>

        {currentBaseLayerId &&
          (baseLayersById[currentBaseLayerId] as BaseLayerInfos).optionalLayers.map(({ id }) => {
            const layerId = id as OptionalLayerId;
            const layer = optionalLayersById[layerId];

            return (
              <Button
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
                  src="/assets/graphics/sprites/layers-1x.jpg"
                  srcSet="/assets/graphics/sprites/layers-1x.jpg 1x, /assets/graphics/sprites/layers-2x.jpg 2x"
                  style={{ objectPosition: `0px ${layer.offsetY}px` }}
                />
                <div className="legend text-sm">{layer.label}</div>
              </Button>
            );
          })}

        <div className="separator"></div>

        <Button
          className={cn("layer", "base", currentTerrain && "active")}
          key="terrain"
          onClick={() => dispatch(terrainToggled())}
        >
          <img
            className="preview"
            src="/assets/graphics/sprites/layers-1x.jpg"
            srcSet="/assets/graphics/sprites/layers-1x.jpg 1x, /assets/graphics/sprites/layers-2x.jpg 2x"
            style={{ objectPosition: `0px ${optionalLayersById["terrain"].offsetY}px` }}
          />
          <div className="legend text-sm">Relief</div>
        </Button>

        <Button
          className={cn("layer", "base", currentStreetView && "active")}
          key="street-view"
          onClick={() => {
            dispatch(coordsChanged(map.getCenter().toArray()));
            dispatch(streetViewToggled());
          }}
        >
          <img
            className="preview"
            src="/assets/graphics/sprites/layers-1x.jpg"
            srcSet="/assets/graphics/sprites/layers-1x.jpg 1x, /assets/graphics/sprites/layers-2x.jpg 2x"
            style={{ objectPosition: `0px ${optionalLayersById["street-view"].offsetY}px` }}
          />
          <div className="legend text-sm">Street View</div>
        </Button>
      </>
    ),
    container,
  );
}
