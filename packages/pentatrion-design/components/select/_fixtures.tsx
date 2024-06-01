import { useListItem } from "@floating-ui/react";
import clsx from "clsx";
import { useSelect, SelectSelectionProps, Option } from ".";

export const departments = [
  { value: "38", label: "Isère" },
  { value: "74", label: "Haute-Savoie" },
  { value: "73", label: "Savoie" },
];

export const townsByDepartment = {
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

export const options = [
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

export function SelectOptionComponent({ icon, label }: StarOption) {
  const { activeIndex, selectedIndex, getItemProps, handleSelect } = useSelect();

  const { ref, index } = useListItem({ label });
  const isActive = activeIndex === index;
  const isSelected = selectedIndex === index;

  return (
    <button
      className={clsx("option", isSelected ? "bg-gray-2" : isActive && "bg-gray-1")}
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

export type StarOption = Option & {
  icon: string;
};

export function SelectSelectionComponent({ label, icon }: SelectSelectionProps<StarOption>) {
  return label ? (
    <span>
      <i className={icon}></i>
    </span>
  ) : (
    <span>?</span>
  );
}
