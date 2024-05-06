// src/store/index.js

import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './reducers/dataSlice'; // We'll create this shortly

const store = configureStore({
  reducer: {
    data: dataReducer,
    // Add more reducers if needed
  },
});

export default store;
