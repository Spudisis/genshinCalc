import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { primogems } from "../types/items";
import { primogemsSlice } from "../types/user";

const initialState: primogemsSlice = {
  primogems: [],
  oneRow: [],
  count: 0,
};
export const primogemSlice = createSlice({
  name: "primogemsSlice",
  initialState,
  reducers: {
    addPrimogems: (state, action: PayloadAction<primogems>) => {
      state.primogems.unshift(action.payload);
      state.count = state.count + 1;
      if (state.primogems.length > 10) {
        state.primogems = state.primogems.slice(0, 10);
      }
    },
    setOneRow: (state, action: PayloadAction<primogems[]>) => {
      state.oneRow = action.payload;
    },
    setPrimogems: (state, action: PayloadAction<primogems[]>) => {
      state.primogems = action.payload;
    },
    setCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    clearPrimogems: (state) => {
      state.primogems = [];
    },
  },
});
export const getPerson = (state: any) => state.person;

export const { setPrimogems, addPrimogems, setOneRow, setCount, clearPrimogems } = primogemSlice.actions;

export default primogemSlice.reducer;
