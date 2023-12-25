import express from "express";
import passport from "passport";

import { UserModel } from "../../database/allModels";
import {
  validateSignIn,
  validateSignUp,
} from "../../validation/auth.validation";

const Router = express.Router();

Router.post("/signup", async (req, res) => {
  try {
    await validateSignUp(req.body.credentials);

    await UserModel.findByPhoneAndEmail(req.body.credentials);

    const newUser = await UserModel.create(req.body.credentials);

    const token = newUser.generateJwtToken();

    return res.status(200).json({ token, status: "success" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

Router.post("/signin", async (req, res) => {
  try {
    await validateSignIn(req.body.credentials);

    const user_ = await UserModel.findByEmailAndPassword(req.body.credentials);

    const token = user_.generateJwtToken();

    return res.status(200).json({ token, status: "success" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

Router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);

Router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // return res.status(200).json({
    //   token: req.session.passport.user.token,
    // });
    const token = req.passport.session.token;

    return res.status(200).json({ token: token });
  }
);

export default Router;
