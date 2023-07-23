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
    addBucketListItem: (state, action) => {
      const { countryId, newIdea } = action.payload;

      state.bucketLists = state.bucketLists.map(countryBucketList =>
        countryBucketList.countryId === countryId
          ? {
              ...countryBucketList,
              ideas: [
                ...countryBucketList.ideas,
                { idea: newIdea, achieved: 0 },
              ],
            }
          : countryBucketList
      );
    },
    removeBucketListItem: (state, action) => {
      const { countryId, ideaIndex } = action.payload;
      const countryIndex = state.bucketLists.findIndex(
        country => country.countryId === countryId
      );

      if (countryIndex !== -1) {
        const updatedCountryIdeas = [
          ...state.bucketLists[countryIndex].ideas.filter(
            (_, index) => index !== ideaIndex
          ),
        ];

        state.bucketLists = state.bucketLists.map(countryBucketList =>
          countryBucketList.countryId === countryId
            ? { ...countryBucketList, ideas: updatedCountryIdeas }
            : countryBucketList
        );
      }
    },
    updateBucketListItemAchievedStatus: (state, action) => {
      const { countryId, ideaIndex } = action.payload;
      const countryIndex = state.bucketLists.findIndex(
        country => country.countryId === countryId
      );

      if (countryIndex !== -1) {
        state.bucketLists = state.bucketLists.map(countryBucketList =>
          countryBucketList.countryId === countryId
            ? {
                ...countryBucketList,
                ideas: countryBucketList.ideas.map((idea, index) =>
                  index === ideaIndex
                    ? { ...idea, achieved: idea.achieved === 0 ? 1 : 0 }
                    : idea
                ),
              }
            : countryBucketList
        );
      }
    },
  },
});

export const {
  addBucketList,
  removeBucketList,
  addBucketListItem,
  removeBucketListItem,
  updateBucketListItemAchievedStatus,
} = bucketListSlice.actions;

export default bucketListSlice.reducer;
