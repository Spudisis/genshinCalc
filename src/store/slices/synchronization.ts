import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Synchronization } from '../types/items'
import { synchroSlice } from '../types/user'

const initialState: synchroSlice = {
  synchro: []
}
export const syncSlice = createSlice({
  name: 'primogemsSlice',
  initialState,
  reducers: {
    setSynchro: (store, action: PayloadAction<Synchronization[]>) => {
      store.synchro = action.payload
    },
    addSynchro: (store, action: PayloadAction<Synchronization>) => {
      store.synchro = [...store.synchro, action.payload]
    },
    editSynchro: (store, action: PayloadAction<Synchronization>) => {
      store.synchro = store.synchro.map((elem) => {
        if (elem.id === action.payload.id) {
          return action.payload
        }
        return elem
      })
    },
    deleteSynchro: (store, action: PayloadAction<number>) => {
      store.synchro = store.synchro.filter((elem) => elem.id !== action.payload)
    },
    deleteSynchroName: (store, action: PayloadAction<string>) => {
      store.synchro = store.synchro.filter((elem) => elem.name !== action.payload)
    }
  }
})

export const { setSynchro, addSynchro, deleteSynchro, deleteSynchroName, editSynchro } = syncSlice.actions

export default syncSlice.reducer
