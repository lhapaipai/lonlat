import { Button } from "pentatrion-design";
import "./App.scss";

import DirectionTab from "./tabs/DirectionTab";
import { useAppDispatch } from "./store";
import { directionLocationChanged } from "./store/directionSlice";
import { createUnknownFeature } from "./lib";
import { createNodataFeature } from "pentatrion-geo";

function App() {
  const dispatch = useAppDispatch();

  function handleClick(action: "unknown" | "unselect") {
    switch (action) {
      case "unknown":
        dispatch(directionLocationChanged({ index: 0, feature: createUnknownFeature() }));
        break;
      case "unselect":
        dispatch(directionLocationChanged({ index: 0, feature: createNodataFeature() }));
        break;
    }
  }

  return (
    <>
      <DirectionTab />
      <div>
        <Button onClick={() => handleClick("unknown")} className="mr-2">
          select Unknown at index 0
        </Button>
        <Button onClick={() => handleClick("unselect")}>unselect at index 0</Button>
      </div>
    </>
  );
}

export default App;
