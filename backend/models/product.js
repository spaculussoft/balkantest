const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({

    productImage: {
        required: true,
        type: Array
    },
    productType: {
        required: true,
        trim: true,
        type: String,
    },
    productName: {
        required: true,
        trim: true,
        type: String
    },
    price: {
        required: true,
        trim: true,
        type: Number
    },
    description: {
        required: true,
        trim: true,
        type: String
    },
    createdAt: { type: Date, default: Date.now }

})


const Product = new mongoose.model('Product', ProductSchema);
module.exports = Product;