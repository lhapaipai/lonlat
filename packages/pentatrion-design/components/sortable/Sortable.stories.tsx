import { Meta } from "@storybook/react";
import { useState } from "react";
import { ReactSortable } from "react-sortablejs";

const meta = {
  title: "Components/Sortable",
  component: ReactSortable,
} satisfies Meta;
export default meta;

export interface Item {
  id: number;
  name: string;
  height: number;
}

const data: Item[] = [
  {
    id: 0,
    name: "Rare Wind",
    height: 50,
  },
  {
    id: 1,
    name: "Saint Petersburg",
    height: 50,
  },
  {
    id: 2,
    name: "Deep Blue",
    height: 100,
  },
  {
    id: 3,
    name: "Ripe Malinka",
    height: 40,
  },
  {
    id: 4,
    name: "Near Moon",
    height: 120,
  },
];

export const Basic = () => {
  const [items, setItems] = useState(data);
  return (
    <ReactSortable list={items} setList={setItems} animation={200} className="ll-card-group">
      {items.map((item) => (
        <div key={item.id} className="ll-card" style={{ height: item.height }}>
          <span className="handle"></span>
          {item.name}
        </div>
      ))}
    </ReactSortable>
  );
};
