import { Meta } from "@storybook/react";
import { Select } from "@lonlat/shared";
import { Props } from "@lonlat/shared/components/select/Select";
import { useState } from "react";
const meta = {
  title: "Components/Select",
  component: Select,
} satisfies Meta<typeof Select>;
export default meta;

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
  { value: "annecy", label: "Annecy" },
  { value: "annemasse", label: "Annemasse" },
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

const SelectWithState = (props: Pick<Props, "placeholder" | "searchable" | "options">) => {
  const [value, setValue] = useState<string | null>(null);
  return <Select {...props} value={value} onChange={(o) => setValue(o?.value ?? null)}></Select>;
};

export const Basic = {
  render: ({ placeholder, searchable }: Pick<Props, "placeholder" | "searchable">) => {
    return (
      <SelectWithState
        searchable={searchable}
        placeholder={placeholder}
        options={options}
      ></SelectWithState>
    );
  },
  args: {
    placeholder: "Select your town...",
    searchable: false,
  },
};

export const Context = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <Select options={options} value={value} onChange={(o) => setValue(o?.value ?? null)}></Select>
  );
};
