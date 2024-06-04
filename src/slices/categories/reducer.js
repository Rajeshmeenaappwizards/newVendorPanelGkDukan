import { createSlice } from "@reduxjs/toolkit";
import {
  getGetCategoriesData,
  addPostCategoriesData,
  editCategoriesData,
  deleteCategoriesData,
  updateCategoryByIdData,
} from "./thunk";

export const initialState = {
  categoriesData: [],
  categoriesAll: [],
  postCategoriesData: [],
  editOneCategoriesData: [],
  deleteCategoriesData: [],
  updateCategoryByIdData: [],
  error: {},
};

const CategorySlice = createSlice({
  name: "CategorySlice",
  initialState,
  reducers: {
    clearEditOneCategoriesData: (state) => {
      state.editOneCategoriesData = [];
    },
    clearDeleteCategoryByIdData: (state) => {
      state.deleteCategoriesData = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getGetCategoriesData.fulfilled, (state, action) => {
      let categoriesDatas = flattenCategories(action.payload);
      state.categoriesData = categoriesDatas;
      state.categoriesAll = action.payload;
    });
    builder.addCase(getGetCategoriesData.rejected, (state, action) => {
      state.error = action.error.message;
      alert(action.error.message);
    });
    builder.addCase(addPostCategoriesData.fulfilled, (state, action) => {
      state.postCategoriesData = action.payload;
    });
    builder.addCase(addPostCategoriesData.rejected, (state, action) => {
      state.error = action.error.message;
      alert(action.error.message);
    });
    builder.addCase(editCategoriesData.fulfilled, (state, action) => {
      state.editOneCategoriesData = action.payload;
    });
    builder.addCase(editCategoriesData.rejected, (state, action) => {
      state.error = action.error.message;
      alert(action.error.message);
    });
    builder.addCase(deleteCategoriesData.fulfilled, (state, action) => {
      state.deleteCategoriesData = action.payload;
    });
    builder.addCase(deleteCategoriesData.rejected, (state, action) => {
      state.error = action.error.message;
      alert(action.error.message);
    });
    builder.addCase(updateCategoryByIdData.fulfilled, (state, action) => {
      state.updateCategory = action.payload;
    });
    builder.addCase(updateCategoryByIdData.rejected, (state, action) => {
      state.error = action.error.message;
      alert(action.error.message);
    });
  },
});
export const { clearEditOneCategoriesData, clearDeleteCategoryByIdData } = CategorySlice.actions;

export default CategorySlice.reducer;

function flattenCategories(categories) {
  let options = [];
  categories?.forEach((category) => {
    options.push({
      value: category._id,
      label: category.title,
      date: formattedDate(category.createdAt),
    });
    if (category.children && category.children.length > 0) {
      options = options.concat(flattenChildren(category.children, 1));
    }
  });
  return options;
}

function flattenChildren(children, depth) {
  let options = [];
  children.forEach((child) => {
    options.push({
      value: child._id,
      label: `${"~".repeat(depth)} ${child.title}`,
      date: formattedDate(child.createdAt),
    });
    if (child.children && child.children.length > 0) {
      options = options.concat(flattenChildren(child.children, depth + 1));
    }
  });
  return options;
}

function formattedDate(dateStr) {
  const date = new Date(dateStr);
  const year = String(date.getFullYear()).slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
}
