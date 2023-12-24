import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    food: { type: mongoose.Types.ObjectId, ref: "foods" },
    restarunt: { type: mongoose.Types.ObjectId, ref: "restarunts" },
    user: { type: mongoose.Types.ObjectId, ref: "users" },
    rating: {},
    reviewText: {},
    isRestaruntReview: {},
    isFoodReview: {},
    photos: { type: mongoose.Types.ObjectId, ref: "images" },
  },
  {
    timestamps: true,
  }
);

export const ReviewModel = mongoose.model("Reviews", ReviewSchema);
