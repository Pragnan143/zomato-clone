import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    food: { type: mongoose.Types.ObjectId, ref: "foods" },
    restarunts: { type: mongoose.Types.ObjectId, ref: "restarunts" },
    user: { type: mongoose.Types.ObjectId, ref: "users" },
    rating: { type: Number, required: true },
    reviewText: { type: String, required: true },
    isRestaruntReview: { type: Boolean, required: true },
    isFoodReview: { type: Boolean, required: true },
    photos: { type: mongoose.Types.ObjectId, ref: "images" },
  },
  {
    timestamps: true,
  }
);

export const ReviewModel = mongoose.model("Reviews", ReviewSchema);
