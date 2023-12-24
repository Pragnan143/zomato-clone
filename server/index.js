import express from "express";
import dotenv from "dotenv";
import ConnectDB from "./database/connection";
import passport from "passport";
import privateRouteConfig from "./config/route.config";

import session from "express-session";

import Auth from "./api/auth/index";
import Food from "./api/food/index";
import Restarunt from "./api/restarunts/index";
import User from "./api/users/index";

dotenv.config();

//adding a private route

privateRouteConfig(passport);

const zomato = express();
zomato.use(session({ secret: "INTERN" }));

zomato.use(express.json());
zomato.use(passport.initialize());
zomato.use(passport.session());

zomato.get("/", (req, res) => {
  res.json({
    message: "server is running",
  });
});

//API usage
zomato.use("/auth", Auth);
zomato.use("/food", Food);
zomato.use("/restarunt", Restarunt);
zomato.use("/user", passport.authenticate(), User);

//Connection to port
zomato.listen(5000, () => {
  ConnectDB()
    .then(() => {
      console.log("Server is running !!!");
    })
    .catch((err) => {
      console.log("server is running but DB is not established");
      console.log(err);
    });
});
