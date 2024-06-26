import {
  SimpleAutocomplete,
  Autocomplete,
  LazyAutocomplete,
} from "pentatrion-design/components/autocomplete";
import { NotificationsProvider } from "pentatrion-design/components/notification";
import { Button } from "pentatrion-design/components/button";

import { Meta, ReactRenderer } from "@storybook/react";
import { PartialStoryFn } from "@storybook/types";

import { useState } from "react";
import { handleChangeSearchValue, createUnknownFeature } from "../_mocks/town-api";
import { GeoPointOption } from "../../types.d";
import AutocompleteGeoOption from "./AutocompleteGeoOption";
import { featureOptions } from "./_featureOptionsMock";

const meta = {
  title: "pentatrion-geo/Components/Autocomplete",
  component: Autocomplete,
  decorators: [
    (Story) => (
      <NotificationsProvider>
        <Story />
      </NotificationsProvider>
    ),
  ] as ((story: PartialStoryFn<ReactRenderer, any>) => JSX.Element)[],
} satisfies Meta<typeof Autocomplete>;
export default meta;

export const SimpleFeature = () => {
  const [selection, setSelection] = useState<GeoPointOption | null>(null);

  function handleClick(action: "random" | "unknown" | "unselect") {
    switch (action) {
      case "random":
        setSelection(featureOptions[Math.floor(Math.random() * featureOptions.length)]);
        break;
      case "unknown":
        setSelection(createUnknownFeature());
        break;
      case "unselect":
        setSelection(null);
        break;
    }
  }

  return (
    <>
      <SimpleAutocomplete<GeoPointOption>
        options={featureOptions}
        selection={selection}
        onChangeSelection={setSelection}
        autocompleteOptionComponent={AutocompleteGeoOption}
      />
      <div>sélection : {selection && selection.properties.label}</div>
      <div>
        <Button onClick={() => handleClick("random")} className="mr-2">
          select random
        </Button>
        <Button onClick={() => handleClick("unknown")} className="mr-2">
          select Unknown
        </Button>
        <Button onClick={() => handleClick("unselect")}>unselect</Button>
      </div>
    </>
  );
};

export const Lazy = () => {
  const [selection, setSelection] = useState<GeoPointOption | null>(null);

  function handleClick(action: "random" | "unknown" | "unselect") {
    switch (action) {
      case "unknown":
        setSelection(createUnknownFeature());

        break;
      case "unselect":
        setSelection(null);
        break;
    }
  }

  return (
    <>
      <LazyAutocomplete<GeoPointOption>
        clearSearchButton={true}
        icon={true}
        selection={selection}
        onChangeSelection={setSelection}
        onChangeSearchValueCallback={handleChangeSearchValue}
        autocompleteOptionComponent={AutocompleteGeoOption}
      />
      <div>sélection : {selection && selection.properties.label}</div>

      <div>
        <Button onClick={() => handleClick("unknown")} className="mr-2">
          select Unknown
        </Button>
        <Button onClick={() => handleClick("unselect")}>unselect</Button>
      </div>
    </>
  );
};
