import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { CartItem, ClothesPropsData } from "../module";
import { RootState } from "../store/Store";

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

const isExist = (
  cartItems: CartItem[],
  id: number,
  size: string,
  color: string
) =>
  cartItems.find(
    (el) => el.product.id === id && el.size === size && el.color === color
  );
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment: (
      state,
      action: PayloadAction<{
        product: ClothesPropsData;
        size: string;
        color: string;
      }>
    ) => {
      const { product, size, color } = action.payload;
      const item = isExist(state.cartItems, product.id, size, color);

      const test = state.cartItems.find((el) => el.product.id === product.id);
      if (item) {
        item.qty++;
      } else {
        state.cartItems.push({ product, qty: 1, size, color });
      }
      // You can also store the size in the cart item here if needed
      // For example:
      // item.size = size;
    },

    decrement: (
      state,
      action: PayloadAction<{
        product: ClothesPropsData;
        size: string;
        color: string;
      }>
    ) => {
      const { product, size, color } = action.payload;
      const item = isExist(state.cartItems, product.id, size, color);
      if (item) {
        item.qty--;
        if (item.qty === 0) {
          state.cartItems = state.cartItems.filter(
            (el) =>
              !(
                el.product.id === product.id &&
                el.size === size &&
                el.color === color
              )
          );
        }
      }
    },

    remove: (
      state,
      action: PayloadAction<{
        product: ClothesPropsData;
        size: string;
        color: string;
      }>
    ) => {
      const { product, size, color } = action.payload;
      const item = isExist(state.cartItems, product.id, size, color);
      if (item) {
        item.qty = 0;
        state.cartItems = state.cartItems.filter(
          (el) =>
            !(
              el.product.id === product.id &&
              el.size === size &&
              el.color === color
            )
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
  [
    cartItems,
    (state, productId: number) => productId,
    (state, productId, size: string) => size,
    (state, productId, size: string, color: string) => color,
  ],
  (cartItems, productId, size, color) =>
    cartItems.find(
      (el) =>
        el.product.id === productId && el.size === size && el.color === color
    )?.qty
);

export const { increment, decrement, remove, getIsOpenDrawerCart } =
  cartSlice.actions;
export default cartSlice.reducer;
