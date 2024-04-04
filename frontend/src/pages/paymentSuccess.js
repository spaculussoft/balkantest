import React, { useEffect } from "react";
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { clearCart } from "../store/slice/addTocartSlice"
import LeftNav from "../Components/leftNav";
import $ from "jquery";
import { burgerMenu, mobileMenuOutsideClick } from "../helpers/loadJQuery"

const PaymentSuccess = () => {

    const dispatch = useDispatch();

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

    //*Clear Cart
    useEffect(() => {
        dispatch(clearCart());
    }, []);

    return (
        <div className="d-flex flex-wrap h-100 justify-content-end">
            <div className="mobile-header">
                <Link className="brand-logo"><img src="assets/images/logo.webp" alt="Logo" /></Link>
                <Link className="menu-toggle"><i></i></Link>
            </div>

            <LeftNav />

            <div className="full-page-content">
                <div className="main-heading text-center">
                    <h1>Order placed successfully!</h1>
                    <h5>Thank you!</h5>
                </div>
                <div className="text-center">
                    <Link to={"/"} className="btn btn-gradient btn-contShop">Continue Shopping</Link>
                </div>
            </div>
        </div>
    )

}
export default PaymentSuccess