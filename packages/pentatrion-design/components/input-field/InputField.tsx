import { ElementType, ForwardedRef, ReactNode, forwardRef, useId } from "react";
import { Input } from "../input";
import { type ThemeColor } from "../../types.d";
import { type PolymorphicPropsWithRef } from "../../env.d";

interface InputFieldOwnProps {
  label?: ReactNode;
  hint?: ReactNode;
  help?: ReactNode;
  error?: ReactNode | boolean;
  warning?: ReactNode | boolean;
}

const defaultElement = Input;

type Props<E extends ElementType> = PolymorphicPropsWithRef<
  InputFieldOwnProps,
  E
>;

const InputFieldBase = <E extends ElementType = typeof defaultElement>(
  { label, hint, help, error, warning, as, ...rest }: Props<E>,
  ref: ForwardedRef<Element>,
) => {
  const id = useId();
  const Element: ElementType = as || defaultElement;

  const labelElement = label && <span className="font-bold">{label}</span>;
  const hintElement = hint && (
    <span className="ml-auto text-sm text-gray-6">{hint}</span>
  );
  const errorElement = error && typeof error !== "boolean" && (
    <span className="font-medium text-red-4 dark:text-red-2">
      <i className="fe-circle-exclamation"></i>
      <span>{error}</span>
    </span>
  );
  const warningElement = warning && typeof warning !== "boolean" && (
    <span className="font-medium text-orange-4 dark:text-orange-2">
      <i className="fe-circle-exclamation"></i>
      <span>{warning}</span>
    </span>
  );

  const color: ThemeColor = error ? "red" : warning ? "orange" : "yellow";

  return (
    <div>
      {label || hint ? (
        <label className="mb-1 flex items-end" htmlFor={id}>
          {labelElement}
          {hintElement}
        </label>
      ) : (
        <label htmlFor={id} className="invisible"></label>
      )}
      <Element ref={ref} id={id} color={color} {...rest} />
      <div className="mt-1 text-sm text-gray-6">
        {errorElement || warningElement || help}
      </div>
    </div>
  );
};
InputFieldBase.displayName = "InputField";

export const InputField: <E extends ElementType = typeof defaultElement>(
  props: Props<E>,
) => ReactNode = forwardRef(InputFieldBase);
