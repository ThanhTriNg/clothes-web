import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import CategoriesApi from '../api/CategoriesApi';
import { CateApiProps, CategoriesProps, GetSubCateProps, SubCateProps } from '../module';

interface myState {
    loading: boolean;
    successLogin: boolean;
    errorLogin: any;
    categoriesInfo: CategoriesProps[] | null;
    subCateByIdInfo: SubCateProps[] | null;
    saveCateMen: CategoriesProps[] | null;
    saveCateWomen: CategoriesProps[] | null;
    subCateInfo: SubCateProps[] | null;
}

const initialState: myState = {
    loading: false,
    successLogin: false,
    errorLogin: null,
    categoriesInfo: null,
    subCateByIdInfo: null,
    subCateInfo: null,
    saveCateMen: null,
    saveCateWomen: null,
};

export const getCategoriesThunk = createAsyncThunk('getCategories', async (arg, { rejectWithValue }) => {
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
});

// export const getMenSubCateThunk = createAsyncThunk(
//   "getMenSubCate",
//   async (arg, { rejectWithValue }) => {
//     try {
//       const response = await CategoriesApi.getMenSubCate();
//       return response;
//     } catch (error: any) {
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message);
//       } else {
//         return rejectWithValue(error.message);
//       }
//     }
//   }
// );
// export const getWomenSubCateThunk = createAsyncThunk(
//   "getWomenSubCate",
//   async (arg, { rejectWithValue }) => {
//     try {
//       const response = await CategoriesApi.getWomenSubCate();
//       return response;
//     } catch (error: any) {
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message);
//       } else {
//         return rejectWithValue(error.message);
//       }
//     }
//   }
// );

//test
export const getSubCateByCateIdThunk = createAsyncThunk(
    'getSubCateByCateId',
    async (categoryId: number, { rejectWithValue }) => {
        try {
            const response = await CategoriesApi.getSubCateByCateId(categoryId);
            return response;
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    },
);

export const createCateThunk = createAsyncThunk('createCate', async (cate: CateApiProps, { rejectWithValue }) => {
    try {
        const response = await CategoriesApi.createCate(cate);
        return response;
    } catch (error: any) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});
export const getAllSubCateThunk = createAsyncThunk('getAllSubCate', async (arg, { rejectWithValue }) => {
    try {
        const response = await CategoriesApi.getAllSubCate();
        return response;
    } catch (error: any) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

export const categoriesSlice = createSlice({
    name: 'categories',
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
            state.categoriesInfo = action.payload.data.data;
        });
        builder.addCase(getCategoriesThunk.rejected, (state, action) => {});

        //test
        builder.addCase(getSubCateByCateIdThunk.pending, (state) => {});
        builder.addCase(getSubCateByCateIdThunk.fulfilled, (state, action) => {
            if (action.payload) state.subCateInfo = action.payload.data.data;
        });
        builder.addCase(getSubCateByCateIdThunk.rejected, (state, action) => {});

        builder.addCase(getAllSubCateThunk.pending, (state) => {});
        builder.addCase(getAllSubCateThunk.fulfilled, (state, action) => {
            state.subCateInfo = action.payload.data.data;
        });
        builder.addCase(getAllSubCateThunk.rejected, (state, action) => {});
    },
});
export const { saveCateMen, saveCateWomen } = categoriesSlice.actions;

export default categoriesSlice.reducer;
