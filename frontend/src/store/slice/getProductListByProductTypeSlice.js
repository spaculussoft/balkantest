import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postGetProductByProductType } from "../../helpers/apibackend_helper";

export const getProductByProductTypeResponse = createAsyncThunk('product/list/byProductType', async (data, { rejectWithValue }) => {

    try {
        let response = await postGetProductByProductType(data);
        return response;
    } catch (error) {
        return rejectWithValue(error)
    }
})

const getProductByProductTypeSlice = createSlice({

    name: "getProductsByProductType",
    initialState: {
        getProductByProductIsLoading: false,
        getProductByProductIsSuccess: false,
        getProductByProductIsError: false,
        getProductByProductData: {},
        getProductByProductErrorMsg: "",
        getProductByProductTotalProducts: 0,
        getProductByProductTotalPages: 0,
    },
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(getProductByProductTypeResponse.pending, (state, action) => {
            state.getProductByProductIsLoading = true
            state.getProductByProductIsSuccess = false
            state.getProductByProductIsError = false
            state.getProductByProductTotalProducts = 0
            state.getProductByProductTotalPages = 0
        })

        builder.addCase(getProductByProductTypeResponse.fulfilled, (state, action) => {
            state.getProductByProductIsLoading = false
            state.getProductByProductIsSuccess = true
            state.getProductByProductIsError = false
            state.getProductByProductData = action.payload.data
            state.getProductByProductErrorMsg = ""
            state.getProductByProductTotalProducts = action.payload.totalProductsCount
            state.getProductByProductTotalPages = action.payload.totalPages
        })

        builder.addCase(getProductByProductTypeResponse.rejected, (state, action) => {
            state.getProductByProductIsLoading = false
            state.getProductByProductIsSuccess = false
            state.getProductByProductIsError = true
            state.getProductByProductData = {}
            state.getProductByProductErrorMsg = action.payload
            state.getProductByProductTotalProducts = 0
            state.getProductByProductTotalPages = 0
        })
    },

});

export default getProductByProductTypeSlice.reducer;

