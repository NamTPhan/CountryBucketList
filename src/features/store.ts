import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import countryReducer from "./countrySlice";
import bucketListReducer from "./bucketListSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import logger from "redux-logger";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const reducer = combineReducers({
  countryState: countryReducer,
  bucketlistState: bucketListReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [logger],
});
