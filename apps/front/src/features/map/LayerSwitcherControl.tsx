import {
  BaseLayerId,
  BaseLayerInfos,
  BaseLayers,
  OptionalLayerId,
  baseLayers,
  baseLayersById,
  optionalLayersById,
} from "./layers";
import { useAppDispatch, useAppSelector } from "~/store";
import {
  baseLayerChanged,
  terrainToggled,
  optionalLayerToggled,
  streetViewToggled,
} from "./mapSlice";
import clsx from "clsx";
import { createPortal } from "react-dom";
import { useMap, useRControl } from "maplibre-react-components";
import { memo, useEffect, useState } from "react";
import { Button, ButtonGroup, useOnClickOutside } from "pentatrion-design";
import { LayerButton } from "pentatrion-geo/components";
import { coordsChanged } from "~/features/street-view/streetViewSlice";
import { selectDistractionFree } from "~/features/config/configSlice";
import { useT } from "talkr";
import {
  selectBaseLayer,
  selectOptionalLayers,
  selectStreetView,
  selectTerrain,
} from "./mapSlice";

function LayerSwitcherControl() {
  const [collapsed, setCollapsed] = useState(true);
  const distractionFree = useAppSelector(selectDistractionFree);
  const { T } = useT();

  const { container } = useRControl({
    position: "bottom",
    className: clsx(
      "ll-layer-switcher flex overflow-x-auto flex-nowrap relative select-none max-w-full pointer-events-auto gap-2 pt-0.5 pb-2 px-2 w-fit",
      distractionFree && "distraction-free",
    ),
  });

  function handleClickOutside() {
    if (collapsed) {
      return;
    }
    setCollapsed(true);
  }

  useEffect(() => {
    document.documentElement.classList.toggle(
      "ll-layer-switcher-expanded",
      !collapsed,
    );
  }, [collapsed]);

  const eventName = window.matchMedia("(pointer: coarse)").matches
    ? "touchstart"
    : "mousedown";
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
      <LayerButton
        image="/assets/graphics/sprites/layers-1x.jpg"
        srcSet="/assets/graphics/sprites/layers-1x.jpg 1x, /assets/graphics/sprites/layers-2x.jpg 2x"
        imagePositionY={currentLayer.offsetY}
        label={currentLayer.label}
        variant="principal"
        key="current-layer"
        onClick={() => setCollapsed(false)}
      />
    ) : (
      <>
        <ButtonGroup direction="vertical">
          {(Object.keys(baseLayers) as (keyof BaseLayers)[]).map(
            (countryId) => (
              <Button
                key={countryId}
                className="flex-1 text-sm"
                variant="light"
                color="gray"
                selected={countryFilter === countryId}
                onClick={() => setCountryFilter(countryId)}
              >
                {T(`countries.${countryId}`)}
              </Button>
            ),
          )}
        </ButtonGroup>

        {baseLayers[countryFilter].map((id) => {
          const layerId = id as BaseLayerId;
          const layer = baseLayersById[layerId];
          return (
            <LayerButton
              className={clsx(
                "layer",
                "base",
                layerId === currentBaseLayerId && "active",
              )}
              image="/assets/graphics/sprites/layers-1x.jpg"
              srcSet="/assets/graphics/sprites/layers-1x.jpg 1x, /assets/graphics/sprites/layers-2x.jpg 2x"
              key={layerId}
              onClick={() => dispatch(baseLayerChanged(layerId))}
              imagePositionY={layer.offsetY}
              label={layer.label}
            />
          );
        })}

        <div className="relative my-4 w-1 flex-[0_0_0.25rem] rounded-full bg-gray-1"></div>

        {currentBaseLayerId &&
          (
            baseLayersById[currentBaseLayerId] as BaseLayerInfos
          ).optionalLayers.map(({ id }) => {
            const layerId = id as OptionalLayerId;
            const layer = optionalLayersById[layerId];

            return (
              <LayerButton
                className={clsx(
                  "layer",
                  "optional",
                  currentOptionalLayers.includes(layerId) && "active",
                )}
                variant="optional"
                image="/assets/graphics/sprites/layers-1x.jpg"
                srcSet="/assets/graphics/sprites/layers-1x.jpg 1x, /assets/graphics/sprites/layers-2x.jpg 2x"
                key={layerId}
                onClick={() => dispatch(optionalLayerToggled(layerId))}
                imagePositionY={layer.offsetY}
                label={layer.label}
              />
            );
          })}

        <div className="relative my-4 w-1 flex-[0_0_0.25rem] rounded-full bg-gray-1"></div>

        <LayerButton
          className={clsx("layer", "base", currentTerrain && "active")}
          key="terrain"
          onClick={() => dispatch(terrainToggled())}
          image="/assets/graphics/sprites/layers-1x.jpg"
          srcSet="/assets/graphics/sprites/layers-1x.jpg 1x, /assets/graphics/sprites/layers-2x.jpg 2x"
          imagePositionY={optionalLayersById["terrain"].offsetY}
          label={optionalLayersById["terrain"].label}
        />

        <LayerButton
          className={clsx("layer", "base", currentStreetView && "active")}
          key="street-view"
          onClick={() => {
            dispatch(coordsChanged(map.getCenter().toArray()));
            dispatch(streetViewToggled());
          }}
          image="/assets/graphics/sprites/layers-1x.jpg"
          srcSet="/assets/graphics/sprites/layers-1x.jpg 1x, /assets/graphics/sprites/layers-2x.jpg 2x"
          imagePositionY={optionalLayersById["street-view"].offsetY}
          label={optionalLayersById["street-view"].label}
        />
      </>
    ),
    container,
  );
}

export default memo(LayerSwitcherControl);
