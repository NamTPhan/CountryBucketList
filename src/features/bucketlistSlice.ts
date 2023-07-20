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
      const countryIndex = state.bucketLists.findIndex(
        country => country.countryId === countryId
      );

      if (countryIndex !== -1) {
        const updatedCountry = state.bucketLists[countryIndex];
        updatedCountry.ideas.push({ idea: newIdea, achieved: 0 });

        state.bucketLists = [
          ...state.bucketLists.slice(0, countryIndex),
          updatedCountry,
          ...state.bucketLists.slice(countryIndex + 1),
        ];
      }
    },
    removeBucketListItem: (state, action) => {
      const { countryId, ideaIndex } = action.payload;
      const countryIndex = state.bucketLists.findIndex(
        country => country.countryId === countryId
      );

      if (countryIndex !== -1) {
        let selectedCountry = state.bucketLists[countryIndex];
        const updatedCountryIdeas = state.bucketLists[
          countryIndex
        ].ideas.filter((_, index) => index !== ideaIndex);

        selectedCountry.ideas = updatedCountryIdeas;
      }
    },
  },
});

export const {
  addBucketList,
  removeBucketList,
  addBucketListItem,
  removeBucketListItem,
} = bucketListSlice.actions;

export default bucketListSlice.reducer;
