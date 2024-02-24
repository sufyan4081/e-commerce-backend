import mongoose from "mongoose";

// create Schema
const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  video: {
    type: String,
  },
});

const Recipe = new mongoose.model("Recipe", recipeSchema);

export default Recipe;
