import { createAsyncThunk } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Include Both Helper File with needed methods
import {
  getAllProductsByStatus,
  getAllProductsData,
  getProductData,
  updateStatusProductData,
} from "../../helpers/fakebackend_helper";

export const getAllProducts = createAsyncThunk(
  "product/getProductData",
  async (data) => {
    try {
      const response = getAllProductsData(data);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getProductsByStatus = createAsyncThunk(
  "product/getProductDataByStatus",
  async (status) => {
    try {
      const response = getAllProductsByStatus(status);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getProduct = createAsyncThunk(
  "product/getAProductData",
  async (data) => {
    try {
      const response = getProductData(data);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const updateProductStatus = createAsyncThunk(
  "product/updateStatusProductData",
  async (data) => {
    try {
      console.log("first=====", data);
      const response = updateStatusProductData(data);
      return response;
    } catch (error) {
      return error;
    }
  }
);
