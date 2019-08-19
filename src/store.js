import { AsyncStorage } from "react-native";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import logger from "redux-logger";
import rootReducer from "./reducers/rootReducer.js";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: "root",
  storage: AsyncStorage
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

state = {
  countryState: { addedCountries: [] },
  bucketlistState: { bucketlists: [] },
  feedbackMessage: { allErrors: [] }
};

export default () => {
  let store = createStore(
    persistedReducer,
    state,
    composeEnhancers(applyMiddleware(reduxThunk, logger))
  );
  let persistor = persistStore(store);

  return { store, persistor };
};
