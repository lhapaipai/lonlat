import { Button, Checkbox, Input, Select, SimpleTooltip } from "pentatrion-design";
import { IsochroneGeoJSON, IsochroneOptions, ignIsochrone } from "pentatrion-geo";
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

function minutesStr2secStr(minStr: string) {
  const minutes = parseInt(minStr);
  if (isNaN(minutes)) {
    throw new Error(`unable to parse number value ${minStr}`);
  }
  return (minutes * 60).toString();
}

export default function Isochrone() {
  const [costType, setCostType] = useState<IsochroneOptions["costType"]>("time");
  const [costValue, setCostValue] = useState<string>("30");
  const [profile, setProfile] = useState<IsochroneOptions["profile"]>("car");
  const [direction, setDirection] = useState<IsochroneOptions["direction"]>("departure");
  const [constraintHighway, setConstraintHighway] = useState(true);
  const [constraintBridge, setConstraintBridge] = useState(true);
  const [constraintTunnel, setConstraintTunnel] = useState(true);
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
    constraintBridge,
    constraintHighway,
    constraintTunnel,
  ]);

  useEffect(() => {
    dispatch(isochroneChanged(null));
    return () => void dispatch(isochroneChanged(null));
  }, [dispatch]);

  async function handleProcess() {
    if (!searchFeature) {
      return;
    }
    setLoading(true);
    isAbortedRef.current = false;

    const constraints: ("autoroute" | "tunnel" | "pont")[] = [];
    if (!constraintHighway) {
      constraints.push("autoroute");
    }
    if (!constraintTunnel) {
      constraints.push("tunnel");
    }
    if (!constraintBridge) {
      constraints.push("pont");
    }

    // mock for development
    // new Promise((resolve) => {
    //   setTimeout(() => {
    //     fetch("/api-mocks/isochrone-distance.json")
    //       .then((res) => res.json())
    //       .then(({ geometry, ...properties }) => {
    //         resolve({
    //           type: "Feature",
    //           properties,
    //           geometry,
    //         } as IsochroneGeoJSON);
    //       });
    //   }, 500);
    // })

    ignIsochrone(searchFeature.geometry.coordinates, {
      costType,
      costValue: costType === "distance" ? costValue : minutesStr2secStr(costValue),
      profile,
      direction,
      distanceUnit: "meter",
      timeUnit: "second",
      ...(constraints.length > 0
        ? {
            constraints: constraints.map((value) => ({
              key: "waytype",
              constraintType: "banned",
              operator: "=",
              value,
            })),
          }
        : {}),
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
              setCostValue("30");
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
              setCostValue("10");
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
            onChange={(e) => setCostValue(e.target.value)}
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
            onChange={(e) => setCostValue(e.target.value)}
          />
        </div>
      )}

      <div className="setting constraints">
        <div>{T("permissions.title")}</div>
        <div className="ll-input-checkbox-container placement-block">
          <Checkbox
            disabled={loading}
            checked={constraintHighway}
            onChange={(e) => setConstraintHighway(e.target.checked)}
          >
            <span>{T("permissions.highway")}</span>
          </Checkbox>
          <Checkbox
            disabled={loading}
            checked={constraintBridge}
            onChange={(e) => setConstraintBridge(e.target.checked)}
          >
            <span>{T("permissions.bridge")}</span>
          </Checkbox>
          <Checkbox
            disabled={loading}
            checked={constraintTunnel}
            onChange={(e) => setConstraintTunnel(e.target.checked)}
          >
            <span>{T("permissions.tunnel")}</span>
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
          {T("abort")}
        </Button>
        <Button disabled={loading} loading={loading} onClick={handleProcess}>
          {T("compute")}
        </Button>
      </div>
    </>
  );
}
