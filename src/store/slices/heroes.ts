import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { propRedux } from "../types/calc";
import { storeItem } from "../types/items";

type heroes = {
  heroes: storeItem[];
};

const initialState: heroes = {
  heroes: [],
};
export const storeSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {
    addStore: (state, action: PayloadAction<storeItem>) => {
      state.heroes.push(action.payload);
    },

    setStore: (state, action: PayloadAction<storeItem[]>) => {
      state.heroes = action.payload;
    },

    addGemsItemStore: (state, action: PayloadAction<propRedux>) => {
      state.heroes.forEach((elem) => {
        if (elem.id === action.payload.id) {
          elem.valueAdd = +elem.valueAdd + +action.payload.countGemsPlus;
        }
      });
    },
    changeItemStore: (state, action: PayloadAction<storeItem>) => {
      const newArr = state.heroes.map((elem) => {
        if (elem.id === action.payload.id) {
          return action.payload;
        }
        return elem;
      });
      state.heroes = newArr;
    },
    deleteStore: (state, action: PayloadAction<number>) => {
      state.heroes = state.heroes.filter((elem) => elem.id !== action.payload);
    },

    clearStore: (state) => {
      state.heroes = [];
    },
  },
});

export const {
  addStore,
  setStore,

  clearStore,
  deleteStore,
  addGemsItemStore,
  changeItemStore,
} = storeSlice.actions;

export default storeSlice.reducer;
