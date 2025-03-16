import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import MapComponent from "./MapComponent";

const App = () => (
  <Provider store={store}>
    <div>
      <MapComponent />
    </div>
  </Provider>
);

export default App;