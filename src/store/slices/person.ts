import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { propRedux } from "../types/calc";
import { primogems, storeItem } from "../types/items";
import { personSlice } from "../types/user";

const initialState: personSlice = {
  uid: "",
  store: [],
  primogems: [],
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
    addPrimogems: (state, action: PayloadAction<primogems>) => {
      state.primogems.unshift(action.payload);
    },
    setStore: (state, action: PayloadAction<storeItem[]>) => {
      state.store = action.payload;
    },
    setPrimogems: (state, action: PayloadAction<primogems[]>) => {
      state.primogems = action.payload;
    },
    addGemsItemStore: (state, action: PayloadAction<propRedux>) => {
      state.store.forEach((elem) => {
        if (elem.id === action.payload.id) {
          elem.countAdd = +elem.countAdd + +action.payload.countGemsPlus;
        }
      });
    },
    changeItemStore: (state, action: PayloadAction<storeItem>) => {
      const newArr = state.store.map((elem) => {
        if (elem.id === action.payload.id) {
          return action.payload;
        }
        return elem;
      });
      state.store = newArr;
    },
    deleteStore: (state, action: PayloadAction<number>) => {
      state.store = state.store.filter((elem) => elem.id !== action.payload);
    },
    clearUid: (state) => {
      state.uid = "";
    },
    clearStore: (state) => {
      state.store = [];
      state.primogems = [];
    },
  },
});
export const getPerson = (state: any) => state.person;

export const {
  setUid,
  clearUid,
  addStore,
  setStore,
  setPrimogems,
  clearStore,
  deleteStore,
  addGemsItemStore,
  changeItemStore,
  addPrimogems,
} = dataSlice.actions;

export default dataSlice.reducer;
