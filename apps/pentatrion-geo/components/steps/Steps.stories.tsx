import { Meta } from "@storybook/react";
import { useState } from "react";
import { Step, Steps } from "pentatrion-design/components/steps";
import { getIndexLetter } from "pentatrion-design/lib";
import { Sortable } from "pentatrion-design/components/sortable";
import { LazyAutocomplete } from "pentatrion-design/components/autocomplete";
import { NotificationsProvider } from "pentatrion-design/components/notification";
import { Button } from "pentatrion-design/components/button";

import { NoDataOption } from "pentatrion-design/components/select";

import { handleChangeSearchValue } from "../_mocks/town-api";
import { GeoPointOption } from "../../types";

import { isNoData, updateId, createNodataFeature } from "../../geo-options";
import AutocompleteGeoOption from "../autocomplete/AutocompleteGeoOption";

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
  const [locations, setLocations] = useState<(GeoPointOption | NoDataOption)[]>(
    [createNodataFeature(), createNodataFeature(), createNodataFeature()],
  );

  function handleChangeSelection(
    index: number,
    selection: GeoPointOption | null,
  ) {
    const itemId = locations[index].id;

    const itemsCopy = [...locations];
    itemsCopy[index] = selection
      ? updateId(selection, itemId)
      : createNodataFeature(itemId);

    setLocations(itemsCopy);
  }

  function handleRemoveItem(index: number) {
    setLocations(locations.filter((_, idx) => idx !== index));
  }

  function handleAppendItem() {
    setLocations([...locations, createNodataFeature()]);
  }

  return (
    <>
      <Steps
        markerType="bullet"
        lineStyle="dotted"
        associateLineWithStep={false}
      >
        <Sortable
          list={locations}
          setList={setLocations}
          animation={200}
          className="ll-sortable"
          handle=".handle"
        >
          {locations.map((location, index) => (
            <Step
              key={location.id}
              icon={getIndexLetter(index)}
              status={index < locations.length - 1 ? "done" : "current"}
              markerClassName="handle"
              contentClassName="flex"
            >
              <LazyAutocomplete<GeoPointOption>
                placeholder="Search a location..."
                className="flex-1"
                icon={false}
                selection={isNoData(location) ? null : location}
                onChangeSelection={(selection) =>
                  handleChangeSelection(index, selection)
                }
                onChangeSearchValueCallback={handleChangeSearchValue}
                autocompleteOptionComponent={AutocompleteGeoOption}
              />
              {locations.length > 2 && (
                <Button
                  icon
                  variant="text"
                  className="ml-2"
                  color="gray"
                  onClick={() => handleRemoveItem(index)}
                >
                  <i className="fe-cancel"></i>
                </Button>
              )}
            </Step>
          ))}
        </Sortable>
      </Steps>
      <div className="ll-steps-extra mt-4">
        <Button variant="ghost" color="gray" onClick={handleAppendItem}>
          <span
            className="ll-marker"
            style={{ "--marker-color": "#c0c0c0", "--marker-size": "34px" }}
          >
            <span className="marker">
              <span className="ovale"></span>
              <i className="fe-plus"></i>
            </span>
            <span className="target"></span>
          </span>
          <span>Ajouter un point</span>
        </Button>
      </div>
      <div className="m-4 p-4 text-sm text-gray-6">
        <div>Sélections :</div>
        <ul>
          {locations.map((i) => (
            <li key={i.id}>
              {isNoData(i) ? "non défini" : i.properties.label}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
