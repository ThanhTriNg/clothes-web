import Cookies from 'js-cookie';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserAuthProps, UserProps } from '../module';
import UserApi from '../api/UserApi';

interface myState {
    loading: boolean;
    successLogin: boolean;
    errorLogin: boolean;
    message: string | null;
    successLogout: boolean;
    errorLogout: string | null;
    errorSignupText: string | null;

    successSignup: boolean;
    errorSignup: any;

    userInfo: UserProps | null;
}

const initialState: myState = {
    loading: false,
    successLogin: false,
    errorLogin: false,
    message: null,
    successLogout: false,
    errorLogout: null,
    errorSignupText: null,

    successSignup: false,
    errorSignup: null,
    userInfo: null,
};

export const loginThunk = createAsyncThunk('logIn', async (UserAuthProps: UserAuthProps, { rejectWithValue }) => {
    try {
        const response = await UserApi.logIn(UserAuthProps);
        const token = response.data.access_token;
        Cookies.set('token', token);
        return response;
    } catch (error: any) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

export const signUpThunk = createAsyncThunk('signUp', async (UserAuthProps: UserAuthProps, { rejectWithValue }) => {
    try {
        const response = await UserApi.signUp(UserAuthProps);
        return response;
    } catch (error: any) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.response.data);
        }
    }
});

export const getUserThunk = createAsyncThunk('getUser', async (arg, { rejectWithValue }) => {
    try {
        const response = await UserApi.getUser();
        return response;
    } catch (error: any) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.response.data);
        }
    }
});
export const updateUserThunk = createAsyncThunk('updateUser', async (updateUser: UserProps, { rejectWithValue }) => {
    try {
        const response = await UserApi.updateUser(updateUser);
        return response;
    } catch (error: any) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        } else {
            return rejectWithValue(error.response.data);
        }
    }
});

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        // resetErrorLogin: (state) => {
        //   state.errorLogin = false;
        // },
        // resetErrorSignup: (state) => {
        //   state.errorSignup = false;
        // },
        logOut: () => {
            Cookies.remove('token');
            localStorage.removeItem('isFirstLogin');
            localStorage.removeItem('hasMergedCart');
            localStorage.removeItem('persist:cart');
        },
    },

    extraReducers: (builder) => {
        // login
        builder.addCase(loginThunk.pending, (state) => {
            state.loading = true;
            state.message = null;
            state.errorLogin = false;
        });
        builder.addCase(loginThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.successLogin = true;
            state.message = action.payload.data.message;
        });
        builder.addCase(loginThunk.rejected, (state, action) => {
            state.loading = false;
            state.errorLogin = true;
            state.message = action.payload as string | null;
        });

        // signUp
        builder.addCase(signUpThunk.pending, (state) => {
            state.loading = true;
            state.errorSignup = false;
        });
        builder.addCase(signUpThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.successSignup = true;
        });
        builder.addCase(signUpThunk.rejected, (state, action) => {
            state.loading = false;
            state.errorSignup = true;
            state.errorSignupText = action.payload as string;
        });

        // getUser
        builder.addCase(getUserThunk.pending, (state) => {});
        builder.addCase(getUserThunk.fulfilled, (state, action) => {
            state.userInfo = action.payload.data.data;
        });
        builder.addCase(getUserThunk.rejected, (state, action) => {});
    },
});
export const { logOut } = usersSlice.actions;

export default usersSlice.reducer;
