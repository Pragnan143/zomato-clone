import express from "express";

import { RestrauntModel } from "../../database/restarunts";

const Router = express.Router();
/**
  Route     /
  Des       create New Restarunt
  Params    none
  Access    Public
  Method    POST
 */

Router.post("/", async (req, res) => {
  try {
    const newRestarunts = await FoodModel.create(req.body);
    return res.status(200).json({ newRestarunts, status: "success" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
  Route     /
  Des       get all restarunts details based on city
  Params    
  Access    Public
  Method    GET
 */

Router.get("/", async (req, res) => {
  try {
    const { city } = req.query;
    const restarunts = await RestrauntModel.find({ city });

    if (city.length() === 0) {
      return res.json({ error: "No Restarunts in the city" });
    }
    return res.status(200).json({ restarunts });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
  Route     /:_id
  Des       get all restarunts details based on id
  Params    _id
  Access    Public
  Method    GET
 */

Router.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const restarunts = await RestrauntModel.findById(_id);

    if (!restarunts) {
      return res.status(404).json({ error: "No Restarunts Found" });
    }
    return res.status(200).json({ restarunts });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
  Route     /search/:searchString
  Des       get  restarunts details based on search
  Params    searchString
  Access    Public
  Method    GET
 */

Router.get("/search/:searchString", async (req, res) => {
  try {
    const { searchString } = req.params;
    const restarunts = await RestrauntModel.find({
      name: { $regex: searchString, $options: "i" },
    });

    if (!restarunts) {
      return res.status(404).json({ error: "No Restarunts Found" });
    }
    return res.status(200).json({ restarunts });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
