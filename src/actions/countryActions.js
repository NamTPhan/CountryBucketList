import { AsyncStorage } from "react-native";
import {
  ADD_COUNTRY,
  DELETE_COUNTRY,
  GET_ALL_COUNTRIES,
  ASYNC_ADDED_COUNTRIES
} from "./types.js";

export const addCountryAction = country => async dispatch => {
  try {
    AsyncStorage.getItem(ASYNC_ADDED_COUNTRIES, (err, result) => {
      if (result !== null) {
        let newData = JSON.parse(result).concat(country);
        AsyncStorage.setItem(ASYNC_ADDED_COUNTRIES, JSON.stringify(newData));
      } else {
        AsyncStorage.setItem(ASYNC_ADDED_COUNTRIES, JSON.stringify([country]));
      }
    });

    dispatch({ type: ADD_COUNTRY, payload: country });
  } catch (err) {
    // error
  }
};

export const deleteCountryAction = index => async dispatch => {
  dispatch({ type: DELETE_COUNTRY, payload: index });
};

export const getAllCountriesAction = () => async dispatch => {
  try {
    const addedCountries = await AsyncStorage.getItem(ASYNC_ADDED_COUNTRIES);
    const parsedArray = JSON.parse(addedCountries);

    if (addedCountries !== null) {
      dispatch({
        type: GET_ALL_COUNTRIES,
        payload: parsedArray
      });
    }
  } catch (err) {
    // Error retrieving data
    console.log(err);
  }
};
