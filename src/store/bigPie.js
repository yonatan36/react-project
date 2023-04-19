import { configureStore } from "@reduxjs/toolkit";

import darkThemeReducer from "./darkTheme"

const store = configureStore({
  reducer: {
    darkThemeSlice: darkThemeReducer,
  },
});

export default store;
