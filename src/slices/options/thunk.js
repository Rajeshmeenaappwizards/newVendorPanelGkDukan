import { createAsyncThunk } from "@reduxjs/toolkit";
import "react-toastify/dist/ReactToastify.css";

import { getCustomerOptionsDataApi, getOptionsDataApi } from "../../helpers/fakebackend_helper";

export const getOptionsData = createAsyncThunk(
    "order/getOptionsData",
    async (data, name) => {
        try {
            const response = getOptionsDataApi(data, name);
            return response;
        } catch (error) {
            return error;
        }
    }
);
export const getCustomerOptionsData = createAsyncThunk(
    "order/getCustomerOptionsData",
    async (data, name) => {
        try {
            const response = getCustomerOptionsDataApi(data, name);
            return response;
        } catch (error) {
            return error;
        }
    }
);