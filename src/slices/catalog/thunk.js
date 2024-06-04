import { createAsyncThunk } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Include Both Helper File with needed methods
import { AddCatalogApi, AddCatalogProductDataApi, deleteCatalogProductByIdApi, editCatalogDataApi, editCatalogProductApi, getCatalogData, getCatalogListByStatus, getCatalogProductByIdApi, getProductAttributeByIdApi, getSingleCatalogData,addImageCatalog } from "../../helpers/fakebackend_helper";

export const AddCatalog = createAsyncThunk(
  "catalog/AddCatalog",
  async (data) => {
    try {
      const response = AddCatalogApi(data);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getCatalogs = createAsyncThunk(
  "catalog/getCatalogData",
  async (data) => {
    try {
      const response = getCatalogData(data);
      return response;
    } catch (error) {
      return error;
    }
  }
);


export const getSingleCatalog = createAsyncThunk(
  "catalog/getSingleCatalogData",
  async (id) => {
    try {
      const response = getSingleCatalogData(id);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getCatalogsByStatus = createAsyncThunk(
  "catalog/getCatalogListByStatus",
  async (status) => {
    try {
      const response = getCatalogListByStatus(status);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const editCatalogProduct = createAsyncThunk(
  "catalog/editCatalogProduct",
  async (data) => {
    try {
      const response = editCatalogProductApi(data);
      return response;
    } catch (error) {
      return error;
    }
  }
);
export const EditCatalogData = createAsyncThunk(
  "catalog/EditCatalogData",
  async (data) => {
    try {
      const response = editCatalogDataApi(data);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const AddCatalogProductData = createAsyncThunk(
  "catalog/AddCatalogProductData",
  async (data) => {
    try {
      const response = AddCatalogProductDataApi(data);
      return response;
    } catch (error) {
      return error;
    }
  }
);
export const getCatalogProductById = createAsyncThunk(
  "catalog/getCatalogProductById",
  async (data) => {
    try {
      const response = getCatalogProductByIdApi(data);
      return response;
    } catch (error) {
      return error;
    }
  }
);
export const deleteCatalogProductById = createAsyncThunk(
  "catalog/deleteCatalogProductById",
  async (data) => {
    try {
      const response = deleteCatalogProductByIdApi(data);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getProductAttributeById = createAsyncThunk(
  "catalog/getProductAttributeById",
  async (data) => {
    try {
      const response = getProductAttributeByIdApi(data);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const addImageFile = createAsyncThunk(
  "catalog/addImageFile",
  async (data) => {
    try {
      const response = addImageCatalog(data);
      return response;
    } catch (error) {
      return error;
    }
  }
);