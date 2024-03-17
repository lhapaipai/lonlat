import { Town } from "pentatrion-design/types";
import { TownOption } from "../..";
import { prepareTownsResult } from "../..";

async function mockServerRequest() {
  await new Promise((resolve) => {
    setTimeout(resolve, Math.random() * 1000);
  });
  const res = await fetch(`/town-74.json`);
  const towns = (await res.json()) as Town[];
  return towns;
}

export const handleChangeSearchValue = async (searchValue: string) => {
  const towns = (await mockServerRequest()) as Town[];
  // const towns = (await customFetch(`http://localhost:6005/towns?q=${searchValue}`)) as Town[];
  return prepareTownsResult(towns, searchValue).map((town) => {
    return {
      ...town,
      label: town.context,
      value: town.insee.toString(),
    };
  }) as TownOption[];
};
