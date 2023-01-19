import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { primogems } from "../types/items";
import { primogemsSlice } from "../types/user";

const initialState: primogemsSlice = {
  primogems: [],
};
export const primogemSlice = createSlice({
  name: "primogemsSlice",
  initialState,
  reducers: {
    addPrimogems: (state, action: PayloadAction<primogems>) => {
      state.primogems.unshift(action.payload);
    },
    setPrimogems: (state, action: PayloadAction<primogems[]>) => {
      state.primogems = action.payload;
    },
    clearPrimogems: (state) => {
      state.primogems = [];
    },
  },
});
export const getPerson = (state: any) => state.person;

export const { setPrimogems, addPrimogems, clearPrimogems } = primogemSlice.actions;

export default primogemSlice.reducer;
