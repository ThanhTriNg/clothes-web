import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ClothesApi from '../api/ClothesApi';
import { AddClothesProps, ClothesProps, ClothesPropsData } from '../module';

interface myState {
    loading: boolean;
    successLogin: boolean;
    errorLogin: any;
    clothesInfoData: ClothesProps | null;
    testTy: ClothesPropsData[] | null;
    clothesInfo: ClothesProps | null;
    clothesById: ClothesPropsData | null;
    clothesByIdLoading: boolean;
    clothesByName: ClothesProps | null;
    loadingClothesByName: boolean;
    colorAPI: colorAPI | null;
    sortValue: string;
}

const initialState: myState = {
    loading: false,
    testTy: null,
    successLogin: false,
    errorLogin: null,
    clothesInfoData: null,
    clothesInfo: null,
    clothesById: null,
    clothesByIdLoading: false,
    clothesByName: null,
    loadingClothesByName: false,
    colorAPI: null,
    sortValue: '0',
};
interface colorAPI {
    name: {
        value: string;
    };
}
interface colors {
    hex: string;
}

export const getClothesThunk = createAsyncThunk('getClothes', async (sortValue: string, { rejectWithValue }) => {
    try {
        if (sortValue === '0') {
            const response = await ClothesApi.getClothes();
            return response;
        } else if (sortValue === '1') {
            const params = { sort: 'createdAt', order: 'DESC' };
            const response = await ClothesApi.getClothes(params);
            return response;
        } else if (sortValue === '2') {
            const params = { sort: 'price' };
            const response = await ClothesApi.getClothes(params);
            return response;
        } else if (sortValue === '3') {
            const params = { sort: 'price', order: 'DESC' };
            const response = await ClothesApi.getClothes(params);
            return response;
        }
    } catch (error: any) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

// export const getClothesByCategoryThunk = createAsyncThunk(
//     'getClothesByCategory',
//     async ({ categoryId, sortValue }: { categoryId: string; sortValue: string }, { rejectWithValue }) => {
//         try {
//             if (sortValue === '0') {
//                 const response = await ClothesApi.getClothesByCategory(categoryId);
//                 return response;
//             } else if (sortValue === '1') {

//                 const response = await ClothesApi.getLatestClothesByCategory(categoryId);
//                 return response;
//             } else if (sortValue === '2') {
//                 const response = await ClothesApi.getClothesPriceAscendingByCategory(categoryId);
//                 return response;
//             } else if (sortValue === '3') {
//                 const response = await ClothesApi.getClothesPriceDescendingByCategory(categoryId);
//                 return response;
//             }
//         } catch (error: any) {
//             if (error.response && error.response.data.message) {
//                 return rejectWithValue(error.response.data.message);
//             } else {
//                 return rejectWithValue(error.message);
//             }
//         }
//     },
// );
export const getClothesByCategoryThunk = createAsyncThunk(
    'getClothesByCategory',
    async ({ categoryId, sortValue }: { categoryId: string; sortValue: string }, { rejectWithValue }) => {
        try {
            if (sortValue === '0') {
                const response = await ClothesApi.getClothesByCategory(categoryId);

                return response;
            } else if (sortValue === '1') {
                const params = { sort: 'createdAt', order: 'DESC' };
                const response = await ClothesApi.getClothesByCategory(categoryId, params);
                return response;
            } else if (sortValue === '2') {
                const params = { sort: 'price' };
                const response = await ClothesApi.getClothesByCategory(categoryId, params);
                return response;
            } else if (sortValue === '3') {
                const params = { sort: 'price', order: 'DESC' };
                const response = await ClothesApi.getClothesByCategory(categoryId, params);
                return response;
            }
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    },
);

export const getClothesBySubCategoryThunk = createAsyncThunk(
    'getClothesBySubCategory',
    async ({ subCateId, sortValue }: { subCateId: number[]; sortValue: string }, { rejectWithValue }) => {
        try {
            if (sortValue === '0') {
                const response = await ClothesApi.getClothesBySubCategory(subCateId);
                return response;
            } else if (sortValue === '1') {
                const params = { sort: 'createdAt', order: 'DESC' };
                const response = await ClothesApi.getClothesBySubCategory(subCateId, params);
                return response;
            } else if (sortValue === '2') {
                const params = { sort: 'price' };
                const response = await ClothesApi.getClothesBySubCategory(subCateId, params);
                return response;
            } else if (sortValue === '3') {
                const params = { sort: 'price', order: 'DESC' };
                const response = await ClothesApi.getClothesBySubCategory(subCateId, params);
                return response;
            }
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    },
);

export const getClothesByIdThunk = createAsyncThunk('getClothesById', async (id: string, { rejectWithValue }) => {
    try {
        const response = await ClothesApi.getClothesById(id);
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

export const getClothesByNameThunk = createAsyncThunk(
    'getClothesByName',
    async ({ name, pageSize }: { name: string; pageSize?: number }, { rejectWithValue }) => {
        try {
            const params = { name, pageSize };
            const response = await ClothesApi.getClothes(params);
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
export const deleteClothesByIdThunk = createAsyncThunk('deleteClothesById', async (id: string, { rejectWithValue }) => {
    try {
        const response = await ClothesApi.deleteClothesById(id);
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});
export const getSearchClothesByNameThunk = createAsyncThunk(
    'getSearchClothesByName',
    async (name: string, { rejectWithValue }) => {
        try {
            const params = { name };
            const response = await ClothesApi.getClothes(params);
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
export const getColorNameThunk = createAsyncThunk('getColorName', async (colors: colors, { rejectWithValue }) => {
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
});

export const addClothesThunk = createAsyncThunk(
    'addClothes',
    async (addClothes: AddClothesProps, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('imageUrl', addClothes.imageUrl);
            console.log('addClothes.subImageUrls>>', addClothes.subImageUrls);
            addClothes.subImageUrls.forEach((file: File) => {
                formData.append('subImageUrls', file);
            });
            formData.append('name', addClothes.name);
            formData.append('price', addClothes.price);

            formData.append('description', addClothes.description);
            formData.append('descriptionSort', addClothes.descriptionSort);

            formData.append('subCategoryId', addClothes.subCategoryId);

            const response = await ClothesApi.addClothes(formData);

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
export const clothesSlice = createSlice({
    name: 'clothes',
    initialState,
    reducers: {
        getSort: (state, action: PayloadAction<string>) => {
            state.sortValue = action.payload;
        },
    },

    extraReducers: (builder) => {
        //get all clothes
        builder.addCase(getClothesThunk.pending, (state) => {});
        builder.addCase(getClothesThunk.fulfilled, (state, action) => {
            if (action.payload) state.clothesInfo = action.payload.data;
        });
        builder.addCase(getClothesThunk.rejected, (state, action) => {});

        //get clothes by clothes id
        builder.addCase(getClothesByIdThunk.pending, (state) => {
            state.clothesByIdLoading = true;
        });
        builder.addCase(getClothesByIdThunk.fulfilled, (state, action) => {
            state.clothesById = action.payload.data;
            state.clothesByIdLoading = false;
        });
        builder.addCase(getClothesByIdThunk.rejected, (state, action) => {
            state.clothesByIdLoading = false;
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

        //get search clothes by clothes name
        builder.addCase(getSearchClothesByNameThunk.pending, (state) => {
            state.loadingClothesByName = true;
        });
        builder.addCase(getSearchClothesByNameThunk.fulfilled, (state, action) => {
            state.clothesInfo = action.payload.data;
            state.loadingClothesByName = false;
        });
        builder.addCase(getSearchClothesByNameThunk.rejected, (state, action) => {
            state.loadingClothesByName = false;
        });
        //get clothes by category id
        builder.addCase(getClothesByCategoryThunk.pending, (state) => {});
        builder.addCase(getClothesByCategoryThunk.fulfilled, (state, action) => {
            if (action.payload) state.clothesInfoData = action.payload.data;
        });
        builder.addCase(getClothesByCategoryThunk.rejected, (state, action) => {});

        //test get clothes by sub category id
        builder.addCase(getClothesBySubCategoryThunk.pending, (state) => {});
        builder.addCase(getClothesBySubCategoryThunk.fulfilled, (state, action) => {
            if (action.payload) state.clothesInfo = action.payload.data;
        });
        builder.addCase(getClothesBySubCategoryThunk.rejected, (state, action) => {});

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
