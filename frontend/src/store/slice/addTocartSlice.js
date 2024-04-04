import { createSlice } from "@reduxjs/toolkit";

const addToCartSlice = createSlice({

    name: "addToCart",
    initialState: {
        addToCartIsLoading: false,
        addToCartIsSuccess: false,
        addToCartIsError: false,
        addToCartData: [],
        addToCartErrorMsg: "",
    },
    reducers: {

        addToCart: (state, action) => {

            const newProduct = action.payload;
            const existingProductIndex = state.addToCartData.findIndex(item => item._id === newProduct._id);
            if (existingProductIndex !== -1) {
                state.addToCartData[existingProductIndex].quantity += newProduct.quantity || 1;
            } else {
                state.addToCartData.push({ ...newProduct, quantity: newProduct.quantity || 1 });
            }
        },

        increaseQuantity: (state, action) => {
            const productId = action.payload;
            const productIndex = state.addToCartData.findIndex(item => item._id === productId);
            if (productIndex !== -1) {
                state.addToCartData[productIndex].quantity += 1;
            }
        },

        decreaseQuantity: (state, action) => {
            const productId = action.payload;
            const productIndex = state.addToCartData.findIndex(item => item._id === productId);
            if (productIndex !== -1 && state.addToCartData[productIndex].quantity > 1) {
                state.addToCartData[productIndex].quantity -= 1;
            }
        },

        deleteProduct: (state, action) => {
            const productId = action.payload;
            state.addToCartData = state.addToCartData.filter(item => item._id !== productId);
        },

        clearCart: state => {
            state.addToCartIsLoading = false;
            state.addToCartIsSuccess = false;
            state.addToCartIsError = false;
            state.addToCartData = [];
            state.addToCartErrorMsg = "";
        },

    },

});

export const { addToCart, clearCart, increaseQuantity, decreaseQuantity, deleteProduct, } = addToCartSlice.actions;
export default addToCartSlice.reducer;

