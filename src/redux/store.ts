import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import person from "./slices/person";
import getImagesUrl from "./slices/images";
export const store = configureStore({
  reducer: { person, getImagesUrl },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
