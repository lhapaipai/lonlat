import { Tabs } from "@lonlat/components/index";
import { useState } from "react";

export default {
  title: "Components/Tabs",
  component: Tabs,
};

export const Basic = () => {
  const tabs = [
    {
      title: "Bulbasaur",
      content: (
        <>
          <p>
            There is a plant seed on its back right from the day this Pokémon is born. The seed
            slowly grows larger. There is a plant seed on its back right from the day this Pokémon
            is born. The seed slowly grows larger. There is a plant seed on its back right from the
            day this Pokémon is born. The seed slowly grows larger.
          </p>
        </>
      ),
    },
    {
      title: "Charmander",
      content: (
        <>
          <p>
            It has a preference for hot things. When it rains, steam is said to spout from the tip
            of its tail. It has a preference for hot things. When it rains, steam is said to spout
            from the tip of its tail. It has a preference for hot things. When it rains, steam is
            said to spout from the tip of its tail.
          </p>
        </>
      ),
    },
    {
      title: "Squirtle",
      content: (
        <>
          <p>
            When it retracts its long neck into its shell, it squirts out water with vigorous force.
            When it retracts its long neck into its shell, it squirts out water with vigorous force.
            When it retracts its long neck into its shell, it squirts out water with vigorous force.
          </p>
        </>
      ),
    },
  ];
  const [index, setIndex] = useState(0);
  return (
    <div className="flex flex-column gap-2">
      <Tabs tabs={tabs} stickyTabs={true} value={index} onChange={setIndex} />
      <Tabs tabs={tabs} value={index} onChange={setIndex} />
      <Tabs tabs={tabs} fullWidth={true} value={index} onChange={setIndex} />
    </div>
  );
};
