import express from "express";
import dishController from "../controllers/dishController.js";

const dishRouter = express.Router();

// for create dish
dishRouter.post("/createDish", dishController.createDish);

// for fetch all dish
dishRouter.get("/fetchAllDish", dishController.fetchAllDish);

// for update dish
dishRouter.put("/updateDish/:id", dishController.updateDish);

// for delete dish
dishRouter.delete("/deleteDish/:id", dishController.deleteDish);

// for dish find by id
dishRouter.get("/findDishById/:id", dishController.findDishById);

export default dishRouter;
