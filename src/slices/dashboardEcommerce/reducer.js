import { createSlice } from "@reduxjs/toolkit";
import { getBestSellingProductData, getRecentOrderApiData, getRevenueChartDashboardData, getRevenueChartsData, getTopCategoriesApiData, getTopVendorsApiData, getWidgetsData } from './thunk';

export const initialState = {
  revenueData: [],
  widgetsData: [],
  bestSellingProductData: [],
  topVendorsData: [],
  recentOrderData: [],
  topCategoriesData: [],
  getRevenueChartDashboard: [],
  error: {}
};

const DashboardEcommerceSlice = createSlice({
  name: "DashboardEcommerce",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(getRevenueChartsData.fulfilled, (state, action) => {
      state.revenueData = action.payload;
    });
    builder.addCase(getRevenueChartsData.rejected, (state, action) => {
      state.error = action.error.message;
      alert(action.error.message);
    });

    builder.addCase(getWidgetsData.fulfilled, (state, action) => {
      state.widgetsData = action.payload;
    });
    builder.addCase(getWidgetsData.rejected, (state, action) => {
      state.error = action.error.message;
      alert(action.error.message);
    });

    builder.addCase(getBestSellingProductData.fulfilled, (state, action) => {
      state.bestSellingProductData = action.payload;
    });
    builder.addCase(getBestSellingProductData.rejected, (state, action) => {
      state.error = action.error.message;
      alert(action.error.message);
    });

    builder.addCase(getTopVendorsApiData.fulfilled, (state, action) => {
      state.topVendorsData = action.payload;
    });
    builder.addCase(getTopVendorsApiData.rejected, (state, action) => {
      state.error = action.error.message;
      alert(action.error.message);
    });

    builder.addCase(getRecentOrderApiData.fulfilled, (state, action) => {
      state.recentOrderData = action.payload;
    });
    builder.addCase(getRecentOrderApiData.rejected, (state, action) => {
      state.error = action.error.message;
      alert(action.error.message);
    });

    builder.addCase(getTopCategoriesApiData.fulfilled, (state, action) => {
      state.topCategoriesData = action.payload;
    });
    builder.addCase(getTopCategoriesApiData.rejected, (state, action) => {
      state.error = action.error.message;
      alert(action.error.message);
    });
    builder.addCase(getRevenueChartDashboardData.fulfilled, (state, action) => {
      state.getRevenueChartDashboard = action.payload;
    });
    builder.addCase(getRevenueChartDashboardData.rejected, (state, action) => {
      state.error = action.error.message;
    });
  }
});

export default DashboardEcommerceSlice.reducer;
