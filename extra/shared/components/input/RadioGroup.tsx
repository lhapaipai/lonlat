import { ComponentPropsWithRef, forwardRef, useRef } from "react";
import { useCombinedRefs } from "../..";
import "./Checkbox-Radio.scss";
import cn from "classnames";

interface RadioProps extends ComponentPropsWithRef<"input"> {
  disabled?: boolean;
}
const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ disabled = false, checked, children, ...rest }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const combinedRef = useCombinedRefs(inputRef, ref);
    return (
      <label className={cn("ll-input-radio-container", disabled && "disabled")}>
        <input
          ref={combinedRef}
          disabled={disabled}
          type="radio"
          className={cn("ll-input-radio")}
          checked={checked}
          {...rest}
        />
        {children}
      </label>
    );
  },
);

interface Props {
  value: string | null;
  options: {
    label: string;
    value: string;
  }[];
  onChange: (newValue: string | null) => void;
  disabled?: boolean;
  placement?: "inline" | "inline-grid" | "block";
}
export default function RadioGroup({
  value,
  options,
  onChange,
  placement = "block",
  disabled = false,
}: Props) {
  return (
    <div className={cn("ll-input-radio-container", `placement-${placement}`)}>
      {options.map((option) => (
        <Radio
          disabled={disabled}
          key={option.value}
          checked={option.value === value}
          onChange={() => onChange(option.value)}
        >
          {option.label}
        </Radio>
      ))}
    </div>
  );
}
