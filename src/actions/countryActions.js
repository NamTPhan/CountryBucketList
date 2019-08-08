import { AsyncStorage } from "react-native";
import { ADD_COUNTRY, DELETE_COUNTRY, GET_ALL_COUNTRIES } from "./types.js";

export const addCountryAction = country => async dispatch => {
  try {
    dispatch({ type: ADD_COUNTRY, payload: country });

    // AsyncStorage.removeItem("ADDED_COUNTRIES");

    AsyncStorage.getItem("ADDED_COUNTRIES", (err, result) => {
      if (result !== null) {
        let newData = JSON.parse(result).concat(country);
        AsyncStorage.setItem("ADDED_COUNTRIES", JSON.stringify(newData));
      } else {
        AsyncStorage.setItem("ADDED_COUNTRIES", JSON.stringify([country]));
      }
    });
  } catch (err) {
    // error
  }
};

export const deleteCountryAction = index => async dispatch => {
  dispatch({ type: DELETE_COUNTRY, payload: index }).then(res =>
    console.log(res)
  );
};

export const getAllCountriesAction = () => async dispatch => {
  try {
    const addedCountries = await AsyncStorage.getItem("ADDED_COUNTRIES");

    if (addedCountries !== null) {
      // We have data!!
      console.log(addedCountries);
      dispatch({ type: GET_ALL_COUNTRIES, payload: addedCountries });
    }

    if (addedCountries === null) {
      console.log("Empty");
    }
  } catch (err) {
    // Error retrieving data
    console.log(err);
  }
};
