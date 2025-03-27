import React from "react";
import keplerGlReducer from "kepler.gl/reducers";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { taskMiddleware } from "react-palm/tasks";
import { Provider, useDispatch } from "react-redux";
import KeplerGl from "kepler.gl";
import { addDataToMap } from "kepler.gl/actions";
import useSwr from "swr";

// Eerst dit in terminal, anders werkt het niet:
// export NODE_OPTIONS=--openssl-legacy-provider

const reducers = combineReducers({
  keplerGl: keplerGlReducer
});

const store = createStore(reducers, {}, applyMiddleware(taskMiddleware));

export default function App() {
  return (
    <Provider store={store}>
      <Map />
    </Provider>
  );
}

function Map() {
  return (
    <KeplerGl
      id="Gouda"
      mapboxApiAccessToken={process.env.MAPBOX_TOKEN}
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
}
