import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth";

const store = configureStore({
  reducer: {
    authSlice: authReducer,
  },
});

export default store;
