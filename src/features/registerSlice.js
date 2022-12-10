import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "axios";

export const userRegister = createAsyncThunk(
  "register/UserRegister",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await Axios.post(
        "http://localhost:5000/users/register",
        {
          name,
          email,
          password,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        `Email ${email} already exist. try signing in or use a diffrent email.`
      );
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState: {
    newuserLoading: false,
    newuserInfo: {},
    registerError: false,
    errorMessage: "",
    isRegistered: false,
  },
  reducers: {
    newuserSignout: (state) => {
      state.newuserLoading = false;
      state.newuserInfo = {};
      state.isRegistered = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(userRegister.pending, (state, action) => {
        state.newuserLoading = true;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.newuserLoading = false;
        state.newuserInfo = action.payload;
        state.isRegistered = true;
        state.registerError = false;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.newuserLoading = false;
        state.newuserInfo = {};
        state.isRegistered = false;
        state.registerError = true;
        state.errorMessage = action.payload;
      });
  },
});

export default registerSlice.reducer;
export const { newuserSignout } = registerSlice.actions;
