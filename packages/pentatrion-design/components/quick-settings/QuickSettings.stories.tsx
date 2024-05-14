import { Meta } from "@storybook/react";
import { Button, Checkbox, Input, Select } from "~design";
import { useState } from "react";

const meta = {
  title: "Components/QuickSettings",
  decorators: (Story) => (
    <div className="grid grid-cols-1 gap-8" style={{ width: "350px" }}>
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

export const Basic = () => {
  const [profile, setProfile] = useState<string | null>("car");
  const [direction, setDirection] = useState<string | null>("departure");
  return (
    <div className="ll-quick-settings">
      <div>
        <div className="setting">
          <div>Coordonnées</div>
          <div>
            <span className="text-gray-6 text-sm">lon/lat </span>
            6.497886, 46.091857
          </div>
        </div>
        <div className="setting">
          <div>Altitude</div>
          <div>
            500 <span className="text-gray-6 text-sm">m</span>
          </div>
        </div>
      </div>
      <div className="actions">
        <Button variant="text" color="gray">
          <i className="fe-isochrone"></i>
        </Button>
        <Button variant="text" color="gray">
          <i className="fe-route"></i>
        </Button>
        <Button variant="text" color="gray">
          RAW
        </Button>
      </div>

      <div className="actions">
        <Button variant="text" color="gray" className="with-icon">
          <i className="fe-stopwatch"></i>
          isochrone
        </Button>
        <Button variant="text" color="gray" className="with-icon">
          <i className="fe-ruler"></i>
          isodistance
        </Button>
      </div>

      <div className="ll-steps-extra">
        <Button variant="ghost" color="gray">
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

        <Button icon variant="text" color="gray">
          <i className="fe-sliders"></i>
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
            setDirection(o.target.value);
          }}
        ></Select>
      </div>
      <div className="setting">
        <div>Passages autorisés</div>
        <div className="">
          <Checkbox checked={true}>Péages</Checkbox>
          <Checkbox checked={false}>Ponts</Checkbox>
        </div>
      </div>

      <div className="setting multiple">
        <div>Éviter</div>
        <div className="">
          <Checkbox checked={true}>
            <span>Sections à péage</span>
          </Checkbox>
          <Checkbox checked={false}>
            <span>Ponts</span>
          </Checkbox>
          <Checkbox checked={false}>
            <span>Tunnels</span>
          </Checkbox>
        </div>
      </div>

      <div className="separator"></div>

      <div>
        <div className="setting">
          <div>Distance</div>
          <div>
            325 <span className="text-gray-6 text-sm">km</span>
          </div>
        </div>
        <div className="setting">
          <div>Durée</div>
          <div>3h 25min</div>
        </div>
      </div>

      <div className="text-right">
        <Button>Calculer</Button>
      </div>
    </div>
  );
};
