export default {
  title: "Fonts/Icons",
};

import { useState } from "react";

import jsonFile from "./config.json";
import { Input } from "@lonlat/shared";
const fontelloConfig: FontelloConfig = jsonFile;

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
}

export const Icons = () => {
  const [search, setSearch] = useState("");

  const matchReg = new RegExp(search.toLowerCase().trim());
  const iconResults = fontelloConfig.glyphs.filter((glyph) => {
    return matchReg.test(glyph.css.toLowerCase().trim());
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
      <div className="storybook-icon-grid">
        {iconResults.map((glyph) => (
          <div className="" key={glyph.uid}>
            <div>
              <i className={`fe-${glyph.css}`}></i>
            </div>
            <pre>{`.fe-${glyph.css}`}</pre>
          </div>
        ))}
      </div>
    </>
  );
};
