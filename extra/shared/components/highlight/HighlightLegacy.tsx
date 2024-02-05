import { type HighlightZone } from "../..";
import "./Highlight.scss";
interface Props {
  fallback?: string;
  zones?: HighlightZone[];
}

export default function Hightlight({ zones, fallback = "" }: Props) {
  console.log(zones);
  if (!zones) {
    return fallback;
  }
  return (
    <span className="ll-highlight">
      {zones.map(({ extract, highlighted }, idx) => {
        return highlighted ? <mark key={idx}>{extract}</mark> : extract;
      })}
    </span>
  );
}
