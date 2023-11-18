import { configureStore } from "@reduxjs/toolkit";
import ClothesReducer from "../reducer/Clothes";

export const store = configureStore({
  reducer: {
    clothes: ClothesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;