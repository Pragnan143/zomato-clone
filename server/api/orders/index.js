import express from "express";
import passport from "passport";

import { OrderModel } from "../../database/orders/index";
const Router = express.Router();

/**
  Route     /:_id
  Des        get all orders by user  id
  Params    _id
  Access    Public
  Method    GET
 */

Router.get(
  "/:_id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { user } = req;
      const getOrders = await OrderModel.findOne({ user: user._id });
      if (!getOrders) {
        return res.status(400).json({ error: "Orders not found fron user" });
      }

      return res.status(200).json({ orders: getOrders });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

/**
  Route     /new
  Des       Add Order
  Params    none
  Access    Private
  Method    POST or PUT
 */

Router.put(
  "/new",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { user } = req;
      const { orderDetails } = req.body;
      const newOrder = await OrderModel.findOneAndUpdate(
        {
          user: user._id,
        },
        {
          $push: {
            orderDetails: orderDetails,
          },
        },
        {
          new: true,
        }
      );

      return res.status(200).json({ order: newOrder });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

export default Router;
