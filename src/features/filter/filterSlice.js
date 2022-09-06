import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    colors: [],
    status: "All",
  },
  reducers: {
    addColor: (state, action) => {
      state.colors.push(action.payload);
    },
    removeColor: (state, action) => {
      state.colors = state.colors.filter((color) => color !== action.payload);
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const filterReducer = filterSlice.reducer;
export const { addColor, removeColor, setStatus } = filterSlice.actions;
