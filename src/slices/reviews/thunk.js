import { createAsyncThunk } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Include Both Helper File with needed methods
import {  getReviews,postReviews,deleteReviews } from "../../helpers/fakebackend_helper";

export const getAllReviewData = createAsyncThunk("review/getReviews", async () => {
  try {
    const response = await getReviews();
    return response;
  } catch (error) {
    return error;
  }
});

export const postReviewStatus = createAsyncThunk("review/postReviews", async (data) => {
  try {
    const response = await postReviews(data);
    return response;
  } catch (error) {
    return error;
  }
});

export const deletetReviewStatus = createAsyncThunk("review/deleteReviews", async (data) => {
  try {
    const response = await deleteReviews(data);
    return response;
  } catch (error) {
    return error;
  }
});
