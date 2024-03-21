"use client";

import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import ClothesReducer from "../reducer/Clothes";
import CategoriesReducer from "../reducer/Categories";
import GenderReducer from "../reducer/Gender";
import WomenReducer from "../reducer/Women";
import CartReducer from "../reducer/Cart";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { persistStore, persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const cartPersistConfig = {
  key: "cart",
  storage,
};
const cartPersistedReducer = persistReducer(cartPersistConfig, CartReducer);
const listenerMiddleware = createListenerMiddleware();

export const store = configureStore({
  reducer: {
    clothes: ClothesReducer,
    categories: CategoriesReducer,
    gender: GenderReducer,
    women: WomenReducer,
    // cart: CartReducer,
    cartPersistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const persistor = persistStore(store);
