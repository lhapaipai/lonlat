import { Checkbox } from "pentatrion-design";
import { useT } from "talkr";
import {
  lockCameraChanged,
  selectGeolocation,
  showAccuracyCircleChanged,
} from "./geolocationSlice";
import { useAppDispatch, useAppSelector } from "~/store";
import { m2km } from "pentatrion-geo";

export default function GeolocationInfos() {
  const geolocation = useAppSelector(selectGeolocation);
  const dispatch = useAppDispatch();

  const { T } = useT();
  return (
    <>
      <div className="p8n-setting">
        <div>{T("accuracy")}</div>
        <div>
          {geolocation.accuracy ? m2km(geolocation.accuracy) : "-"}{" "}
          <span className="text-gray-6">km</span>
        </div>
      </div>
      <div className="p8n-setting multiple">
        <div>{T("options")}</div>
        <div>
          <Checkbox
            checked={geolocation.lockCamera}
            onChange={(e) => dispatch(lockCameraChanged(e.target.checked))}
          >
            <span>{T("geolocation.lockCameraWithLocation")}</span>
          </Checkbox>
          <Checkbox
            checked={geolocation.showAccuracyCircle}
            onChange={(e) => dispatch(showAccuracyCircleChanged(e.target.checked))}
          >
            <span>{T("geolocation.showAccuracyCircle")}</span>
          </Checkbox>
        </div>
      </div>
    </>
  );
}
