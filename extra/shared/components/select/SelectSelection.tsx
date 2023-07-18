import type { Option } from "./interface.d.ts";

export interface SelectSelectionProps<O extends Option> {
  placeholder?: string;
  option: O;
}
export default function SelectSelection<O extends Option>({
  placeholder,
  option,
}: SelectSelectionProps<O>) {
  return <span className="input-element">{option?.label ?? placeholder}</span>;
}
