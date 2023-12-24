import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    isVeg: { type: Boolean, required: true },
    isContaingEdd: { type: Boolean, required: true },
    category: { type: String, required: true },
    photos: { type: mongoose.Types.ObjectId, ref: "images" },
    price: { type: Number },
    addOns: [{ type: mongoose.Types.ObjectId, ref: "foods" }],
    restarunts: [{ type: mongoose.Types.ObjectId, ref: "restarunts" }],
  },
  {
    timestamps: true,
  }
);

export const FoodModel = mongoose.model("foods", FoodSchema);
