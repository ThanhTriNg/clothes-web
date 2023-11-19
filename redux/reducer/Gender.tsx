import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import GenderApi from "../api/GenderApi";
export interface Gender {
  id: string;
  name: string;
}

interface myState {
  loading: boolean;
  genderInfo: Gender[] | null;
}

const initialState: myState = {
  loading: false,
  genderInfo: null,
};

export const getGenderThunk = createAsyncThunk(
  "getGender",
  async (arg, { rejectWithValue }) => {
    try {
      const response = await GenderApi.getGender();
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

export const categoriesSlice = createSlice({
  name: "gender",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    //log in
    builder.addCase(getGenderThunk.pending, (state) => {});
    builder.addCase(getGenderThunk.fulfilled, (state, action) => {
      state.genderInfo = action.payload.data;
    });

    builder.addCase(getGenderThunk.rejected, (state, action) => {});
  },
});

export default categoriesSlice.reducer;
