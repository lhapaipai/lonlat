import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";

import "@lonlat/shared/styles/_vite-sandbox.scss";
/*
 <React.StrictMode>
    <App />
  </React.StrictMode>
*/
ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
