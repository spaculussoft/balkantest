import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postGetAllProduct } from "../../helpers/apibackend_helper";

export const getProductResponse = createAsyncThunk('product/list', async (data, { rejectWithValue }) => {

    try {
        let response = await postGetAllProduct(data);
        return response;
    } catch (error) {
        return rejectWithValue(error)
    }
})

const getProductSlice = createSlice({

    name: "getProducts",
    initialState: {
        getProductsIsLoading: false,
        getProductsIsSuccess: false,
        getProductsIsError: false,
        getProductsData: {},
        getProductsErrorMsg: "",
        getProductsTotalProducts: 0,
        getProductsTotalPages: 0,

    },
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(getProductResponse.pending, (state, action) => {
            state.getProductsIsLoading = true
            state.getProductsIsSuccess = false
            state.getProductsIsError = false
            state.getProductsTotalProducts = 0
            state.getProductsTotalPages = 0
        })

        builder.addCase(getProductResponse.fulfilled, (state, action) => {
            state.getProductsIsLoading = false
            state.getProductsIsSuccess = true
            state.getProductsIsError = false
            state.getProductsData = action.payload.data
            state.getProductsErrorMsg = ""
            state.getProductsTotalProducts = action.payload.totalProductsCount
            state.getProductsTotalPages = action.payload.totalPages
        })

        builder.addCase(getProductResponse.rejected, (state, action) => {
            state.getProductsIsLoading = false
            state.getProductsIsSuccess = false
            state.getProductsIsError = true
            state.getProductsData = {}
            state.getProductsErrorMsg = action.payload
            state.getProductsTotalProducts = 0
            state.getProductsTotalPages = 0
        })
    },

});

export default getProductSlice.reducer;

