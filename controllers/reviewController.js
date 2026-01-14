import Reviews from "../models/review.js";
import { isAdmin } from "./userController.js";

export async function createReviews(req,res) {
    if(req.user == null){
        res.status(401).json({
            message: "Please login to add a review"
        });
        return;
    }

    const review = new Reviews(
        {
            reviewId:  req.body.reviewId,
            productId: req.body.productId,
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            email: req.user.email,
            images: req.body.images,
            rating: req.body.rating,
            comment: req.body.comment
        }
    );
    try{
        const result = await review.save();
        res.json({
            message: "Review added successfully",
            review: result
        })
    }catch(error){
        console.error("Error adding review: ", error);
        res.status(500).json({
        message: "Failed to add review"
        })
    }
}

export async function getReviews(req,res) {
    try{
        const reviews = await Reviews.find().sort({createdAt: -1});
        res.json({
            reviews: reviews
        })
    }catch(error){
        console.error("Failed to fetch reviews", error)
        return res.status(500).json({
            message: "Failed to fetch reviews"
        })
    }
}

export async function getReviewsByProductId(req,res) {
    try{
        const productId = req.params.productId;
        const reviews = await Reviews.find({productId: productId}).sort({createdAt: -1});
        res.json({
            reviews: reviews
        })
    }catch(error){
        console.error("Failed to fetch review", error)
        return res.status(500).json({
            message: "Failed to fetch review"
        })
    }
}

export async function deleteReview(req, res) {
    try {
        const reviewId  = req.params.reviewId;
        const user = req.user; 

        const review = await Reviews.findOne({ reviewId: reviewId }); 
        
        if (!review) {
            return res.status(404).json({
                message: "Review not found"
            });
        }

        if (!user) {
            return res.status(401).json({
                message: "Please login to delete a review"
            });
        }

        const isReviewOwner = review.email === user.email;

        if (!isAdmin(req) && !isReviewOwner) {
            return res.status(403).json({
                message: "You are not authorized to delete this review"
            });
        }

        await Reviews.findOneAndDelete({ reviewId: reviewId });

        res.json({
            message: "Review deleted successfully",
            deletedReviewId: reviewId
        });

    } catch(error) {
        console.error("Failed to delete review", error);
        return res.status(500).json({
            message: "Failed to delete review",
        });
    }
}

export async function updateReview(req, res) {
    const reviewId = req.params.reviewId;
    const data = req.body;
    const user = req.user;

    data.reviewId = reviewId;

    if(!user){
        return res.status(401).json({
            message: "Please login to update a review"
        })
    }
  
    try{
        const review = await Reviews.findOne({reviewId: reviewId})

        if(!review){
            return res.status(404).json({
                message: "Review not found"
            })
        }

        const isReviewOwner = review.email == user.email;

        if(!isAdmin(req) && !isReviewOwner){
            return res.status(403).json({
                message: "You are not authorized to update this review"
            })
        }

        await Reviews.updateOne(
            {reviewId: reviewId},
            data
        );
        return res.json({
            message: "Review updated successfully"
        })
    }catch(error){
        console.error("Fail to update review: ", error);
        return res.status(500).json({
            message: "Failed to update review"
        })
    }
}