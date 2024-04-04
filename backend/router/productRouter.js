const express = require('express');
const multer = require('multer');
const path = require("path");
const ProductRouter = express.Router();
const productController = require("../controllers/productController");
const productValidationSchema = require("../validators/addProductValidators")
const validate = require("../middlewares/validateMiddleware")
ProductRouter.use(express.static('uploads'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads'))
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name)
    }
})

const upload = multer({ storage: storage })

ProductRouter.route('/addProduct').post(upload.array('productImage', 5), validate(productValidationSchema.addProductSchema), productController.AddProductContact);
ProductRouter.route('/').post(validate(productValidationSchema.getProductListSchema), productController.getAllProducts);
ProductRouter.route('/details/:id').get(productController.getProductDetails);
ProductRouter.route('/specific/product/type').post(validate(productValidationSchema.getProductListByProductTypeSchema), productController.getProductListSpecificType);

module.exports = ProductRouter;