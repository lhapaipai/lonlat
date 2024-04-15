import { Meta } from "@storybook/react";
import { Button, ButtonGroup, Checkbox, Input, Select } from "pentatrion-design";
import "./GeoTabs.scss";
import { useState } from "react";

const meta = {
  title: "pentatrion-geo/GeoTabs",
  decorators: (Story) => (
    <div className="storybook-gap maplibregl-ctrl-tabs" style={{ width: "350px" }}>
      <Story />
    </div>
  ),
} satisfies Meta;
export default meta;

const profileOptions = [
  { value: "car", label: "Voiture" },
  { value: "pedestrian", label: "Piéton" },
];

const directionOptions = [
  { value: "departure", label: "Départ" },
  { value: "arrival", label: "Arrivée" },
];

export const Search = () => {
  const [profile, setProfile] = useState<string | null>("car");
  const [direction, setDirection] = useState<string | null>("departure");
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
        <div className="ll-quick-settings">
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
              <div className="ll-input variant-normal">
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
              <div>Coordonnées</div>
              <div>
                <span className="text-hint">lon/lat </span>
                6.497886, 46.091857
              </div>
            </div>
            <div className="setting">
              <div>Altitude</div>
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

          <div className="separator"></div>

          <div className="actions">
            <Button variant="light" color="weak" className="with-icon">
              <i className="fe-stopwatch"></i>
              isochrone
            </Button>
            <Button variant="light" color="weak" className="with-icon">
              <i className="fe-ruler"></i>
              isodistance
            </Button>
          </div>

          <div className="setting">
            <div>Temps</div>
            <Input suffix="min" defaultValue="0" />
          </div>
          <div className="setting">
            <div>Distance</div>
            <div>
              <Input suffix="km" />
            </div>
          </div>

          <div className="setting">
            <div>Mode de transport</div>
            <div>
              <Select
                variant="ghost"
                options={profileOptions}
                value={profile}
                onChange={(o) => {
                  setProfile(o.target.value);
                }}
              ></Select>
            </div>
          </div>
          <div className="setting">
            <div>Sens de parcours</div>
            <Select
              variant="ghost"
              options={directionOptions}
              value={direction}
              onChange={(o) => {
                setDirection(o.target.value);
              }}
            ></Select>
          </div>

          <div className="setting constraints">
            <div>Passages autorisés</div>
            <div className="ll-input-checkbox-container placement-block">
              <Checkbox checked={true}>
                <span>Péages</span>
              </Checkbox>
              <Checkbox checked={false}>
                <span>Ponts</span>
              </Checkbox>
              <Checkbox checked={false}>
                <span>Tunnels</span>
              </Checkbox>
            </div>
          </div>
          <div className="align-right">
            <Button>Calculer</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
