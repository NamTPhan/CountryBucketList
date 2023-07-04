import { createSlice } from "@reduxjs/toolkit";
import { ICountry } from "interfaces/country.interface";

interface CountryState {
  countries: ICountry[];
}

const initialState: CountryState = {
  countries: [],
};

export const countrySlice = createSlice({
  name: "countryState",
  initialState,
  reducers: {
    addCountry: (state, action) => {
      state.countries = [...state.countries, action.payload];
    },
    removeCountry: (state, action) => {
      state.countries = [
        ...state.countries.slice(0, action.payload),
        ...state.countries.slice(action.payload + 1),
      ];
    },
  },
});

export const { addCountry, removeCountry } = countrySlice.actions;

export default countrySlice.reducer;
