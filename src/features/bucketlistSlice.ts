import { createSlice } from "@reduxjs/toolkit";
import { IBucketList } from "interfaces/bucketlist.interface";

interface BucketListState {
  bucketLists: IBucketList[];
}

const initialState: BucketListState = {
  bucketLists: [],
};

export const bucketlistSlice = createSlice({
  name: "bucketlistState",
  initialState,
  reducers: {
    addBucketList: (state, action) => {
      state.bucketLists = [...state.bucketLists, action.payload];
    },
    removeBucketList: (state, action) => {
      state.bucketLists = [
        ...state.bucketLists.slice(0, action.payload),
        ...state.bucketLists.slice(action.payload + 1),
      ];
    },
  },
});

export const { addBucketList, removeBucketList } = bucketlistSlice.actions;

export default bucketlistSlice.reducer;
