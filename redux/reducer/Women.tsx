import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import WomenApi from "../api/WomenApi";
export interface Women {
  id: string;
  name: string;
  categoryId: string;
}

interface myState {
  loading: boolean;
  womenInfo: Women[] | null;
}

const initialState: myState = {
  loading: false,
  womenInfo: null,
};

export const getWomenClothesThunk = createAsyncThunk(
  "getWomenClothes",
  async (categoryId: string, { rejectWithValue }) => {
    try {
      const response = await WomenApi.getWomenClothes(categoryId);
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

export const womenSlice = createSlice({
  name: "women",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getWomenClothesThunk.pending, (state) => {});
    builder.addCase(getWomenClothesThunk.fulfilled, (state, action) => {
      state.womenInfo = action.payload.data;
    });

    builder.addCase(getWomenClothesThunk.rejected, (state, action) => {});
  },
});

export default womenSlice.reducer;
