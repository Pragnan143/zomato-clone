import express from "express";
import dotenv from "dotenv";
import ConnectDB from "./database/connection";
import passport from "passport";
import session from "express-session";

import privateRouteConfig from "./config/route.config";
import googleAuthConfig from "./config/google.config";

import Auth from "./api/auth/index.js";
import Food from "./api/food/index.js";
import Restarunt from "./api/restarunts/index.js";
import User from "./api/users/index.js";
import Order from "./api/orders/index.js";
import Menu from "./api/menu/index.js";
import Review from "./api/reviews/index.js";
import Image from "./api/images/index.js";

dotenv.config();
//adding a private route
privateRouteConfig(passport);

//adding Google Authentication
googleAuthConfig(passport);

const zomato = express();
zomato.use(express.json());
zomato.use(session({ secret: process.env.JWT_SECRET }));
zomato.use(passport.initialize());
zomato.use(passport.session());

//API usage
zomato.use("/auth", Auth);
zomato.use("/user", User);
zomato.use("/food", Food);
zomato.use("/restarunt", Restarunt);
zomato.use("/order", Order);
zomato.use("/menu", Menu);
zomato.use("/image", Image);
zomato.use("/review", Review);

zomato.get("/", (req, res) => {
  try {
    return res.send({ message: "hi hello namastae" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
//Connection to port
zomato.listen(4000, () => {
  ConnectDB()
    .then(() => {
      console.log("Server is running !!!");
    })
    .catch((err) => {
      console.log("server is running but DB is not established");
      console.log(err);
    });
});
