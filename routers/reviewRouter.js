import express from "express";
import { createReviews, deleteReview, getReviews, updateReview } from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/", createReviews);
reviewRouter.get("/", getReviews);
reviewRouter.delete("/:reviewId", deleteReview);
reviewRouter.put("/:reviewId", updateReview);



export default reviewRouter;