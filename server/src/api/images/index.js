import express from "express";
import AWS from "aws-sdk";
import multer from "multer";
import { ImageModel } from "../../database/images/index";
import { s3Upload } from "../../utils/s3";
const Router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
  Route     /:_id
  Des        get all orders by user  id
  Params    _id
  Access    Public
  Method    GET
 */

Router.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const getImages = await OrderModel.findById(_id);

    // if (!getOrders) {
    //   return res.status(400).json({ error: "Orders not found fron user" });
    // }
    return res.status(200).json({ getImages });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
  Route     /upload
  Des        upload image to s3 bucket and save link to MongoDB
  Params     none
  Access    Public
  Method    POST
 */

Router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;

    const bucketOptions = {
      Bucket: "zomato-clone-intern",
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read",
    };

    const uploadImage = await s3Upload(bucketOptions);

    const uploadToDb = await ImageModel.create({
      images: [{ Location: uploadImage.Location }],
    });
    return res.status(200).json({ uploadToDb });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
