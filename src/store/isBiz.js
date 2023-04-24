import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isBiz: false,
  payload: null,
};

const bizSlice = createSlice({
  name: "biz",
  initialState,
  reducers: {
    login(state, action) {
      if (!action || !action.payload) {
        return;
      }
      state.biz = true;
      state.payload = action.payload;
    },
  },
});

export const { login } = bizSlice.actions;

export default bizSlice.reducer;
