import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";

import rootReducer from "./reducers/rootReducer.js";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function configureStore(
  state = {
    countryState: {},
    bucketlistState: {}
  }
) {
  return createStore(
    rootReducer,
    state,
    composeEnhancers(applyMiddleware(reduxThunk))
  );
}

export default configureStore;
