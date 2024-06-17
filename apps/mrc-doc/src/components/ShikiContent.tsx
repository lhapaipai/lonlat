import clsx from "clsx";

interface Props {
  html: string;
  className?: string;
}
export default function ShikiContent({ html, className }: Props) {
  return (
    <div
      className={clsx("not-prose", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    ></div>
  );
}
