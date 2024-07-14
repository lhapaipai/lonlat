import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import "./style/index.css";

import { Provider } from "react-redux";
import { Talkr } from "talkr";

import store from "./store/index.ts";
import { NotificationConsumer } from "pentatrion-design/redux";

import fr from "./i18n/fr.json";
import React from "react";

const strict = true;

const container = (
  <Provider store={store}>
    <Talkr languages={{ fr }} defaultLanguage="fr">
      <NotificationConsumer>
        <App />
      </NotificationConsumer>
    </Talkr>
  </Provider>
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  strict ? <React.StrictMode>{container}</React.StrictMode> : container,
);
