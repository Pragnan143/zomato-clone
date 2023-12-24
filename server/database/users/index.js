import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

//Attachments

UserSchema.methods.generateJwtToken = function () {
  return jwt.sign({ user: this._id.toString() }, "INTERN");
};

//Helper Functions

UserSchema.statics.findByPhoneAndEmail = async ({ email, phoneNumber }) => {
  const checkByEmail = await UserModel.findOne({ email });
  const checkByPhone = await UserModel.findOne({ phoneNumber });

  if (checkByEmail || checkByPhone) {
    throw new Error("User Already Exists !!!");
  }

  return false;
};

UserSchema.statics.findByEmailAndPassword = async ({ email, password }) => {
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new Error("User Doesn't  Exists !!!");
  }

  const passwdMatch = await bcrypt.compare(password, user.password);

  if (!passwdMatch) {
    throw new Error("Invalid Credentials !!!");
  }

  return user;
};

UserSchema.pre("save", function (next) {
  const user = this;

  //Any user without Password
  if (!user.isModified("password")) return next();

  //User with password will be salted password
  bcrypt.genSalt(5, (error, salt) => {
    if (error) return next(error);

    //hash the password
    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) return next(error);

      //save this to db then
      user.password = hash;
      return next();
    });
  });
});

export const UserModel = mongoose.model("users", UserSchema);
