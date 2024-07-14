import { createRoot } from "react-dom/client";
import App from "./App";
import "./main.css";
import "~/shared/tailwind.css";

createRoot(document.getElementById("root")! as HTMLDivElement).render(<App />);
