import { ERROR_MESSAGE } from "./types.js";

export const errorMessageAction = message => async dispatch => {
  dispatch({ type: ERROR_MESSAGE, payload: message });
};
