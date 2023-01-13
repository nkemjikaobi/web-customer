/* eslint-disable no-undef */
// New Relic setup
if (
  process.env.REACT_APP_NEW_RELIC_APP_NAME !== undefined &&
  process.env.REACT_APP_NEW_RELIC_LICENSE_KEY !== undefined
) {
  try {
    require("newrelic");
  } catch (e) {}
}

import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.scss";
import Routes from "Routes/routes";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import "./Firebase/Config";
import { Provider } from "react-redux";
import store from "Http/Redux/Index";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";

import ScrollToTop from "libs/utils/ScrollToTop";

const renderMethod = hydrate;

const persistor = persistStore(store);

renderMethod(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <ScrollToTop />

          <Routes />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
