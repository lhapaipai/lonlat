import {
  Button,
  LinkButton,
  SimpleTooltip,
  useCopyToClipboard,
} from "pentatrion-design";
import { useAppDispatch, useAppSelector } from "~/store";
import { selectSearchFeature } from "./searchSlice";
import { getCoordsStr } from "pentatrion-geo/geo-options";
import {
  coordsUnitChanged,
  selectCoordsUnit,
  tabChanged,
} from "~/features/config/configSlice";
import { useReduxNotifications } from "pentatrion-design/redux";
import { useT } from "talkr";
import { useCallback, useState } from "react";

import { directionWayPointsAddedFromSearch } from "~/features/direction/directionSlice";
import { referenceFeatureChanged } from "../isochrone/isochroneSlice";
import { generateGMapsDirection, generateWazeDirection } from "~/lib/url";

import SearchInput from "./SearchInput";
import RawData from "./RawData";

type Action = "isochrone" | "direction" | "raw" | "share";

export default function SearchTab() {
  const feature = useAppSelector(selectSearchFeature);
  const dispatch = useAppDispatch();
  const [, copy] = useCopyToClipboard();
  const { notify } = useReduxNotifications();
  const coordsUnit = useAppSelector(selectCoordsUnit);
  const { T } = useT();

  const [action, setAction] = useState<Action | null>(null);
  const setOrToggleAction = useCallback(
    (a: Action) => {
      const nextAction = a === action ? null : a;
      setAction(nextAction);
    },
    [action],
  );

  return (
    <div className="grid grid-cols-1 gap-2">
      <SearchInput />
      {feature &&
        feature.type === "Feature" &&
        feature.properties.type !== "geolocation" && (
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
                        feature.geometry.coordinates,
                        coordsUnit,
                      );
                      copy(value);
                      notify(`${T("copiedIntoClipboard")} : ${value}`, {
                        expiration: 5000,
                      });
                    }}
                  >
                    {getCoordsStr(feature.geometry.coordinates, coordsUnit)}
                  </span>
                </div>
              </div>
              <div className="p8n-setting">
                <div>{T("elevation")}</div>
                <div>
                  {feature.properties.originalProperties?.elevation ??
                    feature.geometry.coordinates[2] ??
                    "-"}
                  <span className="text-gray-6"> m</span>
                </div>
              </div>
              {["city", "postcode"].map((key) => {
                const value = feature.properties.originalProperties?.[key] as
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
              <SimpleTooltip
                content={T("tooltip.direction")}
                placement="top-start"
              >
                <Button
                  className="min-w-0 flex-1 justify-center"
                  variant="text"
                  color="gray"
                  onClick={() => {
                    dispatch(directionWayPointsAddedFromSearch(feature));
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
              <SimpleTooltip content={T("tooltip.isochrone")} placement="top">
                <Button
                  className="min-w-0 flex-1 justify-center"
                  variant="text"
                  color="gray"
                  selected={action === "isochrone"}
                  onClick={() => dispatch(referenceFeatureChanged(feature))}
                >
                  <i className="fe-isochrone"></i>
                </Button>
              </SimpleTooltip>
              <SimpleTooltip content={T("tooltip.share")} placement="top-end">
                <Button
                  className="min-w-0 flex-1 justify-center"
                  variant="text"
                  color="gray"
                  selected={action === "share"}
                  onClick={() => setOrToggleAction("share")}
                >
                  <i className="fe-share"></i>
                </Button>
              </SimpleTooltip>
            </div>

            {action === "raw" && <RawData feature={feature} />}
            {action === "share" && (
              <>
                <div className="p8n-separator"></div>
                <div className="flex gap-2">
                  <SimpleTooltip
                    content={T("tooltip.googleDirection")}
                    placement="top-start"
                  >
                    <LinkButton
                      className="min-w-0 flex-1 justify-center"
                      variant="text"
                      href={generateGMapsDirection(
                        feature.geometry.coordinates,
                      )}
                      color="gray"
                    >
                      <i className="fe-google"></i>
                    </LinkButton>
                  </SimpleTooltip>
                  <SimpleTooltip
                    content={T("tooltip.wazeDirection")}
                    placement="top-end"
                  >
                    <LinkButton
                      className="min-w-0 flex-1 justify-center"
                      variant="text"
                      href={generateWazeDirection(feature.geometry.coordinates)}
                      color="gray"
                    >
                      <i className="fe-waze"></i>
                    </LinkButton>
                  </SimpleTooltip>
                </div>
              </>
            )}
          </>
        )}
    </div>
  );
}
