import { Meta } from "@storybook/react";

import { useState } from "react";
import LayerButton from "./LayerButton";
import { Button, ButtonGroup } from "pentatrion-design/components/button";

const meta = {
  title: "pentatrion-geo/LayerSwitcher",
  decorators: (Story) => (
    <div className="grid gap-8 grid-cols-1">
      <Story />
    </div>
  ),
} satisfies Meta;
export default meta;

const config = {
  separator: "w-1 flex-[0_0_0.25rem] my-4 bg-gray-1 rounded-full relative",
};

export const Basic = () => {
  const [val, setVal] = useState("one");
  return (
    <>
      <div className="bg-cover pt-20 pb-2 px-2 bg-[url('/bg-map.jpg')]">
        <div className="ll-layer-switcher flex overflow-x-auto flex-nowrap relative z-[1] select-none max-w-full pointer-events-auto gap-2 pt-0.5 pb-2 px-2">
          <ButtonGroup direction="vertical" className="filters">
            <Button
              className="text-sm flex-1"
              variant="light"
              color="gray"
              size="small"
              selected={val === "one"}
              onClick={() => setVal("one")}
            >
              France
            </Button>
            <Button
              className="text-sm flex-1"
              variant="light"
              color="gray"
              size="small"
              selected={val === "two"}
              onClick={() => setVal("two")}
            >
              Suisse
            </Button>
            <Button
              className="text-sm flex-1"
              variant="light"
              color="gray"
              size="small"
              selected={val === "three"}
              onClick={() => setVal("three")}
            >
              Monde
            </Button>
          </ButtonGroup>

          <LayerButton
            image="/assets/graphics/sprites/layers-2x.jpg"
            imagePositionY={0}
            label="IGN Scan"
          />
          <LayerButton
            image="/assets/graphics/sprites/layers-2x.jpg"
            imagePositionY={-54}
            label="IGN Scan 1/25"
          />
          <LayerButton
            image="/assets/graphics/sprites/layers-2x.jpg"
            imagePositionY={-108}
            label="Satellite"
          />
          <LayerButton
            image="/assets/graphics/sprites/layers-2x.jpg"
            imagePositionY={-162}
            label="Plan"
          />
          <div className={config.separator}></div>
          <LayerButton
            variant="optional"
            image="/assets/graphics/sprites/layers-2x.jpg"
            imagePositionY={-540}
            label="Relief"
          />
          <LayerButton
            variant="optional"
            image="/assets/graphics/sprites/layers-2x.jpg"
            imagePositionY={-810}
            label="Ombrage"
          />
          <LayerButton
            variant="optional"
            image="/assets/graphics/sprites/layers-2x.jpg"
            imagePositionY={-756}
            label="Lignes niveau"
          />
          <LayerButton
            variant="optional"
            image="/assets/graphics/sprites/layers-2x.jpg"
            imagePositionY={-702}
            label="Cadastre"
          />
          <LayerButton
            variant="optional"
            image="/assets/graphics/sprites/layers-2x.jpg"
            imagePositionY={-648}
            label="Libellés"
          />
          <LayerButton
            variant="optional"
            image="/assets/graphics/sprites/layers-2x.jpg"
            imagePositionY={-594}
            label="Frontières"
          />
          <div className={config.separator}></div>
          <LayerButton
            image="/assets/graphics/sprites/layers-2x.jpg"
            imagePositionY={-864}
            label="Street View"
          />
        </div>
      </div>
      <div className="bg-cover pt-20 pb-2 px-2 bg-[url('/bg-map.jpg')]">
        <div className="ll-layer-switcher flex overflow-x-auto flex-nowrap relative z-[1] select-none max-w-full pointer-events-auto gap-2 pt-0.5 pb-2 px-2">
          <LayerButton
            image="/assets/graphics/sprites/layers-2x.jpg"
            imagePositionY={-108}
            label="Satellite"
            variant="principal"
          />
        </div>
      </div>
    </>
  );
};
