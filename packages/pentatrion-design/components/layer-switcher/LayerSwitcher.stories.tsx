import { Meta } from "@storybook/react";

import "./LayerSwitcher.scss";

const meta = {
  title: "LayerSwitcher",
} satisfies Meta;
export default meta;

export const Basic = () => {
  return (
    <div className="ll-layer-switcher">
      <div className="layer">
        <img
          style={{ objectPosition: "0px -57px" }}
          className="preview"
          src="/layer-preview-1x.jpg"
          srcSet="/layer-preview-1x.jpg 1x, /layer-preview-2x.jpg 2x"
        />
        <div className="legend text-sm">IGN 1/25</div>
      </div>

      <div className="layer active">
        <img
          style={{ objectPosition: "0px -561px" }}
          className="preview"
          src="/layer-preview-1x.jpg"
          srcSet="/layer-preview-1x.jpg 1x, /layer-preview-2x.jpg 2x"
        />
        <div className="legend text-sm">Cadastre</div>
      </div>

      <div className="layer">
        <img
          className="preview"
          src="/layer-preview-1x.jpg"
          srcSet="/layer-preview-1x.jpg 1x, /layer-preview-2x.jpg 2x"
        />
        <div className="legend text-sm">IGN</div>
      </div>
    </div>
  );
};
