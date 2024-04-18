import { Meta } from "@storybook/react";
import { useState } from "react";
import { handleChangeSearchValue } from "../_mocks/town-api";
import { AutocompleteGeoOption, createNodataFeature, isNoData, updateId } from "pentatrion-geo";
import {
  Button,
  GeoOption,
  LazyAutocomplete,
  NoDataOption,
  NotificationsProvider,
  Sortable,
  Step,
  Steps,
  getIndexLetter,
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
  const [locations, setLocations] = useState<(GeoOption | NoDataOption)[]>([
    createNodataFeature(),
    createNodataFeature(),
    createNodataFeature(),
  ]);

  function handleChangeSelection(index: number, selection: GeoOption | null) {
    const itemId = locations[index].id;

    const itemsCopy = [...locations];
    itemsCopy[index] = selection ? updateId(selection, itemId) : createNodataFeature(itemId);

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
      <Steps markerType="bullet" lineStyle="dotted" associateLineWithStep={false}>
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
              <LazyAutocomplete
                placeholder="Search a location..."
                icon={false}
                selection={isNoData(location) ? null : location}
                onChangeSelection={(selection) => handleChangeSelection(index, selection)}
                onChangeSearchValueCallback={handleChangeSearchValue}
                autocompleteOptionComponent={AutocompleteGeoOption}
              />
              {locations.length > 2 && (
                <Button icon variant="ghost" color="weak" onClick={() => handleRemoveItem(index)}>
                  <i className="fe-cancel"></i>
                </Button>
              )}
            </Step>
          ))}
        </Sortable>
      </Steps>
      <div className="ll-steps-extra mt-4">
        <Button variant="ghost" color="weak" onClick={handleAppendItem}>
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
      <div className="storybook-result">
        <div>Sélections :</div>
        <ul>
          {locations.map((i) => (
            <li key={i.id}>{isNoData(i) ? "non défini" : i.properties.label}</li>
          ))}
        </ul>
      </div>
    </>
  );
};
