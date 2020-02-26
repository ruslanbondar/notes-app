import React from "react";
import "./index.scss";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n/index";

ReactDOM.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </Provider>,
  document.getElementById("root")
);
