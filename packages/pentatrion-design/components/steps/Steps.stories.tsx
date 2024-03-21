import { Meta } from "@storybook/react";
import Steps from "./Steps";
import Step from "./Step";
import { Input } from "../input";
import { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { AutocompleteFeatureOption, LazyAutocomplete } from "../autocomplete";
import { handleChangeSearchValue } from "../_mocks/town-api";
import { NotificationsProvider } from "../notification";
import { createNodataFeature, isNoData, updateId } from "pentatrion-geo";
import { FeatureOption, NoDataFeature } from "../select";
import { arrayEquals } from "pentatrion-design/lib";

const meta = {
  title: "Components/Steps",
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

export const Context = () => {
  return (
    <div className="storybook-gap">
      <Steps direction="horizontal" lineStyle="dotted">
        <Step icon="A" status="done">
          <h4 className="title">Step 1</h4>
          <p className="desc">Some desc text</p>
        </Step>
        <Step icon="B" status="current">
          <h4 className="title">Step 2</h4>
        </Step>
        <Step icon="C" status="todo">
          <h4 className="title">Step 3</h4>
          <p className="desc">Another description</p>
        </Step>
        <Step icon="D" status="todo">
          <h4 className="title">Step 4</h4>
        </Step>
      </Steps>
      <Steps direction="horizontal" markerType="bullet">
        <Step status="done">
          <h4 className="title">Step 1</h4>
          <p className="desc">Some desc text</p>
        </Step>
        <Step status="current">
          <h4 className="title">Step 2</h4>
        </Step>
        <Step status="todo">
          <h4 className="title">Step 3</h4>
          <p className="desc">Another description</p>
        </Step>
        <Step status="todo">
          <h4 className="title">Step 4</h4>
        </Step>
      </Steps>
      <Steps lineStyle="dotted">
        <Step icon="A" status="done">
          <h4 className="title">Step 1</h4>
          <p className="desc">Some desc text</p>
        </Step>
        <Step icon="B" status="current" align="center">
          <Input defaultValue="Hello world" />
        </Step>
        <Step icon="C" status="todo">
          <h4 className="title">Step 3</h4>
          <p className="desc">
            Some desc text
            <br />
            with much more content
          </p>
        </Step>
        <Step icon="D" status="todo">
          <Input defaultValue="Hello world" />
        </Step>
      </Steps>
      <Steps markerType="bullet" lineStyle="dotted">
        <Step status="done">
          <h4 className="title">Step 1</h4>
          <p className="desc">Some desc text</p>
        </Step>
        <Step icon="B" status="current">
          <Input defaultValue="Hello world" />
        </Step>
        <Step icon="C" status="todo">
          <Input defaultValue="Hello world" />
        </Step>
        <Step icon="D" status="todo">
          <Input defaultValue="Hello world" />
        </Step>
      </Steps>
    </div>
  );
};

interface Item {
  id: number;
  name: string;
}

const data: Item[] = [
  {
    id: 0,
    name: "Rare Wind",
  },
  {
    id: 1,
    name: "Saint Petersburg",
  },
  {
    id: 2,
    name: "Deep Blue",
  },
  {
    id: 3,
    name: "Ripe Malinka",
  },
  {
    id: 4,
    name: "Near Moon",
  },
];

export const WithSortable = () => {
  const [items, setItems] = useState(data);
  return (
    <Steps markerType="bullet" lineStyle="dotted" associateLineWithStep={false}>
      <ReactSortable
        list={items}
        setList={setItems}
        animation={200}
        handle=".handle"
        className="ll-sortable"
      >
        {items.map((item, index) => (
          <Step
            key={item.id}
            icon={index + 1}
            status={index < items.length - 1 ? "done" : "current"}
            markerClassName="handle"
          >
            <Input defaultValue={item.name} />
          </Step>
        ))}
      </ReactSortable>
    </Steps>
  );
};

export const WithAutocompleteSortable = () => {
  const [direction, setDirection] = useState<(FeatureOption | NoDataFeature)[]>([
    createNodataFeature(),
    createNodataFeature(),
    createNodataFeature(),
  ]);

  function handleChangeSelection(index: number, selection: FeatureOption | null) {
    const itemId = direction[index].id;

    const itemsCopy = [...direction];
    itemsCopy[index] = selection ? updateId(selection, itemId) : createNodataFeature(itemId);

    setDirection(itemsCopy);
  }

  function onChange(newList: (FeatureOption | NoDataFeature)[]) {
    if (
      !arrayEquals(
        direction.map((i) => i.id),
        newList.map((i) => i.id),
      )
    ) {
      console.log("setItems");
      setDirection(newList);
    }
  }

  return (
    <>
      <Steps markerType="bullet" lineStyle="dotted" associateLineWithStep={false}>
        <ReactSortable
          list={direction}
          setList={onChange}
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
              <LazyAutocomplete
                placeholder="Search a location..."
                icon={false}
                selection={isNoData(directionItem) ? null : directionItem}
                onChangeSelection={(selection) => handleChangeSelection(index, selection)}
                onChangeSearchValueCallback={handleChangeSearchValue}
                AutocompleteOptionCustom={AutocompleteFeatureOption}
              />
            </Step>
          ))}
        </ReactSortable>
      </Steps>
      <ul>
        {direction.map((i) => (
          <li key={i.id}>{isNoData(i) ? "non défini" : i.properties.label}</li>
        ))}
      </ul>
    </>
  );
};
