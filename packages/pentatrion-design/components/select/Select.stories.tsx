import { Meta } from "@storybook/react";

import { useState } from "react";

import { action } from "@storybook/addon-actions";

import { SelectValue } from "./Select";
import { Select } from ".";
import {
  SelectOptionComponent,
  SelectSelectionComponent,
  StarOption,
  departments,
  options,
  townsByDepartment,
} from "./_fixtures";

const onChangeAction = action("onChange");

const meta = {
  title: "Components/Select",
  component: Select,
} satisfies Meta<typeof Select>;
export default meta;

export const Basic = () => {
  const [value, setValue] = useState<SelectValue>(null);
  return (
    <div className="grid gap-2 grid-cols-1">
      <Select
        searchable={false}
        placeholder="Select your town..."
        options={options}
        value={value}
        onChange={(o) => {
          onChangeAction(o);
          setValue(o.target.value);
        }}
      ></Select>
    </div>
  );
};

export const Variants = () => {
  const [value, setValue] = useState<SelectValue>(null);
  return (
    <div className="grid gap-2 grid-cols-1">
      <Select
        searchable={false}
        placeholder="Select your town..."
        options={options}
        value={value}
        onChange={(o) => {
          onChangeAction(o);
          setValue(o.target.value);
        }}
      ></Select>
      <Select
        variant="ghost"
        searchable={false}
        placeholder="Select your town..."
        options={options}
        value={value}
        onChange={(o) => {
          onChangeAction(o);
          setValue(o.target.value);
        }}
      ></Select>
    </div>
  );
};

export const NotRequired = () => {
  const [value, setValue] = useState<SelectValue>(null);
  return (
    <Select
      required={false}
      placeholder="Select your town..."
      options={options}
      value={value}
      onChange={(o) => {
        onChangeAction(o);
        setValue(o.target.value);
      }}
    ></Select>
  );
};

export const Searchable = () => {
  const [value, setValue] = useState<SelectValue>(null);
  return (
    <Select
      searchable={true}
      placeholder="Select your town..."
      options={options}
      value={value}
      onChange={(o) => {
        onChangeAction(o);
        setValue(o.target.value);
      }}
    ></Select>
  );
};

function isDepartment(department: number | string | null): department is "38" | "73" | "74" {
  return department !== null && ["38", "73", "74"].indexOf(department.toString()) !== -1;
}

export const Dynamic = () => {
  const [town, setTown] = useState<SelectValue>(null);
  const [department, setDepartment] = useState<SelectValue>(null);
  return (
    <>
      <div className="flex flex-col gap-2">
        <Select
          required={false}
          placeholder="Select your department..."
          options={departments}
          value={department}
          onChange={(o) => {
            onChangeAction(o);
            setDepartment(o.target.value);
            setTown(null);
          }}
        ></Select>
        {isDepartment(department) && (
          <Select
            required={false}
            placeholder="Select your town..."
            options={townsByDepartment[department] ?? []}
            value={town}
            onChange={(o) => {
              onChangeAction(o);
              setTown(o.target.value);
            }}
          ></Select>
        )}
      </div>
    </>
  );
};

const stars: StarOption[] = [
  { value: 0, label: "Empty", icon: "fe-star-empty" },
  { value: 1, label: "Half", icon: "fe-star-half" },
  { value: 2, label: "Fill", icon: "fe-star" },
];

export const CustomRenderer = () => {
  const [value, setValue] = useState<SelectValue>(1);
  return (
    <>
      <Select
        showArrow={false}
        selectionClassName="ml-auto"
        width="37px"
        placement="bottom-end"
        searchable={false}
        options={stars}
        value={value}
        onChange={(o) => {
          onChangeAction(o);
          setValue(o.target.value);
        }}
        selectSelectionComponent={SelectSelectionComponent}
        selectOptionComponent={SelectOptionComponent}
      ></Select>
    </>
  );
};
