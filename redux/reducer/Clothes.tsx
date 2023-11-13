import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ClothesApi from "../api/ClothesApi";

export interface Clothes {
  id: string;
  name: string;
  price: string;
  desc_sort: string;
  desc: string;
  img: {
    main: string;
  };
}

interface myState {
  loading: boolean;
  successLogin: boolean;
  errorLogin: any;
  clothesInfo: Clothes | null;
  successLogout: boolean;
  errorLogout: string | null;
}

const initialState: myState = {
  loading: false,
  successLogin: false,
  errorLogin: null,
  clothesInfo: null,

  successLogout: false,
  errorLogout: null,
};
export const getClothesThunk = createAsyncThunk(
  "getClothes",
  async (arg, { rejectWithValue }) => {
    try {
      const response = await ClothesApi.getClothes();
      // console.log(response);
      return response;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const clothesSlice = createSlice({
  name: "clothes",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    //log in
    builder.addCase(getClothesThunk.pending, (state) => {});
    builder.addCase(getClothesThunk.fulfilled, (state, action) => {
      state.clothesInfo = action.payload.data;
    });

    builder.addCase(getClothesThunk.rejected, (state, action) => {});
  },
});

export default clothesSlice.reducer;
