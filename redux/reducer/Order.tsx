import OrderApi from '@/redux/api/OrderApi';
import { OrderProps } from '@/redux/module';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface myState {}

const initialState: myState = {};

export const createOrderThunk = createAsyncThunk(
    'createOrder',
    async (orderItems: OrderProps[], { rejectWithValue }) => {
        try {
            const response = await OrderApi.createOrder(orderItems);
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
export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        // create order
        builder.addCase(createOrderThunk.pending, (state) => {});
        builder.addCase(createOrderThunk.fulfilled, (state, action) => {});
        builder.addCase(createOrderThunk.rejected, (state, action) => {});
    },
});

export default orderSlice.reducer;
