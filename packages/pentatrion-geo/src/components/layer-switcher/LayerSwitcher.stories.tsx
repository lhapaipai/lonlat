import { Meta } from "@storybook/react";

import "./LayerSwitcher.scss";
import { useState } from "react";
import { Button, ButtonGroup } from "pentatrion-design";

const meta = {
  title: "pentatrion-geo/LayerSwitcher",
  decorators: (Story) => (
    <div className="storybook-gap">
      <Story />
    </div>
  ),
} satisfies Meta;
export default meta;

export const Basic = () => {
  const [val, setVal] = useState("one");
  return (
    <>
      <div className="storybook-map-bg" style={{ padding: "5rem .5rem .5rem .5rem" }}>
        <div className="ll-layer-switcher">
          <ButtonGroup direction="vertical" className="filters">
            <Button
              className="text-sm"
              variant="text"
              color="weak"
              selected={val === "one"}
              onClick={() => setVal("one")}
            >
              France
            </Button>
            <Button
              className="text-sm"
              variant="text"
              color="weak"
              selected={val === "two"}
              onClick={() => setVal("two")}
            >
              Suisse
            </Button>
            <Button
              className="text-sm"
              variant="text"
              color="weak"
              selected={val === "three"}
              onClick={() => setVal("three")}
            >
              Monde
            </Button>
          </ButtonGroup>

          <div className="layer base">
            <div className="type">
              <i className="fe-raster"></i>
            </div>
            <img
              className="preview"
              src="/graphics/sprites/layers-2x.jpg"
              style={{ objectPosition: `0px 0px` }}
            />
            <div className="legend text-sm">IGN Scan</div>
          </div>
          <div className="layer base">
            <div className="type">
              <i className="fe-raster"></i>
            </div>
            <img
              className="preview"
              src="/graphics/sprites/layers-2x.jpg"
              style={{ objectPosition: `0px -54px` }}
            />
            <div className="legend text-sm">IGN Scan 1/25</div>
          </div>
          <div className="layer base active">
            <div className="type">
              <i className="fe-raster"></i>
            </div>
            <img
              className="preview"
              src="/graphics/sprites/layers-2x.jpg"
              style={{ objectPosition: `0px -108px` }}
            />
            <div className="legend text-sm">Satellite</div>
          </div>
          <div className="layer base">
            <div className="type">
              <i className="fe-vector"></i>
            </div>
            <img
              className="preview"
              src="/graphics/sprites/layers-2x.jpg"
              style={{ objectPosition: `0px -162px` }}
            />
            <div className="legend text-sm">Plan</div>
          </div>

          <div className="separator"></div>

          <div className="layer optional active">
            <div className="type">
              <i className="fe-plus-circled"></i>
            </div>
            <img
              className="preview"
              src="/graphics/sprites/layers-2x.jpg"
              style={{ objectPosition: `0px -540px` }}
            />
            <div className="legend text-sm">Relief</div>
          </div>
          <div className="layer optional">
            <div className="type">
              <i className="fe-plus-circled"></i>
            </div>
            <img
              className="preview"
              src="/graphics/sprites/layers-2x.jpg"
              style={{ objectPosition: `0px -810px` }}
            />
            <div className="legend text-sm">Ombrage</div>
          </div>
          <div className="layer optional active">
            <div className="type">
              <i className="fe-plus-circled"></i>
            </div>
            <img
              className="preview"
              src="/graphics/sprites/layers-2x.jpg"
              style={{ objectPosition: `0px -756px` }}
            />
            <div className="legend text-sm">Lignes niveau</div>
          </div>
          <div className="layer optional">
            <div className="type">
              <i className="fe-plus-circled"></i>
            </div>
            <img
              className="preview"
              src="/graphics/sprites/layers-2x.jpg"
              style={{ objectPosition: `0px -702px` }}
            />
            <div className="legend text-sm">Cadastre</div>
          </div>
          <div className="layer optional">
            <div className="type">
              <i className="fe-plus-circled"></i>
            </div>
            <img
              className="preview"
              src="/graphics/sprites/layers-2x.jpg"
              style={{ objectPosition: `0px -648px` }}
            />
            <div className="legend text-sm">Libellés</div>
          </div>
          <div className="layer optional">
            <div className="type">
              <i className="fe-plus-circled"></i>
            </div>
            <img
              className="preview"
              src="/graphics/sprites/layers-2x.jpg"
              style={{ objectPosition: `0px -594px` }}
            />
            <div className="legend text-sm">Frontières</div>
          </div>

          <div className="separator"></div>
          <div className="layer base active">
            <img
              className="preview"
              src="/graphics/sprites/layers-2x.jpg"
              style={{ objectPosition: `0px -864px` }}
            />
            <div className="legend text-sm">Street View</div>
          </div>
        </div>
      </div>
      <div className="storybook-map-bg" style={{ padding: "5rem .5rem .5rem .5rem" }}>
        <div className="ll-layer-switcher">
          <div className="layer base">
            <div className="type">
              <i className="fe-raster"></i>
            </div>
            <img
              className="preview"
              src="/graphics/sprites/layers-2x.jpg"
              style={{ objectPosition: `0px -108px` }}
            />
            <div className="legend text-sm">Satellite</div>
          </div>
        </div>
      </div>
    </>
  );
};