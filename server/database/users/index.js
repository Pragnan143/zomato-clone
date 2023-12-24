import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    address: [
      {
        details: { type: String, required: true },
        for: { type: String, required: true },
      },
    ],
    phoneNumber: [{ type: Number, required: true }],
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model("users", UserSchema);
