import { Button, Checkbox, Input, Select, SimpleTooltip } from "pentatrion-design";
import {
  IsochroneGeoJSON,
  IsochroneOptions,
  ignIsochrone,
  isGeolocationGeoOption,
} from "pentatrion-geo";
import { useEffect, useRef, useState } from "react";
import { useT } from "talkr";
import { useAppDispatch, useAppSelector } from "~/store";
import { isochroneChanged, selectSearchFeature } from "./searchSlice";
import { useNotification } from "pentatrion-design/redux";

const profileOptions = [
  { value: "car", label: "Voiture" },
  { value: "pedestrian", label: "Piéton" },
];

const directionOptions = [
  { value: "departure", label: "Départ" },
  { value: "arrival", label: "Arrivée" },
];

export default function Isochrone() {
  const [costType, setCostType] = useState<IsochroneOptions["costType"]>("time");
  const [costValue, setCostValue] = useState(30);
  const [profile, setProfile] = useState<IsochroneOptions["profile"]>("car");
  const [direction, setDirection] = useState<IsochroneOptions["direction"]>("departure");
  const [avoidHighways, setAvoidHighways] = useState(false);
  const [avoidBridges, setAvoidBridges] = useState(false);
  const [avoidTunnels, setAvoidTunnels] = useState(false);
  const { T } = useT();
  const searchFeature = useAppSelector(selectSearchFeature);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const isAbortedRef = useRef(false);
  const { notifyError } = useNotification();

  useEffect(() => {
    dispatch(isochroneChanged(null));
  }, [
    dispatch,
    costType,
    costValue,
    profile,
    direction,
    avoidBridges,
    avoidHighways,
    avoidTunnels,
  ]);

  async function handleProcess() {
    if (!searchFeature || isGeolocationGeoOption(searchFeature)) {
      return;
    }
    setLoading(true);
    isAbortedRef.current = false;

    // mock for development
    new Promise((resolve) => {
      setTimeout(() => {
        fetch("/api-mocks/isochrone-distance.json")
          .then((res) => res.json())
          .then(({ geometry, ...properties }) => {
            resolve({
              type: "Feature",
              properties,
              geometry,
            } as IsochroneGeoJSON);
          });
      }, 500);
    })
      .then((isochroneFeature: IsochroneGeoJSON) => {
        if (!isAbortedRef.current) {
          dispatch(isochroneChanged(isochroneFeature));
        }
      })
      .catch((err) => void notifyError(err))
      .finally(() => {
        setLoading(false);
        isAbortedRef.current = false;
      });

    // ignIsochrone(searchFeature.geometry.coordinates, {
    //   costType,
    //   costValue,
    //   profile,
    //   direction,
    //   constraints: {
    //     avoidHighways,
    //     avoidBridges,
    //     avoidTunnels,
    //   },
    // })
    //   .then((isochroneFeature: IsochroneGeoJSON) => {
    //     if (!isAbortedRef.current) {
    //       dispatch(isochroneChanged(isochroneFeature));
    //     }
    //   })
    //   .catch((err) => void notifyError(err))
    //   .finally(() => {
    //     setLoading(false);
    //     isAbortedRef.current = false;
    //   });
  }

  return (
    <>
      <div className="actions">
        <Button
          disabled={loading}
          variant="light"
          color="weak"
          className="with-icon"
          selected={costType === "time"}
          onClick={() => {
            if (costType !== "time") {
              setCostType("time");
              setCostValue(30);
            }
          }}
        >
          <i className="fe-stopwatch"></i>
          {T("isochrone.isochrone")}
        </Button>
        <Button
          disabled={loading}
          variant="light"
          color="weak"
          className="with-icon"
          selected={costType === "distance"}
          onClick={() => {
            if (costType !== "distance") {
              setCostType("distance");
              setCostValue(10);
            }
          }}
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
                setProfile(value);
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
              setDirection(value);
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
            onChange={(e) => setCostValue(e.target.valueAsNumber)}
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
            onChange={(e) => setCostValue(e.target.valueAsNumber)}
          />
        </div>
      )}

      <div className="setting multiple">
        <div>{T("constraints.avoid")}</div>
        <div className="ll-input-checkbox-container placement-block">
          <Checkbox
            disabled={loading}
            checked={avoidHighways}
            onChange={(e) => setAvoidHighways(e.target.checked)}
          >
            <span>{T("constraints.highways")}</span>
          </Checkbox>
          <Checkbox
            disabled={loading}
            checked={avoidBridges}
            onChange={(e) => setAvoidBridges(e.target.checked)}
          >
            <span>{T("constraints.bridges")}</span>
          </Checkbox>
          <Checkbox
            disabled={loading}
            checked={avoidTunnels}
            onChange={(e) => setAvoidTunnels(e.target.checked)}
          >
            <span>{T("constraints.tunnels")}</span>
          </Checkbox>
        </div>
      </div>
      <div className="actions">
        <Button
          className="mr-2"
          variant="light"
          color="weak"
          onClick={() => {
            dispatch(isochroneChanged(null));
            setLoading(false);
            isAbortedRef.current = true;
          }}
        >
          <i className="fe-trash"></i>
          <span>{T("reset")}</span>
        </Button>
        <Button disabled={loading} loading={loading} onClick={handleProcess}>
          {T("compute")}
        </Button>
      </div>
    </>
  );
}
