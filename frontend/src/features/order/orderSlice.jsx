import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    shippingAddress: {},
    order: [],
    paymentSuccess: false,
    placedOrder: [],
    myOrders: [],
    success: false,
    loading: false,
    error: null,
};

export const saveShippingAddress = createAsyncThunk(
    "order/saveShippingAddress",
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
    "order/userShippingAddress",
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

export const saveOrder = createAsyncThunk("order/saveOrder", async (order) => {
    try {
        let token = JSON.parse(localStorage.getItem("token"));
        const { data } = await axios.post(
            `${import.meta.env.VITE_BASE_API_URL}/order/save`,
            order,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return data;
    } catch (error) {
        return error;
    }
});

export const getOrderById = createAsyncThunk(
    "order/getOrderById",
    async (id) => {
        try {
            let token = JSON.parse(localStorage.getItem("token"));
            const { data } = await axios.get(
                `${import.meta.env.VITE_BASE_API_URL}/order/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            return data;
        } catch (error) {
            return error;
        }
    }
);

export const updateOrderPayOnDelivery = createAsyncThunk(
    "order/updateOrderPayOnDelivery",
    async (id) => {
        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_BASE_API_URL}/order/update/${id}`
            );
            return data;
        } catch (error) {
            return error;
        }
    }
);

export const payOrder = createAsyncThunk(
    "order/payOrder",
    async (paymentData) => {
        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_BASE_API_URL}/order/pay/${
                    paymentData.order_id
                }`,
                paymentData
            );
            return data;
        } catch (error) {
            return error;
        }
    }
);

export const myOrders = createAsyncThunk("order/myOrders", async (id) => {
    try {
        const { data } = await axios.get(
            `${import.meta.env.VITE_BASE_API_URL}/order/myorders/${id}`
        );
        return data;
    } catch (error) {
        return error;
    }
});

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
        [saveOrder.pending]: (state) => {
            state.loading = true;
        },
        [saveOrder.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.order = payload;
            state.success = true;
        },
        [saveOrder.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        [getOrderById.pending]: (state) => {
            state.loading = true;
        },
        [getOrderById.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.placedOrder = payload.order;
            state.success = true;
        },
        [getOrderById.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        [updateOrderPayOnDelivery.pending]: (state) => {
            state.loading = true;
        },
        [updateOrderPayOnDelivery.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.success = true;
        },
        [updateOrderPayOnDelivery.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        [payOrder.pending]: (state) => {
            state.loading = true;
        },
        [payOrder.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.success = true;
            state.paymentSuccess = true;
        },
        [payOrder.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        [myOrders.pending]: (state) => {
            state.loading = true;
        },
        [myOrders.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.myOrders = payload[0];
            state.success = true;
        },
        [myOrders.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
    },
});

export default orderSlice.reducer;
