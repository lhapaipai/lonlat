import Badge from "../badge/Badge.tsx";
import type { Option } from "./interface.d.ts";
export interface SelectSelectionProps<O extends Option> {
  option: O;
  multiple?: boolean;
}
export default function SelectSelection<O extends Option>({
  option,
  multiple = false,
}: SelectSelectionProps<O>) {
  return multiple ? <Badge className="ml-1">{option.label}</Badge> : <span>{option.label}</span>;
}
