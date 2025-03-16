import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import keplerGlReducer, { enhanceReduxMiddleware } from "@kepler.gl/reducers";

const reducers = combineReducers({
  keplerGl: keplerGlReducer.initialState({
    uiState: {
      readOnly: false,
      currentModal: null,
    },
  }),
});

const middleWares = enhanceReduxMiddleware([]);
const enhancers = applyMiddleware(...middleWares);

const initialState = {};
const store = createStore(reducers, initialState, compose(enhancers));

export default store;