import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { UsefulSitesType } from '../types/user'

const initialState: { Sites: UsefulSitesType[] } = {
  Sites: []
}
export const usefulSites = createSlice({
  name: 'usefulSitesSlice',
  initialState,
  reducers: {
    setSites: (state, action: PayloadAction<UsefulSitesType[]>) => {
      state.Sites = action.payload
    }
  }
})
export const getPerson = (state: any) => state.person

export const { setSites } = usefulSites.actions

export default usefulSites.reducer
