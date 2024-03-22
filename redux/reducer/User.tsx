import Cookies from "js-cookie";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserProps } from "../module";
import UserApi from "../api/UserApi";

interface myState {
  loading: boolean;
  successLogin: boolean;
  errorLogin: any;
  successLogout: boolean;
  errorLogout: string | null;
  userInfo: UserProps | null;
}

const initialState: myState = {
  loading: false,
  successLogin: false,
  errorLogin: null,
  successLogout: false,
  errorLogout: null,
  userInfo: null,
};

export const loginThunk = createAsyncThunk(
  "logIn",
  async (UserProps: UserProps, { rejectWithValue }) => {
    try {
      const response = await UserApi.logIn(UserProps);
      const token = response.data.accessToken;
      Cookies.set("token", token);
      return response;
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
      console.log(response);
      return response;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    // login
    builder.addCase(loginThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.successLogin = true;
    });
    builder.addCase(loginThunk.rejected, (state, action) => {
      state.loading = false;
      state.errorLogin = true;
    });
  },
});
export default usersSlice.reducer;
