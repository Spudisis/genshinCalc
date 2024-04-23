import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: any = {
  imagesUrl: []
}
export const dataSlice = createSlice({
  name: 'imagesUrl',
  initialState,
  reducers: {
    setImagesUrl: (state, action: PayloadAction<any>) => {
      state.imagesUrl = action.payload
    },

    clearImages: (state) => {
      state.store = []
    }
  }
})
export const getImagesUrl = (state: any) => state.getImagesUrl

export const { setImagesUrl, clearImages } = dataSlice.actions

export default dataSlice.reducer
