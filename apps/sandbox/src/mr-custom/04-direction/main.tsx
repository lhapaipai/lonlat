import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import "../../main.css";

import { Provider } from "react-redux";

import store from "./store/index.ts";
import { NotificationConsumer } from "pentatrion-design/redux";

/*
 <React.StrictMode>
    <App />
  </React.StrictMode>
*/

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <NotificationConsumer>
      <App />
    </NotificationConsumer>
  </Provider>,
);
