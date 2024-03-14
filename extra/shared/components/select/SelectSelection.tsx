import Badge from "../badge/Badge.tsx";
import type { Option } from "./interface.d.ts";

export type SelectSelectionProps<O extends Option> = O & {
  multiple?: boolean;
};

export default function SelectSelection<O extends Option>({
  label,
  multiple = false,
}: SelectSelectionProps<O>) {
  return multiple ? <Badge className="ml-1">{label}</Badge> : <span>{label}</span>;
}
