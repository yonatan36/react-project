import { configureStore } from "@reduxjs/toolkit";
import cardReducer from "./cardReducer";

const store = configureStore({
  reducer: {
    cardSlice: cardReducer,
  },
});

export default store;
