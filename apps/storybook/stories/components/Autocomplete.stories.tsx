import { SimpleAutocomplete, Autocomplete, LazyAutocomplete } from "@lonlat/shared/index";
import { Meta, StoryObj } from "@storybook/react";

import type { Option } from "@lonlat/shared/components/autocomplete/interface.d.ts";
import { useCallback } from "react";

const meta = {
  title: "Components/Autocomplete",
  component: Autocomplete,
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

type Story = StoryObj<typeof meta>;

export const Basic = () => {
  return (
    <>
      <SimpleAutocomplete options={options} />
    </>
  );
};

interface Town {
  insee: number;
  code_postal: number;
  latitude: number;
  longitude: number;
  nom_commune: string;
  code_departement: number;
  nom_departement: string;
  code_region: number;
  nom_region: string;
  context: string;
}

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
    if (searchValue.trim() === "") return [] as Option[];
    const searchValueNormalized = searchValue.trim().toLowerCase();

    const towns = await mockServerRequest();
    return towns
      .filter((town) => town.context.toLowerCase().startsWith(searchValueNormalized))
      .map((town) => {
        return {
          label: town.context,
          value: town.insee.toString(),
        };
      });
  }, []);

  return (
    <>
      <LazyAutocomplete onChangeSearchValue={handleChangeSearchValue} />
    </>
  );
};
