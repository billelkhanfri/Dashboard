// src/store/reducers/dataSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk("data/fetchData", async () => {
  const response = await fetch("http://localhost:3000/tecmoled/");
  const data = await response.json();
  return data;
});

const dataSlice = createSlice({
  name: "data",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default dataSlice.reducer;
