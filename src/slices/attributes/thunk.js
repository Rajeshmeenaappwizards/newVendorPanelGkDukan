import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addAttributes,
  getAttributes,
  getAttributeById,
  updateAttributeById,
  deleteAttributeById,
} from "../../helpers/fakebackend_helper";

export const addAttributesData = createAsyncThunk(
  "attributes/addAttributesData",
  async (data) => {
    try {
      var response;
      response = addAttributes(data);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getAttributesData = createAsyncThunk(
  "attributes/getAttributesData",
  async (data) => {
    try {
      var response;
      response = getAttributes(data);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getAttributeByIdData = createAsyncThunk(
  "attributes/getAttributeByIdData",
  async (data) => {
    console.log("editCategories", data);
    try {
      var response;
      response = getAttributeById(data);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const updateAttributeByIdData = createAsyncThunk(
  "attributes/updateAttributeByIdData",
  async ({ data, id }) => {
    try {
      var response;
      response = updateAttributeById(data, id);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const deleteAttributeByIdData = createAsyncThunk(
  "attributes/deleteAttributeByIdData",
  async (data) => {
    try {
      var response;
      response = deleteAttributeById(data);
      return response;
    } catch (error) {
      return error;
    }
  }
);
