import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { $authHost } from "../../api";

import { propRedux } from "../types/calc";
import { storeItem, valueDayByDay } from "../types/items";
import { status } from "../types/user";

const initialSoloHero = {
  id: 0,
  date_start: "",
  date_end: "",
  name: "",
  image: "",
  imagePath: false,
  valueStart: 0,
  valueAdd: 0,
  valueWishes: 0,
  createdAt: "",
  updatedAt: "",
  personId: 0,
  SynchronizationId: 0,
  Synchronization: {
    id: 0,
    name: "",
    value: 0,
    res: 0,
    typeValue: "",
    createdAt: "",
    updatedAt: "",
    personId: 0,
  },
  valueDayByDays: [],
  synchValue: 0,
};

type heroes = {
  heroes: storeItem[];
  oneHero: storeItem;
  statusLoading: status;
};

export const getOneHero = createAsyncThunk<storeItem, { personId: number; id: string }>(
  "sync/all",
  async ({ personId, id }) => {
    const response = await $authHost.post("api/heros/" + id, { personId, id });
    console.log(response);
    return response.data;
  }
);

const initialState: heroes = {
  heroes: [],
  oneHero: initialSoloHero,
  statusLoading: status.FULFILLED,
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
          elem.valueAdd = +elem.valueAdd + +action.payload.valueAdd;
        }
      });
    },
    addGemsSoloHero: (state, action: PayloadAction<number>) => {
      state.oneHero.valueAdd = action.payload;
    },
    setSoloHero: (state, action: PayloadAction<storeItem>) => {
      state.oneHero = action.payload;
    },
    changeDBDStore: (state, action: PayloadAction<valueDayByDay[]>) => {
      state.oneHero.valueDayByDays = action.payload;
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
  extraReducers: (builder) => {
    builder
      .addCase(getOneHero.fulfilled, (state, action) => {
        state.oneHero = action.payload;

        state.statusLoading = status.FULFILLED;
      })
      .addCase(getOneHero.pending, (state, action) => {
        state.statusLoading = status.LOADING;
      })

      .addCase(getOneHero.rejected, (state, action) => {
        state.oneHero = initialSoloHero;
        state.statusLoading = status.REJECTED;
      });
  },
});

export const {
  addStore,
  setStore,
  setSoloHero,
  clearStore,
  deleteStore,
  addGemsItemStore,
  changeItemStore,
  changeDBDStore,
  addGemsSoloHero,
} = storeSlice.actions;

export default storeSlice.reducer;
