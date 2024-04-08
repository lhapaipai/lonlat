import { Meta } from "@storybook/react";
import { useState } from "react";
import { handleChangeSearchValue } from "../_mocks/town-api";
import { AutocompleteGeoOption, createNodataFeature, isNoData, updateId } from "pentatrion-geo";
import {
  GeoOption,
  LazyAutocomplete,
  NoDataOption,
  NotificationsProvider,
  Sortable,
  Step,
  Steps,
} from "pentatrion-design";

const meta = {
  title: "pentatrion-geo/Components/Steps",
  component: Steps,
  decorators: [
    (Story) => (
      <NotificationsProvider>
        <Story />
      </NotificationsProvider>
    ),
  ],
} satisfies Meta<typeof Steps>;

export default meta;

export const WithAutocompleteSortable = () => {
  const [direction, setDirection] = useState<(GeoOption | NoDataOption)[]>([
    createNodataFeature(),
    createNodataFeature(),
    createNodataFeature(),
  ]);

  function handleChangeSelection(index: number, selection: GeoOption | null) {
    const itemId = direction[index].id;

    const itemsCopy = [...direction];
    itemsCopy[index] = selection ? updateId(selection, itemId) : createNodataFeature(itemId);

    setDirection(itemsCopy);
  }

  return (
    <>
      <Steps markerType="bullet" lineStyle="dotted" associateLineWithStep={false}>
        <Sortable
          list={direction}
          setList={setDirection}
          animation={200}
          className="ll-sortable"
          handle=".handle"
        >
          {direction.map((directionItem, index) => (
            <Step
              key={directionItem.id}
              icon={index + 1}
              status={index < direction.length - 1 ? "done" : "current"}
              markerClassName="handle"
            >
              <LazyAutocomplete<GeoOption>
                placeholder="Search a location..."
                icon={false}
                selection={isNoData(directionItem) ? null : directionItem}
                onChangeSelection={(selection) => handleChangeSelection(index, selection)}
                onChangeSearchValueCallback={handleChangeSearchValue}
                AutocompleteOptionCustom={AutocompleteGeoOption}
              />
            </Step>
          ))}
        </Sortable>
      </Steps>
      <ul>
        {direction.map((i) => (
          <li key={i.id}>{isNoData(i) ? "non défini" : i.properties.label}</li>
        ))}
      </ul>
    </>
  );
};
