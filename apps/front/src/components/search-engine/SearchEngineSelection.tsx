import { SelectSelectionProps } from "pentatrion-design";
import { StarOption } from "./SearchEngineOption";
import clsx from "clsx";

export function SearchEngineSelection({ icon }: SelectSelectionProps<StarOption>) {
  return icon ? (
    <span>
      <i className={clsx(icon, icon === "fe-locality" && "ml-[-2px]")}></i>
    </span>
  ) : (
    <span>?</span>
  );
}
