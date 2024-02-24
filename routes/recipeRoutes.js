import express from "express";
import recipeController from "../controllers/recipeController.js";

const recipeRouter = express.Router();

// for create recipe
recipeRouter.post("/createRecipe", recipeController.createRecipe);

// for fetch all recipe
recipeRouter.get("/fetchAllRecipe", recipeController.fetchAllRecipe);

// for update Recipe
recipeRouter.put("/updateRecipe/:id", recipeController.updateRecipe);

// for delete recipe
recipeRouter.delete("/deleteRecipe/:id", recipeController.deleteRecipe);

// for recipe find by criteria
recipeRouter.get(
  "/findRecipeByCriteria/filter",
  recipeController.findRecipeByCriteria
);

export default recipeRouter;
