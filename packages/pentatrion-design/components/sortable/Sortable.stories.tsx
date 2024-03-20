import { Meta } from "@storybook/react";
import { useState } from "react";
import { ItemInterface, ReactSortable } from "react-sortablejs";
import { Button } from "../button";
import { Input } from "../input";
import { AutocompleteFeatureOption, LazyAutocomplete } from "../autocomplete";
import { createUnknownFeature, handleChangeSearchValue } from "../_mocks/town-api";
import { NotificationsProvider } from "../notification";
import { FeatureOption, NoDataFeature } from "../select";
import { arrayEquals } from "pentatrion-design/lib";
import { createNodataFeature, isNoData, updateId } from "pentatrion-geo";

const meta = {
  title: "Components/Sortable",
  component: ReactSortable,
  decorators: [
    (Story) => (
      <NotificationsProvider>
        <Story />
      </NotificationsProvider>
    ),
  ],
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

export const Basic = () => {
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

export const WithInputs = () => {
  const [items, setItems] = useState(data);
  return (
    <ReactSortable
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
    </ReactSortable>
  );
};

export const BasicOptimizedRedux = () => {
  const [items, setItems] = useState(data);

  function onChange(newList: Item[]) {
    if (
      !arrayEquals(
        items.map((i) => i.id),
        newList.map((i) => i.id),
      )
    ) {
      console.log("setItems");
      setItems(newList);
    }
  }

  return (
    <ReactSortable
      list={items}
      setList={onChange}
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

export const WithAutocomplete = () => {
  const [items, setItems] = useState<(FeatureOption | NoDataFeature)[]>([
    createNodataFeature(),
    createNodataFeature(),
  ]);

  function handleChangeSelection(index: number, selection: FeatureOption | null) {
    const itemId = items[index].id;

    const itemsCopy = [...items];
    itemsCopy[index] = selection ? updateId(selection, itemId) : createNodataFeature(itemId);
    setItems(itemsCopy);
  }

  function onChange(newList: (FeatureOption | NoDataFeature)[]) {
    if (
      !arrayEquals(
        items.map((i) => i.id),
        newList.map((i) => i.id),
      )
    ) {
      console.log("setItems");
      setItems(newList);
    }
  }

  function handleClick(action: "random" | "unknown" | "unselect") {
    const itemId = items[0].id;
    const itemsCopy = [...items];

    switch (action) {
      case "unknown":
        itemsCopy[0] = createUnknownFeature(itemId);
        setItems(itemsCopy);
        break;
      case "unselect":
        itemsCopy[0] = createNodataFeature(itemId);
        setItems(itemsCopy);
        break;
    }
  }

  return (
    <>
      <ReactSortable
        list={items}
        setList={onChange}
        animation={200}
        className="ll-sortable"
        handle=".handle"
      >
        {items.map((item, index) => (
          <div key={item.id} className="row-item">
            <Button icon shape="underline" className="handle">
              <i className="fe-braille"></i>
            </Button>
            <LazyAutocomplete
              selection={isNoData(item) ? null : item}
              onChangeSelection={(selection) => handleChangeSelection(index, selection)}
              onChangeSearchValueCallback={handleChangeSearchValue}
              AutocompleteOptionCustom={AutocompleteFeatureOption}
            />
          </div>
        ))}
      </ReactSortable>
      <ul>
        {items.map((i) => (
          <li key={i.id}>{isNoData(i) ? "non défini" : i.properties.label}</li>
        ))}
      </ul>
      <div>
        <Button onClick={() => handleClick("unknown")} className="mr-2">
          select Unknown at index 0
        </Button>
        <Button onClick={() => handleClick("unselect")}>unselect at index 0</Button>
      </div>
    </>
  );
};
