import { IGNAddressResponse, parseIgnAddressCollection } from "pentatrion-geo";

export const handleChangeSearchValue = async (searchValue: string) => {
  const collection = (await fetch(`/data/ign-search.geojson`).then((res) =>
    res.json(),
  )) as IGNAddressResponse;

  const options = parseIgnAddressCollection(collection);
  console.log(searchValue, options);
  return options;
};
