import { Meta } from "@storybook/react";
import { useState } from "react";
import { ItemInterface, ReactSortable } from "react-sortablejs";
import { Button } from "../button";
import { Input } from "../input";
import { AutocompleteFeatureOption, LazyAutocomplete } from "../autocomplete";
import { createUnknownFeature, handleChangeSearchValue } from "../_mocks/town-api";
import { NotificationsProvider } from "../notification";
import { FeatureOption, NoDataFeature } from "../select";
import { createNodataFeature, isNoData, updateId } from "pentatrion-geo";
import { Sortable } from ".";

const meta = {
  title: "Components/Sortable",
  component: Sortable,
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
      <Sortable
        list={items}
        setList={setItems}
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
      </Sortable>
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
