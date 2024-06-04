import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    getAllProductData,
    getMobileData,
    getParantCategoriesData,
    getWebData,
    postMobileData,
    postParantCategoriesData,
    postWebData,
} from "../../helpers/fakebackend_helper";

export const webHomeData = createAsyncThunk("Home/webHomeData", async (data) => {
    try {
        var response;
        response = postWebData(data);
        return response;
    } catch (error) {
        return error;
    }
});

export const mobileHomeData = createAsyncThunk("Home/mobileHomeData", async (data) => {
    try {
        var response;
        response = postMobileData(data);
        return response;
    } catch (error) {
        return error;
    }
});

export const getWebHomeData = createAsyncThunk("Home/getWebHomeData", async () => {
    try {
        var response;
        response = getWebData();
        return response;
    } catch (error) {
        return error;
    }
});
export const getMobileHomeData = createAsyncThunk("Home/getMobileHomeData", async (data) => {
    try {
        var response;
        response = getMobileData(data);
        return response;
    } catch (error) {
        return error;
    }
});

export const headerCategoriesData = createAsyncThunk("Home/headerCategoriesData", async (data) => {
    try {
        var response;
        response = postParantCategoriesData(data);
        return response;
    } catch (error) {
        return error;
    }
});

export const getheaderCategoriesData = createAsyncThunk("Home/getheaderCategoriesData", async (data) => {
    try {
        var response;
        response = getParantCategoriesData(data);
        return response;
    } catch (error) {
        return error;
    }
});

export const getAllProductsData = createAsyncThunk("Home/getAllProductsData", async (data) => {
    try {
        var response;
        response = getAllProductData(data);
        return response;
    } catch (error) {
        return error;
    }
});