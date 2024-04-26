import { Button, SimpleTooltip, useCopyToClipboard } from "pentatrion-design";
import { useAppDispatch, useAppSelector } from "~/store";
import { selectSearchFeature } from "./searchSlice";
import { getCoordsStr, stringifyGeoOption } from "pentatrion-geo";
import { coordsUnitChanged, selectCoordsUnit, tabChanged } from "~/store/mapSlice";
import { useNotification } from "pentatrion-design/redux";
import { useT } from "talkr";
import { useCallback, useState } from "react";
import { directionWayPointsAddedFromSearch } from "~/features/direction/directionSlice";
import { referenceFeatureChanged } from "../isochrone/isochroneSlice";

type Action = "isochrone" | "direction" | "raw";

export default function FeatureInfos() {
  const searchFeature = useAppSelector(selectSearchFeature);
  const dispatch = useAppDispatch();
  const [, copy] = useCopyToClipboard();
  const { notify } = useNotification();
  const coordsUnit = useAppSelector(selectCoordsUnit);
  const { T } = useT();

  const [action, setAction] = useState<Action | null>(null);
  const setOrToggleAction = useCallback(
    (a: Action) => {
      if (a === action) {
        setAction(null);
      } else {
        setAction(a);
      }
    },
    [action],
  );

  if (searchFeature?.type !== "Feature") {
    return null;
  }

  return (
    <>
      <div>
        <div className="setting">
          <div className="text-hint">{T("coordinates")}</div>
          <div>
            <Button
              className="size-small text-hint"
              variant="ghost"
              color="weak"
              onClick={() => dispatch(coordsUnitChanged())}
            >
              {T(`coordsUnit.${coordsUnit}`)}{" "}
            </Button>
            &nbsp;
            <span
              className="can-copy"
              onClick={() => {
                const value = getCoordsStr(searchFeature.geometry.coordinates, coordsUnit);
                copy(value);
                notify(`${T("copiedIntoClipboard")} : ${value}`);
              }}
            >
              {getCoordsStr(searchFeature.geometry.coordinates, coordsUnit)}
            </span>
          </div>
        </div>
        <div className="setting">
          <div className="text-hint">{T("elevation")}</div>
          <div>
            {searchFeature.properties.originalProperties?.elevation ??
              searchFeature.geometry.coordinates[2] ??
              "-"}
            <span className="text-hint"> m</span>
          </div>
        </div>
        {["city", "postcode"].map((key) => {
          const value = searchFeature.properties.originalProperties?.[key] as string | undefined;
          if (!value) {
            return null;
          }
          return (
            <div className="setting" key={key}>
              <div className="text-hint">{T(`property.${key}`)}</div>
              <div>{value}</div>
            </div>
          );
        })}
      </div>
      <div className="actions">
        <SimpleTooltip content={T("tooltip.direction")} placement="top-start">
          <Button
            variant="light"
            color="weak"
            onClick={() => {
              dispatch(directionWayPointsAddedFromSearch(searchFeature));
              dispatch(tabChanged("direction"));
            }}
          >
            <i className="fe-route"></i>
          </Button>
        </SimpleTooltip>
        <SimpleTooltip content={T("tooltip.code")} placement="top">
          <Button
            variant="light"
            color="weak"
            selected={action === "raw"}
            onClick={() => setOrToggleAction("raw")}
          >
            <i className="fe-code"></i>
          </Button>
        </SimpleTooltip>
        <SimpleTooltip content={T("tooltip.isochrone")} placement="top-end">
          <Button
            variant="light"
            color="weak"
            selected={action === "isochrone"}
            onClick={() => dispatch(referenceFeatureChanged(searchFeature))}
          >
            <i className="fe-isochrone"></i>
          </Button>
        </SimpleTooltip>
      </div>

      {action === "raw" && (
        <>
          <div className="separator"></div>
          <textarea
            className="ll-textarea text-sm raw"
            readOnly
            defaultValue={stringifyGeoOption(searchFeature)}
          />
        </>
      )}
    </>
  );
}
