import mongoose from "mongoose";

// create Schema
const dishSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
  },
  isActive: {
    type: Boolean,
  },
});

const Dish = new mongoose.model("Dish", dishSchema);

export default Dish;
