import mongoose from "mongoose";

// create Schema
const dishSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: String,
  },
  rating: {
    type: String,
  },
  isActive: {
    type: Boolean,
  },
  image: {
    type: String,
  },
});

const Dish = new mongoose.model("Dish", dishSchema);

export default Dish;
