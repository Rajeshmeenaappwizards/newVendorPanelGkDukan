import { createSlice } from "@reduxjs/toolkit";
import { addNotice, getAllNotices, deleteNotice } from "./thunk";

export const initialState = {
  noticeState: [],
  addNoticeState: [],
  deleteNoticeState: {},
  error: {},
};

const noticeSlice = createSlice({
  name: "notice",
  initialState,
  reducers: {
    clearDeleteNoticeState: (state) => {
      state.deleteNoticeState = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllNotices.fulfilled, (state, action) => {
      state.noticeState = action.payload.data;
    });
    builder.addCase(getAllNotices.rejected, (state, action) => {
      state.error = action.error || null;
      alert(action.error.message);
    });

    builder.addCase(addNotice.fulfilled, (state, action) => {
      state.addNoticeState = action.payload.data;
    });
    builder.addCase(addNotice.rejected, (state, action) => {
      state.error = action.error || null;
      alert(action.error.message);
    });

    builder.addCase(deleteNotice.fulfilled, (state, action) => {
      state.deleteNoticeState = action.payload;
    });
    builder.addCase(deleteNotice.rejected, (state, action) => {
      state.error = action.error || null;
      alert(action.error.message);
    });
  },
});

export const { clearDeleteNoticeState } = noticeSlice.actions;
export default noticeSlice.reducer;
