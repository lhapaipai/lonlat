import { Meta, ReactRenderer } from "@storybook/react";

import { useState } from "react";
import { NotificationsProvider } from "../notification";
import { Button } from "../button";
import { SimpleAutocomplete, Autocomplete } from ".";
import { Option } from "../select";
import { PartialStoryFn } from "@storybook/types";
import { options } from "./_fixtures";

const meta = {
  title: "Components/Autocomplete",
  component: Autocomplete,
  decorators: [
    (Story) => (
      <NotificationsProvider>
        <Story />
      </NotificationsProvider>
    ),
  ] as ((story: PartialStoryFn<ReactRenderer, any>) => JSX.Element)[],
} satisfies Meta<typeof Autocomplete>;
export default meta;

export const Simple = () => {
  const [selection, setSelection] = useState<Option | null>(null);

  function handleClick(action: "random" | "unknown" | "unselect") {
    switch (action) {
      case "random":
        setSelection(options[Math.floor(Math.random() * options.length)]);
        break;
      case "unknown":
        setSelection({
          value: "unknown",
          label: "Unknown",
        });
        break;
      case "unselect":
        setSelection(null);
        break;
    }
  }

  return (
    <>
      <SimpleAutocomplete
        options={options}
        selection={selection}
        onChangeSelection={setSelection}
      />
      <div>sélection : {selection && selection.label}</div>
      <div>
        <Button onClick={() => handleClick("random")} className="mr-2">
          select random
        </Button>
        <Button onClick={() => handleClick("unknown")} className="mr-2">
          select Unknown
        </Button>
        <Button onClick={() => handleClick("unselect")}>unselect</Button>
      </div>
    </>
  );
};
