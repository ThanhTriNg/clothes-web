import Cookies from "js-cookie";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserProps } from "../module";
import UserApi from "../api/UserApi";

interface myState {
  loading: boolean;
  successLogin: boolean;
  errorLogin: any;
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
  errorLogin: null,
  successLogout: false,
  errorLogout: null,
  errorSignupText: null,

  successSignup: false,
  errorSignup: null,
  userInfo: null,
};

export const loginThunk = createAsyncThunk(
  "logIn",
  async (UserProps: UserProps, { rejectWithValue }) => {
    try {
      const response = await UserApi.logIn(UserProps);
      const token = response.data.accessToken;
      Cookies.set("token", token);
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const signUpThunk = createAsyncThunk(
  "signUp",
  async (UserProps: UserProps, { rejectWithValue }) => {
    try {
      const response = await UserApi.signUp(UserProps);
      return response;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    resetErrorLogin: (state) => {
      state.errorLogin = false;
    },
    resetErrorSignup: (state) => {
      state.errorSignup = false;
    },
    signOut: () => {
      Cookies.remove("token");
    },
  },

  extraReducers: (builder) => {
    // login
    builder.addCase(loginThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.successLogin = true;
    });
    builder.addCase(loginThunk.rejected, (state, action) => {
      state.loading = false;
      state.errorLogin = true;
    });
    // signUp
    builder.addCase(signUpThunk.pending, (state) => {
      state.loading = true;
      console.log("pending");
    });
    builder.addCase(signUpThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.successSignup = true;
      console.log("fulfilled");
    });
    builder.addCase(signUpThunk.rejected, (state, action) => {
      state.loading = false;
      state.errorSignup = true;
      state.errorSignupText = action.payload as string;
    });
  },
});
export const { resetErrorLogin, resetErrorSignup ,signOut} = usersSlice.actions;

export default usersSlice.reducer;
