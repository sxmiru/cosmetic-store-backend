import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
    {
        productId: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true
        },
        altNames: {
            type: [String],
            deafult: [],
        },
        labelledPrice: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        images: {
            type: [String],
            default: ["/deafult.product.jpeg"]
        },
        description:{
            type: String,
            required: true
        },
        stock:{
            type: Number,
            required: true,
            default: 0
        },
        isAvailable:{
            type: Boolean,
            default: true
        },
        category: {
            type: String,
            required: true,
            deafult: "cosmetics"
        }
        
    }
)

const Product = mongoose.model("products",productSchema)
export default Product;