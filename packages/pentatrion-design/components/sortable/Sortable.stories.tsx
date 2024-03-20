import { Meta } from "@storybook/react";
import { useState } from "react";
import { ItemInterface, ReactSortable } from "react-sortablejs";
import { Button } from "../button";
import { Input } from "../input";
import { AutocompleteFeatureOption, LazyAutocomplete } from "../autocomplete";
import { handleChangeSearchValue } from "../_mocks/town-api";
import { NotificationsProvider } from "../notification";
import { GeoFeature } from "pentatrion-geo";
import { GeoFeatureOption } from "../select";
import { SortableItem } from ".";

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

function createSortableItem(
  feature: GeoFeature | null = null,
): SortableItem<GeoFeatureOption | null> {
  return {
    id: Math.floor(Math.random() * 100000).toString(),
    data:
      feature === null
        ? null
        : {
            value: feature.properties.id,
            label: feature.properties.label,
            feature,
          },
  };
}

export const WithAutocomplete = () => {
  const [items, setItems] = useState<Array<SortableItem<GeoFeatureOption | null>>>([
    createSortableItem(),
    createSortableItem(),
  ]);

  function handleChangeSelection(index: number, selection: GeoFeatureOption | null) {
    const itemsCopy = [...items];
    itemsCopy[index].data = selection;
    setItems(itemsCopy);
  }

  return (
    <>
      <ReactSortable
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
              selection={item.data}
              onChangeSelection={(selection) => handleChangeSelection(index, selection)}
              onChangeSearchValueCallback={handleChangeSearchValue}
              AutocompleteOptionCustom={AutocompleteFeatureOption}
            />
          </div>
        ))}
      </ReactSortable>
      <ul>
        {items.map((i) => (
          <li key={i.id}>{i.data ? i.data.feature.properties.label : "non défini"}</li>
        ))}
      </ul>
    </>
  );
};
