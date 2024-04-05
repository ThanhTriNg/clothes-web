import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
// import CategoriesApi from "../api/CategoriesApi";
import { CartItem, ClothesProps } from "../module";
import { RootState } from "../store/Store";
import { boolean } from "zod";

interface myState {
  loading: boolean;
  cartItems: CartItem[];
  isOpenDrawerCart: boolean;
}

const initialState: myState = {
  loading: false,
  cartItems: [],
  isOpenDrawerCart: false,
};

const isExist = (cartItems: CartItem[], id: string) => {
  return cartItems.find((el) => el.product.id === id);
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<ClothesProps>) => {
      // const item = state.cartItems.find(
      //   (el) => el.product.id === action.payload.id
      // );
      const item = isExist(state.cartItems, action.payload.id);
      if (item) item.qty++;
      else {
        state.cartItems.push({ product: action.payload, qty: 1 });
      }
    },
    decrement: (state, action: PayloadAction<ClothesProps>) => {
      const item = isExist(state.cartItems, action.payload.id);

      if (item) {
        item.qty--;
        if (item.qty === 0) {
          state.cartItems = state.cartItems.filter(
            (el) => el.product.id !== action.payload.id
          );
        }
      }
    },
    remove: (state, action: PayloadAction<ClothesProps>) => {
      const item = isExist(state.cartItems, action.payload.id);
      if (item) {
        item.qty = 0;
        state.cartItems = state.cartItems.filter(
          (el) => el.product.id !== action.payload.id
        );
      }
    },
    getIsOpenDrawerCart: (state, action: PayloadAction<boolean>) => {
      state.isOpenDrawerCart = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

const cartItems = (state: RootState) => state.cartPersistedReducer.cartItems;

export const totalCartItemSelector = createSelector([cartItems], (cartItems) =>
  cartItems.reduce((total: number, cur: CartItem) => (total += cur.qty), 0)
);

export const totalPriceSelector = createSelector([cartItems], (cartItems) =>
  cartItems.reduce(
    (total: number, cur: CartItem) => (total += cur.qty * cur.product.price),
    0
  )
);

export const productQtyInCartSelector = createSelector(
  [cartItems, (cartItems, productId: string) => productId],
  (cartItems, productId) =>
    cartItems.find((el) => el.product.id === productId)?.qty
);

export const { increment, decrement, remove, getIsOpenDrawerCart } =
  cartSlice.actions;
export default cartSlice.reducer;
