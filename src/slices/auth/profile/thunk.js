//Include Both Helper File with needed methods
import { createAsyncThunk } from "@reduxjs/toolkit";
import { postFakeProfile, postJwtProfile,getProfileData,updateProfileData } from "../../../helpers/fakebackend_helper";

// action
import { profileSuccess, profileError, resetProfileFlagChange } from "./reducer";

// const fireBaseBackend = getFirebaseBackend();

export const editProfile = (user) => async (dispatch) => {
    // try {
    //     let response;

    //     if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
    //         response = fireBaseBackend.editProfileAPI(
    //             user.username,
    //             user.idx
    //         );

    //     } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {

    //         response = postJwtProfile(
    //             {
    //                 username: user.username,
    //                 idx: user.idx,
    //             }
    //         );

    //     } else if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
    //         response = postFakeProfile(user);
    //     }

    //     const data = await response;

    //     if (data) {
    //         dispatch(profileSuccess(data));
    //     }

    // } catch (error) {
    //     dispatch(profileError(error));
    // }
};

export const getProfileThunk = createAsyncThunk(
    "profile/getProfileThunk",
    async (data) => {
      try {
        var response;
        response = getProfileData(data);
        return response;
      } catch (error) {
        return error;
      }
    }
  );

export const updaterofileThunk = createAsyncThunk(
    "profile/updaterofileThunk",
    async (data) => {
      try {
        var response;
        response = updateProfileData(data);
        return response;
      } catch (error) {
        return error;
      }
    }
  );

export const resetProfileFlag = () => {
    try {
        const response = resetProfileFlagChange();
        return response;
    } catch (error) {
        return error;
    }
};