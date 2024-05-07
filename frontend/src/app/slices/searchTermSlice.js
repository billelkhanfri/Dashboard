// searchTermSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const searchTermSlice = createSlice({
  name: "searchTerm",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      return action.payload;
    },
  },
});

export const { setSearchTerm } = searchTermSlice.actions;

export default searchTermSlice.reducer;
