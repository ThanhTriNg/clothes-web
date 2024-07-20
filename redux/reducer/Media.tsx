import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import MediaApi from '@/redux/api/MediaApi';
import { MediaCloudinaryProps } from '@/redux/module';

interface myState {
    loading: boolean;
    mediaInfo: MediaCloudinaryProps[] | null;
    nextCursor: string | null;
    saveProductImage: MediaCloudinaryProps | null;
    saveProductGallery: MediaCloudinaryProps[] | null;
}

const initialState: myState = {
    loading: false,
    mediaInfo: null,
    nextCursor: null,
    saveProductImage: null,
    saveProductGallery: null,
};

export const getMediaThunk = createAsyncThunk('getMedia', async (nextCursor: string | null, { rejectWithValue }) => {
    try {
        if (!nextCursor) {
            const response = await MediaApi.getMedia();
            return response;
        } else {
            const params = { nextCursor };
            const response = await MediaApi.getMedia(params);
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

export const uploadImageThunk = createAsyncThunk('uploadImage', async (imageUrls: any, { rejectWithValue }) => {
    try {
        const formData = new FormData();
        imageUrls.forEach((file: File) => {
            formData.append('imageUrls', file);
        });
        const response = await MediaApi.uploadImage(formData);
        return response;
    } catch (error: any) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});
export const mediaSlice = createSlice({
    name: 'media',
    initialState,
    reducers: {
        getProductImage: (state, action: PayloadAction<MediaCloudinaryProps>) => {
            console.log(action);
            state.saveProductImage = action.payload;
        },
        getProductGallery: (state, action: PayloadAction<MediaCloudinaryProps[]>) => {
            state.saveProductGallery = action.payload;
        },

        // getIsOpenDrawerCart: (state, action: PayloadAction<boolean>) => {
        //     state.isOpenDrawerCart = action.payload;
        // },
    },

    extraReducers: (builder) => {
        //edit clothes
        builder.addCase(getMediaThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getMediaThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.mediaInfo = action.payload.data.resources;
            state.nextCursor = action.payload.data.nextCursor;
        });
        builder.addCase(getMediaThunk.rejected, (state, action) => {
            state.loading = false;
        });
    },
});

export const { getProductImage, getProductGallery } = mediaSlice.actions;
export default mediaSlice.reducer;
