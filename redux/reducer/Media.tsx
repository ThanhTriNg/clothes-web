import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import MediaApi from '@/redux/api/MediaApi';
import { MediaCloudinaryProps } from '@/redux/module';

interface myState {
    mediaInfo: MediaCloudinaryProps[] | null;
    nextCursor: string | null;
}

const initialState: myState = {
    mediaInfo: null,
    nextCursor: null,
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
export const mediaSlice = createSlice({
    name: 'media',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        //edit clothes
        builder.addCase(getMediaThunk.pending, (state) => {});
        builder.addCase(getMediaThunk.fulfilled, (state, action) => {
            state.mediaInfo = action.payload.data.resources;
            state.nextCursor = action.payload.data.nextCursor;
        });
        builder.addCase(getMediaThunk.rejected, (state, action) => {});
    },
});

export default mediaSlice.reducer;
