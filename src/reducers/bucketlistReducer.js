import {
  ADD_BUCKETLIST,
  EDIT_BUCKETLIST,
  DELETE_BUCKETLIST
} from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case ADD_BUCKETLIST:
      return state;
    case EDIT_BUCKETLIST:
      return state;
    case DELETE_BUCKETLIST:
      return state;
    default:
      return state;
  }
};
