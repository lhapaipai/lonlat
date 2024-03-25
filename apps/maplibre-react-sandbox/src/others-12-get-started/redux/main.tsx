import ReactDOM from "react-dom/client";

import App from "./App.tsx";

import "pentatrion-design/styles/default.scss";
import { Provider } from "react-redux";

import store from "./store/index.ts";
/*
 <React.StrictMode>
    <App />
  </React.StrictMode>
*/

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
