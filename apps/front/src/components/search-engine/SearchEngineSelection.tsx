import { SelectSelectionProps } from "pentatrion-design";
import { StarOption } from "./SearchEngineOption";

import "./SearchEngineSelection.scss";

export function SearchEngineSelection({ icon }: SelectSelectionProps<StarOption>) {
  return icon ? (
    <span className="select-search-engine-selection-icon">
      <i className={icon}></i>
    </span>
  ) : (
    <span>?</span>
  );
}
