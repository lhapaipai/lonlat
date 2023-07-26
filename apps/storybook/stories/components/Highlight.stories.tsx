import { Highlight, InputField, Toggle, parseHighlightIndices } from "@lonlat/shared";
import { Meta, StoryObj } from "@storybook/react";
import Fuse from "fuse.js";
import { ChangeEvent, ReactNode, useState } from "react";

const meta = {
  title: "Components/Highlight",
  component: Highlight,
} satisfies Meta<typeof Highlight>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic = () => {
  const zones = [
    {
      extract: "route de ",
      highlighted: false,
    },
    {
      extract: "Bonnev",
      highlighted: true,
    },
    {
      extract: "ille",
      highlighted: false,
    },
  ];
  return <Highlight fallback="route de Bonneville" zones={zones} />;
};

const list = ["Châtillon-sur-Cluses, Haute-Savoie, Auvergne-Rhône-Alpes"];

export const Playbook = () => {
  const [search, setSearch] = useState("clu");
  const [minLength, setMinLength] = useState(2);
  const [isCaseSensitive, setIsCaseSensitive] = useState(false);
  const [minMatchCharLength, setMinMatchCharLength] = useState(1);
  const [location, setLocation] = useState(0);
  const [threshold, setThreshold] = useState(0.6);
  const [distance, setDistance] = useState(100);
  const [ignoreLocation, setIgnoreLocation] = useState(false);

  const fuse = new Fuse(list, {
    includeScore: true,
    includeMatches: true,
    isCaseSensitive,
    minMatchCharLength,
    location,
    threshold,
    distance,
    ignoreLocation,
  });

  const result = fuse.search(search);
  let PreviewElement: ReactNode;
  if (result.length === 0 || !result[0].matches) {
    PreviewElement = <p>[Empty]</p>;
  } else {
    const { item, matches, score } = result[0];
    PreviewElement = (
      <>
        {matches.map(({ indices, value }, idx) => (
          <Highlight
            key={idx}
            fallback={item}
            zones={parseHighlightIndices(value, indices, minLength)}
          />
        ))}
        <div className="text-hint">score: {score}</div>
      </>
    );
  }

  console.log(result);

  return (
    <>
      <div className="storybook-preview">{PreviewElement}</div>
      <div className="two-cols">
        <InputField
          label="Search string"
          value={search}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
        />
        <InputField
          label="parseHighlightIndices minLength"
          value={minLength}
          type="number"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            e.target.validity.valid && setMinLength(e.target.valueAsNumber)
          }
        />
        <InputField
          label="fuse.js isCaseSensitive"
          help="Indicates whether comparisons should be case sensitive."
          checked={isCaseSensitive}
          as={Toggle}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setIsCaseSensitive(e.target.checked)}
        />
        <InputField
          label="fuse.js minMatchCharLength"
          type="number"
          value={minMatchCharLength}
          help="Only the matches whose length exceeds this value will be returned. (For instance, if you want to ignore single character matches in the result, set it to 2)."
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            e.target.validity.valid && setMinMatchCharLength(e.target.valueAsNumber)
          }
        />
        <InputField
          label="fuse.js location"
          type="number"
          value={location}
          help="Determines approximately where in the text is the pattern expected to be found."
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            e.target.validity.valid && setLocation(e.target.valueAsNumber)
          }
        />
        <InputField
          label="fuse.js threshold"
          type="number"
          value={threshold}
          step="0.1"
          help="At what point does the match algorithm give up. A threshold of 0.0 requires a perfect match (of both letters and location), a threshold of 1.0 would match anything."
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            e.target.validity.valid && setThreshold(e.target.valueAsNumber)
          }
        />
        <InputField
          label="fuse.js distance"
          type="number"
          help="Determines how close the match must be to the fuzzy location (specified by location). An exact letter match which is distance characters away from the fuzzy location would score as a complete mismatch. A distance of 0 requires the match be at the exact location specified. A distance of 1000 would require a perfect match to be within 800 characters of the location to be found using a threshold of 0.8."
          value={distance}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            e.target.validity.valid && setDistance(e.target.valueAsNumber)
          }
        />
        <InputField
          label="fuse.js ignoreLocation"
          as={Toggle}
          help="When true, search will ignore location and distance, so it won't matter where in the string the pattern appears."
          checked={ignoreLocation}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setIgnoreLocation(e.target.checked)}
        />
      </div>
    </>
  );
};
