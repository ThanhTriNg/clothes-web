import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ClothesApi from "../api/ClothesApi";
import { AddClothesProps, ClothesProps } from "../module";

interface myState {
  loading: boolean;
  successLogin: boolean;
  errorLogin: any;
  clothesInfo: ClothesProps[] | null;
  clothesById: ClothesProps | null;
  clothesByName: ClothesProps[] | null;
  loadingClothesByName: boolean;
  // clothesByCategoryId: ClothesProps[] | null;
  successLogout: boolean;
  errorLogout: string | null;
  colorAPI: colorAPI | null;
  sortValue: string;
}

const initialState: myState = {
  loading: false,
  successLogin: false,
  errorLogin: null,
  clothesInfo: null,
  clothesById: null,
  clothesByName: null,
  loadingClothesByName: false,
  // clothesByCategoryId: null,
  successLogout: false,
  errorLogout: null,
  colorAPI: null,
  sortValue: "0",
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

export const getLatestClothesThunk = createAsyncThunk(
  "getLatestClothes",
  async (arg, { rejectWithValue }) => {
    try {
      const response = await ClothesApi.getLatestClothes();
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

export const getClothesByCategoryThunk = createAsyncThunk(
  "getClothesByCategory",
  async (categoryId: string, { rejectWithValue }) => {
    try {
      const response = await ClothesApi.getClothesByCategory(categoryId);
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

export const getLatestClothesByCategoryThunk = createAsyncThunk(
  "getLatestClothesByCategory",
  async (categoryId: string, { rejectWithValue }) => {
    try {
      const response = await ClothesApi.getLatestClothesByCategory(categoryId);
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

export const getClothesPriceAscendingByCategoryThunk = createAsyncThunk(
  "getClothesPriceAscendingByCategory",
  async (categoryId: string, { rejectWithValue }) => {
    try {
      const response = await ClothesApi.getClothesPriceAscendingByCategory(
        categoryId
      );
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
export const getClothesPriceDescendingByCategoryThunk = createAsyncThunk(
  "getClothesPriceDescendingByCategory",
  async (categoryId: string, { rejectWithValue }) => {
    try {
      const response = await ClothesApi.getClothesPriceDescendingByCategory(
        categoryId
      );
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
export const getClothesByNameThunk = createAsyncThunk(
  "getClothesByName",
  async (name: string, { rejectWithValue }) => {
    try {
      const response = await ClothesApi.getClothesByName(name);
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

export const getClothesByPriceAscendingThunk = createAsyncThunk(
  "getClothesByPriceAscending",
  async (arg, { rejectWithValue }) => {
    try {
      const response = await ClothesApi.getClothesByPriceAscending();
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
export const getClothesByPriceDescendingThunk = createAsyncThunk(
  "getClothesByPriceDescending",
  async (arg, { rejectWithValue }) => {
    try {
      const response = await ClothesApi.getClothesByPriceDescending();
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
  reducers: {
    getSort: (state, action: PayloadAction<string>) => {
      state.sortValue = action.payload;
      // console.log(action.payload);
    },
  },

  extraReducers: (builder) => {
    //get all clothes
    builder.addCase(getClothesThunk.pending, (state) => {});
    builder.addCase(getClothesThunk.fulfilled, (state, action) => {
      state.clothesInfo = action.payload.data;
    });
    builder.addCase(getClothesThunk.rejected, (state, action) => {});

    //get all latest clothes
    builder.addCase(getLatestClothesThunk.pending, (state) => {});
    builder.addCase(getLatestClothesThunk.fulfilled, (state, action) => {
      state.clothesInfo = action.payload.data;
    });
    builder.addCase(getLatestClothesThunk.rejected, (state, action) => {});

    //get clothes by clothes id
    builder.addCase(getClothesByIdThunk.pending, (state) => {});
    builder.addCase(getClothesByIdThunk.fulfilled, (state, action) => {
      state.clothesById = action.payload.data;
    });

    //get clothes by clothes name
    builder.addCase(getClothesByNameThunk.pending, (state) => {
      state.loadingClothesByName = true;
    });
    builder.addCase(getClothesByNameThunk.fulfilled, (state, action) => {
      state.clothesByName = action.payload.data;
      state.loadingClothesByName = false;
    });
    builder.addCase(getClothesByNameThunk.rejected, (state, action) => {
      state.loadingClothesByName = false;
    });

    //get clothes by price asce
    builder.addCase(getClothesByPriceAscendingThunk.pending, (state) => {});
    builder.addCase(
      getClothesByPriceAscendingThunk.fulfilled,
      (state, action) => {
        state.clothesInfo = action.payload.data;
      }
    );
    builder.addCase(
      getClothesByPriceAscendingThunk.rejected,
      (state, action) => {}
    );
    //get clothes by price desc
    builder.addCase(getClothesByPriceDescendingThunk.pending, (state) => {});
    builder.addCase(
      getClothesByPriceDescendingThunk.fulfilled,
      (state, action) => {
        state.clothesInfo = action.payload.data;
      }
    );
    builder.addCase(
      getClothesByPriceDescendingThunk.rejected,
      (state, action) => {}
    );
    //get clothes by category id
    builder.addCase(getClothesByCategoryThunk.pending, (state) => {});
    builder.addCase(getClothesByCategoryThunk.fulfilled, (state, action) => {
      state.clothesInfo = action.payload.data;
    });
    builder.addCase(getClothesByCategoryThunk.rejected, (state, action) => {});

    //get clothes by category id
    builder.addCase(getLatestClothesByCategoryThunk.pending, (state) => {});
    builder.addCase(getLatestClothesByCategoryThunk.fulfilled, (state, action) => {
      state.clothesInfo = action.payload.data;
    });
    builder.addCase(getLatestClothesByCategoryThunk.rejected, (state, action) => {});

    //get clothes  by category id vs price asce
    builder.addCase(
      getClothesPriceAscendingByCategoryThunk.pending,
      (state) => {}
    );
    builder.addCase(
      getClothesPriceAscendingByCategoryThunk.fulfilled,
      (state, action) => {
        state.clothesInfo = action.payload.data;
      }
    );
    builder.addCase(
      getClothesPriceAscendingByCategoryThunk.rejected,
      (state, action) => {}
    );
    //get clothes by category id vs price desc
    builder.addCase(
      getClothesPriceDescendingByCategoryThunk.pending,
      (state) => {}
    );
    builder.addCase(
      getClothesPriceDescendingByCategoryThunk.fulfilled,
      (state, action) => {
        state.clothesInfo = action.payload.data;
      }
    );
    builder.addCase(
      getClothesPriceDescendingByCategoryThunk.rejected,
      (state, action) => {}
    );
    //get color name
    builder.addCase(getColorNameThunk.pending, (state) => {});
    builder.addCase(getColorNameThunk.fulfilled, (state, action) => {
      state.colorAPI = action.payload.data;
    });
    builder.addCase(getColorNameThunk.rejected, (state, action) => {});
  },
});
export const { getSort } = clothesSlice.actions;

export default clothesSlice.reducer;
