import mongoose from "mongoose"

const reviewSchema = new mongoose.Schema(
    {
        reviewId: {
            type: String,
            required: true
        },
        productId: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        comment: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
)

const Reviews = mongoose.model("reviews", reviewSchema);

export default Reviews;