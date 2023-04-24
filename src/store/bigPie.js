import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth";
import isBizReducer from "./isBiz";

const store = configureStore({
  reducer: {
    authSlice: authReducer,
    bizSlice: isBizReducer,
  },
});

export default store;
