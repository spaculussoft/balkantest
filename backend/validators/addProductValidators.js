const { z } = require("zod");

//*Add product
const addProductSchema = z.object({

    productType: z
        .string({ required_error: "Product Type is required." })
        .trim()
        .min(1, { message: "Product Type is required." })
        .max(30, { message: "Product Type must not be more than 30 char. " }),

    productName: z
        .string({ required_error: "Product Name is required" })
        .trim()
        .min(1, { message: "Product Name is required" })
        .max(30, { message: "Product Name must not be more than 30 char. " }),

    price: z
        .string({ required_error: "Price is required" })
        .min(1, { message: "Price is required" })
        .min(1, { message: "Price must greater than 0." }),

    description: z
        .string({ required_error: "Description is required" })
        .trim()
        .min(1, { message: "Description is required" })
        .max(200, { message: "Description must not be more than 30 char. " }),

})

//*Product List
const getProductListSchema = z.object({

    pageNo: z
        .number({ required_error: "Page No is required." })
        .gt(0, { message: "Page No must be equal to 0." }),
    perPage: z
        .number({ required_error: "Per Page is required." })
        .min(6, { message: "Per Page  must be 6." })
        .gt(0, { message: "Per Page No must be equal to 0." })
})

//*Product List
const getProductListByProductTypeSchema = z.object({

    productType: z
        .string({ required_error: "Product Type is required." })
        .trim()
        .min(1, { message: "Product Type is required." })
        .max(30, { message: "Product Type must not be more than 30 char. " }),

    pageNo: z
        .number({ required_error: "Page No is required." })
        .gt(0, { message: "Page No must be equal to 0." }),
    perPage: z
        .number({ required_error: "Per Page is required." })
        .min(6, { message: "Per Page  must be 6." })
        .gt(0, { message: "Per Page No must be equal to 0." })
})


module.exports = {
    addProductSchema,
    getProductListSchema,
    getProductListByProductTypeSchema
};