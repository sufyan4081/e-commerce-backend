import Dish from "../model/dish.js";
import multiparty from "multiparty";

const IMAGE_UPLOAD_DIR = "./public/images";
// const IMAGE_BASE_URL = "http://192.168.1.12:5000/images/";
const IMAGE_BASE_URL = "https://e-commerce-backend-x4mx.onrender.com/images/";

const createDish = async (req, res) => {
  try {
    let form = new multiparty.Form({ uploadDir: IMAGE_UPLOAD_DIR });

    form.parse(req, async function (err, fields, files) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      const imagePath = files.image[0].path;
      const imageFileName = imagePath.slice(imagePath.lastIndexOf("\\") + 1);
      const imageURL = IMAGE_BASE_URL + imageFileName;

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
