import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { primogems } from '../types/items'
import { primogemsSlice } from '../types/user'

const initialState: primogemsSlice = {
  primogems: [],
  lastItem: null
}
export const primogemSlice = createSlice({
  name: 'primogemsSlice',
  initialState,
  reducers: {
    addPrimogems: (state, action: PayloadAction<primogems>) => {
      state.primogems.unshift(action.payload)
      state.lastItem = action.payload
    },
    setPrimogems: (state, action: PayloadAction<primogems[]>) => {
      state.primogems = action.payload
      state.lastItem = action.payload[0]
    },
    addPrimogemsLastItem: (state, action: PayloadAction<number>) => {
      if (!state.lastItem) {
        return
      }
      state.lastItem.countPrimogems = +state.lastItem.countPrimogems + +action.payload
    },
    addWishLastItem: (state, action: PayloadAction<number>) => {
      if (!state.lastItem) {
        return
      }
      state.lastItem.countWishes = +state.lastItem.countWishes + +action.payload
    },
    addStarglitterLastItem: (state, action: PayloadAction<number>) => {
      if (!state.lastItem) {
        return
      }
      state.lastItem.countStarglitter = +state.lastItem.countStarglitter + +action.payload
    },
    clearPrimogems: (state) => {
      state.primogems = []
    }
  }
})
export const getPerson = (state: any) => state.person

export const { setPrimogems, addPrimogems, clearPrimogems, addPrimogemsLastItem, addWishLastItem, addStarglitterLastItem } =
  primogemSlice.actions

export default primogemSlice.reducer
