import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { propRedux } from "../types/calc";
import { storeItem } from "../types/items";
import { personSlice } from "../types/user";

const initialState: { id: number } = {
  id: 0,
};
export const dataSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUid: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    },

    clearUid: (state) => {
      state.id = 0;
    },
  },
});

export const { setUid, clearUid } = dataSlice.actions;

export default dataSlice.reducer;
