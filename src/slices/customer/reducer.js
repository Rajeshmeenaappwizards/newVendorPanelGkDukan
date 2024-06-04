import { createSlice } from "@reduxjs/toolkit";
import { getAllCustomer, getSingleCustomer } from "./thunk";

export const initialState = {
  allCustomers: [],
  singleCustomer: [],
  error: {},
  page: 1,
  status: "",
  phoneNumber: "",
  startDate: "",
  endDate: "",
  customerId: "",
  keyword: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setPageCustomer(state, action) {
      state.page = action.payload;
    },
    setStatusCustomer(state, action) {
      state.status = action.payload;
    },
    setPhoneNumberCustomer(state, action) {
      state.phoneNumber = action.payload;
    },
    setStartDateCustomer(state, action) {
      state.startDate = action.payload;
    },
    setEndDateCustomer(state, action) {
      state.endDate = action.payload;
    },
    setCustomerId(state, action) {
      state.customerId = action.payload;
    },
    setKeywordCustomer(state, action) {
      state.keyword = action.payload;
    },
    resetCustomerState(state) {
      (state.page = 1),
        (state.phoneNumber = ""),
        (state.status = ""),
        (state.startDate = ""),
        (state.endDate = "");
      (state.customerId = ""), (state.keyword = "");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCustomer.fulfilled, (state, action) => {
      state.allCustomers = action.payload;
    });

    builder.addCase(getAllCustomer.rejected, (state, action) => {
      state.error = action.error.message;
      alert(action.error.message);
    });

    builder.addCase(getSingleCustomer.fulfilled, (state, action) => {
      state.singleCustomer = action.payload;
    });

    builder.addCase(getSingleCustomer.rejected, (state, action) => {
      state.error = action.error.message;
      alert(action.error.message);
    });
  },
});

export const {
  setPageCustomer,
  setStatusCustomer,
  setPhoneNumberCustomer,
  setStartDateCustomer,
  setEndDateCustomer,
  setCustomerIdCustomer,
  setKeywordCustomer,
  resetCustomerState,
} = customerSlice.actions;

export default customerSlice.reducer;
