import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { storeItem } from "../types/items";
import { userSlice } from "../types/user";

const initialState: userSlice = {
  uid: "",
  store: [],
};
export const dataSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUid: (state, action: PayloadAction<string>) => {
      state.uid = action.payload;
    },
    addStore: (state, action: PayloadAction<storeItem>) => {
      state.store.push(action.payload);
    },
    // addStore: (state, action: PayloadAction<storeItem>) => {
    //   state.store.push(action.payload);
    // },
    setStore: (state, action: PayloadAction<storeItem[]>) => {
      state.store = action.payload;
    },
    clearUid: (state) => {
      state.uid = "";
    },
    clearStore: (state) => {
      state.store = [];
    },
  },
});
export const getPerson = (state: any) => state.person;

export const { setUid, clearUid, addStore, setStore, clearStore } = dataSlice.actions;

export default dataSlice.reducer;
