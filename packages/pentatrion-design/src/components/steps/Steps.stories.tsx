import { Meta } from "@storybook/react";
import Steps from "./Steps";
import Step from "./Step";
import { Input } from "../input";
import { useState } from "react";
import { ReactSortable } from "react-sortablejs";

const meta = {
  title: "Components/Steps",
  component: Steps,
} satisfies Meta<typeof Steps>;

export default meta;

export const Context = () => {
  return (
    <div className="grid grid-cols-1 gap-8">
      <Steps direction="horizontal" lineStyle="dotted">
        <Step icon="A" status="done">
          <h4 className="text-sm">Step 1</h4>
          <p className="text-xs">Some desc text</p>
        </Step>
        <Step icon="B" status="current">
          <h4 className="text-sm">Step 2</h4>
        </Step>
        <Step icon="C" status="todo">
          <h4 className="text-sm">Step 3</h4>
          <p className="text-xs">Another description</p>
        </Step>
        <Step icon="D" status="todo">
          <h4 className="text-sm">Step 4</h4>
        </Step>
      </Steps>
      <Steps direction="horizontal" markerType="bullet">
        <Step status="done">
          <h4 className="text-sm">Step 1</h4>
          <p className="text-xs">Some desc text</p>
        </Step>
        <Step status="current">
          <h4 className="text-sm">Step 2</h4>
        </Step>
        <Step status="todo">
          <h4 className="text-sm">Step 3</h4>
          <p className="text-xs">Another description</p>
        </Step>
        <Step status="todo">
          <h4 className="text-sm">Step 4</h4>
        </Step>
      </Steps>
      <Steps lineStyle="dotted">
        <Step icon="A" status="done">
          <h4 className="text-sm">Step 1</h4>
          <p className="text-xs">Some desc text</p>
        </Step>
        <Step icon="B" status="current" align="center">
          <Input defaultValue="Hello world" />
        </Step>
        <Step icon="C" status="todo">
          <h4 className="text-sm">Step 3</h4>
          <p className="text-xs">
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
          <h4 className="text-sm">Step 1</h4>
          <p className="text-xs">Some desc text</p>
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
