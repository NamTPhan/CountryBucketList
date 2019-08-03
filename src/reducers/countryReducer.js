import { ADD_COUNTRY, DELETE_COUNTRY } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case ADD_COUNTRY:
      return state;
    case DELETE_COUNTRY:
      return state;
    default:
      return state;
  }
};
