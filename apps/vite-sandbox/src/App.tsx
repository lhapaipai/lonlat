import { Select, Option } from "@lonlat/shared";
import "./App.scss";

import SelectOne from "./SelectOne";
import { useRef, useState } from "react";

type SelectOption = {
  label: string;
  value: string;
};

function App() {
  const [options, setOptions] = useState([
    { label: "a", value: "a" },
    { label: "baac", value: "baac" },
    { label: "baad", value: "baad" },
    { label: "bab", value: "bab" },
    { label: "c", value: "c" },
    { label: "d", value: "d" },
    { label: "e", value: "e" },
    { label: "f", value: "f" },
    { label: "g", value: "g" },
    { label: "h", value: "h" },
    { label: "i", value: "i" },
    { label: "j", value: "j" },
    { label: "k", value: "k" },
    { label: "l", value: "l" },
    { label: "m", value: "m" },
    { label: "n", value: "n" },
    { label: "o", value: "o" },
    { label: "p", value: "p" },
  ]);

  const [value, setValue] = useState<SelectOption | null>(options[1]);
  const [strValue, setStrValue] = useState<string | null>(null);

  return (
    <div id="my-app">
      <div style={{ height: "300px" }}></div>

      <button
        className="ll-button"
        onClick={() =>
          setOptions([
            { label: "a", value: "a" },
            { label: "b", value: "b" },
            { label: "c", value: "c" },
            { label: "d", value: "d" },
          ])
        }
      >
        Change
      </button>
      <h3>select with string</h3>
      <Select
        searchable={true}
        valueIsObject={false}
        value={strValue}
        options={options}
        onChange={(newValue) => {
          console.log("newValue", newValue);
          setStrValue(newValue);
        }}
      ></Select>
      <p>strValue: {strValue}</p>
      <div style={{ margin: "2rem 0" }}>
        <input type="text" />
      </div>
      <h3>select with object</h3>
      <Select
        valueIsObject={true}
        value={value}
        options={options}
        onChange={(newValue) => {
          console.log("newValue", newValue);
          setValue(newValue);
        }}
      ></Select>
      <p>value: {value?.label}</p>
      <div style={{ margin: "2rem 0" }}>
        <input type="text" />
      </div>

      <div style={{ height: "300px" }}></div>
    </div>
  );
}

export default App;
