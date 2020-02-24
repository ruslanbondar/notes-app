import React from "react";
import "./index.scss";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import App from "./App";
import reducer from "./store/reducers/notes";
import thunk from "redux-thunk";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n/index";

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </Provider>,
  document.getElementById("root")
);
