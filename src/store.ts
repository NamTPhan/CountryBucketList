import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import logger from "redux-logger";
import countryReducer from "./features/countrySlice";
import bucketlistReducer from "./features/bucketlistSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const reducer = combineReducers({
  countryState: countryReducer,
  bucketlistState: bucketlistReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
});
