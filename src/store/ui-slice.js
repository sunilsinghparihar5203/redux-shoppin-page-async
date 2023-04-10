import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    cartIsVisible: false,
    notification: { isVisible: false, message: "", title: "", status: "" },
  },
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },

    notification(state, action) {
      state.notification = { ...action.payload };
    },
  },
});

export const uiAction = uiSlice.actions;
export default uiSlice;
