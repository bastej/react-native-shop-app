import React from "react";

import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./store/reducers";

import ShopNavigator from "./navigation/ShopNavigator";

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}
