import { ERROR_MESSAGE } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case ERROR_MESSAGE:
      return {
        ...state,
        allErrors: [...state.allErrors, action.payload]
      };
    default:
      return state;
  }
};
