import {
  ADD_COUNTRY,
  DELETE_COUNTRY,
  GET_ALL_COUNTRIES
} from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case ADD_COUNTRY:
      return {
        ...state,
        addedCountries: [...state.addedCountries, action.payload]
      };
    case DELETE_COUNTRY:
      return { ...state, addedCountries: action.payload };
    case GET_ALL_COUNTRIES:
      return { ...state, addedCountries: action.payload };
    default:
      return state;
  }
};
