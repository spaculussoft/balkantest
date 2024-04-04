import { APIClient } from './api_helper'
import * as url from "./url_helper";

const api = new APIClient();

//*Products
export const postAddProduct = (data) => api.create(url.ADD_PRODUCT, data);
export const postGetAllProduct = (data) => api.create(url.GET_ALL_PRODUCTS, data);
export const postGetProductByProductType = (data) => api.create(url.GET_PRODUCT_BY_PRODUCT_TYPE, data);

//*Payment
export const postCheckoutPayment = (data) => api.create(url.CHECKOUT_PAYMENT, data);
