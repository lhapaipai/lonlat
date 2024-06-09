export default {
  title: "Fonts/Icons",
};

import { useState } from "react";

import jsonFile from "../fontello.config.json";
import { Input } from "../components/input/Input";
const fontelloConfig = jsonFile as FontelloConfig;

interface FontelloConfig {
  name: string;
  css_prefix_text: string;
  css_use_suffix: boolean;
  hinting: boolean;
  units_per_em: number;
  ascent: number;
  glyphs: Glyph[];
}

interface Glyph {
  uid: string;
  css: string;
  code: number;
  src: string;
  selected?: boolean;
  svg?: {
    path: string;
    width: number;
  };
  search: string[];
}

export const Icons = () => {
  const [search, setSearch] = useState("");

  const matchReg = new RegExp(search.toLowerCase().trim());
  const iconResults = fontelloConfig.glyphs.filter((glyph) => {
    return (
      (glyph.selected === undefined || glyph.selected) &&
      matchReg.test(glyph.css.toLowerCase().trim())
    );
  });

  return (
    <>
      <div>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`Search ${fontelloConfig.glyphs.length} icons by name`}
        />
      </div>
      <div className="grid grid-cols-repeat-fill-160 gap-4 mt-4">
        {iconResults.map((glyph) => (
          <div
            className="border border-gray-2 rounded-2xl flex-center p-2 flex-col"
            key={glyph.uid}
          >
            <div>
              <i className={`fe-${glyph.css} text-5xl`}></i>
            </div>
            <pre className="text-xs">{`.fe-${glyph.css}`}</pre>
          </div>
        ))}
      </div>
    </>
  );
};
