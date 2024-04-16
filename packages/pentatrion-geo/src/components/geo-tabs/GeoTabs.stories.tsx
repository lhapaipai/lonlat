import { Meta } from "@storybook/react";
import {
  Button,
  Checkbox,
  GeoOption,
  Input,
  LazyAutocomplete,
  NoDataOption,
  Select,
  Sortable,
  Step,
  Steps,
  getIndexLetter,
} from "pentatrion-design";
import "./GeoTabs.scss";
import { useState } from "react";
import { createNodataFeature, isNoData, updateId } from "pentatrion-geo/src/geo-options";
import { handleChangeSearchValue } from "../_mocks/town-api";
import AutocompleteGeoOption from "../autocomplete/AutocompleteGeoOption";

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

const optimizationOptions = [
  { value: "fastest", label: "Le plus rapide" },
  { value: "shortest", label: "Le plus court" },
];

export const Direction = () => {
  const [locations, setLocations] = useState<(GeoOption | NoDataOption)[]>([
    createNodataFeature(),
    createNodataFeature(),
    createNodataFeature(),
  ]);

  function handleChangeSelection(index: number, selection: GeoOption | null) {
    const itemId = locations[index].id;

    const itemsCopy = [...locations];
    itemsCopy[index] = selection ? updateId(selection, itemId) : createNodataFeature(itemId);

    setLocations(itemsCopy);
  }

  function handleRemoveItem(index: number) {
    setLocations(locations.filter((_, idx) => idx !== index));
  }

  function handleAppendItem() {
    setLocations([...locations, createNodataFeature()]);
  }

  const [optimization, setOptimization] = useState<string | null>("fastest");
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="ll-tabs rounded-sm">
      <ul role="tablist" className="tabs-list full-width">
        <li className="tabs-list-item">
          <button>
            <i className="fe-search"></i>
          </button>
        </li>
        <li className="tabs-list-item selected">
          <button>
            <i className="fe-route"></i>
          </button>
        </li>
      </ul>
      <div className="tabs-content">
        <div className="ll-quick-settings">
          <div className="actions">
            <Button variant="light" color="weak" className="with-icon">
              <i className="fe-car"></i>
              Voiture
            </Button>
            <Button variant="light" color="weak" className="with-icon">
              <i className="fe-person-walking"></i>
              Piéton
            </Button>
          </div>

          <Steps markerType="bullet" lineStyle="dotted" associateLineWithStep={false}>
            <Sortable
              list={locations}
              setList={setLocations}
              animation={200}
              className="ll-sortable"
              handle=".handle"
            >
              {locations.map((location, index) => (
                <Step
                  key={location.id}
                  icon={getIndexLetter(index)}
                  status={index < locations.length - 1 ? "done" : "current"}
                  markerClassName="handle"
                  contentClassName="flex"
                >
                  <LazyAutocomplete
                    placeholder="Search a location..."
                    icon={false}
                    selection={isNoData(location) ? null : location}
                    onChangeSelection={(selection) => handleChangeSelection(index, selection)}
                    onChangeSearchValueCallback={handleChangeSearchValue}
                    AutocompleteOptionCustom={AutocompleteGeoOption}
                  />
                  {locations.length > 2 && (
                    <Button
                      icon
                      variant="ghost"
                      color="weak"
                      onClick={() => handleRemoveItem(index)}
                    >
                      <i className="fe-cancel"></i>
                    </Button>
                  )}
                </Step>
              ))}
            </Sortable>
          </Steps>
          <div className="ll-steps-extra">
            <Button variant="ghost" color="weak" onClick={handleAppendItem}>
              <span
                className="ll-marker"
                style={{ "--marker-color": "#c0c0c0", "--marker-size": "34px" }}
              >
                <span className="marker">
                  <span className="ovale"></span>
                  <i className="fe-plus"></i>
                </span>
                <span className="target"></span>
              </span>
              <span>Ajouter un point</span>
            </Button>

            <Button icon variant="text" color="weak" onClick={() => setShowSettings((s) => !s)}>
              <i className="fe-settings"></i>
            </Button>
          </div>

          {showSettings && (
            <>
              <div className="setting">
                <div>Mode de calcul</div>
                <div>
                  <Select
                    variant="ghost"
                    options={optimizationOptions}
                    value={optimization}
                    onChange={(o) => {
                      // @ts-ignore
                      setOptimization(o.target.value);
                    }}
                  ></Select>
                </div>
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
            </>
          )}

          <div className="separator"></div>

          <div>
            <div className="setting">
              <div>Distance</div>
              <div>
                325 <span className="text-hint">km</span>
              </div>
            </div>
            <div className="setting">
              <div>Durée</div>
              <div>3h 25min</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Search = () => {
  const [profile, setProfile] = useState<string | null>("car");
  const [direction, setLocations] = useState<string | null>("departure");
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
                  // @ts-ignore
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
                // @ts-ignore
                setLocations(o.target.value);
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
