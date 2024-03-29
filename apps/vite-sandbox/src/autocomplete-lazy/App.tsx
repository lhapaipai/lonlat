import {
  AutocompleteFeatureOption,
  LazyAutocomplete,
  NotificationsProvider,
  Town,
  TownOption,
  prepareTownsResult,
} from "pentatrion-design/index";
import { useCallback, useState } from "react";

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
    }) as TownOption[];
  }, []);

  const [selection, setSelection] = useState<TownOption | null>(null);

  return (
    <>
      <div className="container">
        <NotificationsProvider>
          <LazyAutocomplete
            selection={selection}
            onChangeSelection={setSelection}
            onChangeSearchValue={handleChangeSearchValue}
            AutocompleteOptionCustom={AutocompleteFeatureOption}
          />
          <div>sélection : {selection && selection.label}</div>
        </NotificationsProvider>
      </div>
    </>
  );
}
