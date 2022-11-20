import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { propRedux } from "../types/calc";
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

    setStore: (state, action: PayloadAction<storeItem[]>) => {
      state.store = action.payload;
    },
    changeStore: (state, action: PayloadAction<propRedux>) => {
      const mas = state.store.slice(0);
      mas.forEach((elem) => {
        if (elem.id === action.payload.id) {
          elem.countStart = +elem.countStart + +action.payload.countGemsPlus;
        }
      });
      state.store = mas;
    },
    deleteStore: (state, action: PayloadAction<any>) => {
      const mas = state.store.slice(0);
      console.log(action.payload);
      const filtered = mas.filter((elem) => elem.id != action.payload);
      state.store = filtered;
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

export const { setUid, clearUid, addStore, setStore, clearStore, deleteStore, changeStore } = dataSlice.actions;

export default dataSlice.reducer;
