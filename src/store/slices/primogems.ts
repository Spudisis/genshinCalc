import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { $authHost } from "../../api";

import { primogems } from "../types/items";
import { primogemsSlice, status } from "../types/user";

type Params = {
  uid: number;
  pageNumberNow: number;
  countLine: number;
};

type Response = {
  rows: primogems[];
  count: number;
};

export const getPrimogemsThunk = createAsyncThunk<Response, Params>(
  "api/getPrimogems",
  async ({ uid, pageNumberNow, countLine }) => {
    const { data } = await $authHost.post("api/primogems/rows", {
      personId: uid,
      offset: pageNumberNow + 1,
      limit: countLine,
    });
    return data;
  }
);

const initialState: primogemsSlice = {
  primogems: [],
  oneRow: [],
  count: 0,
  statusLoading: status.LOADING,
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
  extraReducers: (builder) => {
    builder
      .addCase(getPrimogemsThunk.fulfilled, (state, action) => {
        state.primogems = action.payload.rows;
        state.count = action.payload.count;

        state.statusLoading = status.FULFILLED;
      })
      .addCase(getPrimogemsThunk.pending, (state, action) => {
        state.statusLoading = status.LOADING;
      })

      .addCase(getPrimogemsThunk.rejected, (state, action) => {
        state.primogems = [];
        state.count = 0;
        state.statusLoading = status.REJECTED;
      });
  },
});
export const getPerson = (state: any) => state.person;

export const { setPrimogems, addPrimogems, setOneRow, setCount, clearPrimogems } = primogemSlice.actions;

export default primogemSlice.reducer;
