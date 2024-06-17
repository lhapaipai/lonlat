import clsx from "clsx";
interface Props {
  Element: () => JSX.Element;
  html: string;
  first?: "code" | "map";
}

export default function CodeAndExample({
  Element,
  html,
  first = "code",
}: Props) {
  return (
    <div className="not-prose code-with-preview my-7 lg:mb-14 lg:grid lg:grid-cols-2 lg:gap-2">
      <div
        className={clsx(
          "relative z-10",
          first === "code" ? "lg:-mr-36" : "order-2 lg:-ml-36",
        )}
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
      <Element />
    </div>
  );
}
