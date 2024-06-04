import { createSlice } from "@reduxjs/toolkit";
import { getAllNotification, addNotification,deleteNotificationThunk } from "./thunk";

export const initialState = {
  notificationState: [],
  getAllNotificationState:[],
  deleteNotificationState:[],
  error: {},
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    clearDeleteNotificationState: (state) =>{
      state.deleteNotificationState = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllNotification.fulfilled, (state, action) => {
      state.getAllNotificationState = action.payload;
    });
    builder.addCase(getAllNotification.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(addNotification.fulfilled, (state, action) => {
      state.notificationState = action.payload;
    });
    builder.addCase(addNotification.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(deleteNotificationThunk.fulfilled, (state, action) => {
      state.deleteNotificationState = action.payload;
    });
    builder.addCase(deleteNotificationThunk.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });
  },
});


export const { clearDeleteNotificationState } = notificationSlice.actions;

export default notificationSlice.reducer;
