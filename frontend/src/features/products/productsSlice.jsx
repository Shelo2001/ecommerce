import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    products: [],
    product: {},
    loading: false,
    error: null,
};

export const allProducts = createAsyncThunk("users/allProducts", async () => {
    try {
        const { data } = await axios.get(
            `${import.meta.env.VITE_BASE_API_URL}/products`
        );
        return data?.data;
    } catch (error) {
        return error;
    }
});

export const getProduct = createAsyncThunk("users/getProduct", async (id) => {
    try {
        const { data } = await axios.get(
            `${import.meta.env.VITE_BASE_API_URL}/products/${id}`
        );
        return data;
    } catch (error) {
        return error;
    }
});

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: {
        [allProducts.pending]: (state) => {
            state.loading = true;
        },
        [allProducts.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.products = payload;
        },
        [allProducts.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        [getProduct.pending]: (state) => {
            state.loading = true;
        },
        [getProduct.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.product = payload;
        },
        [getProduct.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
    },
});

export default productsSlice.reducer;
