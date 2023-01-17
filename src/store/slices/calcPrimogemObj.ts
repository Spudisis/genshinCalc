import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type obj = {
  between: number;
  now: number;
  countSave: number;
  countSumm: number;
  betweenSumm: number;
};

type stateObj = {
  calculate: obj;
};
const initialState: stateObj = {
  calculate: {
    between: 0,
    now: 0,
    countSave: 0,
    countSumm: 0,
    betweenSumm: 0,
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
