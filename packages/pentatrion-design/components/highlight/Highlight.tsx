import { ReactNode } from "react";
import { RangeTuple } from "fuse.js";
interface Props {
  value: string | undefined;
  indices: readonly RangeTuple[];
  minLength?: number;
}

export default function Hightlight({ value, indices, minLength = 2 }: Props) {
  // !indices -> empty array or undefined
  if (!indices || !value) {
    return value;
  }
  const content: ReactNode[] = [];
  let lastIndex = 0;
  indices.forEach((indice) => {
    if (indice[1] - indice[0] < minLength) {
      return;
    }
    if (indice[0] - lastIndex > 0) {
      content.push(value.substring(lastIndex, indice[0]));
    }
    content.push(<mark key={content.length}>{value.substring(indice[0], indice[1] + 1)}</mark>);
    lastIndex = indice[1] + 1;
  });
  if (lastIndex <= value.length) {
    content.push(value.substring(lastIndex));
  }
  return <span className="text-gray-6">{content}</span>;
}
