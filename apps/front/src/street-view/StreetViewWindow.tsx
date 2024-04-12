import { ResizeArea } from "pentatrion-design";
import { GApiWrapper, StreetView, googleLibraries } from "pentatrion-geo";
import { googleMapsApiToken } from "../config/constants";
import {
  Pov,
  coordsChanged,
  povChanged,
  selectPegmanCoords,
  selectPegmanPov,
} from "./streetViewSlice";
import { useAppDispatch, useAppSelector } from "../store";
import { streetViewToggled } from "../layer/layerSlice";

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
      <div id="extra">
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
