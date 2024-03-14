import Badge from "../badge/Badge";
import type { Option } from "./interface";

export type SelectSelectionProps<O extends Option> = O & {
  multiple?: boolean;
};

export default function SelectSelection<O extends Option>({
  label,
  multiple = false,
}: SelectSelectionProps<O>) {
  return multiple ? <Badge className="ml-1">{label}</Badge> : <span>{label}</span>;
}
