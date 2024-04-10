import ReactDOM from "react-dom/client";

import App from "./App.tsx";

import "pentatrion-design/styles/default.scss";
import { Provider } from "react-redux";
/*
 <React.StrictMode>
    <App />
  </React.StrictMode>
*/

import store from "./store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
