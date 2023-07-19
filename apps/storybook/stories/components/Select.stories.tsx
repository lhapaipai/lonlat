import { Meta } from "@storybook/react";
import { Select, useSelect } from "@lonlat/shared";
import { useListItem } from "@floating-ui/react";
import { useState } from "react";
import { SelectSelectionProps } from "@lonlat/shared/components/select/SelectSelection";
import { SelectOptionProps } from "@lonlat/shared/components/select/SelectOption";
import cn from "classnames";
import { action } from "@storybook/addon-actions";

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
  { value: "alencon", label: "Alençon" },
  { value: "amiens", label: "Amiens" },
  { value: "angers", label: "Angers" },
  { value: "angouleme", label: "Angoulême" },
  { value: "annonay", label: "Annonay" },
  { value: "antibes", label: "Antibes" },
  { value: "arcachon", label: "Arcachon" },
  { value: "arles", label: "Arles" },
  { value: "arras", label: "Arras" },
  { value: "asnieres-sur-seine", label: "Asnières-sur-Seine" },
  { value: "aubagne", label: "Aubagne" },
  { value: "aubervilliers", label: "Aubervilliers" },
  { value: "aulnay-sous-bois", label: "Aulnay-sous-Bois" },
  { value: "avignon", label: "Avignon" },
  { value: "avranches", label: "Avranches" },
  { value: "avoriaz", label: "Avoriaz" },
  { value: "avray", label: "Avray" },
];

const stars = [
  { value: "empty", label: "Empty", icon: "fe-star-empty" },
  { value: "half", label: "Half", icon: "fe-star-half" },
  { value: "fill", label: "Fill", icon: "fe-star" },
];

export const Basic = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <Select
      searchable={false}
      placeholder="Select your town..."
      options={options}
      value={value}
      onChangeValue={(o) => {
        onChangeAction(o);
        setValue(o?.value ?? null);
      }}
    ></Select>
  );
};

export const NotRequired = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <Select
      required={false}
      placeholder="Select your town..."
      options={options}
      value={value}
      onChangeValue={(o) => {
        onChangeAction(o);
        setValue(o?.value ?? null);
      }}
    ></Select>
  );
};

export const Searchable = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <Select
      searchable={true}
      placeholder="Select your town..."
      options={options}
      value={value}
      onChangeValue={(o) => {
        onChangeAction(o);
        setValue(o?.value ?? null);
      }}
    ></Select>
  );
};

export const Multiple = () => {
  const [values, setValues] = useState<string[]>([]);
  return (
    <Select
      multiple={true}
      placeholder="Select your towns..."
      options={options}
      value={values}
      onChangeValue={(options) => {
        onChangeAction(options);
        setValues(options.map((o) => o.value));
      }}
    ></Select>
  );
};

function isDepartment(department: string | null): department is "38" | "73" | "74" {
  return department !== null && ["38", "73", "74"].indexOf(department) !== -1;
}

export const Dynamic = () => {
  const [town, setTown] = useState<string | null>(null);
  const [department, setDepartment] = useState<string | null>(null);
  return (
    <>
      <div className="flex flex-column gap-2">
        <Select
          required={false}
          placeholder="Select your department..."
          options={departments}
          value={department}
          onChangeValue={(o) => {
            onChangeAction(o);
            setDepartment(o?.value ?? null);
            setTown(null);
          }}
        ></Select>
        {isDepartment(department) && (
          <Select
            required={false}
            placeholder="Select your town..."
            options={townsByDepartment[department] ?? []}
            value={town}
            onChangeValue={(o) => {
              onChangeAction(o);
              setTown(o?.value ?? null);
            }}
          ></Select>
        )}
      </div>
    </>
  );
};

type StarOption = (typeof stars)[number];

function SelectOptionCustom({ option }: SelectOptionProps<StarOption>) {
  const { activeIndex, selectedIndexes, getItemProps, handleSelect } = useSelect();

  const { ref, index } = useListItem({ label: option.label });
  const isActive = activeIndex === index;
  const isSelected = selectedIndexes.indexOf(index) !== -1;

  return (
    <button
      className={cn("option", isSelected && "selected", isActive && "active")}
      ref={ref}
      role="option"
      aria-selected={isActive && isSelected}
      tabIndex={isActive ? 0 : -1}
      {...getItemProps({
        onClick: () => handleSelect(index),
      })}
    >
      <i className={option.icon}></i> {option.label}
    </button>
  );
}

function SelectSelectionCustom({ option }: SelectSelectionProps<StarOption>) {
  return option?.label ? (
    <span>
      <i className={option.icon}></i>
    </span>
  ) : (
    <span>?</span>
  );
}

export const CustomRenderer = () => {
  const [value, setValue] = useState<string | null>("fill");
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
        onChangeValue={(o) => {
          onChangeAction(o);
          setValue(o?.value ?? null);
        }}
        SelectSelectionCustom={SelectSelectionCustom}
        SelectOptionCustom={SelectOptionCustom}
      ></Select>
    </>
  );
};
