import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import getProductListSlice from "./slice/getProductListSlice";
import getProductByProductTypeSlice from "./slice/getProductListByProductTypeSlice";
import addToCartSlice from "./slice/addTocartSlice"
import paymentCheckoutSlice from "./slice/paymentCheckoutSlice";


const rootReducer = combineReducers({

    getProducts: getProductListSlice,
    getProductsByProductType: getProductByProductTypeSlice,
    addToCart: addToCartSlice,
    paymentCheckOut: paymentCheckoutSlice

});

const persistConfig = {
    key: "addToCard", // This is the key for the persisted state in storage.
    storage,
    whitelist: ["addToCart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export default store;