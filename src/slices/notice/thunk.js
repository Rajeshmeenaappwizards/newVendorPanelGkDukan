import { createAsyncThunk } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Include Both Helper File with needed methods
import { getNotice, postNotice,deleteNoticeById } from "../../helpers/fakebackend_helper";

export const getAllNotices = createAsyncThunk(
  "notice/getNoticeData",
  async () => {
    try {
      const response = getNotice();
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const addNotice = createAsyncThunk("notice/addNoticeData", async (data) => {
  try {
    const response = postNotice(data);
    return response;
  } catch (error) {
    return error;
  }
});

export const deleteNotice = createAsyncThunk("notice/deleteNoticeData", async (data) => {
  try {
    const response = deleteNoticeById(data);
    return response;
  } catch (error) {
    return error;
  }
});
