import { createRoot } from "react-dom/client";
import App from "./App";
import "./main.scss";

createRoot(document.getElementById("root")! as HTMLDivElement).render(<App />);
