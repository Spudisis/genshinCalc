import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type obj = {
  betweenDays: number;
  nowDays: number;
  valueSave: number;
  valueSum: number;
  betweenSum: number;
};

type stateObj = {
  calculate: obj;
};
const initialState: stateObj = {
  calculate: {
    betweenDays: 0,
    nowDays: 0,
    valueSave: 0,
    valueSum: 0,
    betweenSum: 0,
  },
};
export const calcPrimogemObj = createSlice({
  name: "calcPrimogemObj",
  initialState,
  reducers: {
    setObj: (state, action: PayloadAction<obj>) => {
      state.calculate = action.payload;
    },
  },
});

export const { setObj } = calcPrimogemObj.actions;

export default calcPrimogemObj.reducer;
