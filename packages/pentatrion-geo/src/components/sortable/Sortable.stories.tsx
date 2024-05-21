import { Meta } from "@storybook/react";
import { useState } from "react";
import { createUnknownFeature, handleChangeSearchValue } from "../_mocks/town-api";
import {
  Button,
  LazyAutocomplete,
  NoDataOption,
  NotificationsProvider,
  Sortable,
} from "pentatrion-design";

import { GeoPointOption } from "../../types";

import { isNoData, updateId, createNodataFeature } from "../../geo-options";
import AutocompleteGeoOption from "../autocomplete/AutocompleteGeoOption";

const meta = {
  title: "pentatrion-geo/Components/Sortable",
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

const twClasses = {
  item: "row-item rounded-2xl p-2 flex items-center [&.sortable-chosen]:shadow",
};

export const WithAutocomplete = () => {
  const [items, setItems] = useState<(GeoPointOption | NoDataOption)[]>([
    createNodataFeature(),
    createNodataFeature(),
  ]);

  function handleChangeSelection(index: number, selection: GeoPointOption | null) {
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
      <Sortable list={items} setList={setItems} animation={200} handle=".handle">
        {items.map((item, index) => (
          <div key={item.id} className={twClasses.item}>
            <Button icon variant="text" color="gray" className="handle cursor-row-resize mr-2">
              <i className="fe-braille"></i>
            </Button>
            <LazyAutocomplete<GeoPointOption>
              className="flex-1"
              selection={isNoData(item) ? null : item}
              onChangeSelection={(selection) => handleChangeSelection(index, selection)}
              onChangeSearchValueCallback={handleChangeSearchValue}
              autocompleteOptionComponent={AutocompleteGeoOption}
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
