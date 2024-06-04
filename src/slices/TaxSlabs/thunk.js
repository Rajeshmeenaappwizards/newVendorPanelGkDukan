import { createAsyncThunk } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  addTaxSlabsData,
  editTaxSlabsData,
  getTaxSlabsData,
} from "../../helpers/fakebackend_helper";

export const getTaxSlabs = createAsyncThunk(
  "TaxSlabs/getTaxSlabsData",
  async () => {
    try {
      const response = getTaxSlabsData();
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const addTaxSlabs = createAsyncThunk(
  "TaxSlabs/addTaxSlabsData",
  async (task) => {
    try {
      const response = addTaxSlabsData(task);
      return response;
    } catch (error) {
      return error;
    }
  }
);


export const editTaxSlabs = createAsyncThunk(
  "TaxSlabs/editTaxSlabsData",
  async (task) => {
    try {
      const response = editTaxSlabsData(task);
      return response;
    } catch (error) {
      return error;
    }
  }
);
