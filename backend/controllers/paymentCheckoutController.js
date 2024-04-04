
const stripePaymentMethod = require('../helper/stripePayment')

const checkOutPayment = async (req, res) => {

    try {
        const { productArray } = req.body;

        if (productArray !== undefined) {

            const lineItems = productArray.map((product) => (
                {
                    price_data: {
                        currency: 'USD',
                        product_data: {
                            name: product.name
                        },
                        unit_amount: product.price * 100
                    },
                    quantity: product.quantity
                }))

            let session = await stripePaymentMethod.makePayment(lineItems);

            res.status(200).send({
                statusCode: 200,
                url: session.url,
            });

        } else {
            res.status(400).send({
                message: "Pls provide Products",
            });
        }

    } catch (error) {
        // console.log('error----', error)
        res.status(400).send({ msg: "Internal server error" });
    }
}

module.exports = { checkOutPayment }