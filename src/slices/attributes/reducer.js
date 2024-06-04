import { createSlice } from "@reduxjs/toolkit";
import {
  addAttributesData,
  getAttributesData,
  getAttributeByIdData,
  updateAttributeByIdData,
  deleteAttributeByIdData,
} from "./thunk";

export const initialState = {
  attributeData: [],
  getAttributesData: [],
  getAttributeByIdData: [],
  updateAttributeByIdData: [],
  deleteAttributeByIdData: [],
  error: {},
};

const AttributesSlice = createSlice({
  name: "AttributesSlice",
  initialState,
  reducers: {
    clearEditAttributeByIdData: (state) => {
      state.updateAttributeByIdData = null;
    },
    clearDeleteAttributeByIdData: (state) => {
      state.deleteAttributeByIdData = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addAttributesData.fulfilled, (state, action) => {
      state.attributeData = action.payload;
    });
    builder.addCase(addAttributesData.rejected, (state, action) => {
      state.error = action.error.message;
      alert(action.error.message);
    });
    builder.addCase(getAttributesData.fulfilled, (state, action) => {
      state.getAttributesData = action.payload;
    });
    builder.addCase(getAttributesData.rejected, (state, action) => {
      state.error = action.error.message;
      alert(action.error.message);
    });
    builder.addCase(getAttributeByIdData.fulfilled, (state, action) => {
      state.getAttributeByIdData = action.payload;
    });
    builder.addCase(getAttributeByIdData.rejected, (state, action) => {
      state.error = action.error.message;
      alert(action.error.message);
    });
    builder.addCase(updateAttributeByIdData.fulfilled, (state, action) => {
      state.updateAttributeByIdData = action.payload;
    });
    builder.addCase(updateAttributeByIdData.rejected, (state, action) => {
      state.error = action.error.message;
      alert(action.error.message);
    });
    builder.addCase(deleteAttributeByIdData.fulfilled, (state, action) => {
      state.deleteAttributeByIdData = action.payload;
    });
    builder.addCase(deleteAttributeByIdData.rejected, (state, action) => {
      state.error = action.error.message;
      alert(action.error.message);
    });
  },
});
export const { clearEditAttributeByIdData, clearDeleteAttributeByIdData } =
  AttributesSlice.actions;

export default AttributesSlice.reducer;
