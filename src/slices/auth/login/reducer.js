import { createSlice } from "@reduxjs/toolkit";
import { loginApi } from "./thunk";

export const initialState = {
  user: {},
  error: "", // for error message
  loading: false,
  isUserLogout: false,
  errorMsg: false, // for error
  loginData: {},
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    apiError(state, action) {
      state.error = action.payload.data;
      state.loading = true;
      state.isUserLogout = false;
      state.errorMsg = true;
    },
    loginSuccess(state, action) {
      state.user = action.payload;
      state.loading = false;
      state.errorMsg = false;
    },
    logoutUserSuccess(state, action) {
      state.isUserLogout = true;
    },
    reset_login_flag(state) {
      state.error = null;
      state.loading = false;
      state.errorMsg = false;
    },
    resetLoginData(state) {
      state.loginData = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginApi.fulfilled, (state, action) => {
      state.loginData = action.payload;
    });
    builder.addCase(loginApi.rejected, (state, action) => {
      state.error = action.error.message;
      alert(action.error.message);
    });
  },
});

export const {
  apiError,
  loginSuccess,
  logoutUserSuccess,
  reset_login_flag,
  resetLoginData,
} = loginSlice.actions;

export default loginSlice.reducer;
