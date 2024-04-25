import { Tabs } from "~design";
import { useState } from "react";

export default {
  title: "Components/Tabs",
  component: Tabs,
};

export const Basic = () => {
  const tabs = [
    {
      id: "bulbasaur",
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
      id: "charmander",
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
      id: "squirtle",
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
  const [id, setId] = useState<string | number>("bulbasaur");
  return (
    <div className="flex flex-column gap-2">
      <Tabs tabs={tabs} stickyTabs={true} value={id} onChange={setId} />
      <Tabs tabs={tabs} value={id} onChange={setId} />
      <Tabs tabs={tabs} fullWidth={true} value={id} onChange={setId} />
    </div>
  );
};
