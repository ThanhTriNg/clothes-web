import {
  PayloadAction,
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { CartItem, ClothesPropsData } from "../module";
import { RootState } from "../store/Store";
import CartApi from "@/redux/api/CartApi";

interface myState {
  loading: boolean;
  cartItems: CartItem[];
  cartItemsTest: any[];
  isOpenDrawerCart: boolean;
}

const initialState: myState = {
  loading: false,
  cartItems: [],
  isOpenDrawerCart: false,
  cartItemsTest: [],
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
export const getCartThunk = createAsyncThunk(
  "getCart",
  async (arg, { rejectWithValue }) => {
    try {
      const response = await CartApi.getCart();
      return response;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const addCartItemThunk = createAsyncThunk(
  "addCartItem",
  async (cartItem: any, { rejectWithValue }) => {
    try {
      const response = await CartApi.addCartItem(cartItem);
      return response;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
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
  extraReducers: (builder) => {
    // get Cart
    builder.addCase(getCartThunk.pending, (state) => {});
    builder.addCase(getCartThunk.fulfilled, (state, action) => {
      state.cartItemsTest = action.payload.data.data[0];
    });
    builder.addCase(getCartThunk.rejected, (state, action) => {});

    // add cart item
    builder.addCase(addCartItemThunk.pending, (state) => {});
    builder.addCase(addCartItemThunk.fulfilled, (state, action) => {
    });
    builder.addCase(addCartItemThunk.rejected, (state, action) => {});
  },
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
