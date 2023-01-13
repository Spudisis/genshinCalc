import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type localObj = {
  autoFill: boolean;
  lastCalc: boolean;
};

const initialState: localObj = {
  autoFill: false,
  lastCalc: false,
};
export const localStorage = createSlice({
  name: "localStorage",
  initialState,
  reducers: {
    setAutoFill: (state, action: PayloadAction<boolean>) => {
      state.autoFill = action.payload;
    },
    setLastCalc: (state, action: PayloadAction<boolean>) => {
      state.lastCalc = action.payload;
    },
  },
});
export const getPerson = (state: any) => state.person;

export const { setAutoFill, setLastCalc } = localStorage.actions;

export default localStorage.reducer;
