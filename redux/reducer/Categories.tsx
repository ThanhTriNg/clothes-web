import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CategoriesApi from "../api/CategoriesApi";
import { Categories, GetSubCateProps, SubCateProps } from "../module";

interface myState {
  loading: boolean;
  successLogin: boolean;
  errorLogin: any;
  categoriesInfo: Categories[] | null;
  subCateInfo: SubCateProps[] | null;
  successLogout: boolean;
  errorLogout: string | null;
}

const initialState: myState = {
  loading: false,
  successLogin: false,
  errorLogin: null,
  categoriesInfo: null,
  subCateInfo: null,

  successLogout: false,
  errorLogout: null,
};

export const getCategoriesThunk = createAsyncThunk(
  "getCategories",
  async (arg, { rejectWithValue }) => {
    try {
      const response = await CategoriesApi.getCategories();
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
export const getSubCateThunk = createAsyncThunk(
  "getSubCate",
  async (getSubCate: GetSubCateProps, { rejectWithValue }) => {
    try {
      const response = await CategoriesApi.getSubCate(getSubCate);
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
export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    // categories
    builder.addCase(getCategoriesThunk.pending, (state) => {});
    builder.addCase(getCategoriesThunk.fulfilled, (state, action) => {
      state.categoriesInfo = action.payload.data;
    });
    builder.addCase(getCategoriesThunk.rejected, (state, action) => {});
    //sub categories
    builder.addCase(getSubCateThunk.pending, (state) => {});
    builder.addCase(getSubCateThunk.fulfilled, (state, action) => {
      state.subCateInfo = action.payload.data;
    });
    builder.addCase(getSubCateThunk.rejected, (state, action) => {});
  },
});

export default categoriesSlice.reducer;
