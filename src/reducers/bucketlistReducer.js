import {
  SAVE_BUCKETLIST,
  DELETE_BUCKETLIST,
  GET_BUCKETLISTS
} from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case SAVE_BUCKETLIST:
      return { ...state, bucketlists: action.payload };
    case DELETE_BUCKETLIST:
      return state;
    case GET_BUCKETLISTS:
      return { ...state, bucketlists: action.payload };
    default:
      return state;
  }
};
