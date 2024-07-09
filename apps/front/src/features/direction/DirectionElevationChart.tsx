import { ElevationChart } from "pentatrion-geo/components/charts";
import { useAppDispatch, useAppSelector } from "~/store";
import {
  directionFocusCoordinatesChanged,
  selectDirectionFocusCoordinates,
  selectDirectionPois,
  selectDirectionRoute,
  selectDirectionWayPoints,
} from "./directionSlice";
import { CSSProperties } from "react";

const paddings = {
  paddingLeft: 50,
  paddingRight: 50,
  paddingTop: 80,
  paddingBottom: 25,
};

const chartStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
};

export default function DirectionElevationChart() {
  const route = useAppSelector(selectDirectionRoute);

  const wayPoints = useAppSelector(selectDirectionWayPoints);
  const pois = useAppSelector(selectDirectionPois);
  const focusCoordinates = useAppSelector(selectDirectionFocusCoordinates);
  const dispatch = useAppDispatch();
  if (!route) {
    return null;
  }

  return (
    <div className="bg-default h-full w-full" style={paddings}>
      <div className="h-full w-full rounded-t-2xl bg-gray-0 shadow"></div>
      <ElevationChart
        tolerance={0.05}
        showExtremas={false}
        style={chartStyle}
        route={route}
        wayPoints={wayPoints}
        pois={pois}
        focusCoordinates={focusCoordinates}
        onChangeFocusCoordinates={(f) =>
          void dispatch(directionFocusCoordinatesChanged(f))
        }
      />
    </div>
  );
}
