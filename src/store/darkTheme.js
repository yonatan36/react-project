import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDarkTheme: false,
};

const darkThemeSlice = createSlice({
  name: "darkTheme",
  initialState,
  reducers: {
    changTheme(state) {
      state.isDarkTheme = !state.isDarkTheme;
    },
  },
});


//this export give the function reducers
export const isDarkThemeActions = darkThemeSlice.actions;

export default darkThemeSlice.reducer;