import { createSlice } from "@reduxjs/toolkit";
import {  getAllReviewData,postReviewStatus,deletetReviewStatus } from "./thunk";

export const initialState = {
  getReviewState: [],
  postStates: [],
  deleteReviewState:[],
  error: {},
};

const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllReviewData.fulfilled, (state, action) => {
      state.getReviewState = action.payload;
    });
    builder.addCase(getAllReviewData.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(postReviewStatus.fulfilled, (state, action) => {
      state.postStates = action.payload;
    });
    builder.addCase(postReviewStatus.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(deletetReviewStatus.fulfilled, (state, action) => {
      state.deleteReviewState = action.payload;
    });
    builder.addCase(deletetReviewStatus.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });
  },
});

export default reviewSlice.reducer;
