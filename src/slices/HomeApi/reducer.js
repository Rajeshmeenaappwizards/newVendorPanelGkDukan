import { createSlice } from "@reduxjs/toolkit";
import { getAllProductsData, getMobileHomeData, getWebHomeData, getheaderCategoriesData, headerCategoriesData, mobileHomeData, webHomeData } from './thunk';
import { flattenProduct } from "../../helpers/date_helper";

export const initialState = {
    webHomeApiData: [],
    mobileHomeApiData: [],
    getWebData: [],
    getMobileData: [],
    headerCategories: {},
    getheaderCategories: [],
    allProductGetData: [],
    error: {}
};

const HomeSlice = createSlice({
    name: 'HomeSlice',
    initialState,
    reducers: {
        resetHeaderCategories(state) {
            state.headerCategories = {};
        },
        resetHomeData(state) {
            state.webHomeApiData = {};
            state.mobileHomeApiData = {};
        },
    },
    extraReducers: (builder) => {
        // ! webHomeData
        builder.addCase(webHomeData.fulfilled, (state, action) => {
            state.webHomeApiData = action.payload;
        });
        builder.addCase(webHomeData.rejected, (state, action) => {
            state.error = action.error.message;
alert(action.error.message);
        });
        // ! mobileHomeData
        builder.addCase(mobileHomeData.fulfilled, (state, action) => {
            state.mobileHomeApiData = action.payload;
        });
        builder.addCase(mobileHomeData.rejected, (state, action) => {
            state.error = action.error.message;
alert(action.error.message);
        });
        // ! getWebHomeData
        builder.addCase(getWebHomeData.fulfilled, (state, action) => {
            state.getWebData = action.payload;
        });
        builder.addCase(getWebHomeData.rejected, (state, action) => {
            state.error = action.error.message;
alert(action.error.message);
        });
        // ! getMobileHomeData
        builder.addCase(getMobileHomeData.fulfilled, (state, action) => {
            state.getMobileData = action.payload;
        });
        builder.addCase(getMobileHomeData.rejected, (state, action) => {
            state.error = action.error.message;
alert(action.error.message);
        });
        // ! headerCategoriesData
        builder.addCase(headerCategoriesData.fulfilled, (state, action) => {
            state.headerCategories = action.payload;
        });
        builder.addCase(headerCategoriesData.rejected, (state, action) => {
            state.error = action.error.message;
alert(action.error.message);
        });
        // ! getheaderCategoriesData
        builder.addCase(getheaderCategoriesData.fulfilled, (state, action) => {
            let data = flattenProduct(action.payload.headers.hierarchy)
            state.getheaderCategories = data;
        });
        builder.addCase(getheaderCategoriesData.rejected, (state, action) => {
            state.error = action.error.message;
alert(action.error.message);
        });
        // ! getAllProductsData
        builder.addCase(getAllProductsData.fulfilled, (state, action) => {
            let data = flattenProduct(action.payload.data)
            state.allProductGetData = data;
        });
        builder.addCase(getAllProductsData.rejected, (state, action) => {
            state.error = action.error.message;
alert(action.error.message);
        });
    }
});

export const { resetHeaderCategories, resetHomeData } = HomeSlice.actions

export default HomeSlice.reducer;

