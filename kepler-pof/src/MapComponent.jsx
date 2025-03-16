import * as React from "react";
import ReactDOM from "react-dom/client";
import document from "global/document";

import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { connect, Provider } from "react-redux";

import keplerGlReducer, { enhanceReduxMiddleware } from "@kepler.gl/reducers";
import KeplerGl from "@kepler.gl/components";

import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";

const reducers = combineReducers({
  keplerGl: keplerGlReducer.initialState({
    uiState: {
      readOnly: false,
      currentModal: null,
    },
  }),
});

const middleWares = enhanceReduxMiddleware([
  // Add other middlewares here
]);

const enhancers = applyMiddleware(...middleWares);

const initialState = {};
const store = createStore(reducers, initialState, compose(enhancers));

const App2 = () => (
  <div
    style={{
      position: "absolute",
      top: "0px",
      left: "0px",
      width: "100%",
      height: "100%",
    }}
  >
    <AutoSizer>
      {({ height, width }) => (
        <KeplerGl
          mapboxApiAccessToken="xxx" // Replace with your mapbox token
          id="map"
          width={width}
          height={height}
        />
      )}
    </AutoSizer>
  </div>
);

const mapStateToProps = (state) => state;
const dispatchToProps = (dispatch) => ({ dispatch });
const ConnectedApp = connect(mapStateToProps, dispatchToProps)(App2);
const MapComponent = () => (
  <Provider store={store}>
    <App2 />
  </Provider>
);

export default MapComponent;