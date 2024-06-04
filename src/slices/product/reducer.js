import { createSlice } from "@reduxjs/toolkit";
import {
  getAllProducts,
  getProduct,
  getProductsByStatus,
  updateProductStatus,
} from "./thunk";
import { updateStatusProductData } from "../../helpers/fakebackend_helper";

export const initialState = {
  getAllProduct: [],
  getProduct: [],
  updateProductStatusState: [],
  error: {},
  page: 1,
  vendorId: "",
  status: "",
  startDate: "",
  endDate: "",
  category: "",
  keyword: "",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setPageProduct(state, action) {
      state.page = action.payload;
    },
    setStatusProduct(state, action) {
      state.status = action.payload;
    },
    setVendorIdProduct(state, action) {
      state.vendorId = action.payload;
    },
    setStartDateProduct(state, action) {
      state.startDate = action.payload;
    },
    setEndDateProduct(state, action) {
      state.endDate = action.payload;
    },
    setCategoriesProduct(state, action) {
      state.category = action.payload;
    },
    setKeywordProduct(state, action) {
      // state.page = 1
      state.keyword = action.payload;
    },
    resetProductState(state) {
      (state.page = 1),
        (state.vendorId = ""),
        (state.status = ""),
        (state.startDate = ""),
        (state.endDate = ""),
        (state.category = ""),
        (state.keyword = "");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.getAllProduct = action.payload;
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.error = action.error || null;
      alert(action.error.message);
    });
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.getProduct = action.payload;
    });
    builder.addCase(getProduct.rejected, (state, action) => {
      state.error = action.error || null;
      alert(action.error.message);
    });
    builder.addCase(getProductsByStatus.fulfilled, (state, action) => {
      state.getProduct = action.payload;
    });
    builder.addCase(getProductsByStatus.rejected, (state, action) => {
      state.error = action.error || null;
      alert(action.error.message);
    });
    builder.addCase(updateProductStatus.fulfilled, (state, action) => {
      state.updateProductStatusState = action.payload;
    });
    builder.addCase(updateProductStatus.rejected, (state, action) => {
      state.error = action.error || null;
      alert(action.error.message);
    });
  },
});

export const {
  setPageProduct,
  setStatusProduct,
  setVendorIdProduct,
  setStartDateProduct,
  setEndDateProduct,
  setCategoriesProduct,
  setKeywordProduct,
  resetProductState,
} = productSlice.actions;

export default productSlice.reducer;
