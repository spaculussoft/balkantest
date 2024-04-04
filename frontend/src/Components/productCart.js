
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { addToCart } from "../store/slice/addTocartSlice"

const ProductCart = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //*on click add To cart
    const onClickAddToCart = (productData) => {
        dispatch(addToCart(productData));
    }

    return (
        <div className="col-xxl-4 col-md-6">
            <div className="products-block">
                <div className="products-head">
                    <h2>{props.items?.productName.charAt(0).toUpperCase() + props.items?.productName.slice(1)}</h2>
                    <h2><span>${props.items?.price.toFixed(2)}</span></h2>
                </div>
                <div className="products-body">
                    <div>
                        <h3>{props.items?.description}</h3>
                        <p>- {props.items?.productType}</p>
                    </div>

                    <Link
                        to={"/cart"}
                        className="btn btn-dark w-100"
                        onClick={() => {
                            onClickAddToCart(props.items);
                        }}
                    >Add to cart</Link>
                </div>
            </div>
        </div>
    )

}
export default ProductCart