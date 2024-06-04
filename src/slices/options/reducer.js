import { createSlice } from "@reduxjs/toolkit";
import { getCustomerOptionsData, getOptionsData } from "./thunk";

export const initialState = {
    options: {},
    optionsCustomer: {},
    error: {},
};

const OptionSlice = createSlice({
    name: "OptionSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getOptionsData.fulfilled, (state, action) => {
            state.options = action.payload;
        });

        builder.addCase(getOptionsData.rejected, (state, action) => {
            state.error = action.error.message || null;
        });
        builder.addCase(getCustomerOptionsData.fulfilled, (state, action) => {
            state.optionsCustomer = action.payload;
        });

        builder.addCase(getCustomerOptionsData.rejected, (state, action) => {
            state.error = action.error.message || null;
        });
    },
});

export default OptionSlice.reducer;
