import Recipe from "../model/recipe.js";
import express from "express";

const app = express();

const createRecipe = async (req, res) => {
  try {
    const Item = await Recipe.create(req.body);
    res.status(201).json({ success: true, Item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
const fetchAllRecipe = async (req, res) => {
  try {
    const Item = await Recipe.find();

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

const updateRecipe = async (req, res) => {
  try {
    const Item = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
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
        message: "Recipe not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const Item = await Recipe.deleteOne({ _id: req.params.id });
    if (Item.deletedCount > 0) {
      res.status(200).json({
        success: true,
        message: "Recipe deleted successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Recipe not found",
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

const findRecipeByCriteria = async (req, res) => {
  try {
    const { title } = req.query;

    // Construct the filter object based on the provided criteria
    const filter = {};
    if (title) {
      filter.title = { $regex: title, $options: "i" }; // Case-insensitive search for title
    }
    const filteredRecipe = await Recipe.find(filter);
    if (filteredRecipe.length > 0) {
      res.status(200).json({
        success: true,
        filteredRecipe,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No Recipe found matching the criteria",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export default {
  createRecipe,
  fetchAllRecipe,
  updateRecipe,
  deleteRecipe,
  findRecipeByCriteria,
};
