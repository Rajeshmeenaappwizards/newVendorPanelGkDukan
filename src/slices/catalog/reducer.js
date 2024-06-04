import { createSlice } from "@reduxjs/toolkit";
import { AddCatalog, AddCatalogProductData, EditCatalogData, deleteCatalogProductById, editCatalogProduct, getCatalogProductById, getCatalogs, getCatalogsByStatus, getProductAttributeById, getSingleCatalog,addImageFile } from "./thunk";

export const initialState = {
  catalogs: [],
  AddCatalogs: {},
  error: {},
  page: 1,
  vendorId: "",
  status: "",
  startDate: "",
  endDate: "",
  categoryId: "",
  keyword: "",
  editProductData: {},
  editCatalogDataRes: {},
  AddCatalogProductRes: {},
  CatalogProductById: {},
  DeleteCatalogProductByIdRes: {},
  ProductAttributeById: [],
  catalogFile:{},
};

const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload
    },
    setStatus(state, action) {
      state.status = action.payload
    },
    setVendorId(state, action) {
      state.vendorId = action.payload
    },
    setStartDate(state, action) {
      state.startDate = action.payload
    },
    setEndDate(state, action) {
      state.endDate = action.payload
    },
    setCategoryId(state, action) {
      state.categoryId = action.payload
    },
    setKeyword(state, action) {
      // state.page = 1
      state.keyword = action.payload
    },
    resetCatalogState(state) {
      state.page = 1,
        state.vendorId = "",
        state.status = "",
        state.startDate = "",
        state.endDate = "",
        state.categoryId = "",
        state.keyword = ""
    },
    resetEditedProductData(state) {
      state.editProductData = {};
      state.AddCatalogProductRes = {};
      state.DeleteCatalogProductByIdRes = {};
    },

    resetCataglogData(state) {
      state.editCatalogDataRes = {};
      state.AddCatalogs = {};
    }
  },
  extraReducers: (builder) => {
    builder.addCase(AddCatalog.fulfilled, (state, action) => {
      state.AddCatalogs = action.payload;
    });

    builder.addCase(AddCatalog.rejected, (state, action) => {
      state.error = action.error.message;
      alert(action.error.message);
    });

    builder.addCase(getCatalogs.fulfilled, (state, action) => {
      state.catalogs = action.payload;
    });

    builder.addCase(getCatalogs.rejected, (state, action) => {
      state.error = action.error.message;
      alert(action.error.message);
    });

    builder.addCase(getCatalogsByStatus.fulfilled, (state, action) => {
      state.catalogs = action.payload.data;
    });

    builder.addCase(getCatalogsByStatus.rejected, (state, action) => {
      state.error = action.error.message;
      alert(action.error.message);
    });

    builder.addCase(getSingleCatalog.fulfilled, (state, action) => {
      state.catalogs = action.payload;
    });

    builder.addCase(getSingleCatalog.rejected, (state, action) => {
      state.error = action.error.message;
      alert(action.error.message);
    });

    builder.addCase(EditCatalogData.fulfilled, (state, action) => {
      state.editCatalogDataRes = action.payload;
    });

    builder.addCase(EditCatalogData.rejected, (state, action) => {
      state.error = action.error.message;
      alert(action.error.message);
    });

    builder.addCase(editCatalogProduct.fulfilled, (state, action) => {
      state.editProductData = action.payload;
    });

    builder.addCase(editCatalogProduct.rejected, (state, action) => {
      state.error = action.error.message;
      alert(action.error.message);
    });

    builder.addCase(AddCatalogProductData.fulfilled, (state, action) => {
      state.AddCatalogProductRes = action.payload;
    });

    builder.addCase(AddCatalogProductData.rejected, (state, action) => {
      state.error = action.error.message;
      alert(action.error.message);
    });

    builder.addCase(getCatalogProductById.fulfilled, (state, action) => {
      state.CatalogProductById = action.payload;
    });

    builder.addCase(getCatalogProductById.rejected, (state, action) => {
      state.error = action.error.message;
      alert(action.error.message);
    });

    builder.addCase(getProductAttributeById.fulfilled, (state, action) => {
      state.ProductAttributeById = action.payload;
    });

    builder.addCase(getProductAttributeById.rejected, (state, action) => {
      state.error = action.error.message;
      alert(action.error.message);
    });

    builder.addCase(deleteCatalogProductById.fulfilled, (state, action) => {
      state.DeleteCatalogProductByIdRes = action.payload;
    });

    builder.addCase(deleteCatalogProductById.rejected, (state, action) => {
      state.error = action.error.message;
      alert(action.error.message);
    });

    builder.addCase(addImageFile.fulfilled, (state, action) => {
      state.catalogFile = action.payload;
    });

    builder.addCase(addImageFile.rejected, (state, action) => {
      state.error = action.error.message;
      alert(action.error.message);
    });
  },
});

export const {
  setPage,
  setStatus,
  setVendorId,
  setStartDate,
  setEndDate,
  setCategoryId,
  setKeyword,
  resetCatalogState,
  resetEditedProductData,
  resetCataglogData
} = catalogSlice.actions;

export default catalogSlice.reducer;
