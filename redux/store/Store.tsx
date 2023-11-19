import { configureStore } from "@reduxjs/toolkit";
import ClothesReducer from "../reducer/Clothes";
import CategoriesReducer from "../reducer/Categories";
import GenderReducer from "../reducer/Gender";
import WomenReducer from "../reducer/Women";
export const store = configureStore({
  reducer: {
    clothes: ClothesReducer,
    categories: CategoriesReducer,
    gender: GenderReducer,
    women: WomenReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
