// store.js
import { configureStore } from "@reduxjs/toolkit";
import searchTermReducer from "./slices/searchTermSlice";

export default configureStore({
  reducer: {
    searchTerm: searchTermReducer,
  },
});
