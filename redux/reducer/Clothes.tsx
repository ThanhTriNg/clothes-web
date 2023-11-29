import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ClothesApi from "../api/ClothesApi";
import { AddClothesProps, ClothesProps } from "../module";

interface myState {
  loading: boolean;
  successLogin: boolean;
  errorLogin: any;
  clothesInfo: ClothesProps[] | null;
  clothesById: ClothesProps | null;
  successLogout: boolean;
  errorLogout: string | null;

  colorAPI: colorAPI | null;
}

const initialState: myState = {
  loading: false,
  successLogin: false,
  errorLogin: null,
  clothesInfo: null,
  clothesById: null,
  successLogout: false,
  errorLogout: null,

  colorAPI: null,
};
interface colorAPI {
  name: {
    value: string;
  };
}
interface colors {
  hex: string;
}
export const getClothesThunk = createAsyncThunk(
  "getClothes",
  async (arg, { rejectWithValue }) => {
    try {
      const response = await ClothesApi.getClothes();
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
export const getClothesByIdThunk = createAsyncThunk(
  "getClothesById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await ClothesApi.getClothesById(id);
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
export const getColorNameThunk = createAsyncThunk(
  "getColorName",
  async (colors: colors, { rejectWithValue }) => {
    try {
      const { hex } = colors;
      const response = await ClothesApi.getColorName(hex);
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

export const addClothesThunk = createAsyncThunk(
  "addClothes",
  async (addClothes: AddClothesProps, { rejectWithValue }) => {
    try {
      const response = await ClothesApi.addClothes(addClothes);
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

export const clothesSlice = createSlice({
  name: "clothes",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    //get all clothes
    builder.addCase(getClothesThunk.pending, (state) => {});
    builder.addCase(getClothesThunk.fulfilled, (state, action) => {
      state.clothesInfo = action.payload.data;
    });
    builder.addCase(getClothesThunk.rejected, (state, action) => {});
    //get clothes by id
    builder.addCase(getClothesByIdThunk.pending, (state) => {});
    builder.addCase(getClothesByIdThunk.fulfilled, (state, action) => {
      state.clothesById = action.payload.data;
    });
    builder.addCase(getClothesByIdThunk.rejected, (state, action) => {});
    //get color name
    builder.addCase(getColorNameThunk.pending, (state) => {});
    builder.addCase(getColorNameThunk.fulfilled, (state, action) => {
      state.colorAPI = action.payload.data;
    });
    builder.addCase(getColorNameThunk.rejected, (state, action) => {});
  },
});

export default clothesSlice.reducer;
