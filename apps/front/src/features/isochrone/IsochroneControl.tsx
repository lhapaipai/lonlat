import {
  Button,
  Checkbox,
  Input,
  Select,
  SimpleTooltip,
} from "pentatrion-design";
import {
  IsochroneGeoJSON,
  IsochroneOptions,
  ignIsochrone,
} from "pentatrion-geo";
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
import { useReduxNotifications } from "pentatrion-design/redux";
import { useRControl } from "maplibre-react-components";
import { createPortal } from "react-dom";
import { selectDistractionFree } from "~/store/mapSlice";
import clsx from "clsx";

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

  const { container } = useRControl({
    position: "top-right",
    className: clsx(
      "maplibregl-ctrl maplibregl-ctrl-group",
      distractionFree && "distraction-free",
    ),
  });

  const { T } = useT();
  const {
    referenceFeature,
    costType,
    costValue,
    direction,
    profile,
    constraints,
  } = useAppSelector(selectIsochrone);

  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const isAbortedRef = useRef(false);
  const { notifyError } = useReduxNotifications();

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
    <div className="grid grid-cols-1 gap-2">
      <div className="flex gap-2">
        <Button
          disabled={loading}
          variant="text"
          color="gray"
          className="min-w-0 flex-1 justify-center"
          selected={costType === "time"}
          onClick={() => dispatch(costTypeChanged("time"))}
        >
          <i className="fe-stopwatch"></i>
          {T("isochrone.isochrone")}
        </Button>
        <Button
          disabled={loading}
          variant="text"
          color="gray"
          className="min-w-0 flex-1 justify-center"
          selected={costType === "distance"}
          onClick={() => dispatch(costTypeChanged("distance"))}
        >
          <i className="fe-ruler"></i>
          {T("isochrone.isodistance")}
        </Button>
        <div>
          <SimpleTooltip
            contentClassName="description"
            content={T("isochrone.description")}
            placement="bottom-end"
          >
            <div className="h-8 cursor-help flex-center">
              <i className="fe-help"></i>
            </div>
          </SimpleTooltip>
        </div>
      </div>

      <div className="p8n-setting">
        <div>{T("isochrone.referenceFeature")}</div>
        <div>
          <Input
            variant="ghost"
            value={referenceFeature?.properties.label}
            readOnly={true}
          />
        </div>
      </div>

      <div className="p8n-setting">
        <div>{T("isochrone.profile")}</div>
        <div className="min-w-40">
          <Select
            disabled={loading}
            variant="ghost"
            options={profileOptions}
            value={profile}
            onChange={(o) => {
              const value = (o.target.value || "car") as NonNullable<
                IsochroneOptions["profile"]
              >;
              if (["car", "pedestrian"].includes(value)) {
                dispatch(profileChanged(value));
              }
            }}
          ></Select>
        </div>
      </div>

      <div className="p8n-setting">
        <div>{T("isochrone.direction")}</div>
        <div className="min-w-40">
          <Select
            disabled={loading}
            variant="ghost"
            options={directionOptions}
            value={direction}
            onChange={(o) => {
              const value = (o.target.value || "car") as NonNullable<
                IsochroneOptions["direction"]
              >;
              if (["departure", "arrival"].includes(value)) {
                dispatch(directionChanged(value));
              }
            }}
          ></Select>
        </div>
      </div>

      {costType === "time" ? (
        <div className="p8n-setting">
          <div>{T("time")}</div>
          <Input
            className="max-w-40"
            disabled={loading}
            variant="ghost"
            suffix="min"
            value={costValue}
            onChange={(e) => dispatch(costValueChanged(e.target.valueAsNumber))}
          />
        </div>
      ) : (
        <div className="p8n-setting">
          <div>{T("distance")}</div>
          <Input
            className="max-w-40"
            disabled={loading}
            variant="ghost"
            suffix="km"
            value={costValue}
            onChange={(e) => dispatch(costValueChanged(e.target.valueAsNumber))}
          />
        </div>
      )}

      <div className="p8n-setting multiple">
        <div>{T("constraints.avoid")}</div>
        <div className="min-w-40">
          <Checkbox
            disabled={loading}
            checked={constraints.avoidHighways}
            onChange={(e) =>
              dispatch(
                constraintChanged({
                  key: "avoidHighways",
                  value: e.target.checked,
                }),
              )
            }
          >
            <span>{T("constraints.highways")}</span>
          </Checkbox>
          <Checkbox
            disabled={loading}
            checked={constraints.avoidBridges}
            onChange={(e) =>
              dispatch(
                constraintChanged({
                  key: "avoidBridges",
                  value: e.target.checked,
                }),
              )
            }
          >
            <span>{T("constraints.bridges")}</span>
          </Checkbox>
          <Checkbox
            disabled={loading}
            checked={constraints.avoidTunnels}
            onChange={(e) =>
              dispatch(
                constraintChanged({
                  key: "avoidTunnels",
                  value: e.target.checked,
                }),
              )
            }
          >
            <span>{T("constraints.tunnels")}</span>
          </Checkbox>
        </div>
      </div>
      <div className="flex justify-between gap-2">
        <Button
          className="mr-2"
          variant="text"
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
