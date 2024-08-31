import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ClothesApi from '../api/ClothesApi';
import { AddClothesProps, ClothesProps, ClothesPropsData, SortValueType } from '../module';

interface myState {
    loading: boolean;
    successEdit: boolean;
    errorEdit: boolean;
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
    sortValue: SortValueType | null;

    loadingClothes: boolean;
}

const initialState: myState = {
    loading: false,
    successEdit: false,
    errorEdit: false,
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
    sortValue: null,
    loadingClothes: false,
};
interface colorAPI {
    name: {
        value: string;
    };
}
interface colors {
    hex: string;
}

interface ClothesParams extends SortValueType {
    page: number;
    pageSize?: number;
}

export const getClothesThunk = createAsyncThunk(
    'getClothes',
    async ({ sortBy, sortOrder, page, pageSize = 10 }: ClothesParams, { rejectWithValue }) => {
        try {
            // if (sortValue === '0') {
            //     const params = { sort: sortBy, order: sortOrder, page, pageSize: pageSize };
            //     const response = await ClothesApi.getClothes(params);
            //     return response;
            // } else if (sortValue === '1') {
            //     const params = { sort: 'createdAt', order: 'DESC', page };
            //     const response = await ClothesApi.getClothes(params);
            //     return response;
            // } else if (sortValue === '2') {
            //     const params = { sort: 'price', page };
            //     const response = await ClothesApi.getClothes(params);
            //     return response;
            // } else if (sortValue === '3') {
            //     const params = { sort: 'price', order: 'DESC', page };
            //     const response = await ClothesApi.getClothes(params);
            //     return response;
            // }
            // let params = { sort: sortBy, page, pageSize };

            // if (sortOrder === '') {
            //     params = { sort: sortBy, page, pageSize };
            // } else {
            //     params = { sort: sortBy, order: sortOrder, page, pageSize };
            // }
            const params = {
                page,
                pageSize,
                ...(sortBy && { sort: sortBy }), // Only include sort if sortBy is not null
                ...(sortOrder && { order: sortOrder }), // Only include order if sortOrder is not null
            };

            // console.log('params>>', params);
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
interface ClothesSubParams extends SortValueType {
    subCateId: number[];
}

export const getClothesBySubCategoryThunk = createAsyncThunk(
    'getClothesBySubCategory',
    async ({ subCateId, sortBy, sortOrder }: ClothesSubParams, { rejectWithValue }) => {
        try {
            // if (sortValue === '0') {
            //     const response = await ClothesApi.getClothesBySubCategory(subCateId);
            //     return response;
            // } else if (sortValue === '1') {
            //     const params = { sort: 'createdAt', order: 'DESC' };
            //     const response = await ClothesApi.getClothesBySubCategory(subCateId, params);
            //     return response;
            // } else if (sortValue === '2') {
            //     const params = { sort: 'price' };
            //     const response = await ClothesApi.getClothesBySubCategory(subCateId, params);
            //     return response;
            // } else if (sortValue === '3') {
            //     const params = { sort: 'price', order: 'DESC' };
            //     const response = await ClothesApi.getClothesBySubCategory(subCateId, params);
            //     return response;
            // }

            const params = {
                ...(sortBy && { sort: sortBy }), // Only include sort if sortBy is not null
                ...(sortOrder && { order: sortOrder }), // Only include order if sortOrder is not null
            };

            // console.log('params>>', params);
            // const response = await ClothesApi.getClothes(params);
            const response = await ClothesApi.getClothesBySubCategory(subCateId, params);
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
            // const formData = new FormData();
            // formData.append('imageUrl', addClothes.imageUrl);
            // addClothes.subImageUrls.forEach((file: File) => {
            //     formData.append('subImageUrls', file);
            // });
            // formData.append('name', addClothes.name);
            // formData.append('price', addClothes.price);

            // formData.append('description', addClothes.description);
            // formData.append('descriptionSort', addClothes.descriptionSort);

            // formData.append('subCategoryId', addClothes.subCategoryId);
            const response = await ClothesApi.addClothes(addClothes);

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

export const editClothesThunk = createAsyncThunk(
    'editClothes',
    async ({ editCloth, id }: { editCloth: AddClothesProps; id: string }, { rejectWithValue }) => {
        try {
            // const formData = new FormData();
            // formData.append('imageUrl', editCloth.imageUrl);
            // editCloth.subImageUrls.forEach((file: File) => {
            //     formData.append('subImageUrls', file);
            // });
            // formData.append('name', editCloth.name);
            // formData.append('price', editCloth.price);

            // formData.append('description', editCloth.description);
            // formData.append('descriptionSort', editCloth.descriptionSort);

            // formData.append('subCategoryId', editCloth.subCategoryId);

            const response = await ClothesApi.editClothes(editCloth, id);

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
        getSort: (state, action: PayloadAction<SortValueType>) => {
            state.sortValue = action.payload;
        },
    },

    extraReducers: (builder) => {
        //get all clothes
        builder.addCase(getClothesThunk.pending, (state) => {
            state.loadingClothes = true;
        });
        builder.addCase(getClothesThunk.fulfilled, (state, action) => {
            if (action.payload) state.clothesInfo = action.payload.data;
            state.loadingClothes = false;
        });
        builder.addCase(getClothesThunk.rejected, (state, action) => {
            state.loadingClothes = false;
        });

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

        //add clothes
        builder.addCase(addClothesThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addClothesThunk.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(addClothesThunk.rejected, (state, action) => {
            state.loading = false;
        });
        //edit clothes
        builder.addCase(editClothesThunk.pending, (state) => {
            state.loading = true;
            state.errorEdit = false;
            state.successEdit = false;
        });
        builder.addCase(editClothesThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.errorEdit = false;
            state.successEdit = true;
        });
        builder.addCase(editClothesThunk.rejected, (state, action) => {
            state.loading = false;
            state.errorEdit = true;
            state.successEdit = false;
        });
    },
});
export const { getSort } = clothesSlice.actions;

export default clothesSlice.reducer;
