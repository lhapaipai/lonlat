import {
  SimpleAutocomplete,
  Autocomplete,
  LazyAutocomplete,
  AutocompleteFeatureOption,
  NotificationsProvider,
  Option,
  Button,
  FeatureOption,
} from "pentatrion-design";

import { Meta } from "@storybook/react";

import { useState } from "react";
import { handleChangeSearchValue, unknownFeature } from "../_mocks/town-api";

const meta = {
  title: "Components/Autocomplete",
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

const options: Option[] = [
  { value: "abbeville", label: "Abbeville" },
  { value: "agde", label: "Agde" },
  { value: "agen", label: "Agen" },
  { value: "aixenprovence", label: "Aix-en-Provence" },
  { value: "ajaccio", label: "Ajaccio" },
  { value: "albi", label: "Albi" },
  { value: "alencon", label: "Alençon" },
  { value: "amiens", label: "Amiens" },
  { value: "angers", label: "Angers" },
  { value: "angouleme", label: "Angoulême" },
  { value: "annonay", label: "Annonay" },
  { value: "antibes", label: "Antibes" },
  { value: "arcachon", label: "Arcachon" },
  { value: "arles", label: "Arles" },
  { value: "arras", label: "Arras" },
  { value: "asnieres-sur-seine", label: "Asnières-sur-Seine" },
  { value: "aubagne", label: "Aubagne" },
  { value: "aubervilliers", label: "Aubervilliers" },
  { value: "aulnay-sous-bois", label: "Aulnay-sous-Bois" },
  { value: "avignon", label: "Avignon" },
  { value: "avranches", label: "Avranches" },
  { value: "avoriaz", label: "Avoriaz" },
  { value: "avray", label: "Avray" },
];

const featureOptions: FeatureOption[] = [
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

export const Simple = () => {
  const [selection, setSelection] = useState<Option | null>(null);

  function handleClick(action: "random" | "unknown" | "unselect") {
    switch (action) {
      case "random":
        setSelection(options[Math.floor(Math.random() * options.length)]);
        break;
      case "unknown":
        setSelection({
          value: "unknown",
          label: "Unknown",
        });

        break;
      case "unselect":
        setSelection(null);
        break;
    }
  }

  return (
    <>
      <SimpleAutocomplete
        options={options}
        selection={selection}
        onChangeSelection={setSelection}
      />
      <div>sélection : {selection && selection.label}</div>
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

export const SimpleFeature = () => {
  const [selection, setSelection] = useState<FeatureOption | null>(null);

  function handleClick(action: "random" | "unknown" | "unselect") {
    switch (action) {
      case "random":
        setSelection(featureOptions[Math.floor(Math.random() * featureOptions.length)]);
        break;
      case "unknown":
        setSelection(unknownFeature);
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
        AutocompleteOptionCustom={AutocompleteFeatureOption}
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
  const [selection, setSelection] = useState<FeatureOption | null>(null);

  function handleClick(action: "random" | "unknown" | "unselect") {
    switch (action) {
      case "unknown":
        setSelection(unknownFeature);

        break;
      case "unselect":
        setSelection(null);
        break;
    }
  }

  return (
    <>
      <LazyAutocomplete
        icon={false}
        selection={selection}
        onChangeSelection={setSelection}
        onChangeSearchValueCallback={handleChangeSearchValue}
        AutocompleteOptionCustom={AutocompleteFeatureOption}
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
      <div className="ll-dialog ll-autocomplete-dialog">
        <div className="option">Default state 1</div>
        <div className="option active">Active state 2 (keyboard navigation)</div>
        <div className="option">Default state 3</div>
        <div className="option selected">Selected state 4</div>
        <div className="option">Default state 5</div>
        <div className="option">Default state 6</div>
      </div>
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
