const { z } = require("zod");

const productArraySchema = z.object({
    name: z.string(),
    price: z.number(),
    quantity: z.number(),
});

//*Payment checkout
const paymentCheckoutSchema = z.object({

    productArray: z
        .array(productArraySchema)
        .min(1, { message: "Atleast one product required." })
        .nonempty({
            message: "Atleast one product required.",
        })
})


module.exports = {
    paymentCheckoutSchema,
};