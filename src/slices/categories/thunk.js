import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCategoriesData,addCategoriesData,editGetCategoriesData,deleteCategoryById,updateCategoryById } from "../../helpers/fakebackend_helper";


export const getGetCategoriesData = createAsyncThunk(
  "categories/getGetCategories",
  async (data) => {
    try {
      var response;
      response = getCategoriesData(data);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const addPostCategoriesData = createAsyncThunk(
  "categories/addPostCategories",
  async (data) => {
    try {
      var response;
      response = addCategoriesData(data);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const editCategoriesData = createAsyncThunk(
  "categories/editCategories",
  async (data) => {
    try {
      var response;
      response = editGetCategoriesData(data);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const updateCategoryByIdData = createAsyncThunk(
  "Categorys/updateCategoryByIdData",
  async ({ data, id }) => {
    try {
      var response;
      response = updateCategoryById(data, id);
      return response;
    } catch (error) { 
      return error;
    }
  }
);

export const deleteCategoriesData = createAsyncThunk(
  "categories/deleteCategories",
  async (data) => {
    try {
      var response;
      response = deleteCategoryById(data);
      return response;
    } catch (error) {
      return error;
    }
  }
);
