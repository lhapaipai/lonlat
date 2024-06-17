import ReactDOM from "react-dom/client";

import "maplibre-theme/dist/legacy.css";
import "maplibre-theme/dist/modern.css";
import "maplibre-theme/dist/classic.css";

import App from "./App.tsx";

import "../../main.css";
/*
 <React.StrictMode>
    <App />
  </React.StrictMode>
*/

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
