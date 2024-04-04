const Product = require('../models/product')
const fs = require('fs');
const path = require("path");

//*Add Product 
const AddProductContact = async (req, res) => {
    try {
        if (req.files.length === 0) { return res.status(400).json({ message: 'Please upload a file' }); }

        const product = new Product({
            productImage: req.files.map(file => file.filename),
            productType: req.body.productType,
            productName: req.body.productName,
            price: req.body.price,
            description: req.body.description,
        })

        const productData = await product.save();
        res.status(200).send({
            statusCode: 200,
            message: "Product Add successfully",
            data: productData,
        });

    } catch (error) {
        //  console.log('error----', error)
        res.status(400).send({ msg: "Internal server error" });
    }
}

//*Get All Products
const getAllProducts = async (req, res) => {
    try {
        const { pageNo, perPage } = req.body;
        const skip = (pageNo - 1) * perPage;
        const totalProductsCount = await Product.find().count()
        const totalProducts = await Product.find()
        const productResponse = await Product
            .find()
            .skip(skip)
            .limit(perPage)
            .sort({ createdAt: -1 });

        const totalPages = Math.ceil(totalProducts.length / perPage);
        res.status(200).send({
            statusCode: 200,
            message: "Get all products successfully",
            totalPages: totalPages,
            totalProductsCount: totalProductsCount,
            data: productResponse
        });

    } catch (error) {
        res.status(400).send({ msg: "Internal server error" });
    }
}

//*product Details
const getProductDetails = async (req, res) => {
    try {
        const productResponse = await Product.findById(req.params.id);
        res.status(200).send({
            statusCode: 200,
            message: "Get Product details successfully",
            data: productResponse
        });

    } catch (error) {
        res.status(400).send({ msg: "Internal server error" });
    }
}

//*Products with specific product type
const getProductListSpecificType = async (req, res) => {
    try {
        const { productType, pageNo, perPage } = req.body;
        const skip = (pageNo - 1) * perPage;
        const totalProductsCount = await Product.find({ 'productType': { $eq: productType } }).count()
        const totalProducts = await Product.find({ 'productType': { $eq: productType } })
        const productResponse = await Product
            .find({ 'productType': { $eq: productType } })
            .skip(skip)
            .limit(perPage)
            .sort({ createdAt: -1 });

        const totalPages = Math.ceil(totalProducts.length / perPage);
        res.status(200).send({
            statusCode: 200,
            message: "Get all products by product type successfully",
            totalPages: totalPages,
            totalProductsCount: totalProductsCount,
            data: productResponse
        });

    } catch (error) {
        res.status(400).send({ msg: "Internal server error" });
    }
}

module.exports = { AddProductContact, getAllProducts, getProductDetails, getProductListSpecificType }