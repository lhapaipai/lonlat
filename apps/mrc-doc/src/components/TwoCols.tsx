import clsx from "clsx";
import { ReactElement } from "react";
interface Props {
  first: ReactElement;
  second: ReactElement;
  foreground?: "first" | "second";
}

export default function CodeAndExample({
  first,
  second,
  foreground = "first",
}: Props) {
  return (
    <div className="not-prose two-cols my-7 lg:mb-14 lg:grid lg:grid-cols-2 lg:gap-2">
      <div
        className={clsx(
          "relative",
          foreground === "first" && "z-10 lg:-mb-7 lg:-mr-36 lg:mt-7",
        )}
      >
        {first}
      </div>
      <div
        className={clsx(
          "relative",
          foreground === "second" && "z-10 lg:-mb-7 lg:-ml-36 lg:mt-7",
        )}
      >
        {second}
      </div>
    </div>
  );
}
