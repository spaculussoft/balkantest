import React, { useEffect, useState, useMemo } from "react";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import LeftNav from "../Components/leftNav";
import { increaseQuantity, decreaseQuantity, deleteProduct } from "../store/slice/addTocartSlice"
import { paymentCheckoutResponse } from "../store/slice/paymentCheckoutSlice"
import $ from "jquery";
import { burgerMenu, mobileMenuOutsideClick } from "../helpers/loadJQuery"

const Cart = () => {

    const dispatch = useDispatch();

    const { addToCartData } = useSelector((state) => ({ addToCartData: state.addToCart.addToCartData }));

    useEffect(() => {
        loadJQuery();
    }, []);

    //*load JQuery
    const loadJQuery = () => {
        document.addEventListener('gesturestart', function (e) {
            e.preventDefault();
        });
        $(document).ready(function () {
            burgerMenu();
            mobileMenuOutsideClick();
        });
    }

    const {
        paymentCheckoutIsLoading,
        paymentCheckoutIsSuccess,
        paymentCheckoutIsError,
        paymentCheckoutErrorMsg,
        paymentCheckoutData,
    } = useSelector((state) => ({
        paymentCheckoutIsLoading: state.paymentCheckOut.paymentCheckoutIsLoading,
        paymentCheckoutIsSuccess: state.paymentCheckOut.paymentCheckoutIsSuccess,
        paymentCheckoutIsError: state.paymentCheckOut.paymentCheckoutIsError,
        paymentCheckoutErrorMsg: state.paymentCheckOut.paymentCheckoutErrorMsg,
        paymentCheckoutData: state.paymentCheckOut.paymentCheckoutData,
    }));

    //*Payment checkout url
    useEffect(() => {
        if (paymentCheckoutIsSuccess && paymentCheckoutData) {
            let stripeCheckoutURL = paymentCheckoutData.url;
            window.open(stripeCheckoutURL, "_self");
        }
    }, [paymentCheckoutIsSuccess, paymentCheckoutData]);

    const productTotal = useMemo(() => {
        let calculateTotal = addToCartData.reduce((acc, product) => acc + (product.price * product.quantity), 0);
        return calculateTotal;
    }, [addToCartData]);

    //*on click Increase Quantity
    const onClickIncreaseQuantity = (product_Id) => {
        dispatch(increaseQuantity(product_Id))
    }

    //*on click Decrease Quantity
    const onClickDecreaseQuantity = (product_Id) => {
        dispatch(decreaseQuantity(product_Id))
    }

    //*on click Delete Product
    const onClickDeleteProduct = (product_Id) => {
        dispatch(deleteProduct(product_Id))
    }

    //*Checkout Payment
    const onClickCheckOutPayment = () => {

        let finalArray = [];
        if (addToCartData.length > 0) {
            addToCartData.map((item, index) => {

                finalArray.push({ "name": item.productName, "price": item.price, "quantity": item.quantity })

                if (index === addToCartData.length - 1) {
                    let dataObj = { "productArray": finalArray }
                    dispatch(paymentCheckoutResponse(dataObj))
                }
            })

        }
    }


    return (

        <div className="d-flex flex-wrap h-100 justify-content-end">
            <div className="mobile-header">
                <Link className="brand-logo"><img src="assets/images/logo.webp" alt="Logo" /></Link>
                <Link className="menu-toggle"><i></i></Link>
            </div>

            <LeftNav />

            <div className="full-page-content">
                <div className="main-heading">
                    <h1>Your Cart</h1>
                </div>
                <div className="row g-4 gy-md-5 mb-md-5 pb-md-5 mb-4 pb-4">
                    <div className="col-xl col-12">
                        <div className="table-responsive">
                            <table className="cart-table">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Subtotal</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        addToCartData.length > 0 &&
                                        addToCartData.map((item, index) => {
                                            return (
                                                <tr>
                                                    <td>{item?.productName}</td>
                                                    <td>
                                                        <div className="input-group">
                                                            <span className="input-group-text"
                                                                onClick={() => {
                                                                    onClickDecreaseQuantity(item?._id)
                                                                }}
                                                            ><i className="fa-solid fa-minus"></i>
                                                            </span>
                                                            <input type="text" className="form-control" value={item?.quantity} />
                                                            <span className="input-group-text"
                                                                onClick={() => {
                                                                    onClickIncreaseQuantity(item?._id)
                                                                }}
                                                            ><i className="fa-solid fa-plus"></i>
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td>${item?.price.toFixed(2)} </td>
                                                    <td>${(item?.price * item?.quantity).toFixed(2)}</td>
                                                    <td>
                                                        <img src="assets/images/trash.svg" alt="icon"
                                                            onClick={() => {
                                                                onClickDeleteProduct(item?._id)
                                                            }}
                                                        />
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-xl-auto col-md-6">
                        <div className="bg-white cartTotals-block">
                            <h2>CART TOTALS</h2>
                            <div className="flex-grow-1 mb-4">
                                <table>
                                    <tr>
                                        <td>Subtotal</td>
                                        <td>{productTotal.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td>Total</td>
                                        <td>{productTotal.toFixed(2)}</td>
                                    </tr>
                                </table>
                            </div>
                            <Link onClick={() => {
                                onClickCheckOutPayment();
                            }} className="btn btn-dark w-100"> Proceed to Checkout</Link>
                        </div>
                    </div>


                </div>
                <div className="text-center">
                    <Link to={"/"} className="btn btn-gradient btn-contShop">Continue Shopping</Link>
                </div>

            </div>
        </div>
    )

}
export default Cart