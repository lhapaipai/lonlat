import { Button, SimpleTooltip, useCopyToClipboard } from "pentatrion-design";
import { useAppDispatch, useAppSelector } from "~/store";
import { selectSearchFeature } from "./searchSlice";
import { getCoordsStr, stringifyGeoOption } from "pentatrion-geo";
import {
  coordsUnitChanged,
  selectCoordsUnit,
  tabChanged,
} from "~/store/mapSlice";
import { useReduxNotifications } from "pentatrion-design/redux";
import { useT } from "talkr";
import { useCallback, useState } from "react";

import { directionWayPointsAddedFromSearch } from "~/features/direction/directionSlice";
import { referenceFeatureChanged } from "../isochrone/isochroneSlice";

type Action = "isochrone" | "direction" | "raw";

export default function FeatureInfos() {
  const searchFeature = useAppSelector(selectSearchFeature);
  const dispatch = useAppDispatch();
  const [, copy] = useCopyToClipboard();
  const { notify } = useReduxNotifications();
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
        <div className="p8n-setting">
          <div>{T("coordinates")}</div>
          <div>
            <Button
              className="text-sm text-gray-6"
              variant="ghost"
              color="gray"
              onClick={() => dispatch(coordsUnitChanged())}
            >
              {T(`coordsUnit.${coordsUnit}`)}{" "}
            </Button>
            &nbsp;
            <span
              className="can-copy"
              onClick={() => {
                const value = getCoordsStr(
                  searchFeature.geometry.coordinates,
                  coordsUnit,
                );
                copy(value);
                notify(`${T("copiedIntoClipboard")} : ${value}`, {
                  expiration: 5000,
                });
              }}
            >
              {getCoordsStr(searchFeature.geometry.coordinates, coordsUnit)}
            </span>
          </div>
        </div>
        <div className="p8n-setting">
          <div>{T("elevation")}</div>
          <div>
            {searchFeature.properties.originalProperties?.elevation ??
              searchFeature.geometry.coordinates[2] ??
              "-"}
            <span className="text-gray-6"> m</span>
          </div>
        </div>
        {["city", "postcode"].map((key) => {
          const value = searchFeature.properties.originalProperties?.[key] as
            | string
            | undefined;
          if (!value) {
            return null;
          }
          return (
            <div className="p8n-setting" key={key}>
              <div>{T(`property.${key}`)}</div>
              <div>{value}</div>
            </div>
          );
        })}
      </div>
      <div className="flex gap-2">
        <SimpleTooltip content={T("tooltip.direction")} placement="top-start">
          <Button
            className="min-w-0 flex-1 justify-center"
            variant="text"
            color="gray"
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
            className="min-w-0 flex-1 justify-center"
            variant="text"
            color="gray"
            selected={action === "raw"}
            onClick={() => setOrToggleAction("raw")}
          >
            <i className="fe-code"></i>
          </Button>
        </SimpleTooltip>
        <SimpleTooltip content={T("tooltip.isochrone")} placement="top-end">
          <Button
            className="min-w-0 flex-1 justify-center"
            variant="text"
            color="gray"
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
            className="ll-textarea min-h-60 text-sm"
            readOnly
            defaultValue={stringifyGeoOption(searchFeature)}
          />
        </>
      )}
    </>
  );
}
