import { ComponentPropsWithRef, forwardRef, useId, useRef } from "react";
import { type ThemeColor } from "~/types.d";
import { useCombinedRefs } from "~/hooks";
import clsx from "clsx";

interface RadioProps extends ComponentPropsWithRef<"input"> {
  disabled?: boolean;
  color?: ThemeColor;
}
const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ disabled = false, color = "yellow", checked, children, name, className, ...rest }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const combinedRef = useCombinedRefs(inputRef, ref);
    return (
      <label className={clsx("flex items-center cursor-pointer", disabled && "disabled")}>
        <input
          data-color={color}
          ref={combinedRef}
          disabled={disabled}
          type="radio"
          className={clsx(
            "p8n-input-radio",
            "appearance-none p-0 inline-block bg-origin-border select-none shrink-0 cursor-pointer h-5 w-5 bg-gray-0 my-0 mr-1 rounded-full",
            className,
          )}
          checked={checked}
          name={name}
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
  // onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onChange?: (newValue: string | null) => void;
  disabled?: boolean;
  placement?: "inline" | "inline-grid" | "block";
  className?: string;
  color?: ThemeColor;
}

const placementVariants = {
  inline: "flex gap-2",
  "inline-grid": "grid gap-2 grid-cols-repeat-fill-160",
  block: "",
};

export default function RadioGroup({
  value,
  options,
  onChange = () => {},
  // onValue = () => {},
  placement = "block",
  disabled = false,
  className,
  color = "yellow",
}: Props) {
  const id = useId();
  return (
    <div className={clsx(placementVariants[placement])}>
      {options.map((option) => (
        <Radio
          disabled={disabled}
          key={option.value}
          checked={option.value === value}
          onChange={() => onChange(option.value)}
          name={id}
          className={className}
          color={color}
        >
          {option.label}
        </Radio>
      ))}
    </div>
  );
}
