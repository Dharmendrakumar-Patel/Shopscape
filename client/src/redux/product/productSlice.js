import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: null
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            state.value = action.payload;
        },
        removeProduct: (state) => {
            state.value = null;
        }
    }
});

export const { addProduct, removeProduct } = productSlice.actions;

export const selectProduct = (state) => state.product.value;

export default productSlice.reducer;