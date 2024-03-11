import {
  Autocomplete,
  AutocompleteGeocodageOption,
  Button,
  Input,
  LazyAutocomplete,
  NotificationsProvider,
  Select,
  Town,
  prepareTownsResult,
} from "@lonlat/shared/index";
import { useCallback, useState } from "react";
import SelectLegacy from "@lonlat/shared/components/select/SelectLegacy";
import { Option } from "@lonlat/shared/components/select/interface";

const options = [
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function mockServerRequest() {
  await new Promise((resolve) => {
    setTimeout(resolve, Math.random() * 1000);
  });
  const res = await fetch(`/town-74.json`);
  const towns = (await res.json()) as Town[];
  return towns;
}

export default function App() {
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
      <div className="container">
        <NotificationsProvider>
          <LazyAutocomplete
            onChangeSearchValue={handleChangeSearchValue}
            AutocompleteOptionCustom={AutocompleteGeocodageOption}
          />
        </NotificationsProvider>
      </div>
    </>
  );
}
