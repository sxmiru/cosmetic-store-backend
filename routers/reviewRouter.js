import express from "express";
import { createReviews, deleteReview, getReviews, getReviewsByProductId, updateReview } from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/", createReviews);
reviewRouter.get("/", getReviews);
reviewRouter.get("/:productId", getReviewsByProductId);
reviewRouter.delete("/:reviewId", deleteReview);
reviewRouter.put("/:reviewId", updateReview);

export default reviewRouter;