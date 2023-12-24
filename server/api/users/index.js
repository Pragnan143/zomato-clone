import express from "express";
import session from "express-session";

const Router = express.Router();

/**
  Route     /
  Des       get Authorized User Data
  Params    none
  Access    Public
  Method    GET
 */

Router.get("/", (req, res) => {
  try {
    const { email, username, address, phoneNumber } = req.user;

    return res
      .status(200)
      .json({ user: { username, email, address, phoneNumber } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default Router;
