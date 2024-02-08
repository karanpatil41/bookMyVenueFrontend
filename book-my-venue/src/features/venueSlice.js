import { createSlice } from "@reduxjs/toolkit";

const initialState = { venues: [] };

export const venueSlice = createSlice({
  name: "venues",
  initialState,
  reducers: {
    sortedVenues: (state, action) => {
        state.venues = action.payload;
        console.log(state.venues)
    },
  },
});

export const { sortedVenues } = venueSlice.actions;
export default venueSlice.reducer;
