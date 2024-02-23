import Dish from "../model/dish.js";
import multiparty from "multiparty";
import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";

const IMAGE_UPLOAD_DIR = "./public/images";

// Get the directory path of the current module file
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

// Serve static files from the "public/images" directory
app.use(express.static(join(__dirname, IMAGE_UPLOAD_DIR)));

const createDish = async (req, res) => {
  try {
    let form = new multiparty.Form();

    form.parse(req, async function (err, fields, files) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      // Assuming the image is uploaded and stored in the 'image' field
      const imageFile = files.image[0];

      // Read the image file and convert it to base64
      const imageBuffer = fs.readFileSync(imageFile.path);
      const base64Image = imageBuffer.toString("base64");

      // Construct the base64 image URL
      const imageURL = `data:${imageFile.headers["content-type"]};base64,${base64Image}`;

      const dish = new Dish({
        title: fields.title[0],
        name: fields.name[0],
        description: fields.description[0],
        price: fields.price[0],
        rating: fields.rating[0],
        isActive: true,
        image: imageURL,
      });

      const savedDish = await dish.save();
      res.status(201).json({ success: true, dish: savedDish });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const fetchAllDish = async (req, res) => {
  try {
    const Item = await Dish.find();

    res.status(200).json({
      success: true,
      Item,
    });
  } catch (error) {
    if (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
};

const updateDish = async (req, res) => {
  try {
    const Item = await Dish.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: true,
      runValidators: true,
    });
    if (Item) {
      res.status(200).json({
        success: true,
        Item,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Dish not found",
      });
    }
  } catch (error) {
    if (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
};

const deleteDish = async (req, res) => {
  try {
    const Item = await Dish.deleteOne({ _id: req.params.id });
    if (Item.deletedCount > 0) {
      res.status(200).json({
        success: true,
        message: "Dish deleted successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Dish not found",
      });
    }
  } catch (error) {
    if (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
};
const findDishById = async (req, res) => {
  try {
    const Item = await Dish.findById(req.params.id);
    if (Item) {
      res.status(200).json({
        success: true,
        Item,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Dish not found",
      });
    }
  } catch (error) {
    if (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
};

export default {
  createDish,
  fetchAllDish,
  updateDish,
  deleteDish,
  findDishById,
};
