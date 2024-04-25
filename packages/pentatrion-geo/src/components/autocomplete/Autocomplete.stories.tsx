import {
  SimpleAutocomplete,
  Autocomplete,
  LazyAutocomplete,
  NotificationsProvider,
  Button,
} from "pentatrion-design";

import { Meta } from "@storybook/react";

import { useState } from "react";
import { handleChangeSearchValue, createUnknownFeature } from "../_mocks/town-api";
import { GeoOption } from "~geo";
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
  ],
} satisfies Meta<typeof Autocomplete>;
export default meta;

export const SimpleFeature = () => {
  const [selection, setSelection] = useState<GeoOption | null>(null);

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
      <SimpleAutocomplete
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
  const [selection, setSelection] = useState<GeoOption | null>(null);

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
      <LazyAutocomplete<GeoOption>
        icon={false}
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
