import { combineReducers } from "redux";

import countryReducer from "../reducers/countryReducer";
import bucketlistReducer from "../reducers/bucketlistReducer";
import messageReducer from "../reducers/messageReducer";

export default combineReducers({
  countryState: countryReducer,
  bucketlistState: bucketlistReducer,
  feedbackMessage: messageReducer
});
