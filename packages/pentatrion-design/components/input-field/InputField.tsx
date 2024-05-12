import { ElementType, ForwardedRef, ReactNode, forwardRef, useId } from "react";
import { Input } from "../input";
import { PolymorphicPropsWithRef } from "../..";
import cn from "classnames";
import "./InputField.scss";

interface InputFieldOwnProps {
  label?: ReactNode;
  hint?: ReactNode;
  help?: ReactNode;
  error?: ReactNode | boolean;
  orange?: ReactNode | boolean;
}

const defaultElement = Input;

type Props<E extends ElementType> = PolymorphicPropsWithRef<InputFieldOwnProps, E>;

const InputFieldBase = <E extends ElementType = typeof defaultElement>(
  { label, hint, help, error, orange, as, ...rest }: Props<E>,
  ref: ForwardedRef<Element>,
) => {
  const id = useId();
  const Element: ElementType = as || defaultElement;

  const labelElement = label && <span className="font-bold">{label}</span>;
  const hintElement = hint && <span className="ml-auto text-hint">{hint}</span>;
  const errorElement = error && typeof error !== "boolean" && (
    <span className={cn("color-red", "font-medium")}>
      <i className="fe-circle-exclamation"></i>
      <span>{error}</span>
    </span>
  );
  const orangeElement = orange && typeof orange !== "boolean" && (
    <span className={cn("color-orange", "font-medium")}>
      <i className="fe-circle-exclamation"></i>
      <span>{orange}</span>
    </span>
  );

  return (
    <div className={cn("ll-input-field")}>
      {label || hint ? (
        <label className={cn("label-section")} htmlFor={id}>
          {labelElement}
          {hintElement}
        </label>
      ) : (
        <label htmlFor={id} className="hidden"></label>
      )}
      <Element ref={ref} id={id} className={cn(orange && "orange", error && "error")} {...rest} />
      <div className={cn("context-section", "text-hint")}>
        {errorElement || orangeElement || help}
      </div>
    </div>
  );
};

const InputField: <E extends ElementType = typeof defaultElement>(props: Props<E>) => ReactNode =
  forwardRef(InputFieldBase);

export default InputField;
