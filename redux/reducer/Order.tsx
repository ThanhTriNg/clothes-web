import OrderApi from '@/redux/api/OrderApi';
import { OrderProps } from '@/redux/module';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface myState {
    successOrder: boolean;
    errorOrder: boolean;
    message: string | null;
}

const initialState: myState = {
    successOrder: false,
    errorOrder: false,
    message: null,
};

export const createOrderThunk = createAsyncThunk(
    'createOrder',
    async (orderItems: OrderProps[], { rejectWithValue }) => {
        try {
            const response = await OrderApi.createOrder(orderItems);
            console.log(response);
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
        builder.addCase(createOrderThunk.pending, (state) => {
            state.errorOrder = false;
            state.successOrder = false;
        });
        builder.addCase(createOrderThunk.fulfilled, (state, action) => {
            state.successOrder = true;
            state.message = action.payload.data.message;
        });
        builder.addCase(createOrderThunk.rejected, (state, action) => {
            state.errorOrder = true;
        });
    },
});

export default orderSlice.reducer;
