import express from "express";

import { FoodModel } from "../../database/food";

const Router = express.Router();

/**
  Route     /
  Des       create New Food
  Params    none
  Access    Public
  Method    POST
 */

Router.post("/", async (req, res) => {
  try {
    const newFoods = await FoodModel.create(req.body);
    return res.status(200).json({ newFoods, status: "success" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
  Route     /:_id
  Des       get food based on id
  Params    _id
  Access    Public
  Method    GET
 */

Router.get("/:id", async (req, res) => {
  try {
    const { _id } = req.params;
    const findByIdoods = await FoodModel.findById(_id);
    return res.json({ foods });
  } catch (error) {
    return res.ststus(500).json({ error: error.message });
  }
});

/**
  Route     /:_id
  Des       get all food based on restarunt id
  Params    _id
  Access    Public
  Method    GET
 */

Router.get("/r/:id", async (req, res) => {
  try {
    const { _id } = req.params;
    const foods = await FoodModel.find({
      restarunts: _id,
    });
    return res.json({ foods });
  } catch (error) {
    return res.ststus(500).json({ error: error.message });
  }
});

/**
  Route     /c/:_id
  Des       get all food based on category
  Params    category
  Access    Public
  Method    GET
 */

Router.post("/c/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const foods = await FoodModel.find({
      category: { $regex: category, $options: "i" },
    });

    if (!foods) {
      return res.status(500).json({ error: `No food matched ${category}` });
    }
    return res.json({ foods });
  } catch (error) {
    return res.ststus(500).json({ error: error.message });
  }
});

export default Router;
