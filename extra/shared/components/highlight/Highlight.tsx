import { HighlightZone } from "../..";

interface Props {
  fallback?: string;
  zones?: HighlightZone[];
}

export default function Hightlight({ zones, fallback = "" }: Props) {
  if (!zones) {
    return fallback;
  }
  return zones.map(({ extract, highlighted }, idx) => {
    return highlighted ? <mark key={idx}>{extract}</mark> : <span key={idx}>{extract}</span>;
  });
}
