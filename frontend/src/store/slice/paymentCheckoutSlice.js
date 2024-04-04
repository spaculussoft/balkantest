import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postCheckoutPayment } from "../../helpers/apibackend_helper";

export const paymentCheckoutResponse = createAsyncThunk('payment/checkout', async (data, { rejectWithValue }) => {

    try {
        let response = await postCheckoutPayment(data);
        return response;
    } catch (error) {
        return rejectWithValue(error)
    }
})

const paymentCheckOutSlice = createSlice({

    name: "paymentCheckOut",
    initialState: {
        paymentCheckoutIsLoading: false,
        paymentCheckoutIsSuccess: false,
        paymentCheckoutIsError: false,
        paymentCheckoutErrorMsg: "",
        paymentCheckoutData: {},
    },
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(paymentCheckoutResponse.pending, (state, action) => {
            state.paymentCheckoutIsLoading = true
            state.paymentCheckoutIsSuccess = false
            state.paymentCheckoutIsError = false
        })

        builder.addCase(paymentCheckoutResponse.fulfilled, (state, action) => {
            state.paymentCheckoutIsLoading = false
            state.paymentCheckoutIsSuccess = true
            state.paymentCheckoutIsError = false
            state.paymentCheckoutData = action.payload
            state.paymentCheckoutErrorMsg = ""
        })

        builder.addCase(paymentCheckoutResponse.rejected, (state, action) => {
            state.paymentCheckoutIsLoading = false
            state.paymentCheckoutIsSuccess = false
            state.paymentCheckoutIsError = true
            state.paymentCheckoutData = {}
            state.paymentCheckoutErrorMsg = action.payload
        })
    },

});

export default paymentCheckOutSlice.reducer;

