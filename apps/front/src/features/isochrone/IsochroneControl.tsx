import { Button, Checkbox, Input, Select, SimpleTooltip } from "pentatrion-design";
import { IsochroneGeoJSON, IsochroneOptions, ignIsochrone } from "pentatrion-geo";
import { useRef, useState } from "react";
import { useT } from "talkr";
import { useAppDispatch, useAppSelector } from "~/store";
import {
  constraintChanged,
  costTypeChanged,
  costValueChanged,
  directionChanged,
  featureChanged,
  profileChanged,
  referenceFeatureChanged,
  selectIsochrone,
} from "./isochroneSlice";
import { useNotification } from "pentatrion-design/redux";
import { useRControl } from "~mrc";
import { createPortal } from "react-dom";
import "./IsochroneControl.scss";
import { selectDistractionFree } from "~/store/mapSlice";
import cn from "classnames";

const profileOptions = [
  { value: "car", label: "Voiture" },
  { value: "pedestrian", label: "Piéton" },
];

const directionOptions = [
  { value: "departure", label: "Départ" },
  { value: "arrival", label: "Arrivée" },
];

export default function IsochroneControl() {
  const distractionFree = useAppSelector(selectDistractionFree);

  const container = useRControl({
    position: "top-right",
    className: cn("maplibregl-ctrl maplibregl-ctrl-group", distractionFree && "distraction-free"),
  });

  const { T } = useT();
  const { referenceFeature, costType, costValue, direction, profile, constraints } =
    useAppSelector(selectIsochrone);

  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const isAbortedRef = useRef(false);
  const { notifyError } = useNotification();

  async function handleProcess() {
    if (!referenceFeature) {
      return;
    }
    setLoading(true);
    isAbortedRef.current = false;

    // mock for development
    // (
    //   new Promise((resolve) => {
    //     setTimeout(() => {
    //       fetch("/api-mocks/isochrone-distance.json")
    //         .then((res) => res.json())
    //         .then(({ geometry, ...properties }) => {
    //           resolve({
    //             type: "Feature",
    //             properties,
    //             geometry,
    //           } as IsochroneGeoJSON);
    //         });
    //     }, 500);
    //   }) as Promise<IsochroneGeoJSON>
    // )
    //   .then((isochroneFeature: IsochroneGeoJSON) => {
    //     if (!isAbortedRef.current) {
    //       dispatch(featureChanged(isochroneFeature));
    //     }
    //   })
    //   .catch((err) => void notifyError(err))
    //   .finally(() => {
    //     setLoading(false);
    //     isAbortedRef.current = false;
    //   });

    ignIsochrone(referenceFeature.geometry.coordinates, {
      costType,
      costValue,
      profile,
      direction,
      constraints,
    })
      .then((isochroneFeature: IsochroneGeoJSON) => {
        if (!isAbortedRef.current) {
          dispatch(featureChanged(isochroneFeature));
        }
      })
      .catch((err) => void notifyError(err))
      .finally(() => {
        setLoading(false);
        isAbortedRef.current = false;
      });
  }

  return createPortal(
    <div className="ll-quick-settings">
      <div className="actions">
        <Button
          disabled={loading}
          variant="light"
          color="gray"
          className="with-icon"
          selected={costType === "time"}
          onClick={() => dispatch(costTypeChanged("time"))}
        >
          <i className="fe-stopwatch"></i>
          {T("isochrone.isochrone")}
        </Button>
        <Button
          disabled={loading}
          variant="light"
          color="gray"
          className="with-icon"
          selected={costType === "distance"}
          onClick={() => dispatch(costTypeChanged("distance"))}
        >
          <i className="fe-ruler"></i>
          {T("isochrone.isodistance")}
        </Button>
        <div className="help">
          <SimpleTooltip
            contentClassName="description"
            content={T("isochrone.description")}
            placement="bottom-end"
          >
            <div>
              <i className="fe-help"></i>
            </div>
          </SimpleTooltip>
        </div>
      </div>

      <div className="setting">
        <div>{T("isochrone.profile")}</div>
        <div>
          <Select
            disabled={loading}
            variant="ghost"
            options={profileOptions}
            value={profile}
            onChange={(o) => {
              const value = (o.target.value || "car") as NonNullable<IsochroneOptions["profile"]>;
              if (["car", "pedestrian"].includes(value)) {
                dispatch(profileChanged(value));
              }
            }}
          ></Select>
        </div>
      </div>

      <div className="setting">
        <div>{T("isochrone.direction")}</div>
        <Select
          disabled={loading}
          variant="ghost"
          options={directionOptions}
          value={direction}
          onChange={(o) => {
            const value = (o.target.value || "car") as NonNullable<IsochroneOptions["direction"]>;
            if (["departure", "arrival"].includes(value)) {
              dispatch(directionChanged(value));
            }
          }}
        ></Select>
      </div>

      {costType === "time" ? (
        <div className="setting">
          <div>{T("time")}</div>
          <Input
            disabled={loading}
            variant="ghost"
            suffix="min"
            value={costValue}
            onChange={(e) => dispatch(costValueChanged(e.target.valueAsNumber))}
          />
        </div>
      ) : (
        <div className="setting">
          <div>{T("distance")}</div>
          <Input
            disabled={loading}
            variant="ghost"
            suffix="km"
            value={costValue}
            onChange={(e) => dispatch(costValueChanged(e.target.valueAsNumber))}
          />
        </div>
      )}

      <div className="setting multiple">
        <div>{T("constraints.avoid")}</div>
        <div className="ll-input-checkbox-container placement-block">
          <Checkbox
            disabled={loading}
            checked={constraints.avoidHighways}
            onChange={(e) =>
              dispatch(constraintChanged({ key: "avoidHighways", value: e.target.checked }))
            }
          >
            <span>{T("constraints.highways")}</span>
          </Checkbox>
          <Checkbox
            disabled={loading}
            checked={constraints.avoidBridges}
            onChange={(e) =>
              dispatch(constraintChanged({ key: "avoidBridges", value: e.target.checked }))
            }
          >
            <span>{T("constraints.bridges")}</span>
          </Checkbox>
          <Checkbox
            disabled={loading}
            checked={constraints.avoidTunnels}
            onChange={(e) =>
              dispatch(constraintChanged({ key: "avoidTunnels", value: e.target.checked }))
            }
          >
            <span>{T("constraints.tunnels")}</span>
          </Checkbox>
        </div>
      </div>
      <div className="actions">
        <Button
          className="mr-2"
          variant="light"
          color="gray"
          onClick={() => {
            dispatch(referenceFeatureChanged(null));
            dispatch(featureChanged(null));
            setLoading(false);
            isAbortedRef.current = true;
          }}
        >
          <i className="fe-cancel"></i>
          <span>{T("close")}</span>
        </Button>
        <Button disabled={loading} loading={loading} onClick={handleProcess}>
          {T("compute")}
        </Button>
      </div>
    </div>,
    container,
  );
}
