import { Meta } from "@storybook/react";
import { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { Button } from "../button";
import { Input } from "../input";
import { AutocompleteGeocodageOption, LazyAutocomplete, TownOption } from "../autocomplete";
import { handleChangeSearchValue } from "../_mocks/town-api";
import { NotificationsProvider } from "../notification";

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

export interface Item {
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

type Place = TownOption;

interface DirectionItem {
  id: string;
  place: Place | null;
}

function createDirectionItem(place: Place | null = null) {
  return {
    id: Math.floor(Math.random() * 100000).toString(),
    place,
  };
}

export const WithAutocomplete = () => {
  const [direction, setDirection] = useState<Array<DirectionItem>>([
    createDirectionItem(),
    createDirectionItem(),
  ]);

  function handleChangeSelection(index: number, selection: TownOption | null) {
    const directionCopy = [...direction];
    directionCopy[index].place = selection;
    setDirection(directionCopy);
  }

  return (
    <>
      <ReactSortable
        list={direction}
        setList={setDirection}
        animation={200}
        className="ll-sortable"
        handle=".handle"
      >
        {direction.map((directionItem, index) => (
          <div key={directionItem.id} className="row-item">
            <Button icon shape="underline" className="handle">
              <i className="fe-braille"></i>
            </Button>
            <LazyAutocomplete
              selection={directionItem.place}
              onChangeSelection={(selection) => handleChangeSelection(index, selection)}
              onChangeSearchValue={handleChangeSearchValue}
              AutocompleteOptionCustom={AutocompleteGeocodageOption}
            />
          </div>
        ))}
      </ReactSortable>
      <ul>
        {direction.map((i) => (
          <li key={i.id}>{i.place ? i.place.label : "non défini"}</li>
        ))}
      </ul>
    </>
  );
};
