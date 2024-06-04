import ReactDOM from "react-dom/client";

import App from "./App.tsx";

import "../../main.css";
import React from "react";

const strict = true;

ReactDOM.createRoot(document.getElementById("root")!).render(
  strict ? (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  ) : (
    <App />
  ),
);
