import {
  SimpleAutocomplete,
  Autocomplete,
  LazyAutocomplete,
  customFetch,
  Town,
  AutocompleteGeocodageOption,
  prepareTownsResult,
  NotificationsProvider,
} from "@lonlat/shared";

import { Meta } from "@storybook/react";

import type { Option } from "@lonlat/shared/components/autocomplete/interface";
import { useCallback } from "react";

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
  return (
    <>
      <SimpleAutocomplete options={options} />
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function mockServerRequest() {
  await new Promise((resolve) => {
    setTimeout(resolve, Math.random() * 1000);
  });
  const res = await fetch(`/town-74.json`);
  const towns = (await res.json()) as Town[];
  return towns;
}

export const Lazy = () => {
  const handleChangeSearchValue = useCallback(async (searchValue: string) => {
    const towns = (await mockServerRequest()) as Town[];
    // const towns = (await customFetch(`http://localhost:6005/towns?q=${searchValue}`)) as Town[];
    return prepareTownsResult(towns, searchValue).map((town) => {
      return {
        ...town,
        label: town.context,
        value: town.insee.toString(),
      };
    });
  }, []);

  return (
    <>
      <LazyAutocomplete
        onChangeSearchValue={handleChangeSearchValue}
        AutocompleteOptionCustom={AutocompleteGeocodageOption}
      />
    </>
  );
};

export const Search = () => {
  return (
    <div className="flex flex-column gap-2">
      <div className="ll-dialog ll-autocomplete-dialog">
        <div className="box">
          <div className="option">Default state 1</div>
          <div className="option active">Active state 2 (keyboard navigation)</div>
          <div className="option">Default state 3</div>
          <div className="option selected">Selected state 4</div>
          <div className="option">Default state 5</div>
          <div className="option">Default state 6</div>
        </div>
      </div>
      <div className="ll-dialog ll-autocomplete-dialog">
        <div className="box">
          <div className="option search">
            <div className="icon flex-center">
              <i className="fe-town"></i>
            </div>
            <div className="content">
              <div>
                <em>Bonnevil</em>le
              </div>
              <div className="hint">Haute-Savoie, Auvergne Rhône-Alpes</div>
            </div>
          </div>
          <div className="option search">
            <div className="icon flex-center">
              <i className="fe-street"></i>
            </div>
            <div className="content">
              <div>Annemasse</div>
              <div className="hint">
                route de <em>Bonnevil</em>le, Haute-Savoie, Auvergne Rhône-Alpes
              </div>
            </div>
          </div>
          <div className="option search">
            <div className="icon flex-center">
              <i className="fe-street"></i>
            </div>
            <div className="content">
              <div>Chamblac</div>
              <div className="hint">
                route de <em>Bonnevil</em>le, Eure, Normandie
              </div>
            </div>
          </div>
          <div className="option search">
            <div className="icon flex-center">
              <i className="fe-municipality"></i>
            </div>
            <div className="content">
              <div>
                Cheptainville{" "}
                <span className="color-hint">
                  lieux-dit : <em>Bonnevil</em>le
                </span>
              </div>
              <div className="hint">Essonne, Île-de-France</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
