import { createSlice } from "@reduxjs/toolkit";
import { addTaxSlabs, getTaxSlabs, editTaxSlabs } from "./thunk";

export const initialState = {
  taxSlabs: [],
  data: {},
  ediSlabs: [],
  error: {},
};

const taxSlabsSlice = createSlice({
  name: "TaxSlabs",
  initialState,
  reducers: {
    clearEdiSlabs: (state) => {
      state.ediSlabs = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTaxSlabs.fulfilled, (state, action) => {
      state.taxSlabs = action.payload;
    });
    builder.addCase(getTaxSlabs.rejected, (state, action) => {
      state.error = action.error || null;
      alert(action.error.message);
    });

    builder.addCase(editTaxSlabs.fulfilled, (state, action) => {
      state.ediSlabs = action.payload;
    });
    builder.addCase(editTaxSlabs.rejected, (state, action) => {
      state.error = action.error || null;
      alert(action.error.message);
    });

    builder.addCase(addTaxSlabs.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(addTaxSlabs.rejected, (state, action) => {
      state.error = action.error || null;
      alert(action.error.message);
    });
  },
});

export const { clearEdiSlabs } = taxSlabsSlice.actions;

export default taxSlabsSlice.reducer;
