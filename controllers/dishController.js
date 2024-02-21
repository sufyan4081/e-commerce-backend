import Dish from "../model/dish.js";

// create new dish
const createDish = async (req, res) => {
  // for checking title, name, desc, price must be required
  try {
    if (
      (!req.body.title && !req.body.name && !req.body.description,
      !req.body.price && !req.body.quantity)
    ) {
      return res.status(400).json({
        success: false,
        message: "title/name/description/price are required",
      });
    }

    const Item = await Dish.create(req.body);

    res.status(201).json({
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
