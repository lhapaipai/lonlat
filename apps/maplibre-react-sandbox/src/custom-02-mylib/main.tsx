import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";

import "pentatrion-design/styles/default.scss";
/*
 <React.StrictMode>
    <App />
  </React.StrictMode>
*/
ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
