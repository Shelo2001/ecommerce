import { createSlice } from "@reduxjs/toolkit";
import { Swal } from "sweetalert2/dist/sweetalert2";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const itemInCart = state.cart.find(
                (item) => item.id === action.payload.id
            );
            if (itemInCart) {
                itemInCart.quantity =
                    Number(itemInCart.quantity) +
                    Number(action.payload.quantity);
            } else {
                state.cart.push({
                    ...action.payload,
                    quantity: Number(action.payload.quantity),
                });
            }
        },
        incrementQuantity: (state, action) => {
            const item = state.cart.find((item) => item.id === action.payload);
            item.quantity++;
        },
        decrementQuantity: (state, action) => {
            const item = state.cart.find((item) => item.id === action.payload);
            if (item.quantity === 1) {
                item.quantity = 1;
            } else {
                item.quantity--;
            }
        },
        removeItem: (state, action) => {
            const removeItem = state.cart.filter(
                (item) => item.id !== action.payload.id
            );
            state.cart = removeItem;
        },
    },
});
export const cartReducer = cartSlice.reducer;
export const { addToCart, incrementQuantity, decrementQuantity, removeItem } =
    cartSlice.actions;
