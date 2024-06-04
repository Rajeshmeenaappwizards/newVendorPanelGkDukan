import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllVendorsApi, getVendorDetailsApi, getVendorPaymentsData, getVendorRevenueChartApi, postVendorPaymentsData,addVendorData,changeVendorStatusData,getVendorByIdData,updateVendorByIdData } from "../../helpers/fakebackend_helper";

export const getVendorPaymentData = createAsyncThunk(
  "paymentData/getVendorPaymentData",
  async (data) => {
    try {
      var response;
      response = getVendorPaymentsData(data);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const postVendorPaymentData = createAsyncThunk(
  "paymentData/postVendorPaymentData",
  async (data) => {
    try {
      var response;
      response = postVendorPaymentsData(data);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getAllVendorsData = createAsyncThunk(
  "paymentData/getAllVendorsData",
  async (data) => {
    try {
      const response = getAllVendorsApi(data);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const addVendorsData = createAsyncThunk(
  "paymentData/addVendorsData",
  async (data) => {
    try {
      const response = addVendorData(data);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getVendorDetailsById = createAsyncThunk(
  "paymentData/getVendorDetailsById",
  async (data) => {
    try {
      const response = getVendorDetailsApi(data);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getVendorById = createAsyncThunk(
  "paymentData/getVendorById",
  async (data) => {
    try {
      const response = getVendorByIdData(data);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const updateVendorById = createAsyncThunk(
  "paymentData/updateVendorById",
  async (data) => {
    try {
      const response = updateVendorByIdData(data);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const changeVendorStatus = createAsyncThunk(
  "paymentData/changeVendorStatus",
  async (data) => {
    try {
      const response = changeVendorStatusData(data);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getVendorRevenueChartData = createAsyncThunk(
  "paymentData/getVendorRevenueChartData",
  async (data) => {
    try {
      const response = getVendorRevenueChartApi(data);
      return response;
    } catch (error) {
      return error;
    }
  }
);
