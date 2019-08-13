import {
  ADD_BUCKETLIST,
  EDIT_BUCKETLIST,
  DELETE_BUCKETLIST,
  GET_BUCKETLISTS
} from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case ADD_BUCKETLIST:
      return state;
    case EDIT_BUCKETLIST:
      return state;
    case DELETE_BUCKETLIST:
      return state;
    case GET_BUCKETLISTS:
      return { ...state, bucketlists: action.payload };
    default:
      return state;
  }
};
