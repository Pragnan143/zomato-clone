import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema(
  {
    menus: [
      {
        name: { type: String, required: true },
        items: [{ type: mongoose.Types.ObjectId, ref: "foods" }],
        recommended: [
          { types: mongoose.Types.ObjectId, ref: "foods", unique: true },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const MenuModel = mongoose.model("menus", MenuSchema);
