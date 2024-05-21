import { ResizeArea } from "pentatrion-design";
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
import { streetViewToggled } from "~/features/layer/layerSlice";

export default function StreetViewWindow() {
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
        id="extra"
        className="relative border-l-0 border-t-[1px] border-gray-4 flex-[0_0_clamp(25vw,var(--sidebar-extra-height),60vw)] md:border-t-0 md:border-l-[1px] md:flex-[0_0_clamp(25vw,var(--sidebar-extra-width),calc(100vw-400px-1rem))]"
      >
        <ResizeArea name="extra" position="left" />
        <ResizeArea name="extra" position="top" />
        <GApiWrapper apiKey={googleMapsApiToken} version="weekly" libraries={googleLibraries}>
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
