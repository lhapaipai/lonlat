import { Meta } from "@storybook/react";

import "./LayerSwitcher.scss";
import { useState } from "react";
import { Button, ButtonGroup } from "pentatrion-design";
import clsx from "clsx";

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
  layerBtn:
    "flex-[0_0_calc(90px+0.5rem)] min-w-0 rounded-sm flex flex-col pt-1 px-1 bg-gray-0 relative text-gray-7",
};

export const Basic = () => {
  const [val, setVal] = useState("one");
  return (
    <>
      <div className="bg-cover pt-20 pb-2 px-2 bg-[url('/bg-map.jpg')]">
        <div className="ll-layer-switcher flex overflow-x-auto flex-nowrap relative z-[1] select-none w-fit max-w-full pointer-events-auto gap-2 pt-0.5 pb-2 px-2">
          <ButtonGroup direction="vertical" className="filters">
            <Button
              className="text-sm"
              variant="contained"
              color="gray"
              selected={val === "one"}
              onClick={() => setVal("one")}
            >
              France
            </Button>
            <Button
              className="text-sm"
              variant="contained"
              color="gray"
              selected={val === "two"}
              onClick={() => setVal("two")}
            >
              Suisse
            </Button>
            <Button
              className="text-sm"
              variant="contained"
              color="gray"
              selected={val === "three"}
              onClick={() => setVal("three")}
            >
              Monde
            </Button>
          </ButtonGroup>

          <button className={clsx("layer base", config.layerBtn)}>
            <div className="type">
              <i className="fe-raster"></i>
            </div>
            <img
              className="preview"
              src="/assets/graphics/sprites/layers-2x.jpg"
              style={{ objectPosition: `0px 0px` }}
            />
            <div className="legend text-sm">IGN Scan</div>
          </button>
          <Button size="custom" className="layer base">
            <div className="type">
              <i className="fe-raster"></i>
            </div>
            <img
              className="preview"
              src="/assets/graphics/sprites/layers-2x.jpg"
              style={{ objectPosition: `0px -54px` }}
            />
            <div className="legend text-sm">IGN Scan 1/25</div>
          </Button>
          <Button size="custom" className="layer base active">
            <div className="type">
              <i className="fe-raster"></i>
            </div>
            <img
              className="preview"
              src="/assets/graphics/sprites/layers-2x.jpg"
              style={{ objectPosition: `0px -108px` }}
            />
            <div className="legend text-sm">Satellite</div>
          </Button>
          <Button size="custom" className="layer base">
            <div className="type">
              <i className="fe-vector"></i>
            </div>
            <img
              className="preview"
              src="/assets/graphics/sprites/layers-2x.jpg"
              style={{ objectPosition: `0px -162px` }}
            />
            <div className="legend text-sm">Plan</div>
          </Button>

          <div className={config.separator}></div>

          <Button size="custom" className="layer optional active">
            <div className="type">
              <i className="fe-plus"></i>
            </div>
            <img
              className="preview"
              src="/assets/graphics/sprites/layers-2x.jpg"
              style={{ objectPosition: `0px -540px` }}
            />
            <div className="legend text-sm">Relief</div>
          </Button>
          <Button size="custom" className="layer optional">
            <div className="type">
              <i className="fe-plus"></i>
            </div>
            <img
              className="preview"
              src="/assets/graphics/sprites/layers-2x.jpg"
              style={{ objectPosition: `0px -810px` }}
            />
            <div className="legend text-sm">Ombrage</div>
          </Button>
          <Button size="custom" className="layer optional active">
            <div className="type">
              <i className="fe-plus"></i>
            </div>
            <img
              className="preview"
              src="/assets/graphics/sprites/layers-2x.jpg"
              style={{ objectPosition: `0px -756px` }}
            />
            <div className="legend text-sm">Lignes niveau</div>
          </Button>
          <Button size="custom" className="layer optional">
            <div className="type">
              <i className="fe-plus"></i>
            </div>
            <img
              className="preview"
              src="/assets/graphics/sprites/layers-2x.jpg"
              style={{ objectPosition: `0px -702px` }}
            />
            <div className="legend text-sm">Cadastre</div>
          </Button>
          <Button size="custom" className="layer optional">
            <div className="type">
              <i className="fe-plus"></i>
            </div>
            <img
              className="preview"
              src="/assets/graphics/sprites/layers-2x.jpg"
              style={{ objectPosition: `0px -648px` }}
            />
            <div className="legend text-sm">Libellés</div>
          </Button>
          <Button size="custom" className="layer optional">
            <div className="type">
              <i className="fe-plus"></i>
            </div>
            <img
              className="preview"
              src="/assets/graphics/sprites/layers-2x.jpg"
              style={{ objectPosition: `0px -594px` }}
            />
            <div className="legend text-sm">Frontières</div>
          </Button>

          <div className={config.separator}></div>
          <Button size="custom" className="layer base active">
            <img
              className="preview"
              src="/assets/graphics/sprites/layers-2x.jpg"
              style={{ objectPosition: `0px -864px` }}
            />
            <div className="legend text-sm">Street View</div>
          </Button>
        </div>
      </div>
      <div className="bg-cover pt-20 pb-2 px-2 bg-[url('/bg-map.jpg')]">
        <div className="ll-layer-switcher">
          <Button size="custom" className="layer base">
            <div className="type">
              <i className="fe-raster"></i>
            </div>
            <img
              className="preview"
              src="/assets/graphics/sprites/layers-2x.jpg"
              style={{ objectPosition: `0px -108px` }}
            />
            <div className="legend text-sm">Satellite</div>
          </Button>
        </div>
      </div>
    </>
  );
};
