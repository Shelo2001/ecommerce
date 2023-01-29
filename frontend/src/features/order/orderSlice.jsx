import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    shippingAddress: {},
    loading: false,
    error: null,
};

export const saveShippingAddress = createAsyncThunk(
    "users/saveShippingAddress",
    async (address) => {
        try {
            let token = JSON.parse(localStorage.getItem("token"));
            const { data } = await axios.post(
                `${import.meta.env.VITE_BASE_API_URL}/shippingaddress/save`,
                address,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            return data;
        } catch (error) {
            return error;
        }
    }
);

export const userShippingAddress = createAsyncThunk(
    "users/userShippingAddress",
    async (id) => {
        try {
            let token = JSON.parse(localStorage.getItem("token"));
            const { data } = await axios.get(
                `${import.meta.env.VITE_BASE_API_URL}/shippingaddress/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            return data;
        } catch (error) {
            return error;
        }
    }
);
export const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: {
        [saveShippingAddress.pending]: (state) => {
            state.loading = true;
        },
        [saveShippingAddress.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.shippingAddress = payload;
        },
        [saveShippingAddress.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        [userShippingAddress.pending]: (state) => {
            state.loading = true;
        },
        [userShippingAddress.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.shippingAddress = payload;
        },
        [userShippingAddress.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
    },
});

export default orderSlice.reducer;
