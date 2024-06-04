import { createAsyncThunk } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllCustomerData, getSingleCustomerData } from "../../helpers/fakebackend_helper";

export const getAllCustomer = createAsyncThunk(
  "catalog/getAllCustomerData",
  async (params) => {
    try {
      const response = getAllCustomerData(params);
      return response;
    } catch (error) {
      return error;
    }
  }
);


export const getSingleCustomer = createAsyncThunk(
  "catalog/getSingleCustomerData",
  async (id) => {
    try {
      const response = getSingleCustomerData(id);
      return response;
    } catch (error) {
      return error;
    }
  }
);
