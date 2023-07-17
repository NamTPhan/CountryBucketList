import { createSlice } from "@reduxjs/toolkit";
import { IBucketList } from "../interfaces/bucketlist.interface";

interface BucketListState {
  bucketLists: IBucketList[];
}

const initialState: BucketListState = {
  bucketLists: [],
};

export const bucketListSlice = createSlice({
  name: "bucketlistState",
  initialState,
  reducers: {
    addBucketList: (state, action) => {
      state.bucketLists = [...state.bucketLists, action.payload];
    },
    removeBucketList: (state, action) => {
      state.bucketLists = state.bucketLists.filter(
        countryBucketList => countryBucketList.countryId !== action.payload
      );
    },
  },
});

export const { addBucketList, removeBucketList } = bucketListSlice.actions;

export default bucketListSlice.reducer;
