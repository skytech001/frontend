import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "axios";

export const userSignIn = createAsyncThunk(
  "signin/UserSignin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await Axios.post("http://localhost:5000/users/signin", {
        email,
        password,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const signinSlice = createSlice({
  name: "signin",
  initialState: {
    userLoading: false,
    userInfo: {},
    signinError: false,
    errorMessage: "",
    isSignedIn: false,
  },
  reducers: {
    userSignout: (state) => {
      state.userLoading = false;
      state.userInfo = {};
      state.isSignedIn = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(userSignIn.pending, (state, action) => {
        state.userLoading = true;
      })
      .addCase(userSignIn.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userInfo = action.payload;
        state.isSignedIn = true;
        state.signinError = false;

        localStorage.setItem("userInfo", JSON.stringify(action.payload));
      })
      .addCase(userSignIn.rejected, (state, action) => {
        state.userLoading = false;
        state.userInfo = {};
        state.isSignedIn = false;
        state.signinError = true;
        state.errorMessage = action.payload;
      });
  },
});

export default signinSlice.reducer;
export const { userSignout } = signinSlice.actions;
