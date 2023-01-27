import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { $authHost } from "../../api";

import { Synchronization } from "../types/items";
import { status, synchroSlice } from "../types/user";

const initialState: synchroSlice = {
  synchro: [],
  statusSync: status.LOADING,
};

export const getSynchro = createAsyncThunk<Synchronization[], number>("sync/all", async (id: number) => {
  const response = await $authHost.post("api/sync/all", { personId: id });
  console.log(response);
  return response.data.allSync;
});

export const syncSlice = createSlice({
  name: "primogemsSlice",
  initialState,
  reducers: {
    addSynchro: (store, action: PayloadAction<Synchronization>) => {
      store.synchro = [...store.synchro, action.payload];
    },
    editSynchro: (store, action: PayloadAction<Synchronization>) => {
      store.synchro = store.synchro.map((elem) => {
        if (elem.id === action.payload.id) {
          return action.payload;
        }
        return elem;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSynchro.fulfilled, (state, action) => {
        state.synchro = action.payload;

        state.statusSync = status.FULFILLED;
      })
      .addCase(getSynchro.pending, (state, action) => {
        state.statusSync = status.LOADING;
      })

      .addCase(getSynchro.rejected, (state, action) => {
        state.synchro = [];
        state.statusSync = status.REJECTED;
      });
  },
});

export const { addSynchro, editSynchro } = syncSlice.actions;

export default syncSlice.reducer;
