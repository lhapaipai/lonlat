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

  function handleRemoveItem(index: number) {
    setDirection(direction.filter((_, idx) => idx !== index));
  }

  function handleAppendItem() {
    setDirection([...direction, createNodataFeature()]);
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
              icon={getIndexLetter(index)}
              status={index < direction.length - 1 ? "done" : "current"}
              markerClassName="handle"
              contentClassName="flex"
            >
              <LazyAutocomplete
                placeholder="Search a location..."
                icon={false}
                selection={isNoData(directionItem) ? null : directionItem}
                onChangeSelection={(selection) => handleChangeSelection(index, selection)}
                onChangeSearchValueCallback={handleChangeSearchValue}
                AutocompleteOptionCustom={AutocompleteGeoOption}
              />
              {direction.length > 2 && (
                <Button
                  icon
                  shape="underline"
                  onClick={() => handleRemoveItem(index)}
                  style={{
                    visibility: [0, direction.length - 1].includes(index) ? "hidden" : "visible",
                  }}
                >
                  <i className="fe-cancel"></i>
                </Button>
              )}
            </Step>
          ))}
          <li
            className="ll-step status-current align-start sortable-chosen"
            data-id="71946"
            draggable="true"
          >
            <div className="marker-container">
              <div className="marker active handle">+</div>
            </div>
            <div className="content flex">Ajouter un point</div>
          </li>
        </Sortable>
      </Steps>
      <div className="mt-4">
        <Button shape="ghost" color="weak" onClick={handleAppendItem}>
          <i className="fe-marker"></i>
          Ajouter un point
        </Button>
      </div>
      <ul>
        {direction.map((i) => (
          <li key={i.id}>{isNoData(i) ? "non défini" : i.properties.label}</li>
        ))}
      </ul>
    </>
  );
};
