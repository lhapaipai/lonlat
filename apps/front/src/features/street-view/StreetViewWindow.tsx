// import { ResizeArea } from "pentatrion-design";
import { GApiWrapper, StreetView, googleLibraries } from "pentatrion-geo";
import { googleMapsApiToken } from "~/config/constants";
import {
  Pov,
  coordsChanged,
  povChanged,
  selectPegmanCoords,
  selectPegmanPov,
} from "./streetViewSlice";
import { useAppDispatch, useAppSelector } from "~/store";
import { streetViewToggled } from "~/features/map/mapSlice";
import { memo, useRef } from "react";
import { ResizeArea } from "~/components/resize-area";

function StreetViewWindow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const coords = useAppSelector(selectPegmanCoords);
  const { heading, pitch } = useAppSelector(selectPegmanPov);
  const dispatch = useAppDispatch();

  function handleChangePov(pov: Pov) {
    dispatch(povChanged(pov));
  }

  function handleChangeCoords(coords: [number, number]) {
    dispatch(coordsChanged(coords));
  }

  function handleChangeVisible(status: boolean) {
    dispatch(streetViewToggled(status));
  }

  return (
    coords && (
      <div
        className="relative flex-[0_0_clamp(1px,var(--sidebar-streetview-height),60vw)] border-l-0 border-t-[1px] border-gray-4 md:flex-[0_0_clamp(25vw,var(--sidebar-streetview-width),calc(100vw-400px-1rem))] md:border-l-[1px] md:border-t-0"
        ref={containerRef}
      >
        <ResizeArea
          name="streetview"
          position="left"
          container={containerRef}
        />
        <ResizeArea name="streetview" position="top" container={containerRef} />
        <GApiWrapper
          apiKey={googleMapsApiToken}
          version="weekly"
          libraries={googleLibraries}
        >
          <StreetView
            heading={heading}
            pitch={pitch}
            coords={coords}
            onChangePov={handleChangePov}
            onChangeCoords={handleChangeCoords}
            onChangeVisible={handleChangeVisible}
          />
        </GApiWrapper>
      </div>
    )
  );
}

export default memo(StreetViewWindow);
