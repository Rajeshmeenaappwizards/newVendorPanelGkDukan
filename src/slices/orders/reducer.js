import { createSlice } from "@reduxjs/toolkit";
import {
  cancelOrder,
  getAllOrders,
  getOrdersByStatus,
  getSingleOrder,
  readyToShip,
} from "./thunk";

export const initialState = {
  orderState: [],
  cancelOrderData: null,
  readyToShipData: null,
  error: {},
  page: 1,
  vendorId: "",
  status: "",
  startDate: "",
  endDate: "",
  customerId: "",
  keyword: "",
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setPageOrder(state, action) {
      state.page = action.payload
    },
    setStatusOrder(state, action) {
      state.status = action.payload
    },
    setVendorIdOrder(state, action) {
      state.vendorId = action.payload
    },
    setStartDateOrder(state, action) {
      state.startDate = action.payload
    },
    setEndDateOrder(state, action) {
      state.endDate = action.payload
    },
    setCustomerIdOrder(state, action) {
      state.customerId = action.payload
    },
    setKeywordOrder(state, action) {
      // state.page = 1
      state.keyword = action.payload
    },
    resetOrdersState(state) {
      state.page = 1,
        state.vendorId = "",
        // state.status = "",
        state.startDate = "",
        state.endDate = "",
        state.customerId = "",
        state.keyword = ""
    },
    resetStatusData(state){
      state.status = ""
    },
    resetStatus(state) {
      state.readyToShipData = null,
        state.cancelOrderData = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllOrders.fulfilled, (state, action) => {
      state.orderState = action.payload;
    });

    builder.addCase(getAllOrders.rejected, (state, action) => {
      state.error = action.error || null;
      alert(action.error.message);
    });
    builder.addCase(getOrdersByStatus.fulfilled, (state, action) => {
      state.orderState = action.payload.data;
    });

    builder.addCase(getOrdersByStatus.rejected, (state, action) => {
      state.error = action.error || null;
      alert(action.error.message);
    });

    builder.addCase(getSingleOrder.fulfilled, (state, action) => {
      state.orderState = action.payload.data;
    });

    builder.addCase(getSingleOrder.rejected, (state, action) => {
      state.error = action.error || null;
      alert(action.error.message);
    });

    builder.addCase(cancelOrder.fulfilled, (state, action) => {
      state.cancelOrderData = action.payload;
    });

    builder.addCase(cancelOrder.rejected, (state, action) => {
      state.error = action.error || null;
      alert(action.error.message);
    });

    builder.addCase(readyToShip.fulfilled, (state, action) => {
      state.readyToShipData = action.payload;
    });

    builder.addCase(readyToShip.rejected, (state, action) => {
      state.error = action.error || null;
      alert(action.error.message);
    });
  },
});

export const {
  setPageOrder,
  setStatusOrder,
  setVendorIdOrder,
  setStartDateOrder,
  setEndDateOrder,
  setCustomerIdOrder,
  setKeywordOrder,
  resetOrdersState,
  resetStatusData,
  resetStatus
} = orderSlice.actions;

export default orderSlice.reducer;
