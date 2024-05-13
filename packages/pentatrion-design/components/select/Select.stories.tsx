import { Meta } from "@storybook/react";
import { Select, useSelect } from "~design";
import { useListItem } from "@floating-ui/react";
import { useState } from "react";
import { SelectSelectionProps } from "~design/components/select/SelectSelection";
import clsx from "clsx";
import { action } from "@storybook/addon-actions";
import { SelectValue } from "./Select";
import { Option } from "./interface";

const onChangeAction = action("onChange");

const meta = {
  title: "Components/Select",
  component: Select,
} satisfies Meta<typeof Select>;
export default meta;

const departments = [
  { value: "38", label: "Isère" },
  { value: "74", label: "Haute-Savoie" },
  { value: "73", label: "Savoie" },
];

const townsByDepartment = {
  "38": [
    { value: "grenoble", label: "Grenoble" },
    { value: "meylan", label: "Meylan" },
    { value: "voreppe", label: "Voreppe" },
  ],
  "73": [
    { value: "chambery", label: "Chambéry" },
    { value: "albertville", label: "Albertville" },
  ],
  "74": [
    { value: "annecy", label: "Annecy" },
    { value: "annemasse", label: "Annemasse" },
    { value: "avoriaz", label: "Avoriaz" },
  ],
};

const options = [
  { value: "abbeville", label: "Abbeville" },
  { value: "agde", label: "Agde" },
  { value: "agen", label: "Agen" },
  { value: "aixenprovence", label: "Aix-en-Provence" },
  { value: "ajaccio", label: "Ajaccio" },
  { value: "albi", label: "Albi" },
  // { value: "alencon", label: "Alençon" },
  // { value: "amiens", label: "Amiens" },
  // { value: "angers", label: "Angers" },
  // { value: "angouleme", label: "Angoulême" },
  // { value: "annonay", label: "Annonay" },
  // { value: "antibes", label: "Antibes" },
  // { value: "arcachon", label: "Arcachon" },
  // { value: "arles", label: "Arles" },
  // { value: "arras", label: "Arras" },
  // { value: "asnieres-sur-seine", label: "Asnières-sur-Seine" },
  // { value: "aubagne", label: "Aubagne" },
  // { value: "aubervilliers", label: "Aubervilliers" },
  // { value: "aulnay-sous-bois", label: "Aulnay-sous-Bois" },
  // { value: "avignon", label: "Avignon" },
  // { value: "avranches", label: "Avranches" },
  // { value: "avoriaz", label: "Avoriaz" },
  // { value: "avray", label: "Avray" },
];

export const Basic = () => {
  const [value, setValue] = useState<SelectValue>(null);
  return (
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

// export const Multiple = () => {
//   const [values, setValues] = useState<string[]>([]);
//   return (
//     <Select
//       multiple={true}
//       placeholder="Select your towns..."
//       options={options}
//       value={values}
//       onChange={(options) => {
//         onChangeAction(options);
//         setValues(options.map((o) => o.value));
//       }}
//     ></Select>
//   );
// };

function isDepartment(department: string | null): department is "38" | "73" | "74" {
  return department !== null && ["38", "73", "74"].indexOf(department) !== -1;
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

type StarOption = Option & {
  icon: string;
};

const stars: StarOption[] = [
  { value: "empty", label: "Empty", icon: "fe-star-empty" },
  { value: "half", label: "Half", icon: "fe-star-half" },
  { value: "fill", label: "Fill", icon: "fe-star" },
];

function SelectOptionComponent({ icon, label }: StarOption) {
  const { activeIndex, selectedIndex, getItemProps, handleSelect } = useSelect();

  const { ref, index } = useListItem({ label });
  const isActive = activeIndex === index;
  const isSelected = selectedIndex === index;

  return (
    <button
      className={clsx("option", isSelected && "selected", isActive && "active")}
      ref={ref}
      role="option"
      aria-selected={isActive && isSelected}
      tabIndex={isActive ? 0 : -1}
      {...getItemProps({
        onClick: () => handleSelect(index),
      })}
    >
      <i className={icon}></i> {label}
    </button>
  );
}

function SelectSelectionComponent({ label, icon }: SelectSelectionProps<StarOption>) {
  return label ? (
    <span>
      <i className={icon}></i>
    </span>
  ) : (
    <span>?</span>
  );
}

export const CustomRenderer = () => {
  const [value, setValue] = useState<SelectValue>("fill");
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
