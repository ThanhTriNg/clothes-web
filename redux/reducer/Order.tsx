import OrderApi from '@/redux/api/OrderApi';
import { OrderInfoProps, OrderItemProps, OrderProps } from '@/redux/module';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface myState {
    orderInfo: OrderInfoProps[] | null;
    // orderItemsById: OrderItemProps[] | null;
    successOrder: boolean;
    errorOrder: boolean;
    message: string | null;
}

const initialState: myState = {
    orderInfo: null,
    // orderItemsById: null,
    successOrder: false,
    errorOrder: false,
    message: null,
};

interface OrderAdminParams {
    orderID?: string;
}
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
// export const getOrderAdminThunk = createAsyncThunk(
//     'getOrderAdmin',
//     async ({ orderID }: OrderAdminParams, { rejectWithValue }) => {
//         try {
//             // const params = { orderID };

//             const response = await OrderApi.getOrderAdmin(params);
//             return response;
//         } catch (error: any) {
//             if (error.response && error.response.data.message) {
//                 return rejectWithValue(error.response.data.message);
//             } else {
//                 return rejectWithValue(error.message);
//             }
//         }
//     },
// );

export const getOrderAdminThunk = createAsyncThunk('getOrderAdmin', async (arg, { rejectWithValue }) => {
    try {
        const response = await OrderApi.getOrderAdmin();
        return response;
    } catch (error: any) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});
export const getOrderAdminByIDThunk = createAsyncThunk(
    'getOrderAdminByID',
    async ({ orderID }: OrderAdminParams, { rejectWithValue }) => {
        try {
            const params = { orderID };
            const response = await OrderApi.getOrderAdmin(params);
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
// export const getOrderItemsAdminByIdThunk = createAsyncThunk(
//     'getOrderItemsAdminById',
//     async (orderId: number, { rejectWithValue }) => {
//         try {
//             const response = await OrderApi.getOrderItemsAdminById(orderId);
//             console.log('response>>', response);
//             return response;
//         } catch (error: any) {
//             if (error.response && error.response.data.message) {
//                 return rejectWithValue(error.response.data.message);
//             } else {
//                 return rejectWithValue(error.message);
//             }
//         }
//     },
// );
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
        // admin - get all order
        builder.addCase(getOrderAdminThunk.pending, (state) => {});
        builder.addCase(getOrderAdminThunk.fulfilled, (state, action) => {
            state.orderInfo = action.payload.data.data;
        });
        builder.addCase(getOrderAdminThunk.rejected, (state, action) => {});

        // admin- get order by id
        builder.addCase(getOrderAdminByIDThunk.pending, (state) => {});
        builder.addCase(getOrderAdminByIDThunk.fulfilled, (state, action) => {
            state.orderInfo = action.payload.data.data;
        });
        builder.addCase(getOrderAdminByIDThunk.rejected, (state, action) => {});
    },
});

export default orderSlice.reducer;
