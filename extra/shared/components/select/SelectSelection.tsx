import { Option } from "./interface";

interface Props {
  placeholder?: string;
  option: Option;
}
export default function SelectSelection({ placeholder, option }: Props) {
  return <span className="input-element">{option?.label ?? placeholder}</span>;
}
