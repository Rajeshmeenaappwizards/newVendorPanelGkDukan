import { createSlice } from "@reduxjs/toolkit";
import {
  getSupportTicket,
  deleteSupportTicket,
  addSupportTicket,
  getSingleSupportTicket,
  statusUpdateSupportTicket,
  addMessageToSupportTicket,
  getSupportStatsData,
} from "./thunk";

export const initialState = {
  allSupportTicketState: [],
  singleSupportTicketState: [],
  statusUpdateSupportTicketState: [],
  addSupportTicketState: [],
  addMessageToSupportTicketState: [],
  deleteSupportTicketState: {},
  error: {},
  page: 1,
  vendorId: "",
  status: "",
  startDate: "",
  endDate: "",
  keyword: "",
  getSupportStatsDataState: {},
};

const supportTicketSlice = createSlice({
  name: "supportTicket",
  initialState,
  reducers: {
    setPageSupport(state, action) {
      state.page = action.payload;
    },
    setStatusSupport(state, action) {
      state.status = action.payload;
    },
    setVendorIdSupport(state, action) {
      state.vendorId = action.payload;
    },
    setStartDateSupport(state, action) {
      state.startDate = action.payload;
    },
    setEndDateSupport(state, action) {
      state.endDate = action.payload;
    },
    setKeywordSupport(state, action) {
      state.keyword = action.payload;
    },
    resetSupportState(state) {
      (state.page = 1),
        (state.vendorId = ""),
        (state.status = ""),
        (state.startDate = ""),
        (state.endDate = ""),
        (state.keyword = "");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSupportTicket.fulfilled, (state, action) => {
      state.allSupportTicketState = action.payload;
    });
    builder.addCase(getSupportTicket.rejected, (state, action) => {
      state.error = action.error || null;
      alert(action.error.message);
    });

    builder.addCase(deleteSupportTicket.fulfilled, (state, action) => {
      state.deleteSupportTicketState = action.payload;
    });
    builder.addCase(deleteSupportTicket.rejected, (state, action) => {
      state.error = action.error || null;
      alert(action.error.message);
    });

    builder.addCase(addSupportTicket.fulfilled, (state, action) => {
      state.addSupportTicketState = action.payload.data;
    });
    builder.addCase(addSupportTicket.rejected, (state, action) => {
      state.error = action.error || null;
      alert(action.error.message);
    });

    builder.addCase(getSingleSupportTicket.fulfilled, (state, action) => {
      state.singleSupportTicketState = action.payload.data;
    });
    builder.addCase(getSingleSupportTicket.rejected, (state, action) => {
      state.error = action.error || null;
      alert(action.error.message);
    });
    builder.addCase(statusUpdateSupportTicket.fulfilled, (state, action) => {
      state.statusUpdateSupportTicketState = action.payload.data;
    });
    builder.addCase(statusUpdateSupportTicket.rejected, (state, action) => {
      state.error = action.error || null;
      alert(action.error.message);
    });
    builder.addCase(addMessageToSupportTicket.fulfilled, (state, action) => {
      state.addMessageToSupportTicketState = action.payload.data;
    });
    builder.addCase(addMessageToSupportTicket.rejected, (state, action) => {
      state.error = action.error || null;
      alert(action.error.message);
    });
    builder.addCase(getSupportStatsData.fulfilled, (state, action) => {
      state.getSupportStatsDataState = action.payload;
    });
    builder.addCase(getSupportStatsData.rejected, (state, action) => {
      state.error = action.error || null;
      alert(action.error.message);
    });
  },
});

export const {
  setPageSupport,
  setStatusSupport,
  setVendorIdSupport,
  setStartDateSupport,
  setEndDateSupport,
  setCategoryIdSupport,
  setKeywordSupport,
  resetSupportState,
} = supportTicketSlice.actions;

export default supportTicketSlice.reducer;
