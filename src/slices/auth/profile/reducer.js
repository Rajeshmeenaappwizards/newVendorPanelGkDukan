import { createSlice } from "@reduxjs/toolkit";
import {getProfileThunk,updaterofileThunk} from './thunk'

export const initialState = {
  error: "",
  success: "",
  getProfileState:{},
  updateProfileState:{},
  user: {}
};

const ProfileSlice = createSlice({
  name: "Profile",
  initialState,
  reducers: { 
    profileSuccess(state, action) {
      state.success = action.payload.status;
      state.user = action.payload.data
    },
    profileError(state, action) {
        state.error = action.payload
    },
    editProfileChange(state){
      state = { ...state };
    },
    resetProfileFlagChange(state){
      state.success = null
    },
    resetUpdatedData(state){
      state.updateProfileState = {}
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getProfileThunk.fulfilled, (state, action) => {
      state.getProfileState = action.payload;
    });
    builder.addCase(getProfileThunk.rejected, (state, action) => {
      state.error = action.error.message;
      alert(action.error.message);
    });
    builder.addCase(updaterofileThunk.fulfilled, (state, action) => {
      state.updateProfileState = action.payload;
    });
    builder.addCase(updaterofileThunk.rejected, (state, action) => {
      state.error = action.error.message;
      alert(action.error.message);
    });
  },
});

export const {
    profileSuccess,
    profileError,
    editProfileChange,
    resetProfileFlagChange,
    resetUpdatedData
} = ProfileSlice.actions

export default ProfileSlice.reducer;