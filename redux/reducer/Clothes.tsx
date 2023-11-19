import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ClothesApi from "../api/ClothesApi";
import { addClothesProps } from "../module";
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

  colorAPI: colorAPI | null;
}

const initialState: myState = {
  loading: false,
  successLogin: false,
  errorLogin: null,
  clothesInfo: null,

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
      console.log(response);
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

export const getColorNameThunk = createAsyncThunk(
  "getColorName",
  async (colors: colors, { rejectWithValue }) => {
    try {
      const { hex } = colors;
      const response = await ClothesApi.getColorName(hex);
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

export const addClothesThunk = createAsyncThunk(
  "addClothes",
  async (addClothes: addClothesProps, { rejectWithValue }) => {
    try {
      const response = await ClothesApi.addClothes(addClothes);
      console.log(response)
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

    //get color name

    builder.addCase(getColorNameThunk.pending, (state) => {});
    builder.addCase(getColorNameThunk.fulfilled, (state, action) => {
      state.colorAPI = action.payload.data;
    });

    builder.addCase(getColorNameThunk.rejected, (state, action) => {});
  },
});

export default clothesSlice.reducer;
