import { createSlice } from "@reduxjs/toolkit";
import {
  getAllVendorsData,
  getVendorDetailsById,
  getVendorPaymentData,
  getVendorRevenueChartData,
  postVendorPaymentData,
  addVendorsData,
  changeVendorStatus,
  getVendorById,
  updateVendorById,
} from "./thunk";

export const initialState = {
  getVendorPaymentData: [],
  postVendorPaymentState: [],
  getAllVendorsData: [],
  getVendorDetailsByIdData: [],
  getVendorRevenueChartRes: [],
  addVendorState: [],
  statusState:{},
  getVendorByIdState:{},
  updateVendorByIdState:{},
  error: {},
};

const VendorPaymentSlice = createSlice({
  name: "VendorPaymentSlice",
  initialState,
  reducers: {
    resetGetVendorDetailsByIdData(state) {
      state.getVendorDetailsByIdData = {};
    },
    clearVendorUpdatedByIdData: (state) => {
      state.updateVendorByIdState = {};
    },
    clearVendoraddRes: (state) => {
      state.addVendorState = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getVendorPaymentData.fulfilled, (state, action) => {
      state.getVendorPaymentData = action.payload;
    });
    builder.addCase(getVendorPaymentData.rejected, (state, action) => {
      state.error = action.error.message;
      alert(action.error.message);
    });
    builder.addCase(postVendorPaymentData.fulfilled, (state, action) => {
      state.postVendorPaymentState = action.payload;
    });
    builder.addCase(postVendorPaymentData.rejected, (state, action) => {
      state.error = action.error.message;
      alert(action.error.message);
    });
    builder.addCase(getAllVendorsData.fulfilled, (state, action) => {
      state.getAllVendorsData = action.payload;
    });
    builder.addCase(getAllVendorsData.rejected, (state, action) => {
      state.error = action.error.message;
      alert(action.error.message);
    });
    builder.addCase(getVendorDetailsById.fulfilled, (state, action) => {
      state.getVendorDetailsByIdData = action.payload;
    });
    builder.addCase(getVendorDetailsById.rejected, (state, action) => {
      state.error = action.error.message;
      alert(action.error.message);
    });
    builder.addCase(getVendorRevenueChartData.fulfilled, (state, action) => {
      state.getVendorRevenueChartRes = action.payload;
    });
    builder.addCase(getVendorRevenueChartData.rejected, (state, action) => {
      state.error = action.error.message;
      alert(action.error.message);
    });
    builder.addCase(addVendorsData.fulfilled, (state, action) => {
      state.addVendorState = action.payload;
    });
    builder.addCase(addVendorsData.rejected, (state, action) => {
      state.error = action.error.message;
      alert(action.error.message);
    });

    builder.addCase(changeVendorStatus.fulfilled, (state, action) => {
      state.statusState = action.payload;
    });
    builder.addCase(changeVendorStatus.rejected, (state, action) => {
      state.error = action.error.message;
      alert(action.error.message);
    });

    builder.addCase(getVendorById.fulfilled, (state, action) => {
      state.getVendorByIdState = action.payload;
    });
    builder.addCase(getVendorById.rejected, (state, action) => {
      state.error = action.error.message;
      alert(action.error.message);
    });

    builder.addCase(updateVendorById.fulfilled, (state, action) => {
      state.updateVendorByIdState = action.payload;
    });
    builder.addCase(updateVendorById.rejected, (state, action) => {
      state.error = action.error.message;
      alert(action.error.message);
    });
  },
});

export const { resetGetVendorDetailsByIdData,clearVendorUpdatedByIdData,clearVendoraddRes } = VendorPaymentSlice.actions;

export default VendorPaymentSlice.reducer;
