import { CSSProperties, ComponentPropsWithoutRef, useId } from "react";
import { ThemeColor } from "../../types.d";
import clsx from "clsx";
import { colorVariants } from "../../lib";

interface Props extends ComponentPropsWithoutRef<"svg"> {
  size?: "small" | "medium" | "large";
  color?: ThemeColor;
}

const sizeConfig = {
  small: "w-6 h-6 text-base",
  medium: "w-8 h-8 text-[2rem]",
  large: "w-12 h-12 text-[3rem]",
};

const trackStyle: CSSProperties = {
  strokeLinecap: "round",
  strokeWidth: 2,
};
const circleStyle: CSSProperties = {
  strokeLinecap: "round",
  strokeWidth: 2,

  /**
   * $total-length: 43.699; // total length of path, calculated by getTotalLength() in JS
   * $looping-percent: 40;
   * $looping-length: math.div($looping-percent * $total-length, 100) = 17.464;
   * stroke-dasharray: #{$looping-length * 1px}, #{($total-length - $looping-length) * 1px};
   */
  strokeDasharray: "17.45px, 26.21px",
};

export function Loader({ size = "medium", color = "blue", className, ...rest }: Props) {
  const id = useId();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsx("inline-block", sizeConfig[size], colorVariants[color].text, className)}
      viewBox="0 0 16 16"
      {...rest}
    >
      <defs>
        <circle id={id} cx="8" cy="8" r="7" />
      </defs>
      <use href={`#${id}`} className="opacity-25 fill-none stroke-current" style={trackStyle} />
      <use
        href={`#${id}`}
        className="fill-none stroke-current animate-loader-stroke"
        style={circleStyle}
      />
    </svg>
  );
}
