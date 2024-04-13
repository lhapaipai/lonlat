import { Meta } from "@storybook/react";
import { Button } from "pentatrion-design";
import "./GeoTabs.scss";

const meta = {
  title: "pentatrion-geo/GeoTabs",
  decorators: (Story) => (
    <div className="storybook-gap maplibregl-ctrl-tabs" style={{ width: "400px" }}>
      <Story />
    </div>
  ),
} satisfies Meta;
export default meta;

export const Search = () => {
  return (
    <div className="ll-tabs rounded-sm">
      <ul role="tablist" className="tabs-list full-width">
        <li className="tabs-list-item selected">
          <button>
            <i className="fe-search"></i>
          </button>
        </li>
        <li className="tabs-list-item">
          <button>
            <i className="fe-route"></i>
          </button>
        </li>
      </ul>
      <div className="tabs-content">
        <div>
          <div className="search-selector">
            <Button icon variant="ghost" color="weak" selected>
              <i className="fe-locality"></i>
            </Button>
            <Button icon variant="ghost" color="weak">
              <i className="fe-globe"></i>
            </Button>
            <Button icon variant="ghost" color="weak">
              <i className="fe-summit"></i>
            </Button>
          </div>
          <div className="ll-autocomplete">
            <div className="ll-input">
              <input
                className="input-element"
                type="search"
                placeholder="Search..."
                aria-autocomplete="list"
                aria-expanded="false"
                aria-haspopup="listbox"
                role="combobox"
                value="65 Impasse des perrières, Marignier"
              />
              <div className="flex-center adornment suffix"></div>
            </div>
          </div>
        </div>
        <div>
          <div className="setting">
            <div className="text-hint">Coordonnées</div>
            <div>
              <span className="text-hint">lon/lat </span>
              6.497886, 46.091857
            </div>
          </div>
          <div className="setting">
            <div className="text-hint">Altitude</div>
            <div>
              500 <span className="text-hint">m</span>
            </div>
          </div>
        </div>
        <div className="actions">
          <Button variant="light" color="weak">
            <i className="fe-isochrone"></i>
          </Button>
          <Button variant="light" color="weak">
            <i className="fe-route"></i>
          </Button>
          <Button variant="light" color="weak">
            RAW
          </Button>
        </div>
      </div>
    </div>
  );
};
