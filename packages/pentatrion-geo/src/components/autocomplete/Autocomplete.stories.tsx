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
import { GeoOption } from "../../types";
import AutocompleteGeoOption from "./AutocompleteGeoOption";

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

const featureOptions: GeoOption[] = [
  {
    id: "74001",
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [6.7321620538, 46.2661080816],
    },
    properties: {
      id: "74001",
      name: "Abondance",
      context: "Haute-Savoie",
      label: "Abondance, Haute-Savoie",
      score: 1,
      type: "municipality",
      originalProperties: null,
    },
  },
  {
    id: "74002",
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [6.01581486858, 45.8156435779],
    },
    properties: {
      id: "74002",
      name: "Alby-sur-Chéran",
      context: "Haute-Savoie",
      label: "Alby-sur-Chéran, Haute-Savoie",
      score: 1,
      type: "municipality",
      originalProperties: null,
    },
  },
  {
    id: "74003",
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [6.23633769093, 45.8806920223],
    },
    properties: {
      id: "74003",
      name: "Alex",
      context: "Haute-Savoie",
      label: "Alex, Haute-Savoie",
      score: 1,
      type: "municipality",
      originalProperties: null,
    },
  },
  {
    id: "74004",
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [6.08634740225, 45.7588655872],
    },
    properties: {
      id: "74004",
      name: "Allèves",
      context: "Haute-Savoie",
      label: "Allèves, Haute-Savoie",
      score: 1,
      type: "municipality",
      originalProperties: null,
    },
  },
];

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
        AutocompleteOptionCustom={AutocompleteGeoOption}
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
        AutocompleteOptionCustom={AutocompleteGeoOption}
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

export const Search = () => {
  return (
    <div className="flex flex-column gap-2">
      <div className="ll-dialog ll-autocomplete-dialog" style={{ maxWidth: 375 }}>
        <div className="option search">
          <div className="prefix">
            <div className="icon flex-center">
              <i className="fe-housenumber"></i>
            </div>
            <div className="type">point</div>
          </div>
          <div className="content">
            <div>
              <mark>65 Impasse des perrières</mark>
            </div>
            <div className="context">Marignier, Haute-Savoie</div>
          </div>
        </div>
        <div className="option search">
          <div className="prefix">
            <div className="icon flex-center">
              <i className="fe-street"></i>
            </div>
            <div className="type">Rue</div>
          </div>

          <div className="content">
            <div>
              Rue <mark>Joseph Vallot</mark>
            </div>
            <div className="context">Chamonix-Mont-Blanc, Haute-Savoie</div>
          </div>
        </div>
        <div className="option search">
          <div className="prefix">
            <div className="icon flex-center">
              <i className="fe-locality"></i>
            </div>
            <div className="type">Lieu-dit</div>
          </div>

          <div className="content">
            <div>
              <mark>Chamonix Sud</mark>
            </div>
            <div className="context">Chamonix-Mont-Blanc, Haute-Savoie</div>
          </div>
        </div>
        <div className="option search">
          <div className="prefix">
            <div className="icon flex-center">
              <i className="fe-municipality"></i>
            </div>
            <div className="type">Ville</div>
          </div>

          <div className="content">
            <div>Chamonix-Mont-Blanc</div>
            <div className="context">Haute-Savoie</div>
          </div>
        </div>
      </div>
    </div>
  );
};
