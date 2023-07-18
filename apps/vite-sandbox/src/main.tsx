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

fetch("/03-communes-full.json")
  .then((res) => res.json())
  .then((towns) => {
    console.log(
      JSON.stringify(
        towns.map((t) => ({
          label: t.name,
          value: t.insee,
        })),
      ),
    );
  });
