import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
// import CategoriesApi from "../api/CategoriesApi";
import { CartItem, ClothesPropsData } from "../module";
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
const isExist = (cartItems: CartItem[], id: number) => {
  return cartItems.find((el) => el.product.id === id);
};

const isExistTest = (cartItems: CartItem[], id: number, size: string) => {
  const isId = cartItems.find((el) => el.product.id === id && el.size === size);
  console.log(isId?.size);
  return isId;
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment: (
      state,
      action: PayloadAction<{ product: ClothesPropsData; size: string }>
    ) => {
      const { product, size } = action.payload;
      const item = isExistTest(state.cartItems, product.id, size);

      const test = state.cartItems.find((el) => el.product.id === product.id);
      if (item) {
        item.qty++;
      } else {
        state.cartItems.push({ product, qty: 1, size });
      }
      // You can also store the size in the cart item here if needed
      // For example:
      // item.size = size;
    },
    decrement: (state, action: PayloadAction<ClothesPropsData>) => {
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
    remove: (state, action: PayloadAction<ClothesPropsData>) => {
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
console.log("cartItems>>", cartItems);
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
  [
    cartItems,
    (state, productId: number) => productId,
    (state, productId, size: string) => size,
  ],
  (cartItems, productId, size) =>
    cartItems.find((el) => el.product.id === productId && el.size === size)?.qty
);

export const { increment, decrement, remove, getIsOpenDrawerCart } =
  cartSlice.actions;
export default cartSlice.reducer;
