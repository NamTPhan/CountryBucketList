import { combineReducers } from "redux";

import countryReducer from "../reducers/countryReducer";
import bucketlistReducer from "../reducers/bucketlistReducer";

export default combineReducers({
  countryState: countryReducer,
  bucketlistState: bucketlistReducer
});
