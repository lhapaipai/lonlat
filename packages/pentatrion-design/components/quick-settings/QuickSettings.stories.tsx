import { Meta } from "@storybook/react";
import { useState } from "react";
import { Button } from "../button";
import { Checkbox, Input } from "../input";
import { Select } from "../select";

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

// const quicksettingConfig = {
//   setting: "flex items-center justify-between first:text-gray-6 first:text-sm",
// };

export const Basic = () => {
  const [profile, setProfile] = useState<string | null>("car");
  const [direction, setDirection] = useState<string | null>("departure");
  return (
    <div className="ll-quick-settings grid grid-cols-1 gap-2">
      <div>
        <div className="p8n-setting">
          <div>Coordonnées</div>
          <div>
            <span className="text-gray-6 text-sm">lon/lat </span>
            6.497886, 46.091857
          </div>
        </div>
        <div className="p8n-setting">
          <div>Altitude</div>
          <div>
            500 <span className="text-gray-6 text-sm">m</span>
          </div>
        </div>
      </div>
      <div className="actions flex gap-2">
        <Button variant="text" color="gray" size="large" className="flex-1 min-w-0">
          <span className="flex-center w-full">
            <i className="fe-isochrone text-2xl"></i>
          </span>
        </Button>
        <Button variant="text" color="gray" size="large" className="flex-1 min-w-0">
          <span className="flex-center w-full">
            <i className="fe-route text-2xl"></i>
          </span>
        </Button>
        <Button variant="text" color="gray" size="large" className="flex-1 min-w-0">
          <span className="flex-center w-full">RAW</span>
        </Button>
      </div>

      <div className="actions flex gap-2">
        <Button variant="text" color="gray" size="large" className="flex-1 min-w-0">
          <span className="flex-center w-full">
            <i className="fe-stopwatch"></i>
            isochrone
          </span>
        </Button>
        <Button variant="text" color="gray" size="large" className="flex-1 min-w-0">
          <span className="flex-center w-full">
            <i className="fe-ruler"></i>
            isodistance
          </span>
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

      <div className="p8n-setting">
        <div>Temps</div>
        <Input suffix="min" defaultValue="0" />
      </div>
      <div className="p8n-setting">
        <div>Distance</div>
        <div>
          <Input suffix="km" />
        </div>
      </div>

      <div className="p8n-setting">
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
      <div className="p8n-setting">
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
      <div className="p8n-setting">
        <div>Passages autorisés</div>
        <div className="">
          <Checkbox checked={true}>Péages</Checkbox>
          <Checkbox checked={false}>Ponts</Checkbox>
        </div>
      </div>

      <div className="p8n-setting multiple">
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

      <div className="p8n-separator"></div>

      <div>
        <div className="p8n-setting">
          <div>Distance</div>
          <div>
            325 <span className="text-gray-6 text-sm">km</span>
          </div>
        </div>
        <div className="p8n-setting">
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
