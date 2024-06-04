import { createAsyncThunk } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Include Both Helper File with needed methods
import {
  getNotification,
  postNotification,
  deleteNotificationById,
} from "../../helpers/fakebackend_helper";

export const getAllNotification = createAsyncThunk(
  "notification/getNotificationData",
  async () => {
    try {
      const response = getNotification();
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const addNotification = createAsyncThunk(
  "notification/addNoNotificationData",
  async (data) => {
    try {
      const response = postNotification(data);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const deleteNotificationThunk = createAsyncThunk(
  "notification/deleteNoNotificationData",
  async (data) => {
    try {
      const response = deleteNotificationById(data);
      return response;
    } catch (error) {
      return error;
    }
  }
);
