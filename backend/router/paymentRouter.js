const express = require('express');
const paymentRoute = express.Router();
const paymentCheckoutController = require("../controllers/paymentCheckoutController");
const paymentValidationSchema = require("../validators/paymentValidators")
const validate = require("../middlewares/validateMiddleware")

paymentRoute.route('/checkOutPayment').post(validate(paymentValidationSchema.paymentCheckoutSchema), paymentCheckoutController.checkOutPayment);

module.exports = paymentRoute;