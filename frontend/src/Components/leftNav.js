
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { getProductResponse } from "../store/slice/getProductListSlice"
import { useDispatch, useSelector } from 'react-redux'


const LeftNav = () => {

    const { addToCartData } = useSelector((state) => ({ addToCartData: state.addToCart.addToCartData }));

    return (
        <aside className="aside-main" id="asidePage">

            <Link href="index.html" className="brand-logo"><img src="assets/images/logo.webp" alt="Logo" /></Link>
            <div className="aside-menu">
                <nav className="">
                    <ul>
                        <li><Link to={"/"}><img src="assets/images/home.svg" alt="icon" />Home</Link></li>
                        <li><Link to={"/chess"}><img src="assets/images/chess.svg" alt="icon" />Chess</Link></li>
                        <li><Link to={"/soccer"}><img src="assets/images/soccer.svg" alt="icon" />Soccer</Link></li>
                        <li><Link to={"/watersports"}><img src="assets/images/watersports.svg" alt="icon" />Watersports</Link></li>
                    </ul>
                </nav>
                <p>© Balkan. All Rights Reserved.</p>
                <div className="cart">
                    <span className="badge rounded-pill">{addToCartData.length}</span>
                    <Link to={"/cart"}><span><img src="assets/images/cart.svg" alt="icon" /></span></Link>
                </div>
            </div>

        </aside>
    )

}
export default LeftNav