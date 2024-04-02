import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CategoriesApi from "../api/CategoriesApi";
import { CategoriesProps, GetSubCateProps, SubCateProps } from "../module";

interface myState {
  loading: boolean;
  successLogin: boolean;
  errorLogin: any;
  categoriesInfo: CategoriesProps[] | null;
  menSubCateInfo: SubCateProps[] | null;
  womenSubCateInfo: SubCateProps[] | null;

  subCateByIdInfo: SubCateProps[] | null;
  successLogout: boolean;
  errorLogout: string | null;
  saveCateMen: CategoriesProps[] | null;
  saveCateWomen: CategoriesProps[] | null;
}

const initialState: myState = {
  loading: false,
  successLogin: false,
  errorLogin: null,
  categoriesInfo: null,
  menSubCateInfo: null,
  womenSubCateInfo: null,
  subCateByIdInfo: null,

  successLogout: false,
  errorLogout: null,

  saveCateMen: null,
  saveCateWomen: null,
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

export const getMenSubCateThunk = createAsyncThunk(
  "getMenSubCate",
  async (arg, { rejectWithValue }) => {
    try {
      const response = await CategoriesApi.getMenSubCate();
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
export const getWomenSubCateThunk = createAsyncThunk(
  "getWomenSubCate",
  async (arg, { rejectWithValue }) => {
    try {
      const response = await CategoriesApi.getWomenSubCate();
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

export const getSubCateByCategoryIdThunk = createAsyncThunk(
  "getSubCateByCategoryId",
  async (getSubCate: GetSubCateProps, { rejectWithValue }) => {
    try {
      const response = await CategoriesApi.getSubCateByCategoryId(getSubCate);
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

export const getMenSubCateByCategoryIdThunk = createAsyncThunk(
  "getMenSubCateByCategoryId",
  async (getSubCate: GetSubCateProps, { rejectWithValue }) => {
    try {
      let { subName, categoryId } = getSubCate;
      subName = "men";
      const response = await CategoriesApi.getSubCateByCategoryId({
        subName,
        categoryId,
      });
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
  reducers: {
    saveCateMen: (state, action: PayloadAction<CategoriesProps[]>) => {
      state.saveCateMen = action.payload;
    },
    saveCateWomen: (state, action: PayloadAction<CategoriesProps[]>) => {
      state.saveCateWomen = action.payload;
    },
  },

  extraReducers: (builder) => {
    // categories
    builder.addCase(getCategoriesThunk.pending, (state) => {});
    builder.addCase(getCategoriesThunk.fulfilled, (state, action) => {
      state.categoriesInfo = action.payload.data;
    });
    builder.addCase(getCategoriesThunk.rejected, (state, action) => {});
    //get MEN sub categories
    builder.addCase(getMenSubCateThunk.pending, (state) => {});
    builder.addCase(getMenSubCateThunk.fulfilled, (state, action) => {
      state.menSubCateInfo = action.payload.data;
    });
    builder.addCase(getMenSubCateThunk.rejected, (state, action) => {});
    //get WOMEN sub categories
    builder.addCase(getWomenSubCateThunk.pending, (state) => {});
    builder.addCase(getWomenSubCateThunk.fulfilled, (state, action) => {
      state.womenSubCateInfo = action.payload.data;
    });
    builder.addCase(getWomenSubCateThunk.rejected, (state, action) => {});

    //get sub categories by id
    builder.addCase(getSubCateByCategoryIdThunk.pending, (state) => {});
    builder.addCase(getSubCateByCategoryIdThunk.fulfilled, (state, action) => {
      state.subCateByIdInfo = action.payload.data;
    });
    builder.addCase(
      getSubCateByCategoryIdThunk.rejected,
      (state, action) => {}
    );
  },
});
export const { saveCateMen, saveCateWomen } = categoriesSlice.actions;

export default categoriesSlice.reducer;
