import {
  SimpleAutocomplete,
  Autocomplete,
  NotificationsProvider,
  Option,
  Button,
} from "pentatrion-design";

import { Meta } from "@storybook/react";

import { useState } from "react";

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
    </div>
  );
};
