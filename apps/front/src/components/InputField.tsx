import { ComponentPropsWithRef, forwardRef } from "react";

// voir comment on va pouvoir utiliser le InputField de pentatrion-design

interface Props extends ComponentPropsWithRef<"input"> {
  label: string;
  error?: string;
}
const InputField = forwardRef<HTMLInputElement, Props>(({ label, error, ...rest }, ref) => {
  return (
    <label>
      <span>{label}:</span>
      <span>
        <input ref={ref} {...rest} />
      </span>
      {error && <span>{error}</span>}
    </label>
  );
});

export default InputField;
