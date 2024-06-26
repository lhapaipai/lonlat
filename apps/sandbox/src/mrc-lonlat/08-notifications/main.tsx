import ReactDOM from "react-dom/client";

import App from "./App.tsx";

import "~/shared/tailwind.css";
import { Provider } from "react-redux";
/*
 <React.StrictMode>
    <App />
  </React.StrictMode>
*/

import store from "./store";
import { NotificationConsumer } from "pentatrion-design/redux";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <NotificationConsumer>
      <App />
    </NotificationConsumer>
  </Provider>,
);
