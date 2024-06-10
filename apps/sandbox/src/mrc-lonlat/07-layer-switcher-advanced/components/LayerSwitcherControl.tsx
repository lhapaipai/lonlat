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
import { createPortal } from "react-dom";
import { useRControl } from "maplibre-react-components";
import { useState } from "react";
import { Button, ButtonGroup } from "pentatrion-design";
import clsx from "clsx";
import { LayerButton } from "pentatrion-geo";

export default function LayerSwitcherControl() {
  const { container } = useRControl({
    position: "bottom",
    className: clsx(
      "ll-layer-switcher flex overflow-x-auto flex-nowrap relative z-[1] select-none max-w-full pointer-events-auto gap-2 pt-0.5 pb-2 px-2 w-fit",
    ),
  });
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
            className="flex-1 text-sm"
            variant="light"
            color="gray"
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
          <LayerButton
            className={clsx(
              "layer",
              "base",
              layerId === currentBaseLayerId && "active",
            )}
            key={layerId}
            onClick={() => dispatch(baseLayerChanged(layerId))}
            image="/assets/graphics/sprites/layers-1x.jpg"
            srcSet="/assets/graphics/sprites/layers-1x.jpg 1x, /assets/graphics/sprites/layers-2x.jpg 2x"
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
        label="Relief"
      />

      <LayerButton
        className={clsx("layer", "base", currentHillshade && "active")}
        key="hillshade"
        onClick={() => dispatch(hillshadeToggled())}
        image="/assets/graphics/sprites/layers-1x.jpg"
        srcSet="/assets/graphics/sprites/layers-1x.jpg 1x, /assets/graphics/sprites/layers-2x.jpg 2x"
        imagePositionY={optionalLayersById["hillshade"].offsetY}
        label="Relief ombré"
      />

      <LayerButton
        className={clsx("layer", "base", currentStreetView && "active")}
        key="street-view"
        onClick={() => dispatch(streetViewToggled())}
        image="/assets/graphics/sprites/layers-1x.jpg"
        srcSet="/assets/graphics/sprites/layers-1x.jpg 1x, /assets/graphics/sprites/layers-2x.jpg 2x"
        imagePositionY={optionalLayersById["street-view"].offsetY}
        label="Street View"
      />
    </>,
    container,
  );
}
