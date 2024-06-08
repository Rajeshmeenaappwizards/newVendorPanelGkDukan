import { createSlice } from "@reduxjs/toolkit";
import { registerApi,registerAddressApi,registerBankApi } from "./thunk";

export const initialState = {
  registrationError: null,
  message: null,
  loading: false,
  user: null,
  success: false,
  error: false,
  registerData:{},
  registerAddressData:{},
  registerBankData:{}
};

const registerSlice = createSlice({
  name: "Register",
  initialState,
  reducers: {
    registerUserSuccessful(state, action) {
      state.user = action.payload;
      state.loading = false;
      state.success = true;
      state.registrationError = null;
    },
    registerUserFailed(state, action) {
      state.user = null;
      state.loading = false;
      state.registrationError = action.payload;
      state.error = true;
    },
    resetRegisterFlagChange(state) {
      state.success = false;
      state.error = false;
    },
    apiErrorChange(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.isUserLogout = false;
    },
    resetRegisterData(state) {
      state.registerData = {};
    }
  },
  extraReducers: (builder) => {
    builder.addCase(registerApi.fulfilled, (state, action) => {
      state.registerData = action.payload;
    });
    builder.addCase(registerApi.rejected, (state, action) => {
      state.error = action.error.message;
      alert(action.error.message);
    });
    builder.addCase(registerAddressApi.fulfilled, (state, action) => {
      state.registerAddressData = action.payload;
    });
    builder.addCase(registerAddressApi.rejected, (state, action) => {
      state.error = action.error.message;
      alert(action.error.message);
    });
 
    builder.addCase(registerBankApi.fulfilled, (state, action) => {
      state.registerBankData = action.payload;
    });
    builder.addCase(registerBankApi.rejected, (state, action) => {
      state.error = action.error.message;
      alert(action.error.message);
    });
  },
});

export const {
  registerUserSuccessful,
  registerUserFailed,
  resetRegisterFlagChange,
  apiErrorChange,
  resetRegisterData
} = registerSlice.actions;

export default registerSlice.reducer;
