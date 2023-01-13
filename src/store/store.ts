import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";

import person from "./slices/person";
import localStorage from "./slices/localstorage";
import getImagesUrl from "./slices/images";

const persistConfig = {
  key: "additionalActions",
  storage,
};

const rootReducer = combineReducers({
  params: localStorage,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: { persistedReducer, person, getImagesUrl },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persister = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
