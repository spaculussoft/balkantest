
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import LeftNav from "../Components/leftNav";
import ProductCart from "../Components/productCart";
import { getProductResponse } from "../store/slice/getProductListSlice"
import $ from "jquery";
import { burgerMenu, mobileMenuOutsideClick } from "../helpers/loadJQuery"

const Dashboard = () => {

    const dispatch = useDispatch();

    //*state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);

    //*list
    const [pages, setPages] = useState([]);


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
        getProductsIsLoading,
        getProductsIsSuccess,
        getProductsIsError,
        getProductsData,
        getProductsErrorMsg,
        getProductsTotalProducts,
        getProductsTotalPages
    } = useSelector((state) => ({
        getProductsIsLoading: state.getProducts.getProductsIsLoading,
        getProductsIsSuccess: state.getProducts.getProductsIsSuccess,
        getProductsIsError: state.getProducts.getProductsIsError,
        getProductsData: state.getProducts.getProductsData,
        getProductsErrorMsg: state.getProducts.getProductsErrorMsg,
        getProductsTotalProducts: state.getProducts.getProductsTotalProducts,
        getProductsTotalPages: state.getProducts.getProductsTotalPages,
    }));

    useEffect(() => {
        getProductList(currentPage, itemsPerPage);
    }, []);

    useEffect(() => {
        if (getProductsTotalPages > 0) {
            let totalPages = Array.from({ length: getProductsTotalPages }, (_, index) => index + 1);
            setPages(totalPages);
        }
    }, [getProductsTotalProducts, getProductsTotalPages]);


    //*on click page no
    const onChangePage = (pageNo) => {
        setCurrentPage(pageNo);
        getProductList(pageNo, itemsPerPage);
    }

    //*get Product list
    const getProductList = async (pageNo, itemsPerPage) => {
        let dataObj = {
            "pageNo": pageNo,
            "perPage": itemsPerPage
        }
        dispatch(getProductResponse(dataObj));
    }

    //*next page
    const handleNextPage = async () => {
        if (currentPage < getProductsTotalPages) {
            setCurrentPage(currentPage + 1);
            let pageNo = currentPage + 1
            getProductList(pageNo, itemsPerPage);
        }
    };

    //*pre page
    const handlePreviousPage = async () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            let pageNo = currentPage - 1
            getProductList(pageNo, itemsPerPage);
        }
    };

    //*Handle Items Per Page Change
    const handleItemsPerPageChange = (event) => {
        setItemsPerPage(parseInt(event.target.value));
        let itemsPerPage = parseInt(event.target.value);
        getProductList(currentPage, itemsPerPage);
    };

    
    return (

        <div className="d-flex flex-wrap h-100 justify-content-end">
            <div className="mobile-header">
                <Link href="index.html" className="brand-logo"><img src="assets/images/logo.webp" alt="Logo" /></Link>
                <Link href="#" className="menu-toggle" aria-label="mobile menu toggle"><i></i></Link>
            </div>
            <LeftNav />

            <div className="full-page-content">
                <div className="main-heading">
                    <h1>Products</h1>
                </div>
                <div className="row g-4 mb-5">
                    {
                        getProductsData.length > 0 ?
                            getProductsData.map((item, index) => {
                                return (
                                    <ProductCart
                                        items={item}
                                    />
                                )
                            }) : null
                    }
                </div>
                <hr className="mt-0 mb-3" />

                <div className="row gx-3 gy-3 justify-content-end">
                    <div className="col-auto">
                        <select className="form-select" aria-label="Default select example" onChange={handleItemsPerPageChange}>
                            <option value="6" selected>6 per page</option>
                            <option value="9">9 per page</option>
                            <option value="12">12 per page</option>
                        </select>
                    </div>
                    <div className="col-auto">
                        <nav aria-label="Page navigation example">
                            <ul className="pagination">
                                <li className="page-item ">
                                    <Link className="page-link" aria-label="Previous" onClick={() => {
                                        handlePreviousPage();
                                    }}>
                                        <span aria-hidden="true"><i className="fa-solid fa-angle-left"></i></span>
                                    </Link>
                                </li>
                                {
                                    pages.length > 0 ?
                                        pages.map((item, index) => {
                                            return (
                                                <li className={item === currentPage ? 'page-item active' : 'page-item'} aria-current="page">
                                                    <Link className="page-link"
                                                        onClick={() => {
                                                            onChangePage(item)
                                                        }}>{item}</Link>
                                                </li>
                                            )
                                        }) : null
                                }
                                <li className="page-item">
                                    <Link className="page-link" aria-label="Next" onClick={() => {
                                        handleNextPage();
                                    }}>
                                        <span aria-hidden="true"><i className="fa-solid fa-angle-right"></i></span>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default Dashboard