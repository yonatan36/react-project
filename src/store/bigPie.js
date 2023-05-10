import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./counter";
import darkThemeReducer from "./darkTheme";
import authReducer from "./auth";

const store = configureStore({
  reducer: {
    counterSlice: counterReducer,
    darkThemeSlice: darkThemeReducer,
    authSlice: authReducer,
  },
});

export default store;
