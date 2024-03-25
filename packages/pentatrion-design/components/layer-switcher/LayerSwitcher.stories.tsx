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
        <div className="type">
          <i className="fe-vector"></i>
        </div>
        <img className="preview" src="/thumbnail/ign-bd_topo-bati.png" />
        <div className="legend text-sm">IGN 1/25</div>
      </div>

      <div className="layer active">
        <div className="type">
          <i className="fe-vector"></i>
        </div>
        <img className="preview" src="/thumbnail/ign-isohypse-isohypse_monochrome_orange.png" />
        <div className="legend text-sm">Cadastre</div>
      </div>

      <div className="layer">
        <div className="type">
          <i className="fe-picture"></i>
        </div>
        <img className="preview" src="/thumbnail/ign-plan_ign-standard.png" />
        <div className="legend text-sm">IGN</div>
      </div>
    </div>
  );
};
