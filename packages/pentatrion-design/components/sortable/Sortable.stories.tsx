import { Meta } from "@storybook/react";
import { useState } from "react";
import { ItemInterface, ReactSortable } from "react-sortablejs";
import { Button } from "../button";
import { Input } from "../input";
import { Sortable } from ".";

const meta = {
  title: "Components/Sortable",
  component: Sortable,
} satisfies Meta;
export default meta;

export interface Item extends ItemInterface {
  id: number;
  name: string;
}

const data: Item[] = [
  {
    id: 0,
    name: "Rare Wind",
  },
  {
    id: 1,
    name: "Saint Petersburg",
  },
  {
    id: 2,
    name: "Deep Blue",
  },
  {
    id: 3,
    name: "Ripe Malinka",
  },
  {
    id: 4,
    name: "Near Moon",
  },
];

/**
 * ReactSortable mutate state, it can't be used with redux.
 * see: https://github.com/SortableJS/react-sortablejs/issues/237
 */
export const BasicOriginal = () => {
  const [items, setItems] = useState(data);

  return (
    <ReactSortable
      list={items}
      setList={setItems}
      animation={200}
      className="ll-card-group ll-sortable"
      handle=".handle"
    >
      {items.map((item) => (
        <div key={item.id} className="row-item">
          <Button icon shape="underline" className="handle">
            <i className="fe-braille"></i>
          </Button>
          {item.name}
        </div>
      ))}
    </ReactSortable>
  );
};

export const Basic = () => {
  const [items, setItems] = useState(data);

  return (
    <Sortable
      list={items}
      setList={setItems}
      animation={200}
      className="ll-card-group ll-sortable"
      handle=".handle"
    >
      {items.map((item) => (
        <div key={item.id} className="row-item">
          <Button icon shape="underline" className="handle">
            <i className="fe-braille"></i>
          </Button>
          {item.name}
        </div>
      ))}
    </Sortable>
  );
};

export const WithInputs = () => {
  const [items, setItems] = useState(data);
  return (
    <Sortable
      list={items}
      setList={setItems}
      animation={200}
      className="ll-sortable"
      handle=".handle"
    >
      {items.map((item) => (
        <div key={item.id} className="row-item">
          <Button icon shape="underline" className="handle">
            <i className="fe-braille"></i>
          </Button>
          <Input className="ll-input" defaultValue={item.name} />
        </div>
      ))}
    </Sortable>
  );
};
