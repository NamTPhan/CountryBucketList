import { AsyncStorage } from "react-native";
import {
  SAVE_BUCKETLIST,
  DELETE_BUCKETLIST,
  GET_BUCKETLISTS,
  ASYNC_BUCKETLISTS
} from "./types.js";
import { errorMessageAction } from "./messageActions.js";

export const addDefaultBucketListAction = country => async dispatch => {
  try {
    AsyncStorage.getItem(ASYNC_BUCKETLISTS, (err, result) => {
      let object = { country: country, items: [], achieved: [] };

      if (result !== null) {
        let newData = JSON.parse(result).concat(object);
        AsyncStorage.setItem(ASYNC_BUCKETLISTS, JSON.stringify(newData));
      } else {
        AsyncStorage.setItem(ASYNC_BUCKETLISTS, JSON.stringify([object]));
      }
    });
  } catch (err) {
    dispatch(errorMessageAction(err));
  }
};

export const saveBucketListAction = (index, newObject) => async dispatch => {
  const bucketLists = await AsyncStorage.getItem(ASYNC_BUCKETLISTS);
  const parsedArray = JSON.parse(bucketLists);

  if (bucketLists !== null) {
    parsedArray[index] = newObject;
    AsyncStorage.setItem("ASYNC_BUCKETLISTS", JSON.stringify(parsedArray));

    dispatch({ type: SAVE_BUCKETLIST, payload: parsedArray });
  }
};

export const deleteBucketListAction = index => async dispatch => {
  const bucketLists = await AsyncStorage.getItem(ASYNC_BUCKETLISTS);
  const parsedArray = JSON.parse(bucketLists);

  if (bucketLists !== null) {
    parsedArray.splice(index, 1);
    AsyncStorage.setItem(ASYNC_BUCKETLISTS, JSON.stringify(parsedArray));

    dispatch({ type: DELETE_BUCKETLIST, payload: parsedArray });
  }
};

export const getBucketListAction = () => async dispatch => {
  try {
    const bucketLists = await AsyncStorage.getItem(ASYNC_BUCKETLISTS);
    const parsedArray = JSON.parse(bucketLists);

    if (bucketLists !== null) {
      dispatch({
        type: GET_BUCKETLISTS,
        payload: parsedArray
      });
    }
  } catch (err) {
    dispatch(errorMessageAction(err));
  }
};
