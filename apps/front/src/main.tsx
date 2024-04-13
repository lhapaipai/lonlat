import ReactDOM from "react-dom/client";

import App from "./App.tsx";

import "pentatrion-design/styles/default.scss";
import "pentatrion-geo/src/default.scss";

import { Provider } from "react-redux";
import { Talkr } from "talkr";

import store from "./store/index.ts";
import { NotificationConsumer } from "pentatrion-design/redux";

import fr from "./i18n/fr.json";

/*
 <React.StrictMode>
    <App />
  </React.StrictMode>
*/

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <Talkr languages={{ fr }} defaultLanguage="fr">
      <NotificationConsumer>
        <App />
      </NotificationConsumer>
    </Talkr>
  </Provider>,
);
