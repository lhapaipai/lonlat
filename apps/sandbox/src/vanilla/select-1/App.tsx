import { useListItem } from "@floating-ui/react";
import { SelectValue } from "pentatrion-design/components/select/Select";
import { Select, useSelect } from "pentatrion-design/index";
import { useState } from "react";
import clsx from "clsx";
import { Option } from "./interface";
import { SelectSelectionProps } from "pentatrion-design/components/select/SelectSelection";

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

type StarOption = Option & {
  icon: string;
};

const stars: StarOption[] = [
  { value: "empty", label: "Empty", icon: "fe-star-empty" },
  { value: "half", label: "Half", icon: "fe-star-half" },
  { value: "fill", label: "Fill", icon: "fe-star" },
];

function SelectOptionComponent({ label, icon }: StarOption) {
  const { activeIndex, selectedIndex, getItemProps, handleSelect } =
    useSelect();

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

function SelectSelectionComponent({
  label,
  icon,
}: SelectSelectionProps<StarOption>) {
  return label ? (
    <span>
      <i className={icon}></i>
    </span>
  ) : (
    <span>?</span>
  );
}

export default function App() {
  const [value, setValue] = useState<SelectValue>(null);
  const [starValue, setStarValue] = useState<SelectValue>("fill");

  return (
    <>
      <div className="container">
        <div>
          <input />
        </div>
        <Select
          searchable={true}
          placeholder="Select your town..."
          options={options}
          value={value}
          onChange={(o) => {
            setValue(o.target.value);
          }}
        ></Select>{" "}
        <div>
          <input />
        </div>
        <Select
          showArrow={false}
          selectionClassName="ml-auto"
          width="37px"
          placement="bottom-end"
          searchable={false}
          options={stars}
          value={starValue}
          onChange={(o) => {
            setStarValue(o.target.value);
          }}
          selectSelectionComponent={SelectSelectionComponent}
          selectOptionComponent={SelectOptionComponent}
        ></Select>
      </div>
    </>
  );
}
