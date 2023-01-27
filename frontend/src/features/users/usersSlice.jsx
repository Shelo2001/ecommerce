import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: {},
    loading: false,
    error: null,
};

export const registerUser = createAsyncThunk(
    "users/registerUser",
    async (values) => {
        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_BASE_API_URL}/register`,
                values
            );
            localStorage.setItem("user", JSON.stringify(data?.user));
            localStorage.setItem("token", JSON.stringify(data?.token));
            if (data?.token) {
                document.location.href = "/";
            }
            return data;
        } catch (error) {
            return error;
        }
    }
);

export const login = createAsyncThunk("users/login", async (values) => {
    try {
        const { data } = await axios.post(
            `${import.meta.env.VITE_BASE_API_URL}/login`,
            values
        );
        localStorage.setItem("user", JSON.stringify(data?.user));
        localStorage.setItem("token", JSON.stringify(data?.token));
        if (data?.token) {
            document.location.href = "/";
        }
        return data;
    } catch (error) {
        return error;
    }
});

export const logout = createAsyncThunk("users/logout", async () => {
    try {
        const token = JSON.parse(localStorage.getItem("token"));
        const { data } = await axios.get(
            `${import.meta.env.VITE_BASE_API_URL}/logout`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        localStorage.removeItem("user", JSON.stringify(data?.user));
        localStorage.removeItem("token", JSON.stringify(data?.token));
        document.location.href = "/login";
        return data;
    } catch (error) {
        return error;
    }
});

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: {
        [registerUser.pending]: (state) => {
            state.loading = true;
        },
        [registerUser.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.user = payload;
        },
        [registerUser.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        [login.pending]: (state) => {
            state.loading = true;
        },
        [login.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.user = payload;
        },
        [login.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        [logout.pending]: (state) => {
            state.loading = true;
        },
        [logout.fulfilled]: (state) => {
            state.loading = false;
            state.user = {};
        },
        [logout.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
    },
});

export default usersSlice.reducer;
