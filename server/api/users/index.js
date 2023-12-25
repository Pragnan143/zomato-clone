import express from "express";
import passport, { session } from "passport";
import { UserModel } from "../../database/users/index";
const Router = express.Router();

/**
  Route     /
  Des       get Authorized User Data
  Params    none
  Access    Private
  Method    GET
 */

Router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { email, username, address, phoneNumber } = req.user;

      return res.json({ user: { username, email, address, phoneNumber } });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

/**
  Route     /:_id
  Des       get User Data for review system
  Params    _id
  Access    Public
  Method    GET
 */

Router.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const getUser = await UserModel.findById(_id);
    const { username } = getUser;

    if (!getUser) {
      return res.status(404).json({ error: "user not found !!" });
    }

    return res.json({ user: { username } });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
  Route     /update/:userId
  Des       update User Data 
  Params    _id
  Access    Private
  Method    PUT
 */

Router.put(
  "/update/:_id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { _id } = req.params;
      const { userData } = req.body;
      const updateUserData = await UserModel.findByIdAndUpdate(
        _id,
        { $set: userData },
        { new: true }
      );

      return res.json({ user: updateUserData });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

export default Router;
