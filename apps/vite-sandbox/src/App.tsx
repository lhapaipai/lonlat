import { Select } from "@lonlat/shared";
import "./App.scss";
import { useState } from "react";

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
function App() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <div id="my-app">
      <div style={{ height: "300px" }}></div>
      <Select
        required={false}
        searchable={true}
        placeholder="Select your town..."
        options={options}
        value={value}
        onChange={(o) => {
          console.log("onChange", o);
          setValue(o?.value ?? null);
        }}
      ></Select>

      <div style={{ height: "300px" }}></div>
    </div>
  );
}

export default App;
